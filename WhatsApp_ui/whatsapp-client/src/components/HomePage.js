import React, { useState } from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import ChatCard from './ChatCard/ChatCard';


const HomePage = () => {

    const [querys, setQuerys] = useState(null)
    const [currentChat, setCurrentChat] = useState(null)

    const handleSearched = () => {

    }


    const handleClickOnChatCard = () => {
        setCurrentChat(true)
    }

    return (
        <div className='relative'>

            {/* Header Bar */}
            <div className='py-14 bg-[#00a884] w-full'></div>

            {/* Main Content */}
            <div className='flex h-[94vh] pt-14 bg-[#f0f2f5] absolute top-6 left-6 w-full'>

                {/* Left Pane */}
                <div className='left w-[30%] bg-[#e8e9ea] h-full'>

                    <div className='w-full'>
                        <div className='flex justify-between items-center p-3'>
                            <div className='flex items-center space-x-3'>
                                <img className='rounded-full w-10 h-10'
                                    src='https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_640.jpg' />

                                <p>UserName</p>
                            </div>

                            <div className='flex space-x-3 text-2xl'>
                                <TbCircleDashed />
                                <BiCommentDetail />
                            </div>
                        </div>

                        <div className='relative flex justify-center items-center py-4 px-3 bg-white'>
                            <input type='text' className='outline-none border-none
                          bg-slate-200 rounded-md w-[93%] pl-9 py-2' placeholder='Search..'
                                onChange={(e) => {
                                    setQuerys(e.target.value);  // Call setQuerys function
                                    handleSearched(e.target.value);  // Call handleSearched function (if you want to use the value in search logic)
                                }}

                                value={querys}
                            />

                            <AiOutlineSearch className='left-6 top-7 absolute' />

                            <div >
                                <BsFilter className='ml-4 text-3xl' />
                            </div>

                        </div>


                        <div className='bg-white overflow-y-scroll h-[76.8vh] px-3'>

                            {
                                querys && [1, 1, 1, 1, 1, 1].map((user) => <div onClick={handleClickOnChatCard}> {""}<hr /> <ChatCard />{""}</div>)
                            }

                        </div>

                    </div>
                </div>

                {/* Right Pane */}
                {/* Defalut WhatsApp Page */}
                {!currentChat && <div className='right flex-1'>
                    <div className=' w-[70%] flex flex-col items-center justify-center h-full'>
                        <div className='max-w-[70%] text-center'>
                            <img
                                src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
                                alt="WhatsApp multi-device support update"

                            />
                            <h1 className='text-4xl text-gray-600'>WhatsApp Web</h1>
                            <p className='my-9'>Send and recive messages without keeping your phone online.use whatsapp on up to 4 linked devices and 1 phone at same time
                            </p>
                        </div>
                    </div>
                </div>}


            </div>
        </div>
    );
}

export default HomePage;
