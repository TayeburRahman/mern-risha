import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UpdateContent from '../../modal/UpdateContent';


function ManageContent() {
    const [isContent, setContent] = useState('');
    const [deleteState, setDeleteState] = useState(false);
    const [open, setOpen] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [state, setState] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/content/get/all`)
            .then((response) => {
                setContent(response?.data)
            });
    }, [deleteState, open]);

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
            axios.delete(`http://localhost:6060/api/v1/content/delete/${id}`)
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

   const updateHandler =(data)=>{
    setUpdateData(data)
    setOpen(true) 
    setState(true? false: true)
   }


    return (
        <div>
            <Paper sx={{ minHeight: "500px" }}>
                <Grid>
                <Grid p={5}>
                    {
                        isContent && isContent?.map((data,idx) => (
                            <Grid key={idx}>
                                <Grid container >
                                    <Grid container item sm={12} md={8} lg={8}   >
                                        <Box className="" pr={5}>
                                           <h5 className='text-left'>Category: {data?.category}</h5>
                                            <h5 className='text-left'>Sub Category: {data?.subcategory}</h5>
                                           </Box>
                                        
                                        <Box className="" >
                                            <h5>Company Category: {data?.company_cate}</h5>
                                            {data?.com_sub_cate ? <h5> Company Sub Category: {data?.com_sub_cate}</h5> : ''}
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} md={4} lg={4}>
                                        <Button m={2} sx={{color:"red"}} onClick={e => handleDelete(data?._id)}> <DeleteOutlineIcon sx={{fontSize:"20px"}}/> Delete</Button>
                                        <Button onClick={e => updateHandler(data)}  m={2} sx={{color:"#e3ac06"}}><ArrowCircleUpIcon/> Update</Button> 
                                        <UpdateContent open={open} updateData={updateData} setOpen={setOpen} state={state}  />
                                    </Grid>
                                </Grid>
                                <div
                                    className='text-left'
                                    dangerouslySetInnerHTML={{
                                        __html: data?.content,
                                    }}>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ManageContent
