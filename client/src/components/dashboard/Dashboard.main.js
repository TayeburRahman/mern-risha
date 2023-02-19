import { Box, Grid } from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dmain.css';


const backgroundColor = [ 
    '#D291BC','#d98b56', '#7C9D8E','#BAB86C',
    '#8B8000',
    '#3F000F',
    '#3D3635',
    '#AF9B60',
    '#F8B88B',
    '#F778A1', 
    '#4E5180',
    '#736AFF',
    '#B8860B',
    '#5453A6',
    '#9ACD32',
    '#54C571',
    '#004225',
    '#7C9D8E',
    '#9ACD32',  



]

const DashboardMain = () => {
    const [category, setCategory] = React.useState()

    useEffect(() => {
        axios.get('http://localhost:6060/api/v1/category/all')
            .then((response) => {
                setCategory(response.data);
            });
    }, []);

    console.log('Dashboard', backgroundColor[1])
    return (
        <Fragment>
            <div className="main-page">
                <div className="container-fluid">
                    <div className="page-title-div">
                        <h2 className="title text-left">Dashboard</h2>
                    </div>
                </div>
                <section className="section">
                    <div className="container-fluid">
                        <Grid container spacing={2}>

                            {
                                category?.map((data, idx) => (
                                    <Grid item xs={6} md={4} lg={3} sx={{ padding: 2 }} >

                                        <Box className="dashboard-stat dp-grid dashboard_main_regd"
                                        sx={{backgroundColor:`${backgroundColor[idx]}`, color:"white"}}
                                        // to={`/dashboard/manage_category/${data._id}`}
                                        >
                                            <Box className='dp-flex justifyContent'>
                                                <Box>
                                                    <img className='fontSize-25' src={`http://localhost:6060/${data?.avatar}`} width="50px" height="50px" />
                                                </Box>
                                                <Box className='dp-grid text-left'>
                                                    <span className=" " style={{color:"white"}}>{data?.subCategory?.length ? data?.subCategory?.length : 0}</span>
                                                    <span className="name">{data?.tittle}</span>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))
                            }



                        </Grid>

                    </div>
                </section>


                {
                    category && category?.map(({ tittle, subCategory, _id }) => (
                        <Box>
                            <div className="container-fluid" style={{ paddingTop: "20px" }}>
                                <div className="page-title-div">
                                    <h4 className="title text-left">{tittle}</h4>
                                </div>
                            </div>

                            <section className="section">
                                <div className="container-fluid">
                                    <Grid container >
                                        {
                                            subCategory && subCategory?.map(({ tittle, description, avatar }, idx) => (
                                                <Grid item xs={6} md={6} lg={4} sx={{ padding: "7px" }} >
                                                    <Link className="dashboard-stat dp-grid box-style-d" to={`sub_category/${_id}/${idx}`}>
                                                        <Box className='dp-flex justifyContent'>
                                                            <Box style={{ width: "20%" }}>
                                                                <img src={`http://localhost:6060/${avatar}`} width="50%" />
                                                            </Box>
                                                            <Box className='dp-grid text-left' style={{ width: "80%" }}>
                                                                <span className="number counter">{tittle}</span>
                                                                <p className="text-13">{description.slice(0, 100)}..</p>
                                                            </Box>
                                                        </Box>
                                                    </Link>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>

                                </div>
                            </section>
                        </Box>
                    ))
                }






            </div>


        </Fragment>
    );
};

export default DashboardMain;