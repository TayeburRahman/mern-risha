import { Box, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ManageProject() {

    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:6060/api/v1/project/get')
            .then((response) => {
                setProject(response.data);
            });
    }, []);
 

    return (
        <div>
             <Paper elevation={0} >
                <div>
                <Box sx={{ minHeight: "400px", padding: '10px 0px 10px 10px' }}>
                        <Grid container spacing={2} sx={{ justifyContent: 'space-around', alignContent: "center" }}>
                            {
                                project?.map((data, idx) => (
                                    <Grid key={idx} item xs={6} md={6} lg={6} sx={{ padding: 1 }}>
                                        <Link to={`/dashboard/manage_project/${data._id}`} className="dashboard-stat dp-grid hover_box">
                                            <Box className='dp-flex justifyContent'>
                                                <Box p={2}>
                                                    <h6 className="number text-13 text-left" style={{paddingBottom:"5px",fontWeight:"500"}}>Main Category: {data?.category}</h6>
                                                    <h6 className="number text-13 text-left" style={{paddingBottom:"5px"}}>Main Sub Category: {data?.subcategory}</h6>
                                                    <h6 className="number text-13 text-left" style={{paddingBottom:"5px", fontWeight:"500"}}>Company Category: {data?.company_cate}</h6>
                                                    <h6 className="number text-13 text-left" style={{paddingBottom:"5px"}}>Company Sub Category: {data?.com_sub_cate}</h6>
                                                </Box>
                                                <Box className='dp-grid text-left'>
                                                     
                                                    <p className="name text-13" style={{paddingBottom:"10px"}}>Project Name: {data?.project_name}</p>
                                                    <p className="name text-13">User Email: {data?.user_email}</p>
                                                </Box>
                                            </Box>
                                        </Link>
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </Box>
                </div>
            </Paper>
        </div>
    )
}

export default ManageProject
