import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Button, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
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
    const [editValue, setEditValue] = useState(false)
    const [value, setValue] = useState('');
    const [select, setSelect] = useState(false);

    let auth = JSON.parse(localStorage.getItem('auth')) 
    let user = auth?.user
    let userEmail = auth?.user?.email




    useEffect(() => {

        axios.get(` http://localhost:5000/api/v1/project/single/${path?.id}`)
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
            axios.get(` http://localhost:5000/api/v1/content/get/filter2/${category}/${subcategory}/${company_cate}/${com_sub_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        } else {
            axios.get(` http://localhost:5000/api/v1/content/get/filter1/${category}/${subcategory}/${company_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        }
    }, [path, project]);


    const handleOneClick = (number) => {
        setValue('')
        seNumber(number == content?.length ? 0 : number)
    }

    let contentSingle = content?.filter((data, idx) => idx === number);

    const handleEdit = () => {
        setEditValue(true)
    }

    const handleSave = () => {

        if(select){

            axios.post(` http://localhost:5000/api/v1/content/create/savecontent`,{
                project,
                content: value,
                userEmail,
                user 
            })
                .then(res => {
                    if (res.status === 200) { 
                        // setState(state ? false : true)
                    }
                }) 
            


             
        }
        setEditValue(false)
    }

    return (
        <Paper elevation={0} className='paper100'>
            <Box className="" p={5}>
                <Typography className='text-left'>{category}/{subcategory}/{company_cate}{com_sub_cate ? "/" : ''} {com_sub_cate ? com_sub_cate : ''}</Typography>

                <Box mt={5} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {
                        editValue ? (
                            <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="checkbox-signin"
                                    checked={select}
                                    onChange={() =>
                                        setSelect(!select)
                                    }
                                />
                                <label 
                                style={{margin: '5px'}}
                                    htmlFor="checkbox-signin"
                                >
                                    add your account
                                </label>
                                <Button className='text-left' onClick={handleSave}>  SAVE </Button>
                            </Box>
                        ) : (
                            <Button className='text-left' onClick={handleEdit}>  Edit </Button>
                        )
                    }
                </Box>

                {
                    !editValue && (
                        <Box style={{ display: 'grid' }}>
                            <Box mt={1} sx={{ minHeight: "400px" }}>
                                {
                                    content && contentSingle?.map(({ content, _id }) => (
                                        <div
                                            key={_id}
                                            className='text-left typed'
                                            dangerouslySetInnerHTML={{
                                                __html: value ? value : content,
                                            }}>
                                        </div>
                                    ))
                                }
                            </Box>
                            <Button className='text-left' onClick={e => { handleOneClick(number === 0 ? 1 : number + 1) }}><AutorenewIcon sx={{ fontSize: "20px" }} /> Regenerate response</Button>
                        </Box>
                    )
                }

                {
                    editValue && (

                        <Box mt={1} sx={{ minHeight: "400px" }}>
                            {
                                content && contentSingle?.map(({ content, _id }) => (
                                    <ReactQuill theme="snow" style={{ height: "400px" }} value={value ? value : content} onChange={setValue} />
                                ))
                            }
                        </Box>
                    )
                }
            </Box>
        </Paper>
    )
}

export default ContentGenerate
