import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { default as React, Fragment, useEffect, useState } from 'react';

function ManageCompanySubCategory({ categoryDetails, subCategory, setState, state }) {
 
    const [coCategory, setCoCategory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/subcategory/get/${categoryDetails?.tittle}/${subCategory?.tittle}`)
            .then((response) => {
                setCoCategory(response.data);
            });
    }, [subCategory, categoryDetails, state]);



    const onDelete = async (id, data) => { 
        axios.delete(`http://localhost:6060/api/v1/subcategory/company/sub/delete/${id}/${data}`)
            .then(res => {
                if (res.status === 200) {
                    alert('successfully delete company sub category')
                    setState(state ? false : true)
                }
            }).catch((err) => {

            })
    } 



    return (
        <Fragment>
            {
                coCategory?.length ? (
                    <Box p={1} >
                        <Box className="routing-button" mb={2} >
                            <Typography className='' p={1} sx={{ color: "white" }}> COMPANY SUB CATEGORY FOR PROJECT </Typography>
                        </Box>
                        <Box p={1} >
                            {
                                coCategory?.map(({company_cate, com_sub_cate, _id}, idx) => {
                                    return (
                                        <Box sx={{ borderBottom: "1px solid #bfbfbf", borderTop: "1px solid #bfbfbf", display: "flex", margin:"2px"}}>
                                            <Box>
                                                <Typography variant='subtitle2'>{company_cate}:</Typography>
                                            </Box>

                                             {
                                                com_sub_cate?.map((data, idx)=>(
                                                    <Box p={1} style={{ display: "flex", background: "#ebebeb", width: "auto", maxWidth: "auto", borderRadius: "10px", margin: "3px" }}>

                                                <p key={idx} style={{ margin: "0" }}>{ data}</p> <Button sx={{ minWidth: "auto", padding: "0" }} onClick={(e) => onDelete( _id, data)}> <DeleteOutlineIcon style={{ color: '#eb9090' }} /> </Button>
                                            </Box>
                                                ))
                                             }

                                        </Box>

                                    )
                                })
                            }

                        </Box>
                    </Box>
                ) : ''
            }

        </Fragment>
    )
}

export default ManageCompanySubCategory
