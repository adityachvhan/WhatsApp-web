import { Button, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from 'react-icons/bs'

const NewGroup = () => {

    const [isImageUploading, setIsImageUploading] = useState(false)
    const [groupName, setgroupName] = useState()

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
                <BsArrowLeft className='cursor-pointer text-2xl font-bold' />
                <p className='text-xl font-semibold '>New Group</p>
            </div>

            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor="imgInput" className='relative w-56 h-56' >
                    <img 
                        src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png" alt="" />
                    {isImageUploading && <CircularProgress className='absolute top-[5rem] left-[6rem]' />}
                </label>

                <input type="file" id='imgInput' className='hidden' onChange={() => console.log("image changed successfully")} />
            </div>

            <div className='w-full flex justify-between items-center py-2 px-5'>
                <input
                    type="text"
                    className='outline-none w-full border-b-2 border-green-700 px-2 bg-transparent'
                    placeholder='Group Subject'
                    value={groupName}
                    onChange={(e) => setgroupName(e.target.value)} />
            </div>

            {
                groupName &&
                <div className='py-10 flex items-center justify-center'>
                    <Button>
                        <div className='p-4 rounded-full bg-[#0c977d]'>
                            <BsCheck2 className='font-bold text-3xl text-white' />
                        </div>
                    </Button>
                </div>
            }
        </div>
    )
}

export default NewGroup
