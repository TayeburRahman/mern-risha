import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddSubCategory from '../../modal/AddSubCategory';
import UpdateSubcategory from '../../modal/UpdateSubcategory';

function ManageSubCategory() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState(false);
    const handleOpen = () => setOpen(true);
    const [categoryDetails, setCategory] = useState()
    const [subCategory, setSubCategory] = useState()
    const [deleteState, setDeleteState] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [updateData, setUpdateData] = useState();  

    const locationID = useParams()

    // console.log('subCategory', subCategory)

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/category/signal/${locationID.id}`)
            .then((res) => {
                setCategory(res?.data?.category);
                setSubCategory(res.data?.subcategory);
            });
    }, [state, deleteState]);

    const OnClickHandle = (data) => {
        setState(data);
    }

    const updateHandler = (data) => { 
        setUpdateData(data)
        setOpenUpdate(true) 
        setState(true? false: true)
    }

    const handleDelete = (tittle) => {  

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
                axios.delete(`http://localhost:6060/api/v1/category/subcategory/delete/${locationID?.id}/${tittle}`)
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
                        <h2 className="title text-left">Manage {categoryDetails?.tittle}</h2>
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
                                    <p style={{ fontWeight: "bold" }}>Category/{categoryDetails?.tittle}</p>
                                </Grid>
                                <Grid item xs>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleOpen} variant="contained" sx={{ m: 1, }}>
                                        Add {categoryDetails?.tittle} Sub Category
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
                        <Grid container spacing={2}>
                            {
                                subCategory?.map((data, idx) => (
                                    <Grid key={idx} item xs={6} md={6} lg={4} sx={{ padding: 2 }}>
                                        <Grid  className="dashboard-stat dp-grid box-style-d">
                                            <Link to={`/dashboard/manage_category/sub_category/${locationID.id}/${idx}`} className="link-d" >
                                                <Box className='dp-flex justifyContent'>
                                                    <Box p={2}>
                                                        <img className='fontSize-25' src={`http://localhost:6060/${data?.avatar}`} width="50px" height="50px" />
                                                    </Box>
                                                    <Box className='dp-grid text-left'>
                                                        <h6 className="number counter">{data?.tittle}</h6>
                                                        <p className="name text-13">{data?.description}</p>
                                                    </Box>
                                                </Box>
                                            </Link>
                                            <Box item sm={12} md={4} lg={4}>
                                                <Button m={2} sx={{ color: "red" }} onClick={e => handleDelete(data?.tittle)}> <DeleteOutlineIcon sx={{ fontSize: "20px" }} /> Delete</Button>
                                                <Button onClick={e => updateHandler(data)} m={2} sx={{ color: "#e3ac06" }}><ArrowCircleUpIcon /> Update</Button>
                                                <UpdateSubcategory openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} updateData={updateData} state={state} setState={setState} categoryDetails={categoryDetails} />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                ))
                            }

                        </Grid>
                    </Box>
                </Paper>
            </div>
            <AddSubCategory open={open} setOpen={setOpen} categoryDetails={categoryDetails} />
        </Fragment>
    )
}

export default ManageSubCategory
