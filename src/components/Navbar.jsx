import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logo from '../assets/chasin.svg'
import { fetchProfile } from '../lib/profile'

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

const navItems = [
    { label: 'Features', hasDropdown: true },
    { label: 'Resources', hasDropdown: true },
    { label: 'About', hasDropdown: false },
    { label: 'Pricing', hasDropdown: false }
]

export default function Navbar({ loggedIn, user, setUser }) {
    const navigate = useNavigate()

    const [openDropdown, setOpenDropdown] = useState(null)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [notificationsOpen, setNotificationsOpen] = useState(false)

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item)
    }

    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen)
    }

    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen)
    }

    useEffect(() => {
        if (!user) {
            const token = localStorage.getItem('token')
            if (!token) return

            const decoded = decode(token)
            if (!decoded) return

            fetchProfile().then(profile => {
                setUser({ id: decoded.id, name: profile.name, icon: profile.picture })
            }).catch(err => {
                console.error('Failed to load profile:', err)
                setUser(null)
            })
        }
    }, [user, setUser])


    return (
        <nav className='relative w-full border-b border-gray-200 bg-white'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
                <div className='flex items-center gap-3'>
                    <img src={logo} alt='Chasin' className='h-9 w-auto'/>
                    <span className='text-xl font-semibold text-gray-900'>CHASIN</span>
                </div>

                <div className='hidden md:flex items-center gap-14'>
                    {navItems.map((item) => {
                        const isOpen = openDropdown === item.label

                        if (!item.hasDropdown) {
                            return (
                                <button
                                    key={item.label}
                                    className='text-base font-medium text-gray-700 hover:text-gray-900'>
                                        {item.label}
                                </button>
                            )
                        }

                        return (
                            <div key={item.label} className='relative'>
                                <button
                                    onClick={() => toggleDropdown(item.label)}
                                    className='flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900 focus:outline-none'>
                                        {item.label}

                                        <svg
                                            className={`h-4 w-4 text-purple-600 transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : "rotate-0"
                                            }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className='absolute inset-x-0 top-full bg-purple-200'>
                                            <div className='mx-auto max-w-7xl px-6 py-8'>
                                                Hi
                                            </div>
                                        </div>
                                    )}
                            </div>
                        )
                    })}
                </div>

                <div className='flex items-center gap-6'>
                    {user ? (
                        <>
                            <div className='relative'>
                                <button
                                    onClick={toggleUserMenu}
                                    className='flex items-center gap-2 text-base font-medium text-gray-700 hover:text-gray-900'>
                                    
                                    <img
                                        src={user.icon || `https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg`}
                                        alt='Profile'
                                        className='h-8 w-8 rounded-full object-cover'
                                    />
                                    {user.name}
                                    <svg
                                        className={`h-4 w-4 text-purple-600 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : "rotate-0"}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                {userMenuOpen && (
                                    <div className='absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                                        <div className='py-1'>
                                            <button className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'>Profile</button>
                                            <button className='block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100' onClick={() => {
                                                localStorage.removeItem('token')
                                                setUser(null)
                                            }}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className='relative'>
                                <button
                                    onClick={toggleNotifications}
                                    className='text-gray-700 hover:text-gray-99 focus:outline-none'>
                                    <FontAwesomeIcon icon={faBell} className='h-6 w-6' />
                                    <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>
                                </button>

                                {notificationsOpen && (
                                    <div className='fixed top-20 right-6 bottom-6 z-50 w-96 bg-white shadow-xl rounded-xl border border-gray-200 overflow-y-auto'>
                                        <div className='flex items-center justify-between px-4 py-4 border-b border-gray-200'>
                                            <h2 className='text-lg font-semibold text-gray-900'>Notifications</h2>
                                            <button onClick={toggleNotifications} className='text-gray-500 hover:text-gray-700'>✕</button>
                                        </div>
                                        <div className='p-4'>
                                            <div className='mb-3 rounded-lg bg-purple-50 p-3'>
                                                <p className='text-sm text-gray-700'>Invoice #0016 is overdue</p>
                                                <p className='text-xs text-gray-500'>2 hours ago</p>
                                            </div>
                                            <div className='mb-3 rounded-lg bg-purple-50 p-3'>
                                                <p className='text-sm text-gray-700'>New payment recieved</p>
                                                <p className='text-xs text-gray-500'>1 day ago</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className='flex items-center gap-14'>
                            <button className='text-base font-medium text-gray-700 hover:text-gray-900' onClick={() => navigate('/login')}>Log in</button>
                            <button className='bg-purple-600 text-white px-4 py-2 rounded-xl text-base font-medium hover:bg-purple-700 transition-colors' onClick={() => navigate('/register')}>SIGN UP</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}