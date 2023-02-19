import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { default as React, Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function AddProjectSubCategory({categoryDetails,subCategory,setState,state}) {

    const { register, handleSubmit } = useForm();
    const [coCategory, setCoCategory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/subcategory/get/${categoryDetails?.tittle}/${subCategory?.tittle}`)
            .then((response) => {
                setCoCategory(response.data);
            });
    }, [subCategory, categoryDetails, state]);



    const onSubmit = async (data) => {   
        let sub_cate = data?.inputData  
        let id = data?.inputType 

        axios.post(`http://localhost:6060/api/v1/subcategory/company-c/sub`,  
        { 
            id,
            sub_cate, 
        })
          .then(res =>{ 
             if(res.status === 200){ 
                alert('successfully add new project sub category')
                setState(state? false: true)
             }  
          }).catch((err) => { 
            
          })
    }


    return (
        <Fragment>
             <Box p={1} >
             <Box className="routing-button"  mb={2} >
                <Typography className='' p={1}> ADD NEW SUB CATEGORY FOR PROJECT </Typography> 
            </Box>
            <Box>
                {coCategory.length? <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid' }}>
                <Typography className='text-left' variant="subtitle2"> Select Category:</Typography>
                <select className='input-selector' {...register("inputType")}>
                       {
                        coCategory?.map((item, idx) => {
                            return (
                                <option key={idx} value={item?._id}>{item?.company_cate}</option>
                            )
                        })
                       }
                  </select>
                  <Typography className='text-left' variant="subtitle2"> Wright new sub category :</Typography>                  
                    <input className='input-filed' {...register("inputData")} />
                    <input className='button-submit' type="submit" />
                </form>
                :
                <Typography>Add Fast Category</Typography>
                }
            </Box>
             </Box>

        </Fragment>
    )
}

export default AddProjectSubCategory
