import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function UserProject() {

    const currentId = useParams()
    const [project, setProject] = useState();
    const [inputData, setInputData] = useState();
    const [company_cate, setCompany_cate] = useState();
    const [com_sub_cate, setCom_sub_cate] = useState();
    const [category, setCategory] = useState();
    const [subcategory, setSubcategory] = useState();
    const [saveContent, setSaveContent] = useState();


    useEffect(() => {
        axios.get(`https://server1.rishati.com/api/v1/project/single/${currentId.id}`)
            .then((res) => {
                setProject(res?.data);
                setCategory(res?.data?.category)
                setSubcategory(res?.data?.subcategory)
                setCompany_cate(res?.data?.company_cate)
                setCom_sub_cate(res?.data?.com_sub_cate)

            });
    }, []);

    console.log(saveContent)

    useEffect(() => { 
            axios.put(`http://localhost:5000/api/v1/subcategory/get/input`,{
                category,
                company_cate,
                com_sub_cate,
                subcategory
           })
               .then((response) => {
                   setInputData(response.data.input);
               }); 
 
    }, [ category, company_cate, com_sub_cate, subcategory]);


    useEffect(() => { 
        axios.get(`http://localhost:5000/api/v1/content/get/savecontent/${project?._id}/${project?.user_email}`)
           .then((response) => {
            setSaveContent(response.data );
           }); 

}, [ project]);


     


    return (
        <div>
            <Paper elevation={0} className='paper100'>
                <Typography p={5} pb={0} className="  text-18"> Project Details: </Typography>
                <Grid container>
                    <Grid item sx={12} md={12} lg={6}>
                        <Box p={5} pb={2}>
                            <h6 className="number text-16 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Main Category: {project?.category}</h6>
                            <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Main Sub Category: {project?.subcategory}</h6>
                            <h6 className="number text-16 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Company Category: {project?.company_cate}</h6>
                            <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Company Sub Category: {project?.com_sub_cate}</h6>
                        </Box>
                    </Grid>
                    
                    <Grid item sx={12} md={12} lg={6}>
                        <Box className='text-left' p={5} pt={5}>
                            {inputData?.map((data, idx) => (<Box>
                                <Typography className='text-15'>Qu. <span className='span-15'> {data?.inputData} </span>  </Typography>
                                <Typography className='text-15'>Ans. <span className='span-15'> {project?.input_form?.[idx]} </span>  </Typography>
                            </Box>))}
                        </Box>
                    </Grid> 
                </Grid>
                <Grid>

                </Grid>




            </Paper>
        </div>
    )
}

export default UserProject
