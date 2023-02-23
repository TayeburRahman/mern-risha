import { Alert, Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { default as React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function CreateProjectStep1({ category, subcategory, setSelectSubCategory, setSelectCategory, setProjectName, errors }) {

    const [coCategory, setCoCategory] = useState([])
    const [coSubCategory, setCoSubCategory] = useState([])   
    const path = useParams()

    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/subcategory/get/${category}/${subcategory}`)
            .then((response) => {
                setCoCategory(response.data);
            });
    }, [subcategory, category, path]);


    const handleChange = (event) => {
        const company_cate = event.target.value
        setSelectCategory(company_cate)
        axios.get(` https://server1.rishati.com/api/v1/subcategory/company-sub/${category}/${subcategory}/${company_cate}`,
            {
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

    const handleProjectName = (event) => {
        const project_name = event.target.value
        setProjectName(project_name)
    }


    return (
        <div>

            <Box pt={5} pb={3} height={400}>


                <Typography pt={2} className='text-left' pl={1} variant='h6'>Let's start with name & category for your project </Typography>
                <Box className='text-left' sx={{ display: "flex" }}>
                    <Box>
                        <Typography pt={2} className='text-left' pl={1} variant='subtitle2'>Select Your Company Category * </Typography>
                        <FormControl className='text-left' sx={{ m: 1, minWidth: 300 }} size="small">
                            <InputLabel id="demo-select-small">Main Category</InputLabel>
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
                    </Box>
                    {
                        coSubCategory?.length ?
                        (
                            <Box>
                            <Typography pt={2} className='text-left' pl={1} variant='subtitle2'>Select Your Company Sub Category (optional) </Typography>
                            <FormControl sx={{ m: 1, minWidth: 300, borderRadius: "1px" }} size="small">
    
                                <InputLabel id="demo-select-small"> Sub Category</InputLabel>
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
                        </Box>
                        ):''
                    }
                    
                </Box>

                <Box p={1} pt={5} width={600}>
                    <Typography pt={2} className='text-left' pb={1} pl={1} variant='subtitle2'> Enter Your Project Name * </Typography>
                    <TextField onChange={handleProjectName} fullWidth label="Your Company Name" id="fullWidth" />

                    <Box mt={3}>{errors && <Alert severity="error">{errors}</Alert>}</Box>
                </Box>
            </Box>

        </div>
    )
}

export default CreateProjectStep1
