import React from 'react'
import { useNavigate } from 'react-router-dom'

const StatusUsercard = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {

        navigate(`/status/{userId}`)
    }

    return (
        <div onClick={handleNavigate} className='flex items-center p-5'>
            <div>
                <img className='h-7 w-7 lg:w-10 lg:h-10 rounded-full cursor-pointer'
                    src='https://media.istockphoto.com/id/1277055063/photo/pretty-indian-young-hindu-bride.jpg?s=1024x1024&w=is&k=20&c=xqc2WSJyXp2en1A4kJ_xsmgHUlI0MCEz-l2uR5HFjHU=' />
            </div>

            <div className='ml-8 text-white'>
                <p>Priyanka chopra</p>
            </div>
        </div>
    )
}

export default StatusUsercard
