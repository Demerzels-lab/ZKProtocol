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
        const { userId } = await req.json();

        if (!userId) {
            throw new Error('User ID is required');
        }

        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Get user transactions
        const txResponse = await fetch(
            `${supabaseUrl}/rest/v1/transactions?user_id=eq.${userId}&select=*&order=created_at.desc`,
            {
                headers: {
                    'Authorization': `Bearer ${serviceRoleKey}`,
                    'apikey': serviceRoleKey,
                    'Content-Type': 'application/json'
                }
            }
        );

        const transactions = await txResponse.json();

        // Calculate statistics
        const totalDeposits = transactions
            .filter((tx: any) => tx.tx_type === 'deposit')
            .reduce((sum: number, tx: any) => sum + parseFloat(tx.amount || 0), 0);

        const totalTrades = transactions
            .filter((tx: any) => tx.tx_type === 'trade' || tx.tx_type === 'swap')
            .length;

        const privateTransactions = transactions
            .filter((tx: any) => tx.privacy_level === 'private')
            .length;

        const privacyScore = transactions.length > 0 
            ? Math.round((privateTransactions / transactions.length) * 100)
            : 100;

        // Calculate total balance (simulated)
        const deposits = transactions
            .filter((tx: any) => tx.tx_type === 'deposit')
            .reduce((sum: number, tx: any) => sum + parseFloat(tx.amount || 0), 0);

        const withdrawals = transactions
            .filter((tx: any) => tx.tx_type === 'withdraw')
            .reduce((sum: number, tx: any) => sum + parseFloat(tx.amount || 0), 0);

        const balance = deposits - withdrawals;

        // Get recent transactions (last 10)
        const recentTransactions = transactions.slice(0, 10);

        return new Response(JSON.stringify({
            data: {
                stats: {
                    totalDeposits: totalDeposits.toFixed(2),
                    totalTrades,
                    privacyScore,
                    balance: balance.toFixed(4),
                    gasSaved: (transactions.length * 0.0001).toFixed(4) // Simulated gas savings
                },
                recentTransactions: recentTransactions.map((tx: any) => ({
                    id: tx.id,
                    type: tx.tx_type,
                    amount: tx.amount,
                    privacyLevel: tx.privacy_level,
                    status: tx.status,
                    txHash: tx.metadata?.tx_hash || 'N/A',
                    createdAt: tx.created_at
                }))
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Dashboard stats error:', error);

        const errorResponse = {
            error: {
                code: 'DASHBOARD_STATS_FAILED',
                message: error.message
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});
