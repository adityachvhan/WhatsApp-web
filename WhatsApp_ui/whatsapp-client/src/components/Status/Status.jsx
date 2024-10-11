import React from 'react'
import StatusUsercard from './StatusUsercard'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Status = () => {

    const navigate = useNavigate()

    const handleNavigate = () => {

        navigate(-1)
    }

    return (
        <div>
            <div className='flex items-center px-[14vw] py-[7vh]'>

                {/* left side start */}

                <div className='left h-[85vh] bg-[#1e262c] lg:w-[30%] w-[50%] px-5'>
                    <div className='pt-5 h-[13%]'>
                        <StatusUsercard />
                    </div>
                    <hr className='mt-3 w-[90%] mx-auto' />

                    <div className='overflow-y-scroll h-[85%] pt-2 scrollbar-hide'>
                        {
                            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => <StatusUsercard />)
                        }
                    </div>
                </div>

                {/*left side ends  */}

                {/*right side start  */}

                <div className='relative h-[85vh] lg:w-[70%] w-[50%] bg-[#0b141a]'>
                    <AiOutlineClose
                        className='absolute top-5 text-white cursor-pointer right-10 text-xl'
                        onClick={handleNavigate}
                    />
                </div>

                {/*right side ends  */}
            </div>
        </div>
    )
}

export default Status
