import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CirclesWithBar } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import './projectstep.css';

function CreateProjectStep4({ company_cate, com_sub_cate, subcategory, category, projectName }) {

    const [projectdata, setProjectData] = useState()

    let auth = JSON.parse(localStorage.getItem('auth'))
    let user_email = auth?.user?.email 

    useEffect(() => {
        if(com_sub_cate){
            axios.get(` http://localhost:5000/api/v1/project/single/${category}/${subcategory}/${company_cate}/${com_sub_cate}/${user_email}`)
            .then((response) => {
                setProjectData(response.data);
            });
        }else{
            axios.get(` http://localhost:5000/api/v1/project/single/${category}/${subcategory}/${company_cate}/${user_email}`)
            .then((response) => {
                setProjectData(response.data);
            });
        }
    }, [projectName, category, subcategory, company_cate]);
 

    return (
        <div> 
                {projectdata?._id?(
                     <Box>
                     <Box p={5} pb={5}>
                     <Typography p={2} className=' text6' >  <spam className="spamText"> Project Create Successfully</spam></Typography>
                     <CheckCircleOutlineIcon style={{ fontSize: "60px", color: "#81c386" }} /> 
                     <Typography p={2} className=' text6' >Project Name: <spam className="spamText"> {projectName}</spam></Typography>
                 </Box> 
                 <Box style={{ display: "flex", justifyContent: "center" }}> 
                     <Link className='button-15' to={`/dashboard/content_generate/${projectdata?._id}`}>    Generate Content now <AutorenewIcon /> </Link> 
                 </Box>
     
                     </Box>

                ):(
                    <Box sx={{ display: "flex", textAlign: "center", justifyContent: "center" }}>
                    <CirclesWithBar
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        outerCircleColor=""
                        innerCircleColor=""
                        barColor=""
                        ariaLabel='circles-with-bar-loading'
                    />
                </Box>
                )}
           

             
        </div>
    )
}

export default CreateProjectStep4