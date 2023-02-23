import { Alert, AlertTitle, Box, CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

function SingUpEmailChecker() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async (data) => {
        setLoading(true)
        const confirmationToken = data?.confirmationToken
        axios.put(`https://server1.rishati.com/api/v1/users/verify/${confirmationToken}`)
            .then(res => {
                if (res.status === 200) {
                    setOpen(true);
                    setLoading(false)
                    navigate('/login'); 
                } else {
                    setLoading(false)
                    setError('Token invalid please try again')
                }
            }); 
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    return (
        <Fragment>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" style={{height:"100vh",display:"flex", alignItems: "center", justifyContent: "center"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-lg-5">
                            <div className="card">
                                <div
                                    className="card-header  text-center"
                                    style={{ background: '#F8F9FA' }}
                                >
                                    <Link className='title-text' to="/">
                                        <span>
                                            {/* <img
                                            style={{
                                                width: '200px',
                                                height: '60px',
                                            }}
                                            src="images/SKU-Market-Logo.svg"
                                            alt="logo"
                                            height="22"
                                        /> */}
                                            <h4 className='title-text' > RISHA</h4>
                                        </span>
                                    </Link>
                                </div>

                                <div className="card-body ">
                                    <div className="text-center w-85     m-auto">
                                        <h4 className="text-dark-50 text-center mt-0 fw-bold">
                                           
                                           Verify your email
                                        </h4>
                                        <p className="text-muted" style={{ marginTop: "-5px" }}>
                                        Please use the OTP below to login to your account.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit(onSubmit)}>

                                        <div className="mb-2 text-left">
                                            <input
                                           
                                                className="form-control "
                                                style={{padding:"10px"}}
                                                type="text"
                                                id="displayName"
                                                placeholder="Type your OTP received in your email"
                                                {...register('confirmationToken', {
                                                    required:
                                                        'OTP is required',
                                                })}
                                            />
                                        </div>

                                        <Box className="text-center" mt={2}>
                                            <button
                                                className="authButton"
                                                type="submit"

                                            >
                                                {loading ? (
                                                    <CircularProgress sx={{ height: "5px", width: "5px" }} />
                                                ) :
                                                    'Submit'
                                                }

                                            </button>
                                        </Box>
                                    </form>
                                </div>
                            </div>

                            <div className="row mt-0">
                                <div className="col-12 text-center">
                                    <p className="text-muted m-1">
                                       Back on SignUp{' '}
                                        <Link
                                            to="/signUp"
                                            className="text-muted ms-1"
                                        >
                                            <b>SignUp</b>
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            {
                                error && (
                                    <Alert severity="error">
                                        <AlertTitle>
                                            <Typography pt={0.50} variant="body2" gutterBottom>
                                                <strong>Check</strong> - {error ? error : ''}
                                            </Typography>
                                        </AlertTitle>
                                    </Alert>
                                )
                            }

                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                    Email Verify Successfully
                                </Alert>
                            </Snackbar>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SingUpEmailChecker
