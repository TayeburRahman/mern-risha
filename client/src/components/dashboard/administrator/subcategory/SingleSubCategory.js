import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AppBar, Button, Grid, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddProjectCategory from '../../../AddProjectCategory';
import AddProjectInput from '../../../AddProjectInput';
import AddProjectSubCategory from '../../../AddProjectSubCategory';
import ManageCompanyCategory from '../../../ManageCompanyCategory';
import UpdateInput from '../../../modal/UpdateInput';
import './subcategory.css';

function SingleSubCategory() {

    const [subCategory, setSubCategory] = useState()
    const [categoryDetails, setCategory] = useState()
    const [inputData, setInputData] = useState()
    const [state, setState] = useState(false)
    const [displayCategory, setDisplayCategory] = useState(true)
    const [displaySubCategory, setDisplaySubCategory] = useState(false)
    const [displayInput, setDisplayInput] = useState(false)
    const [inputId, setInputId] = useState( )
    const [inputSingleData, setInputSingleData] = useState( )
    const [open, setOpen] = useState(false);
    const path = useParams()


    const category = categoryDetails?.tittle
    const subcategory = subCategory?.tittle

    useEffect(() => {
        axios.get(` http://localhost:5000/api/v1/category/signal/${path?.categoryId}`)
            .then((res) => {
                setCategory(res?.data?.category);
                setSubCategory(res.data?.subcategory?.find((data, idx) => idx === Number(path?.index)));
            });
    }, [path]);

    useEffect(() => {
        axios.get(` http://localhost:5000/api/v1/subcategory/get/input/${category}/${subcategory}`)
            .then((response) => {
                setInputData(response.data);
            });
    }, [subCategory, categoryDetails, state, path]);


    const handleButtonCategory = () => {
        setDisplayCategory(true)
        setDisplaySubCategory(false)
        setDisplayInput(false)
    }

    const handleButtonInput = () => {
        setDisplayCategory(false)
        setDisplaySubCategory(false)
        setDisplayInput(true)
    }

    const handleButtonSubCategory = () => {
        setDisplayCategory(false)
        setDisplaySubCategory(true)
        setDisplayInput(false)
    }

    const onDelete = async (id) => { 
        axios.delete(` http://localhost:5000/api/v1/subcategory/input/delete/${id}`)
            .then(res => {
                if (res.status === 200) {
                    alert('successfully delete company category')
                    setState(state ? false : true)
                }
            }).catch((err) => {

            })
    }

    const onDeleteInput = async (id, inputData) => { 
 
        axios.put(` http://localhost:5000/api/v1/subcategory/single/input/delete/${id}`,{
            inputData
        })
            .then(res => {
                if (res.status === 200) {
                    alert('successfully delete company Input')
                    setState(state ? false : true)
                }
            }).catch((err) => {

            })
    }

    const onUpdateInput= (id, inputData)=>{
        setInputId(id)
        setInputSingleData(inputData)
        setOpen(true)
    }



    return (
        <div>
            <div className="container-fluid">
                <div className="page-title-div">
                    <h2 className="title text-left">
                        Manage {subCategory?.tittle}
                    </h2>
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
                                <p style={{ fontWeight: "bold" }} >Category/{categoryDetails?.tittle}/{subCategory?.tittle}</p>
                            </Grid>

                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className="paper-button" sx={{ minHeight: "400px", padding: '10px 0px 10px 10px' }}>
                    <Grid container spacing={2}>
                        <Grid className='text-left' item xs={6} md={6} lg={6}>

                            <Box>
                                <Typography pl={2} pt={1} pb={1} variant="h6" >{subCategory?.tittle}</Typography>
                                <Typography pl={2} variant="body2" >{subCategory?.description}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6} lg={6} >
                            <Box className="paper-button">
                                <Box className="box-nested" p={1}>
                                    <Box className="box-link">  <Button onClick={handleButtonCategory} className='link-sub-cate-nested'>CATEGORY </Button></Box>
                                    <Box className="box-link">  <Button onClick={handleButtonInput} className='link-sub-cate-nested'>INPUT</Button></Box>
                                    <Box className="box-link">  <Button onClick={handleButtonSubCategory} className='link-sub-cate-nested'>SUB CATE(OP)</Button></Box>
                                </Box>
                                <Box className={displayCategory ? "" : "display-blok"}>
                                    <AddProjectCategory categoryDetails={categoryDetails} subCategory={subCategory} setState={setState} state={state} />
                                </Box>

                                <Box className={displaySubCategory ? "" : "display-blok"}>
                                    <AddProjectSubCategory categoryDetails={categoryDetails} subCategory={subCategory} setState={setState} state={state} />
                                </Box>
                                <Box className={displayInput ? "" : "display-blok"}>
                                    <AddProjectInput categoryDetails={categoryDetails} subCategory={subCategory} setState={setState} state={state} />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <ManageCompanyCategory categoryDetails={categoryDetails} subCategory={subCategory} setState={setState} state={state} />
                    </Box>
                    <Box>
                        {/* <ManageCompanySubCategory categoryDetails={categoryDetails} subCategory={subCategory} setState={setState} state={state} /> */}
                    </Box>
                    <Box>
                        {inputData?.length ? (
                            <Typography className='text-left' pl={2} pt={4} variant="h6" > From Input filed Qu: </Typography>
                        ) : ''}
                        <Grid container >
                            {inputData?.map(({ category, com_sub_cate, company_cate, subcategory, input, _id }, idx) => (

                                <Grid item key={idx} pb={2} className='text-left' xs={6} md={6} lg={6}>
                                    <Box className="flex">
                                        <Box>
                                            <Typography pl={2} pt={1} variant="subtitle2" >Company Category: {company_cate}</Typography>
                                            {com_sub_cate ? (<Typography pl={2} pt={1} variant="subtitle2" >Company Sub Category: {com_sub_cate}</Typography>) : ''}
                                        </Box>

                                        <Box className="flex"> 
                                                    <Button sx={{ minWidth: "auto", padding: "1px" }} onClick={(e) => onDelete(_id)}> <DeleteOutlineIcon style={{ color: '#eb9090' }} /> </Button>
                                                </Box>

                                    </Box>
                                    {
                                        input?.map(({inputData, inputType}, idx) => (
                                            <Box key={idx} className="flex">
                                                <Box>
                                                    <Typography pl={2} pt={1} variant="body2" >* {inputData} </Typography>
                                                    <Typography pl={2} pt={1} variant="caption" > Type: {inputType}</Typography>
                                                </Box>
                                                <Box className="flex">
                                                    <Button sx={{ minWidth: "auto", margin:'4px',padding: "1px" }} onClick={(e) => onDeleteInput(_id, inputData)}> <DeleteOutlineIcon style={{ color: '#eb9090' }} /> </Button>

                                                    <Button sx={{ minWidth: "auto", padding: "1px" }} onClick={(e) => onUpdateInput(_id,inputData)}> <BorderColorIcon style={{fontSize:"20px" ,color: 'rgb(122 193 170)' }} /> </Button>
                                                    <UpdateInput inputId={inputId} inputSingleData={inputSingleData} open={open} setOpen={setOpen} setState={setState} />
                                                </Box>
                                            </Box>
                                        ))
                                    }
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </div>
    )
}

export default SingleSubCategory;
