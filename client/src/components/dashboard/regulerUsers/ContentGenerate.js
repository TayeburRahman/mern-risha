import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ContentGenerate() {
    const [content, setContent] = useState()
    const [project, setProject] = useState()
    const [category, setCategory] = useState()
    const [com_sub_cate, setSom_sub_cate] = useState()
    const [subcategory, setSubcategory] = useState()
    const [company_cate, setCompany_cate] = useState()
    const path = useParams()
    const [number, seNumber] = useState(0) 
    
 

    useEffect(() => {

        axios.get(`http://localhost:6060/api/v1/project/single/${path?.id}`)
            .then((res) => {
                setProject(res?.data);
                setCategory(res?.data?.category)
                setSom_sub_cate(res?.data?.com_sub_cate)
                setCategory(res?.data?.category)
                setSubcategory(res?.data?.subcategory)
                setCompany_cate(res?.data?.company_cate)
            });
    }, [path]);


    useEffect(() => {
        if (com_sub_cate) {
            axios.get(`http://localhost:6060/api/v1/content/get/filter2/${category}/${subcategory}/${company_cate}/${com_sub_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        } else {
            axios.get(`http://localhost:6060/api/v1/content/get/filter1/${category}/${subcategory}/${company_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        }
    }, [path, project]);
 

    const handleOneClick = (number) => {
        seNumber(number == content?.length ? 0 : number)
    }

    let contentSingle = content?.filter((data, idx) => idx === number); 

    return (
        <Paper elevation={0} className='paper100'>
            <Box className="" p={5}>
                <Typography className='text-left'>{category}/{subcategory}/{company_cate}{com_sub_cate ? "/" : ''} {com_sub_cate ? com_sub_cate : ''}</Typography>

                <Box mt={5} sx={{minHeight:"450px"}}>
                    {
                        content && contentSingle?.map(({ content, _id }) => (
                            <div
                                key={_id}
                                className='text-left typed'
                                dangerouslySetInnerHTML={{
                                    __html: content,
                                }}>
                            </div>
                        ))
                    }
                </Box>
                <Button className='text-left' onClick={e => { handleOneClick(number === 0 ? 1 : number + 1) }}><AutorenewIcon sx={{fontSize:"20px"}} /> Regenerate response</Button>
            </Box>
        </Paper>
    )
}

export default ContentGenerate
