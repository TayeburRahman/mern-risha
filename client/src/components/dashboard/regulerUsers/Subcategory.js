import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Button, Grid, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CirclesWithBar } from "react-loader-spinner"
import { Link, useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import './subcategory.css'

function Subcategory() {
    const [subCategory, setSubCategory] = useState()
    const [categoryDetails, setCategory] = useState()
    const [userProject, setUserProject] = useState()
    const [userProjectLength, setUserProjectLength] = useState()
    const [deleteState, setDeleteState] = useState(false);
    const [loaders, setLoaders] = useState(true);


    const path = useParams()
    const { pathname } = useLocation()
    let auth = JSON.parse(localStorage.getItem('auth'))
    let user = auth?.user

    const category = categoryDetails?.tittle
    const subcategory = subCategory?.tittle

    console.log(userProject)

    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/category/signal/${path?.categoryId}`)
            .then((res) => {
                setCategory(res?.data?.category);
                setSubCategory(res.data?.subcategory?.find((data, idx) => idx === Number(path?.index)));
            });
    }, [path]);

    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/project/user/category/${category}/${subcategory}/${user?.email}`)
            .then((res) => {
                setUserProject(res?.data);
                setUserProjectLength(res?.data?.length);
                setLoaders(false)

            });
    }, [path, subCategory, deleteState]);



    const handleDelete = (id) => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "Do you want to delete !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(` https://server1.rishati.com/api/v1/project/user/delete/${id}`)
                    .then((response) => {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Content has been deleted.',
                            'success'
                        )
                        setDeleteState(deleteState === true ? false : true)
                    });

            }
        })

    }


    return (
        <div>
            <Paper elevation={0}>
                <div className="container-fluid" style={{ padding: "7px", paddingLeft: "20px", paddingTop: "15px" }}>
                    <div className="page-title-div">
                        <h5 className="title text-left" style={{ padding: "0px" }}>
                            {categoryDetails?.tittle} -  {subCategory?.tittle}
                        </h5>
                    </div>
                </div>
            </Paper>
            <Paper elevation={0} className='paper100'>
                <div>
                    <Grid container mt={2} spacing={2} p={2}>
                        <Grid item sx={12} md={8} lg={9}>
                            <h4 className="title text-left" style={{ padding: "0px" }}>
                                {subCategory?.tittle}
                            </h4>
                            <p className="title text-left" style={{ padding: "0px" }}>
                                {subCategory?.description}
                            </p>
                        </Grid>

                        <Grid item sx={12} md={3} lg={3}>
                             
                                    <Link to={`${pathname}/create_project`} className="button-41" >
                                        Create New Project
                                    </Link> 
                        </Grid>
                    </Grid>

                    {
                        loaders && !userProjectLength ? (
                            <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                                <CirclesWithBar
                                    height="100"
                                    width="100"
                                    color="#4fa94d"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    outerCircleColor=""
                                    innerCircleColor=""
                                    barColor=""
                                    ariaLabel='circles-with-bar-loading'
                                />
                            </Box>
                        ) : (

                            <Box p={2}>
                                {userProjectLength ? (
                                    <Grid container spacing={2} sx={{ justifyContent: 'space-around', alignContent: "center" }}>
                                        {
                                            userProject?.map((data, idx) => (
                                                <Grid key={idx} item xs={6} md={6} lg={6} sx={{ padding: 1 }}>

                                                    <Box className="dashboard-stat dp-grid hover_box">
                                                        <Link to={`/dashboard/content_generate/${data._id}`} style={{ textDecoration: "none" }} >
                                                            <Box className='dp-flex justifyContent'>
                                                                <Box p={2}>
                                                                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Main Category: {data?.category}</h6>
                                                                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Main Sub Category: {data?.subcategory}</h6>
                                                                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Company Category: {data?.company_cate}</h6>
                                                                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Company Sub Category: {data?.com_sub_cate}</h6>
                                                                </Box>
                                                                <Box className='dp-grid text-left'>

                                                                    <p className="name text-13" style={{ paddingBottom: "10px" }}>Project Name: {data?.project_name}</p>
                                                                    <p className="name text-13">User Email: {data?.user_email}</p>
                                                                </Box>
                                                            </Box>
                                                        </Link>
                                                        <Box>
                                                            <Button sx={{ color: "red" }} onClick={e => handleDelete(data?._id)}> <DeleteOutlineIcon sx={{ fontSize: "20px" }} /> Delete</Button>
                                                        </Box>
                                                    </Box>

                                                </Grid>

                                            ))
                                        }

                                    </Grid>
                                ) : (
                                    <Box className="box-shadow" p={5}>
                                        <Typography>Project not available</Typography>
                                    </Box>
                                )

                                }
                            </Box>
                        )
                    }



                </div>
            </Paper>
        </div>
    )
}

export default Subcategory



