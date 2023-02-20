import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserEdit from '../../modal/UserEdit';
import './UserProfile.css';

function UserProfile() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState()
    const [project, setProject] = useState()

    const auth = useSelector(state => state?.auth);

    useEffect(() => {
        let email = auth?.user?.email
        axios.get(`http://localhost:6060/api/v1/users/single/${email}`)
            .then((res) => {
                setUser(res?.data);
            });
    }, [auth]);

    useEffect(() => {
        let email = auth?.user?.email
        axios.get(`http://localhost:6060/api/v1/project/user/${email}`)
            .then((res) => {
                setProject(res?.data);
            });
    }, [user]);

    console.log('Project', project?.length)


    const handleOnOpen = () => {
        setOpen(true)
    }

    return (
        <div>
            <Paper elevation={0} className='paper100' >
                <Box>
                    <h1>User Profile</h1>
                </Box>
                <Grid container mt={3}>
                    <Grid item lg={6} md={8} sm={12} className="box_main_info">
                        <Grid className='profile_box'>
                            <h6 className='Information'>Profile Information</h6>
                            <Button onClick={handleOnOpen}><EditIcon className='icon_edit' /></Button>
                            <UserEdit user={user} open={open} setOpen={setOpen} />
                        </Grid>
                        <Grid mt={3} mb={3}>
                            <p className='user_info text-left'> {user?.info ? user?.info : "Local User Profiles. A local user profile is created the first time that a user logs on to a this site"} </p>
                        </Grid>
                        <Grid mt={3} mb={3}>
                            <p className='info_tittle text-left padding-b'> ID: <span className='info_span'>{user?.userID}</span>  </p>
                            <p className='info_tittle text-left padding-b'>  Full Name: <span className='info_span'>{user?.fastname} {user?.lastname}</span>  </p>
                            <p className='info_tittle text-left padding-b'>  username: <span className='info_span'>{user?.username}</span>  </p>
                            <p className='info_tittle text-left padding-b'>  Email: <span className='info_span'>{user?.email}</span>  </p>
                            <p className='info_tittle text-left padding-b'> Family Name: <span className='info_span'>{user?.familyName}</span>  </p>
                            <p className='info_tittle text-left padding-b'> Status: <span className='info_span'>{user?.status}</span>  </p>

                            <p className='info_tittle text-left padding-b'> C.A. Date: <span className='info_span'>{user?.createdAt?.slice(0, 10)}</span>  </p>

                        </Grid>
                    </Grid>


                </Grid>

                <Box>
                    <Box container p={3}>
                        <h6 className='Information text-left'>Project</h6>

                        {
                            project?.length ? (
                                <Grid container mt={3}>
                                    {project?.map(({ category, subcategory, company_cate, project_name, input_form }, idx) => (
                                        <Grid item lg={6} md={6} sm={12} className="box_main_info box-shadow">
                                            <Box className='dp-flex justifyContent'>
                                              <Box className='text-left d-flex'>
                                                <Box pr={2}>
                                                <p className='info_tittle text-left padding-b'> Category: <span className='info_span'>{category}</span>  </p>
                                                <p className='info_tittle text-left padding-b'> Sub Category: <span className='info_span'>{subcategory}</span>  </p> 
                                                </Box>
                                               <Box>
                                               <p className='info_tittle text-left padding-b'> Company Category: <span className='info_span'>{company_cate}</span>  </p> 
                                                <p className='info_tittle text-left padding-b'> Project Name: <span className='info_span'>{project_name}</span>  </p>  
                                               </Box>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Box className='dp-flex justifyContent box-shadow'>
                                    <span className=" " style={{ color: "white" }}>No Project</span>
                                </Box>
                            )
                        }
                    </Box>
                </Box>

            </Paper>
        </div>
    )
}

export default UserProfile
