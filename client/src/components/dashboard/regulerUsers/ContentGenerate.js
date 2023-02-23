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
    const [formData, setFromData] = useState();
    const [contentSingle, setContentSingle] = useState();
    const [clickState, setClickState] = useState(false);

     
     

    const [inputValue0, setInputValue0] = useState('')
    const [inputValue1, setInputValue1] = useState('')
    const [inputValue2, setInputValue2] = useState('')
    const [inputValue3, setInputValue3] = useState('')
    const [inputValue4, setInputValue4] = useState('')
    const [inputValue5, setInputValue5] = useState('')
    const [inputValue6, setInputValue6] = useState('')
    const [inputValue7, setInputValue7] = useState('')
    const [inputValue8, setInputValue8] = useState('')
    const [inputValueEnd, setInputValueEnd] = useState('')
 

    let auth = JSON.parse(localStorage.getItem('auth')) 
    let user = auth?.user
    let userEmail = auth?.user?.email




    useEffect(() => {
        axios.get(` https://server1.rishati.com/api/v1/project/single/${path?.id}`)
            .then((res) => {
                setProject(res?.data);
                setCategory(res?.data?.category)
                setSom_sub_cate(res?.data?.com_sub_cate)
                setCategory(res?.data?.category)
                setSubcategory(res?.data?.subcategory)
                setCompany_cate(res?.data?.company_cate) 
                setFromData(res?.data?.input_form)

            });
    }, [path]);


    useEffect(() => {
        if (com_sub_cate) {
            axios.get(` https://server1.rishati.com/api/v1/content/get/filter2/${category}/${subcategory}/${company_cate}/${com_sub_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        } else {
            axios.get(` https://server1.rishati.com/api/v1/content/get/filter1/${category}/${subcategory}/${company_cate}`)
                .then((res) => {
                    setContent(res?.data?.data);
                });
        }
    }, [path, project]);


    useEffect(() => {
        content?.filter((data, idx) => idx === number).map(({inputValue0, inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7,inputValue8, inputValueEnd}) => {
            setInputValue0(inputValue0)
            setInputValue1(inputValue1)
            setInputValue2(inputValue2)
            setInputValue3(inputValue3)
            setInputValue4(inputValue4)
            setInputValue5(inputValue5)
            setInputValue6(inputValue6)
            setInputValue7(inputValue7)
            setInputValue8(inputValue8)
            setInputValueEnd(inputValueEnd)
        });
    },[content, number, clickState])

    


    useEffect(() => {
        let html =  inputValue0 + " " + `<span>  ${formData?.[0]? formData?.[0]: ''}</span>` + " " + inputValue1 + " "+ `<span>${formData?.[1]? formData?.[1]:''}</span>` +" " + inputValue2 + " "+ `<span>${formData?.[2]? formData?.[2]: ''}</span>` +" " + inputValue3 + " "+ `<span> ${formData?.[3]? formData?.[3]:''} </span>` + " " +inputValue4 + " "+`<span>${formData?.[4]? formData?.[4]:''}</span>` +" " + inputValue5 + " "+ `<span>${ formData?.[5]? formData?.[5]:''}</span>` +" " + inputValue6 + " "+ `<p> ${formData?.[6]? formData?.[6]:''}</p>` +" "+ inputValue7 +" " + `<p>${formData?.[7]? formData?.[7]:''} </p>` +" " + inputValue8 + " "+ `${formData?.[8]? formData?.[8]:''}</p>` +" " + inputValueEnd 
       
        setContentSingle(html)
     
      },[inputValue0,inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8, inputValueEnd])


    const handleOneClick = (number) => {
        setClickState(false? true: false)
        setValue('')
        seNumber(number == content?.length ? 0 : number)
    }
 
    const handleEdit = () => {
        setEditValue(true)
    }

    const handleSave = () => {

        if(select){ 
            axios.post(` https://server1.rishati.com/api/v1/content/create/savecontent`,{
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

    console.log('project', number)

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
                              
                                        <div 
                                            className='text-left typed displayInline'  
                                            dangerouslySetInnerHTML={{
                                                __html: value ? value : contentSingle,
                                            }}>
                                        </div> 
                            </Box>
                            <Button className='text-left' onClick={e => { handleOneClick(number === 0 ? 1 : number + 1) }}><AutorenewIcon sx={{ fontSize: "20px" }} /> Regenerate response</Button>
                        </Box>
                    )
                }

                {
                    editValue && (

                        <Box mt={1} sx={{ minHeight: "400px" }}>
                             
                                    <ReactQuill className='displayInline' theme="snow" style={{ height: "400px" }} value={value ? value : contentSingle} onChange={setValue} />
                                 
                        </Box>
                    )
                }
            </Box>
        </Paper>
    )
}

export default ContentGenerate
