import React from "react";
import { faCheck, faExclamation, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Card = ({ header, value, description, dynamic, children }) => {
    const isContentCard = Boolean(children)
    
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <div className="mb-3">
                <h3 className="text-gray-500 text-sm font-medium h-full">{header}</h3>
                {!isContentCard && (
                    <p className="text-2xl font-semibold mt-1">{value}</p>
                )}
            </div>
            {isContentCard && (
                <div className="space-y-2">
                    {children}
                </div>
            )}

            {!isContentCard && description && (
                <p className={`text-sm mt-2 ${dynamic ? 'text-green-500' : 'text-gray-400'}`}>
                    {description}
                </p>
            )}
        </div>
    )
}

export const DynamicRow = ({ invoice, client, status, amount, date }) => {
    const statuscolor = {
        Paid: 'bg-green-100 text-green-800 border border-green-400',
        Unpaid: 'bg-yellow-100 text-yellow-800 border border-yellow-400',
        Overdue: 'bg-red-100 text-red-800 border border-red-400'
    }

    const statusicon = {
        Paid: faCheck,
        Unpaid: faClock,
        Overdue: faExclamation
    }

    return (
        <div className="flex justify-between items-center bg-white rounded-lg px-4 py-2 mb-2">
            <div className="text-gray-700 font-medium">{invoice} • {client}</div>
            <div className="flex items-center space-x-2 text-sm">
                <span className={`px-2 py-1 rounded-lg ${statuscolor[status]}`}>
                    <FontAwesomeIcon icon={statusicon[status]} className='text-sm' />
                    {status}
                </span>
                <span>• {amount}</span>
                <span>• {date}</span>
            </div>
        </div>
    )
}