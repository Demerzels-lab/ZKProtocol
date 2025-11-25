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
        const { transactionId } = await req.json();

        if (!transactionId) {
            throw new Error('Transaction ID is required');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Get privacy proof
        const proofResponse = await fetch(
            `${supabaseUrl}/rest/v1/privacy_proofs?transaction_id=eq.${transactionId}`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const proofs = await proofResponse.json();

        if (!proofs || proofs.length === 0) {
            throw new Error('Privacy proof not found');
        }

        const proof = proofs[0];

        // Simulate proof details
        const proofDetails = {
            id: proof.id,
            transactionId: proof.transaction_id,
            proofHash: proof.proof_hash,
            status: proof.proof_status,
            verificationTime: proof.verification_time,
            proofType: 'ZK-SNARK',
            commitment: `pedersen_${crypto.randomUUID().substring(0, 8)}`,
            nullifier: `null_${crypto.randomUUID().substring(0, 8)}`,
            createdAt: proof.created_at
        };

        return new Response(JSON.stringify({
            data: proofDetails
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Privacy proof error:', error);

        const errorResponse = {
            error: {
                code: 'PRIVACY_PROOF_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
