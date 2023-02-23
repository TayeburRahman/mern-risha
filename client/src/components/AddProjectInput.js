import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function AddProjectInput({ categoryDetails, subCategory, setState, state }) {

    const { register, handleSubmit, reset } = useForm();
    const [coCategory, setCoCategory] = useState([])
    const [coSubCategory, setCoSubCategory] = useState([])
    const [selectCategory, setSelectCategory] = useState('')
    const [selectSubCategory, setSelectSubCategory] = useState('')

    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/subcategory/get/${categoryDetails?.tittle}/${subCategory?.tittle}`)
            .then((response) => {
                setCoCategory(response.data);
                // setCoSubCategory(response.data.com_sub_cate)
            });
    }, [subCategory, categoryDetails, state]);

    const handleChange = (event) => {
        const company_cate = event.target.value
        const category = categoryDetails?.tittle
        const subcategory = subCategory?.tittle
        setSelectCategory(company_cate)
        axios.get(` https://server1.rishati.com/api/v1/subcategory/company-sub/${category}/${subcategory}/${company_cate}`, {
            company_cate,
            category,
            subcategory,
        })
            .then(res => {
                setCoSubCategory(res.data.company?.com_sub_cate)
            })
    }


    const handleChangeSub = (event) => {
        const company_sub_cate = event.target.value
        setSelectSubCategory(company_sub_cate)
    }



    const onSubmit = async (data) => {
        const company_cate = selectCategory
        const com_sub_cate = selectSubCategory
        const category = categoryDetails?.tittle
        const subcategory = subCategory?.tittle
        const input = data 
        
            axios.post(` https://server1.rishati.com/api/v1/subcategory/create/company-sub/input`,
            {
                company_cate,
                com_sub_cate,
                category,
                subcategory,
                input
            })
            .then(res => {
                if (res.status === 200) {
                    alert('successfully add new from input for sub category')
                    reset()
                    setState(state ? false : true)
                }
            })
        

        
    };


    return (
        <Box p={1}>
            <Box className="routing-button" mb={2} >
                <Typography className='' p={1}> ADD NEW INPUT FOR PROJECT SUB CATEGORY </Typography>
            </Box>
            {
                coCategory.length ?

                    <Box className=''>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                                <InputLabel id="demo-select-small">Select Category</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    // value={years}
                                    label="Company Category"
                                    onChange={handleChange}
                                    sx={{ borderRadius: '3px' }}
                                >

                                    {coCategory?.map((data, idx) => (
                                        <MenuItem key={idx} value={data.company_cate}>{data.company_cate}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            {
                                coSubCategory?.length ? (
                                    <FormControl sx={{ m: 1, minWidth: 200, borderRadius: "1px" }} size="small">
                                        <InputLabel id="demo-select-small">Select Sub Category</InputLabel>
                                        <Select
                                            labelId="demo-select-small"
                                            id="demo-select-small"
                                            // value={years}
                                            label="Company Category"
                                            sx={{ borderRadius: '3px' }}
                                            onChange={handleChangeSub}
                                        >
                                            {coSubCategory.map((data, index) => (
                                                <MenuItem key={index} value={data}>{data}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ):('')
                            }


                        </Box>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid' }}>

                            <Typography className='text-left' variant="subtitle2"> Select Type of input :</Typography>
                            <select className='input-selector' {...register("inputType")}>
                                <option value="text">Type of Text</option>
                                <option value="number">Type of Number</option>
                                <option value="date">Type of Date</option>
                            </select>

                            <Typography className='text-left' variant="subtitle2"> Wright input text:</Typography>
                            <input className='input-filed' {...register("inputData")} />
                            <input className='button-submit' type="submit" />
                        </form>
                    </Box>
                    :
                    <Typography>Add Fast Category and Sub Category </Typography>

            }

        </Box>
    )
}

export default AddProjectInput
