import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { fetchRuleData } from "../lib/rules";
import { useParams, useNavigate } from "react-router-dom";
import { saveRule } from "../lib/rules";

export default function RulesEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    console.log(id)

    const [ruleName, setRuleName] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [color, setColor] = useState("");
    const [daysOverdue, setDaysOverdue] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [saving, setSaving] = useState(null)

    const accountId = '47e1a9ee-311e-4437-9c0c-450269a4dd8b'

    useEffect(() => {
        async function loadRules() {
            if (!id) return
            try {
                const rule = await fetchRuleData(id)
                setRuleName(rule.name)
                setSubject(rule.subject_line)
                setBody(rule.message)
                setColor(rule.color)
                setDaysOverdue(rule.days_overdue)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadRules()
    }, [])

    async function handleSave() {
        setSaving(true)
        try {
            const data = await saveRule(id, ruleName, subject, body, color, daysOverdue)

            if (data.ok === true) {
                navigate('/rules')
            } else {
                setError('Failed to save rule.')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <aside className="w-64 bg-white shadow-md sticky top-0 h-screen">
                <Sidebar />
            </aside>
            {loading && <p className="text-gray-500">Loading invoices...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-1 items-center justify-center px-6">
                <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
                    {/* Header */}
                    <div className="border-b px-6 py-4">
                        <h1 className="text-xl font-semibold">Edit Rule</h1>
                        <p className="text-sm text-gray-500">
                            Customize how and when this reminder is sent
                        </p>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-6">
                        {/* Rule name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rule name
                            </label>
                            <input
                                type="text"
                                value={ruleName}
                                onChange={(e) => setRuleName(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email subject
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        {/* Body */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email body
                            </label>
                            <textarea
                                rows={6}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                You can use variables like <code>{"{{customer_name}}"}</code>{" and "}
                                <code>{"{{invoice_number}}"}</code>, click here for a{" "}
                                    <button type='button' onClick={() => navigate('/resources/formatting')} className="text-blue-600 underline hover:text-blue-700">
                                        full formatting guide
                                    </button>
                                .
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Color
                                </label>
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                                />
                            </div>

                            <div className="border rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Days overdue
                                </label>
                                <input
                                    type="number"
                                    value={daysOverdue}
                                    onChange={(e) => setDaysOverdue(parseInt(e.target.value))}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    min={0}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer actions */}
                    <div className="border-t px-6 py-4 flex justify-between">
                        <button className="text-gray-500 hover:text-gray-700">
                            Cancel
                        </button>

                        <button className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition" onClick={handleSave}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
