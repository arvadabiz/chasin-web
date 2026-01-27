import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faFileInvoice, faScaleBalanced, faChartBar, faCodeBranch, faCog } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
    return (
        <aside className='flex w-64 flex-col border-r border-gray-200 bg-white px-4 py-6'>
            <nav className='space-y-2'>
                <SidebarItem to='/dashboard' icon={faHome} label='Dashboard' />
                <SidebarItem to='/invoices' icon={faFileInvoice} label='Invoices' />
                <SidebarItem to='/rules' icon={faScaleBalanced} label='Rules' />
                <SidebarItem to='/analytics' icon={faChartBar} label='Analytics' />
                <SidebarItem to='/integrate' icon={faCodeBranch} label='Integrate' />
                <SidebarItem to='/settings' icon={faCog} label='Settings' />
            </nav>
        </aside>
    )
}

function SidebarItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition
                ${
                    isActive
                        ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'
                }`
            }
        >
            <FontAwesomeIcon icon={icon} className='text-lg' />
            {label}
        </NavLink>
    )
}