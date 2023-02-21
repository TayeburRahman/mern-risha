import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddCategory from '../../modal/AddCategory';
import UpdateCategory from '../../modal/UpdateCategory';

function ManageCategory() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(false);
 
    const [category, setCategory] = useState()
    const [deleteState, setDeleteState] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateData, setUpdateData] = useState(); 



    useEffect(() => {
        axios.get(' http://localhost:5000/api/v1/category/all')
            .then((response) => {
                setCategory(response.data);
            });
    }, [state, deleteState]);

    const OnClickHandle = (data) => {
        setState(data);
    }

    const handleOpen = () => setOpen(true);

    const updateHandler = (data) => { 
        setUpdateData(data)
        setOpenUpdate(true) 
        setState(true? false: true)
    }

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
                axios.delete(` http://localhost:5000/api/v1/category/delete/${id}`)
                .then((response) => {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Content has been deleted.',
                        'success'
                      )
                      setDeleteState(deleteState === true? false: true)
                }); 

            }  
        })


     }

    return (
        <Fragment>
            <div className="main-page">
                <div className="container-fluid">
                    <div className="page-title-div">
                        <h2 className="title text-left">Manage Category</h2>
                    </div>
                </div>

                <Paper sx={{ maxWidth: "100%", margin: 'auto', overflow: 'hidden' }}>
                    <AppBar
                        position="static"
                        color="default"
                        elevation={0}
                        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                    >
                        <Toolbar>
                            <Grid container spacing={2} alignItems="center">
                                <Grid mt={2} item>
                                    <p style={{ fontWeight: "bold" }}>Category</p>
                                </Grid>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleOpen} variant="contained" sx={{ m: 1, }}>
                                        Add New Category
                                    </Button>
                                    <Tooltip title="Reload">
                                        <IconButton onClick={(e) => OnClickHandle(state ? false : true)}>
                                            <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <Box sx={{ minHeight: "400px", padding: '10px 0px 10px 10px' }}>
                        <Grid container spacing={2} sx={{ justifyContent: 'space-around', alignContent: "center" }}>
                            {
                                category?.map((data, idx) => (
                                    <Grid key={idx} item xs={6} md={6} lg={6} sx={{ padding: 2 }}>
                                        <Box className="dashboard-stat dp-grid box-style-d">
                                            <Link to={`/dashboard/manage_category/${data._id}`} className="link-d">
                                                <Box className='dp-flex justifyContent'>
                                                    <Box p={2}>
                                                        <img className='fontSize-25' src={` http://localhost:5000/${data?.avatar}`} width="50px" height="50px" />
                                                    </Box>
                                                    <Box className='dp-grid text-left' >
                                                        <h6 className="number counter">{data?.tittle}</h6>
                                                        <p className="name text-13">{data?.description}</p>
                                                    </Box>
                                                </Box>
                                            </Link>
                                            <Box className='text-left dp-flex justifyContent' mt={1} >
                                                <Button m={2} sx={{ color: "red" }} onClick={e => handleDelete(data?._id)}> <DeleteOutlineIcon sx={{ fontSize: "20px" }} /> Delete </Button>
                                                <Button onClick={e => updateHandler(data)} m={2} sx={{ color: "#e3ac06" }}><ArrowCircleUpIcon /> Update </Button>
                                                <UpdateCategory openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} updateData={updateData} state={state} setState={setState} />
                                            </Box>
                                        </Box> 
                                    </Grid> 
                                ))
                            }

                        </Grid>
                    </Box>
                </Paper>
            </div>
            <AddCategory open={open} setOpen={setOpen} />
        </Fragment>
    )
}

export default ManageCategory

