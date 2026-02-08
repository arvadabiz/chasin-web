import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Invoices from './pages/Invoices'
import Rules from './pages/Rules'
import RulesEdit from './pages/RulesEdit'
import EmailLogs from './pages/EmailLogs'
import Analytics from './pages/Analytics'
import Integrate from './pages/Integrate'
import Settings from './pages/Settings'

import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'))
    const [user, setUser] = useState(null)

    return (
        <BrowserRouter>
            <Navbar loggedIn={isLoggedIn} user={user} setUser={setUser}/>
            <Routes>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/invoices' element={<Invoices />} />
                <Route path='/rules' element={<Rules />} />
                <Route path='/rules/:id' element={<RulesEdit />} />
                <Route path='/emails' element={<EmailLogs />} />
                <Route path='/analytics' element={<Analytics />} />
                <Route path='/integrate' element={<Integrate />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
                <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            </Routes>
        </BrowserRouter>
    )
}