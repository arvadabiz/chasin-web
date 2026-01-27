import Sidebar from "../components/Sidebar";

export default function Settings() {
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            <Sidebar />
            <div className="px-6 py-4">
                <h1>Hello settings :)</h1>
            </div>
        </div>
    )
}
