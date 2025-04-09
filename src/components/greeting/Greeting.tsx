'use client'

import {  useAuthContext } from '@/contexts/authContext'

const Greeting = () => {
    const { user } = useAuthContext()

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Buenos Dias'
        if (hour < 18) return 'Buenas Tardes'
        return 'Buenas Noches'
    }

    const currentDate = new Date()
    const date = currentDate.toLocaleDateString('es-ES', {
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
    })

    if (!user) return <div className='h-screen text-white px-4'>Loading...</div>

    const greeting = getGreeting()

    return (
        <div>
            <h1 className='text-2xl'>
                {greeting},
                <span className='text-quinary'> {user.name.split(' ')[0]}</span>
            </h1>
            <p className='text-sm'>Hoy es {date}</p>
        </div>
    )
}

export default Greeting