import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const SelectMember = ({ handleRemoveMember, member }) => {
    return (
        <div className='flex items-center rounded-full bg-slate-300'>
            <img className='w-7 h-7 rounded-full'
                src="https://media.istockphoto.com/id/1221041044/photo/teenage-girl-at-white-background-stock-images.jpg?s=1024x1024&w=is&k=20&c=GqcDXoodouERWXBO8J2eHbNjnwu39zcU_GfLfpmiv44=" alt="" />
            <p>Username</p>
            <AiOutlineClose onClick={handleRemoveMember} className='pr-1 cursor-pointer' />
        </div>
    )
}

export default SelectMember
