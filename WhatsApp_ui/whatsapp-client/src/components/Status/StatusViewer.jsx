import React, { useEffect, useState } from 'react'
import { stories } from './DummyStory'
import ProgressBar from './ProgressBar'
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const StatusViewer = () => {

    const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(0)

    const navigate = useNavigate()

    const handleNextStory = () => {

        if (currentStoryIndex < stories?.length - 1) {

            setCurrentStoryIndex(currentStoryIndex + 1)
            setActiveIndex(activeIndex + 1)
        } else {
            setCurrentStoryIndex(0)
            setActiveIndex(0)
        }
    }

    useEffect(() => {

        const IntervalId = setInterval(() => {
            handleNextStory();
        }, 2000)

        return () => clearInterval(IntervalId)
    }, [currentStoryIndex])


    const handleNavigate = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className='flex justify-center items-center h-[100vh] bg-slate-900 relative'>
                <div className='relative'>
                    <img
                        src={stories?.[currentStoryIndex].image} alt=""
                        className='max-h-[96vh] object-contain'
                    />

                    <div className='absolute top-0 w-full flex'>
                        {
                            stories.map((item, index) => <ProgressBar
                                key={index}
                                duration={2000}
                                index={index}
                                activeIndex={activeIndex}
                            />)
                        }
                    </div>
                </div>

                <div >
                    <BsArrowLeft onClick={handleNavigate} className='absolute top-10 left-10 text-white text-4xl cursor-pointer' />
                    <AiOutlineClose onClick={handleNavigate} className='absolute top-10 right-10 text-white text-4xl cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default StatusViewer
