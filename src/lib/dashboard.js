const API = import.meta.env.VITE_API_URL

export async function fetchMetrics() {
    const token = localStorage.getItem('token')

    const res = await fetch(
        `${API}/invoices`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch dashboard')
    }

    const data = await res.json()
    const invoices = data.invoices

    const now = new Date()
    const weekAgo = new Date()
    weekAgo.setDate(now.getDate() - 7)

    const inThreeDays = new Date()
    inThreeDays.setDate(now.getDate() + 3)

    const readable = {
        total: invoices.length,
        overdue: invoices.filter(inv =>
            inv.status === 'pending' &&
            new Date(inv.due_date) < now
        ).length,
        captured: invoices
            .filter(inv => inv.status === 'paid' && new Date(inv.created_at) >= weekAgo)    
            .reduce((sum, inv) => sum + inv.amount_due, 0),
        outstanding: invoices
            .filter(inv => inv.status !== 'paid')
            .reduce((sum, inv) => sum + inv.amount_due, 0),
        upcoming: invoices.filter(inv =>
            inv.status !== 'paid' &&
            new Date(inv.due_date) >= now &&
            new Date(inv.due_date) <= inThreeDays
        ).length
    }

    const recent = [...invoices]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3)

    console.log({ metrics: readable, recent })
    return { metrics: readable, recent }
}