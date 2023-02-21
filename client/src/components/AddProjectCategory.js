import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { default as React, Fragment } from 'react';
import { useForm } from 'react-hook-form';

function AddProjectCategory({categoryDetails,subCategory,setState, state}) {

    const { register, handleSubmit, reset} = useForm();

    const onSubmit = async (data) => { 

       let companyCategory = await data?.companyCategory  

        axios.post(` http://localhost:5000/api/v1/subcategory/company-c`,  
        {
            category: categoryDetails?.tittle,
            subcategory: subCategory?.tittle,
            companyCategory,
        })
          .then(res =>{ 
             if(res.status === 200){ 
                alert('successfully add new project category')
                reset();
                setState(state? false: true)
             }  
          }).catch((err) => { 
           const error = err?.response?.data?.message
            if(error){
                alert(error) 
            } 
          })
    }


    return (
        <Fragment>
            <Box p={1}>
            <Box className="routing-button" mb={2} >
                <Typography className='' p={1}> ADD NEW CATEGORY FOR PROJECT </Typography> 
            </Box>
            <Box>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid' }}> 
                  <Typography className='text-left' variant="subtitle2"> Wright new category for company:</Typography>
                    <input className='input-filed' {...register("companyCategory")} />
                    <input className='button-submit' type="submit" />
                </form>
            </Box>
            </Box>

        </Fragment>
    )
}

export default AddProjectCategory
