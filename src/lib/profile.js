export async function fetchProfile() {
    const token = localStorage.getItem('token')

    const res = await fetch(
        `http://localhost:3000/profile`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if (!res.ok) {
        throw new Error('Failed to fetch profile')
    }

    const data = await res.json()
    console.log(data)
    const profile = {
        name: data.account.name,
        picture: `https://t3.ftcdn.net/jpg/03/75/67/74/360_F_375677469_UzQt3JpGywuXxkOlCkG7SJXXbiGsampv.jpg`
    }
    return profile
}