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
        const { walletAddress, walletType } = await req.json();

        if (!walletAddress) {
            throw new Error('Wallet address is required');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Generate stealth address and ZK commitment (simulated)
        const stealthAddress = `stealth_${walletAddress.substring(0, 8)}`;
        const zkCommitment = crypto.randomUUID();

        // Check if user exists
        const checkResponse = await fetch(
            `${supabaseUrl}/rest/v1/users?stealth_address=eq.${stealthAddress}`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const existingUsers = await checkResponse.json();

        let userData;

        if (existingUsers && existingUsers.length > 0) {
            // Update existing user
            const updateResponse = await fetch(
                `${supabaseUrl}/rest/v1/users?stealth_address=eq.${stealthAddress}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify({
                        updated_at: new Date().toISOString()
                    })
                }
            );

            const updated = await updateResponse.json();
            userData = updated[0];
        } else {
            // Create new user
            const insertResponse = await fetch(
                `${supabaseUrl}/rest/v1/users`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json',
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify({
                        stealth_address: stealthAddress,
                        zk_commitment: zkCommitment,
                        privacy_level: 'high'
                    })
                }
            );

            if (!insertResponse.ok) {
                const errorText = await insertResponse.text();
                throw new Error(`User creation failed: ${errorText}`);
            }

            const inserted = await insertResponse.json();
            userData = inserted[0];
        }

        // Create or update wallet entry
        const walletCheckResponse = await fetch(
            `${supabaseUrl}/rest/v1/wallets?address=eq.${walletAddress}`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const existingWallets = await walletCheckResponse.json();

        if (!existingWallets || existingWallets.length === 0) {
            // Create wallet entry
            await fetch(
                `${supabaseUrl}/rest/v1/wallets`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        address: walletAddress,
                        last_activity: new Date().toISOString()
                    })
                }
            );
        } else {
            // Update last activity
            await fetch(
                `${supabaseUrl}/rest/v1/wallets?address=eq.${walletAddress}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'apikey': serviceRoleKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        last_activity: new Date().toISOString()
                    })
                }
            );
        }

        return new Response(JSON.stringify({
            data: {
                user: userData,
                walletAddress: walletAddress,
                walletType: walletType || 'phantom'
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Wallet connect error:', error);

        const errorResponse = {
            error: {
                code: 'WALLET_CONNECT_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
