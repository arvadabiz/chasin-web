const API = import.meta.env.VITE_API_URL

export async function fetchLogin(user, pass) {
    const res = await fetch(
        `${API}/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': user,
                'password': pass
            })
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch login')
    }

    const data = await res.json()
    return data.token
}

export async function fetchRegister(name, user, pass) {
    const res = await fetch(
        `${API}/auth/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'accountName': name,
                'email': user,
                'password': pass
            })
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch register')
    }

    const data = await res.json()
    return data.token
}