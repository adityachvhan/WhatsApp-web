import React, { useState } from 'react'
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const Profile = ({ handleCloseOpneProfile }) => {

    const [flag, setFlag] = useState(false)
    const [username, setUsername] = useState(null)
    const [tempPicture, setTempPicture] = useState(null)
    const { auth } = useSelector(store => store)
    const dispatch = useDispatch()

    const handleFlag = () => {

        setFlag(true);
    }

    const handleCheckClick = () => {

        setFlag(false);
    }

    const handleChange = (event) => {

        setUsername(event.target.value)
    }

    const uploadOnCloudinary = () => {
        
        // const data = new FormData();
        // data.append("file",pics)
        // data.append("upload_preset","whatsapp")

    }

    return (
        <div className='w-full h-full'>
            <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5'>
                <BsArrowLeft className='cursor-pointer text-2xl font-bold' onClick={handleCloseOpneProfile} />
                <p className='cursor-pointer font-semibold'>Profile</p>
            </div>

            <div className='flex flex-col justify-center items-center my-12'>
                <label htmlFor='imgInput'>
                    <img
                        className='rounded-full w-[15vw] h-[15vw] cursor-pointer '
                        src='https://cdn.pixabay.com/photo/2021/04/02/12/06/woman-6144774_640.jpg' />
                </label>

                <input type='file' id='imgInput' className='hidden' />
            </div>


            {/* Name Section */}

            <div>
                <p className='py-3 px-4'>Your Name</p>

                {!flag && <div className='flex items-center justify-between px-4'>
                    <p className='py-3'>{username || "UserName"}</p>
                    <BsPencil onClick={handleFlag} className='cursor-pointer text-2xl' />
                </div>}

                {flag &&
                    <div className='w-full flex justify-between items-start py-2'>
                        <input onChange={handleChange} type='text' placeholder='Enter your Name'
                            className='w-[90%] outline-none border-b-2 border-blue-700 p-2 ml-2'
                        />
                        <BsCheck2 className='cursor-pointer text-3xl mt-2 mr-1' onClick={handleCheckClick} />
                    </div>
                }
            </div>

            {/* Name Text */}
            <div className='px-4 py-5'>
                <p className='py-10 '>This is not your UserName,this name will be visible to your whatsapp contacts</p>
            </div>
        </div>
    )
}

export default Profile
