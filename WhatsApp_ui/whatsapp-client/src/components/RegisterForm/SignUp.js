import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { currentUser, register } from '../../Redux/Auth/Action';

const SignUp = () => {

    const { auth } = useSelector(store => store)
    const token = localStorage.getItem('token');
    const dispatch = useDispatch()
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        full_name: "",
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setOpenSnackbar(true);  
        console.log("userdata", inputData);
        dispatch(register(inputData));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData((values) => ({ ...values, [name]: value }));
    };

    const handleSnackBarClose = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (token) dispatch(currentUser(token))
    }, [token])


    useEffect(() => {
        if (auth.reqUser?.full_name) {
            navigate("/")
        }
    }, [auth.reqUser])

    return (
        <div>
            <div className='flex flex-col justify-center min-h-screen items-center'>
                <div className='w-[30%] p-10 shadow-md bg-white'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <p>User Name</p>
                            <input type='text'
                                className='py-2 px-3 mt-3 mb-2 outline outline-green-600 w-full rounded-md border-1'
                                name='full_name'
                                placeholder='Enter User Name'
                                onChange={handleChange}
                                value={inputData.full_name}
                            />
                        </div>

                        <div>
                            <p>Email</p>
                            <input type='email'  // Updated type to 'email'
                                className='py-3 px-3 mt-3 mb-2 outline outline-green-600 w-full rounded-md border-1'
                                name='email'
                                placeholder='Enter Email'
                                onChange={handleChange}
                                value={inputData.email}
                            />
                        </div>

                        <div>
                            <p>Password</p>
                            <input type='password'  // Updated type to 'password'
                                className='py-2 px-3 mt-3 mb-2 outline outline-green-600 w-full rounded-md border-1'
                                name='password'  // Updated name to 'password'
                                placeholder='Enter Password'
                                onChange={handleChange}
                                value={inputData.password}
                            />
                        </div>

                        <div className='mt-4'>
                            <Button type='submit' variant='contained' className='w-full'>SignUp</Button>
                        </div>
                    </form>

                    <div className='flex space-x-3 items-center mt-5 justify-center'>
                        <p>Already Have Account?</p>
                        <p onClick={() => navigate("/signin")}
                            className='text-blue-500 hover:text-blue-800 cursor-pointer'>
                            Login
                        </p>
                    </div>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    Account Created Successfully
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignUp;
