import { Alert, Button, Snackbar } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

    const Navigate = useNavigate()
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = (event) => {

        event.preventDefault();
        setOpenSnackbar(true)
    }

    const handleChange = (event) => {

    }

    const handleSnackBarclose = () => {
        setOpenSnackbar(false)
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className='w-[30%] p-10 shadow-md bg-white'>
                    <form onSubmit={handleSubmit} className='space-y-5'>

                        <div>
                            <p>Email</p>
                            <input
                                placeholder='Enter Uour Email'
                                onChange={handleChange}
                                value={inputData.email}
                                type='text'
                                className='py-2 outline outline-green-600 w-full rounded-md border'
                            />
                        </div>

                        <div>
                            <p>Password</p>
                            <input
                                placeholder='Enter Uour Password'
                                onChange={handleChange}
                                value={inputData.password}
                                type='text'
                                className='py-2 outline outline-green-600 w-full rounded-md border'
                            />
                        </div>

                        <div>
                            <Button type='submit' variant='contained' className='w-full'>SignIn</Button>
                        </div>
                    </form>


                    <div className='flex items-center space-x-3 mt-5'>
                        <p>Create New Account</p>
                        <Button variant='text' onClick={() => Navigate("/signup")}>Signup</Button>
                    </div>

                </div>
            </div>

            <Snackbar  autoHideDuration={6000} onClose={handleSnackBarclose}>
                <Alert
                    onClose={handleSnackBarclose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SignIn
