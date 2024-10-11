import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import SelectMember from './SelectMember'
import ChatCard from '../ChatCard/ChatCard'
import NewGroup from './NewGroup'

const CreateGroup = () => {

    const [newGroup, setNewGroup] = useState(false)
    const [groupMember, setGroupMember] = useState(new Set())
    const [query, setQuery] = useState("")

    const handleRemoveMember = (item) => {
        const updatedGroup = new Set(groupMember); // Create a new Set based on the current one
        updatedGroup.delete(item); // Remove the member from the new Set
        setGroupMember(updatedGroup); // Set the new Set as the updated state
    }

    const handleSearch = () => {

    }



    return (
        <div className='w-full h-full'>
            {!newGroup &&
                <div>
                    <div className='flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5 '>
                        <BsArrowLeft className='cursor-pointer text-white text-2xl' />

                        <p className='font-semibold'>Add Group Participates</p>
                    </div>

                    <div className='relative py-4 px-3'>
                        <div className='flex flex-wrap space-x-2 space-y-1'>
                            {
                                groupMember.size > 0 && Array.from(groupMember).map((item) =>
                                    <SelectMember handleRemoveMember={() => handleRemoveMember(item)} member={item} />)
                            }
                        </div>

                        <input type="text"
                            onChange={(e) => {
                                handleSearch(e.target.value)
                                setQuery(e.target.value)
                            }}
                            className='outline-none border-b border-[#8888] w-[93%] p-2'
                            placeholder='Search User'
                            value={query}
                        />
                    </div>

                    <div className='bg-white overflow-y-scroll h-[50.2vh]'>
                        {
                            query && [1, 1, 1, 1, 1, 1, 1].map((item) =>
                                <div onClick={() => {
                                    groupMember.add(item)
                                    setGroupMember(groupMember)
                                    setQuery("")
                                }}
                                    key={item?.id}
                                >
                                    <hr />
                                    <ChatCard />
                                </div>)
                        }
                    </div>


                    <div className='bottom-10 py-10 bg-slate-200 flex items-center justify-center'>
                        <div className='bg-green-600 p-4 rounded-full cursor-pointer' onClick={() => {
                            setNewGroup(true)
                        }}>
                            <BsArrowRight className='text-white font-bold text-3xl' />
                        </div>
                    </div>
                </div>
            }

            {
                newGroup && <NewGroup />
            }
        </div>
    )
}

export default CreateGroup
