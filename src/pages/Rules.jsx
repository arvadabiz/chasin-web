import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { fetchRules } from "../lib/rules";
import { useNavigate } from 'react-router-dom'

const RULES = [
    {
        id: 1,
        color: "bg-green-500",
        name: "First Reminder",
        subject: "Friendly reminder — invoice due",
        body: "Hey {{customer_name}}, just a quick reminder that your invoice is coming due. Let us know if you have any questions."
    },
    {
        id: 2,
        color: "bg-blue-500",
        name: "Overdue Follow-Up",
        subject: "Invoice overdue — action required",
        body: "This is a follow-up regarding your overdue invoice. Please submit payment at your earliest convenience."
    },
    {
        id: 3,
        color: "bg-purple-500",
        name: "Final Notice",
        subject: "Final notice before escalation",
        body: "This is the final reminder before we escalate the invoice. Please reach out immediately if there are issues."
    }
];

export default function Rules() {
    const navigate = useNavigate()
    const accountId = '47e1a9ee-311e-4437-9c0c-450269a4dd8b'

    const [rules, setRules] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadRules() {
            try {
                const data = await fetchRules()
                setRules(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadRules()
    }, [])

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <aside className="w-64 bg-white shadow-md sticky top-0 h-screen">
                <Sidebar />
            </aside>
            {loading && <p className="text-gray-500">Loading invoices...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-1 items-center justify-center px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {rules.map((rule, index) => (
                        <div
                            key={rule.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                        >
                            {/* Banner */}
                            <div style={{ backgroundColor: rule.color }} className="h-20" />

                            {/* Divider + number */}
                            <div className="relative flex justify-center">
                                <div className="w-full h-px bg-gray-200" />
                                <div className="absolute -top-5 w-10 h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center font-semibold text-gray-700">
                                    {index + 1}
                                </div>
                            </div>

                            {/* Card content */}
                            <div className="p-6 flex flex-col flex-1 text-center">
                                <h3 className="text-lg font-semibold mb-2">
                                    {rule.name}
                                </h3>

                                <p className="text-sm font-medium text-gray-600 mb-3">
                                    {rule.subject_line}
                                </p>

                                <p className="text-gray-500 italic mb-6">
                                    {rule.message}
                                </p>

                                <div className="mt-auto">
                                    <button className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition" onClick={() => navigate(`/rules/${rule.id}`)}>
                                        Edit Rule
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
