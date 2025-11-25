Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        const { userId, txType, amount, tokenSymbol, privacyLevel } = await req.json();

        if (!userId || !txType || !amount) {
            throw new Error('Missing required transaction parameters');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Generate simulated transaction hash
        const txHash = `0x${crypto.randomUUID().replace(/-/g, '')}`;
        
        // Generate ZK proof (simulated)
        const zkProof = `zkp_${crypto.randomUUID()}`;

        // Create transaction
        const insertResponse = await fetch(
            `${supabaseUrl}/rest/v1/transactions`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    user_id: userId,
                    tx_type: txType,
                    amount: parseFloat(amount),
                    privacy_level: privacyLevel || 'private',
                    zk_proof: zkProof,
                    status: 'completed',
                    metadata: {
                        token_symbol: tokenSymbol || 'SOL',
                        tx_hash: txHash,
                        timestamp: Date.now()
                    }
                })
            }
        );

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            throw new Error(`Transaction creation failed: ${errorText}`);
        }

        const transactionData = await insertResponse.json();
        const transaction = transactionData[0];

        // Create privacy proof record
        const proofResponse = await fetch(
            `${supabaseUrl}/rest/v1/privacy_proofs`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=representation'
                },
                body: JSON.stringify({
                    transaction_id: transaction.id,
                    proof_hash: zkProof,
                    proof_status: 'verified',
                    verification_time: Math.random() * 0.5 + 0.3 // 0.3-0.8 seconds
                })
            }
        );

        const proofData = await proofResponse.json();

        return new Response(JSON.stringify({
            data: {
                transaction: transaction,
                proof: proofData[0],
                txHash: txHash
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Transaction create error:', error);

        const errorResponse = {
            error: {
                code: 'TRANSACTION_CREATE_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
