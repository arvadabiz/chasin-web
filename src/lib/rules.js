export async function fetchRules() {
    const token = localStorage.getItem('token')

    const res = await fetch(
        `http://localhost:3000/rules`,
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
    console.log(data.rules[0])
    return data.rules
}

export async function fetchRuleData(id) {
    const token = localStorage.getItem('token')

    const res = await fetch(
        `http://localhost:3000/rules/data?id=${encodeURIComponent(id)}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch rule data')
    }

    const data = await res.json()
    console.log(data)
    return data
}

function decode(token) {
    try {
        const payload = token.split('.')[1]
        if (!payload) return null
        const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(decodedPayload)
    } catch (err) {
        console.error('Failed to decode token:', err)
        return null
    }
}

export async function saveRule(id, name, subject, body, color, days_overdue) {
    const token = localStorage.getItem('token')
    const userData = decode(token)
    const accountId = userData.accountId

    const res = await fetch(
        `http://localhost:3000/rules/save?id=${encodeURIComponent(id)}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                accountId,
                subject,
                body,
                color,
                days_overdue
            })
        }
    )

    if (!res.ok) {
        throw new Error('Failed to save rule')
    }

    const data = await res.json()
    console.log(data)
    return data
}