import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { fetchInvoices } from '../lib/invoices.js'

export default function Invoices() {
    const accountId = '47e1a9ee-311e-4437-9c0c-450269a4dd8b'

    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadInvoices() {
            try {
                const data = await fetchInvoices(accountId)
                setInvoices(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadInvoices()
    })

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            <aside className="w-64 bg-white shadow-md sticky top-0 h-screen">
                <Sidebar />
            </aside>
            <div className="p-6 space-y-6 w-full">
                {loading && <p className="text-gray-500">Loading invoices...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {invoices.map(invoice => (
                        <div key={invoice.id} className="bg-white rounded-xl shadow p-8">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                    {(invoice.metadata.CustomerRef.name).split(' ').map(word => word[0]).join('').toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-semibold">Invoice #{invoice.metadata.DocNumber}</h3>
                                    <p className="text-gray-500">{invoice.metadata.CustomerRef.name}</p>
                                </div>
                            </div>
                            <p className="mb-4 text-gray-700">
                                ${(invoice.metadata.Balance).toFixed(2)} · Due {new Date(invoice.metadata.DueDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                            </p>
                            <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}