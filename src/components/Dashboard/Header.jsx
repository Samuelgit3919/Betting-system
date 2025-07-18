import React from 'react'

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex justify-end items-center">
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">Bura</div>
                        <div className="text-xs text-gray-500">Pa</div>
                    </div>
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        B
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header