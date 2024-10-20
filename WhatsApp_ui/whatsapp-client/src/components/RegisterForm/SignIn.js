import { Alert, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { currentUser, login } from '../../Redux/Auth/Action';

const SignIn = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
    const token = localStorage.getItem('token');

    // Logging inputData for debugging
    useEffect(() => {
        console.log("Current inputData:", inputData);
    }, [inputData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Handle Submit");

        // Basic validation before submitting the form
        if (inputData.email === "" || inputData.password === "") {
            setSnackbarSeverity("error");
            setSnackbarMessage("Please enter both email and password.");
            setOpenSnackbar(true);
            return;
        }

        // Log the input data before dispatching the action
        console.log("Submitting with inputData:", inputData);

        // Show success snackbar when form is submitted
        setOpenSnackbar(true);
        setSnackbarSeverity("info");
        setSnackbarMessage("Logging in...");
        dispatch(login(inputData));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputData(prevState => ({
            ...prevState,
            [name]: value
        }));
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
            <div className='flex justify-center items-center h-screen'>
                <div className='w-[30%] p-10 shadow-md bg-white'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p>Email</p>
                            <input
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                                value={inputData.email}
                                name='email'
                                type='email'
                                className='py-2 mt-2 outline outline-green-600 w-full rounded-md border pl-2'
                            />
                        </div>

                        <div>
                            <p>Password</p>
                            <input
                                placeholder='Enter Your Password'
                                onChange={handleChange}
                                value={inputData.password}
                                name='password'
                                type='password'
                                className='py-2 mt-2 outline outline-green-600 w-full rounded-md border pl-2'
                            />
                        </div>

                        <div>
                            <Button type='submit' variant='contained' className='w-full'>Sign In</Button>
                        </div>
                    </form>

                    <div className='flex items-center justify-center space-x-3 mt-5'>
                        <p>Create New Account</p>
                        <Button variant='text' onClick={() => navigate("/signup")}>Signup</Button>
                    </div>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}>
                <Alert
                    onClose={handleSnackBarClose}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignIn;
