import Sidebar from "../components/Sidebar";
import { Card, DynamicRow } from '../components/Card'
import { useEffect, useState } from 'react'
import { fetchMetrics } from "../lib/dashboard";

function getStatus(inv) {
    if (inv.status === 'paid') return 'Paid'

    const now = new Date()
    const due = new Date(inv.due_date)

    if (now > due) return 'Overdue'

    return 'Unpaid'
}

export default function Dashboard() {
    const accountId = '47e1a9ee-311e-4437-9c0c-450269a4dd8b'

    const [metrics, setMetrics] = useState(null)
    const [recent, setRecent] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await fetchMetrics(accountId)

                setMetrics(data.metrics)
                setRecent(data.recent)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [])

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <aside className="w-64 bg-white shadow-md sticky top-0 h-screen">
                <Sidebar />
            </aside>
            {loading && <p className="text-gray-500">Loading invoices...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && metrics && (
                <div className="p-6 space-y-6 w-full">
                    <div className="grid grid-cols-2 gap-4">
                        <Card header='Total Invoices' value={metrics.total} description='Connected to QuickBooks' />
                        <Card header='Overdue Invoices' value={metrics.overdue} description='Down 5% from last week' />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <Card header='Captured Revenue' value={`$${metrics.captured.toFixed(2)}`} description='Collected in the past 7 days' />
                        <Card header='Outstanding Balance' value={`$${metrics.outstanding.toFixed(2)}`} description={`Across ${metrics.overdue} overdue invoices`} />
                        <Card header='Upcoming Due' value={metrics.upcoming} description='In the next 3 days' />
                    </div>
                    <Card header="Recent Invoices">
                        {recent.map(inv => (
                            <DynamicRow
                                key={inv.id}
                                invoice={`Invoice #${inv.metadata.DocNumber}`}
                                client={inv.metadata.CustomerRef?.name || 'Unknown'}
                                status={getStatus(inv)}
                                amount={`$${inv.amount_due.toFixed(2)}`}
                                date={
                                    inv.status === 'paid'
                                        ? `Paid ${new Date(inv.created_at).toLocaleDateString()}`
                                        : `Due ${new Date(inv.due_date).toLocaleDateString()}`
                                }
                            />
                        ))}
                    </Card>
                </div>
            )}
        </div>
    )
}
