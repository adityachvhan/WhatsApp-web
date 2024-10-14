import React, { useEffect, useState } from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import ChatCard from './ChatCard/ChatCard';
import { BsThreeDotsVertical } from "react-icons/bs";
import MessageCard from './MessageCard/MessageCard';
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { BsMicFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Profile from './Profile/Profile';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CreateGroup from './Group/CreateGroup';

import { useDispatch, useSelector } from 'react-redux';
import { currentUser, LogoutAction } from '../Redux/Auth/Action';

const HomePage = () => {
    const [querys, setQuerys] = useState("");  // Changed from null to an empty string
    const [currentChat, setCurrentChat] = useState(null);
    const [content, setContent] = useState("");
    const [isProfile, setIsProfile] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [isGroup, setIsGroup] = useState(false);

    const { auth } = useSelector(store => store);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(currentUser(token));
        }
    }, [token, dispatch]);

    useEffect(() => {
        if (!auth?.requser) {
            navigate("/signup");
        }
    }, [auth, navigate]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearched = () => {
        // Implement search logic
    };

    const handleCreateNewMessage = () => {
        // Implement message creation logic
    };

    const handleLogout = () => {
        dispatch(LogoutAction());
        navigate("/signup");
    };

    const handleClickOnChatCard = () => {
        setCurrentChat(true);
    };

    const handleNavigate = () => {
        setIsProfile(true);
    };

    const handleCloseOpenProfile = () => {
        setIsProfile(false);
    };

    const handleCreateGroup = () => {
        setIsGroup(true);
    };

    return (
        <div className='relative'>
            {/* Header Bar */}
            <div className='py-14 bg-[#00a884] w-full'></div>

            {/* Main Content */}
            <div className='flex h-[94vh] bg-[#f0f2f5] absolute top-6 left-6 w-[96vw] left-[2vw]'>

                {/* Left Pane */}
                <div className='left w-[30%] bg-[#e8e9ea] h-full'>

                    {/* Profile or Group Creation */}
                    
                    {isGroup && <CreateGroup />}
                    {isProfile && <Profile handleCloseOpenProfile={handleCloseOpenProfile} />}

                    {/* Chat List */}
                    {!isProfile && !isGroup && (
                        <div className='w-full'>
                            <div className='flex justify-between items-center p-3'>
                                <div className='flex items-center space-x-3'>
                                    <img
                                        onClick={handleNavigate}
                                        className='rounded-full w-10 h-10'
                                        src='https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_640.jpg'
                                        alt="User Profile"
                                    />
                                    <p>UserName</p>
                                </div>

                                <div className='flex space-x-3 text-2xl'>
                                    <TbCircleDashed className='cursor-pointer' onClick={() => navigate("/status")} />
                                    <BiCommentDetail className='cursor-pointer' />
                                    <div>
                                        <BsThreeDotsVertical
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            className='cursor-pointer'
                                        />
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={handleCreateGroup}>Create Group</MenuItem>
                                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className='relative flex justify-center items-center py-4 px-3 bg-white'>
                                <input
                                    type='text'
                                    className='outline-none border-none bg-slate-200 rounded-md w-[93%] pl-9 py-2'
                                    placeholder='Search..'
                                    onChange={(e) => {
                                        setQuerys(e.target.value);
                                        handleSearched(e.target.value);
                                    }}
                                    value={querys}
                                />
                                <AiOutlineSearch className='left-6 top-7 absolute' />
                                <BsFilter className='ml-4 text-3xl' />
                            </div>

                            {/* Chat List */}
                            <div className='bg-white overflow-y-scroll scrollbar-hide h-[75vh] px-5'>
                                {querys && [1, 1, 1, 1, 1, 1].map((user, index) => (
                                    <div key={index} onClick={handleClickOnChatCard}>
                                        <hr />
                                        <ChatCard />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Pane */}
                {!currentChat && (
                    <div className='right flex-1'>
                        <div className='w-[70%] flex flex-col items-center justify-center h-full'>
                            <div className='max-w-[70%] text-center'>
                                <img
                                    src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
                                    alt="WhatsApp multi-device support update"
                                />
                                <h1 className='text-4xl text-gray-600'>WhatsApp Web</h1>
                                <p className='my-9'>
                                    Send and receive messages without keeping your phone online. Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {currentChat && (
                    <div className='w-[70%] relative'>
                        {/* Chat Header */}
                        <div className='relative top-0 w-full bg-[#f0f2f5]'>
                            <div className='flex justify-between'>
                                <div className='py-3 space-x-4 flex items-center px-3'>
                                    <img className='rounded-full w-10 h-10' src='https://cdn.pixabay.com/photo/2022/01/23/08/27/fashion-model-6960097_640.jpg' alt="Chat Profile" />
                                    <p>UserName</p>
                                </div>
                                <div className='py-3 space-x-4 items-center px-3 flex'>
                                    <AiOutlineSearch />
                                    <BsThreeDotsVertical />
                                </div>
                            </div>
                        </div>

                        {/* Message Section */}
                        <div className='px-10 h-[85vh] overflow-y-scroll scrollbar-hide'>
                            <div className='space-y-1 flex flex-col justify-center mt-20 py-2'>
                                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                                    <MessageCard key={index} isReqUserMessage={index % 2 === 0} content={"message from server"} />
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className='footer bg-[#f0f2f5] absolute bottom-0 py-3 text-2xl w-full'>
                            <div className='flex justify-between items-center px-5 relative'>
                                <BsEmojiSmile className='cursor-pointer' />
                                <ImAttachment className='cursor-pointer' />
                                <input
                                    type='text'
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                    className='py-2 outline-none border-none w-[85%] bg-white pl-4 rounded-md'
                                    placeholder='Type a message'
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            handleCreateNewMessage();
                                            setContent("");
                                        }
                                    }}
                                />
                                <BsMicFill className='cursor-pointer' />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
