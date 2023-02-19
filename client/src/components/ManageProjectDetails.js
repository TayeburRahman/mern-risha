import { Box, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ManageProjectDetails() {

    const currentId = useParams()
    const [project, setProject] = useState();
    const [inputData, setInputData] = useState();
 

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/project/single/${currentId.id}`)
            .then((res) => {
                setProject(res?.data);

            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:6060/api/v1/subcategory/get/input/${project?.category}/${project?.subcategory}/${project?.company_cate}/${project?.com_sub_cate}`)
            .then((response) => {
                setInputData(response.data.input);
            });
    }, [project]);



    return (
        <div>
            <Paper elevation={0} className='paper100'>
                <Typography p={5} pb={0} className="  text-18"> Project Details: </Typography>
                <Box p={5} pb={2}>
                    <h6 className="number text-16 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Main Category: {project?.category}</h6>
                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Main Sub Category: {project?.subcategory}</h6>
                    <h6 className="number text-16 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>Company Category: {project?.company_cate}</h6>
                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>Company Sub Category: {project?.com_sub_cate}</h6>
                </Box>

                <Box p={5} pb={2} pt={2}>
                    <h6 className="number text-16 text-left" style={{ paddingBottom: "5px", fontWeight: "500" }}>USER ID: {project?.user?.userID}</h6>
                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>User Name: {project?.user?.displayName}</h6> 
                    <h6 className="number text-13 text-left" style={{ paddingBottom: "5px" }}>User email: {project?.user?.email}</h6>
                </Box>


                 <Box className='text-left' p={5} pt={2}>
                 {inputData?.map((data, idx) => (<Box>
                    <Typography className='text-15'>Qu. <span  className='span-15'> {data?.inputData} </span>  </Typography>
                    <Typography className='text-15'>Ans. <span className='span-15'> {project?.input_form?.[idx]} </span>  </Typography>
                </Box>))}
                 </Box>
            </Paper>
        </div>
    )
}

export default ManageProjectDetails
