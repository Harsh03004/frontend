import React from 'react'
import Sidebar from '../components/sidebar'

function HomePage() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full">
                <h1>Home Page</h1>
            </div>
        </div>
    )
}

export default HomePage;