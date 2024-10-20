import React from 'react'

const ChatCard = ({ item }) => {
    return (
        <div className='flex justify-center items-start py-2 group'>
            <div className='w-[20%]'>
                <img className='rounded-full w-10 h-10'
                    src={item.profile_picture
                        || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt='no image found' />
            </div>

            <div className='pl-5 w-[80%]'>
                <div className='flex items-center justify-between'>
                    <p className='text-lg'>{item.full_name}</p>
                    <p className='text-sm'>TimeStamp </p>
                </div>

                <div className='flex justify-between items-center'>
                    <p>message..</p>
                    <div className='flex space-x-2 items-center'>
                        <p className='text-xs py-1 px-2 text-white bg-green-500 rounded-full'>5</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatCard
