export async function fetchInvoices() {
    const token = localStorage.getItem('token')

    const res = await fetch(
        `http://localhost:3000/invoices`,
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