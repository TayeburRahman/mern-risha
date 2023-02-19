import { Paper } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import HorizontalLinearStepper from '../administrator/subcategory/TabStep'

function CreateProject() {
    const [subCategory, setSubCategory] = useState()
    const [categoryDetails, setCategory] = useState()
    const path = useParams()
    const {pathname} = useLocation() 

    const category = categoryDetails?.tittle
    const subcategory = subCategory?.tittle 

    console.log('path',path)
    
    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/category/signal/${path?.categoryId}`)
            .then((res) => {
                setCategory(res?.data?.category);
                setSubCategory(res.data?.subcategory?.find((data, idx) => idx === Number(path?.index)));
            });
    }, [path]); 

    
 


    return (
        <div>
             <Paper elevation={0} className='paper100'>
                <div>
                     <HorizontalLinearStepper category={category} subcategory={subcategory} />
                </div>
            </Paper>
        </div>
    )
}

export default CreateProject
