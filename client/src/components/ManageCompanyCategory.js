import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { default as React, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function ManageCompanyCategory({categoryDetails,subCategory,setState,state}) {

    const { register, handleSubmit,reset } = useForm();
    const [coCategory, setCoCategory] = useState([])

    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/subcategory/get/${categoryDetails?.tittle}/${subCategory?.tittle}`)
            .then((response) => {
                setCoCategory(response.data);
            });
    }, [subCategory, categoryDetails, state]);



    const onDelete = async (id) => {   
    

        axios.delete(` https://server1.rishati.com/api/v1/subcategory/company/category/delete/${id}`)   
          .then(res =>{ 
             if(res.status === 200){ 
                alert('successfully delete company category')
                setState(state? false: true)
             }  
          }).catch((err) => { 
            
          })
    }
 


    return (
        <Fragment>
              {
                coCategory?.length ?(
                    <Box p={1} >
             <Box className="routing-button"  mb={2} >
                <Typography className='' p={1} sx={{color:"white"}}>COMPANY CATEGORY FOR PROJECT</Typography> 
            </Box>
            <Box p={1} sx={{borderBottom:"1px solid #bfbfbf", borderTop:"1px solid #bfbfbf", display:"flex"}}> 
                       {
                        coCategory?.map((item, idx) => {
                            return ( 
                                    <Box p={1} style={{display:"flex", background:"#ebebeb", width:"auto", maxWidth:"auto",borderRadius: "10px", margin:"3px"}}>
                                    
                                    <p key={idx} style={{margin:"0"}}>{item?.company_cate}</p> <Button sx={{minWidth: "auto", padding:"0"}} onClick={(e) => onDelete(item?._id)}> <DeleteOutlineIcon style={{color:'#eb9090'}} /> </Button>
                                 </Box> 
                            )
                        })
                       }
                  
            </Box>
             </Box>
                ):''
              }

        </Fragment>
    )
}

export default ManageCompanyCategory
