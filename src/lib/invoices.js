const API = import.meta.env.VITE_API_URL

export async function fetchInvoices() {
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
        throw new Error('Failed to fetch invoices')
    }

    const data = await res.json()
    console.log(data)
    return data.invoices
}