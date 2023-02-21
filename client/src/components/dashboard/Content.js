import { Button, Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import './Content.css';

export default function Content() {

  const [value, setValue] = useState('');  
  const [categoryState, setCategoryState] =  useState('')
  const [subcategoryState, setSubCategoryState] =  useState('')
  const [companyState, setCompanyState] =  useState('')
  const [companySubState, setCompanySubState] =  useState('')
  const [category, setCategory] =  useState()
  const [subCategory, setSubCategory] =  useState()
  const [companyCategory, setCompanyCategory] =  useState()
  const [companySubCategory, setCompanySubCategory] =  useState()
  const [isDisabled, setDisabled] = useState(true)

  const [filterContent, setFilterContent] = useState(true)



 
  
  useEffect(() => {
    axios.get(' http://localhost:5000/api/v1/category/all')
      .then((response) => {
        setCategory(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get(` http://localhost:5000/api/v1/category/subcategory/${categoryState}`)
      .then((response) => {
        setSubCategory(response?.data?.category?.subCategory)
      });
  }, [categoryState]);


  useEffect(() => {
    axios.get(` http://localhost:5000/api/v1/subcategory/get/${categoryState}/${subcategoryState}`)
        .then((response) => {
            setCompanyCategory(response.data); 
        });
}, [subcategoryState, categoryState, companyState]);



useEffect(() => {
  axios.get(` http://localhost:5000/api/v1/subcategory/company-sub/${categoryState}/${subcategoryState}/${companyState}`, {
    company_cate: companyState,
    category: categoryState,
    subcategory: subcategoryState,
    })
  .then(res =>{  
   setCompanySubCategory(res?.data?.company?.com_sub_cate) 
   })   

}, [categoryState,subcategoryState,companyState]);

 

useEffect(() => {
  categoryState && subcategoryState && companyState && value ? setDisabled(false) : setDisabled(true)
}, [categoryState, subcategoryState, companyState, value]);
 

  const handleOnCategory = (event) => { 
    const value = event.target.value;  
    setCategoryState(value)   
    setCompanySubState('') 
    setSubCategoryState('')
    setCompanyState('') 
    setFilterContent('0')
    setCompanySubCategory('') 
};

const handleSubCategory = (event) => {
  // const name = event.target.name;
  const value = event.target.value; 
  setSubCategoryState(value) 
  setFilterContent('0')
};

  const handleCompanyCategory = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    setCompanyState(value)   
    axios.get(` http://localhost:5000/api/v1/content/get/filter1/${categoryState}/${subcategoryState}/${value}`)
    .then(res =>{  
      setFilterContent(res?.data)
     })   
 
};


const handleCompanySubCategory = (event) => { 
  const value = event.target.value;
  setCompanySubState(value)    
  axios.get(` http://localhost:5000/api/v1/content/get/filter2/${categoryState}/${subcategoryState}/${companyState}/${value}`)
  .then(res =>{    
      setFilterContent(res?.data) 
   })   
};

const handleCreateButton = () =>{
  axios.post(' http://localhost:5000/api/v1/content/create', {
    category: categoryState,
    subcategory: subcategoryState,
    company_cate: companyState,
    com_sub_cate: companySubState,
    content: value
  }) .then((response) => {
    alert("Content added successfully")
    setValue('')
});
}


 
  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center" className='filter-box'>
            <Grid item>
            <Typography  className="text-left text-black" color="text.secondary" align="center">
             Select Category <span style={{color:'red'}}>*</span>
            </Typography> 
                   <select  className='input-selector onselect' onChange={handleOnCategory} style={{ display: 'grid' }}>
                       <option className='paddingTop' value="">Click Option</option>
                       {
                        category && category?.map(({_id ,tittle, subcategory}) =>{
                          return (
                            <option key={_id}  value={tittle} className="updateall" >{tittle}</option>
                          )
                        })
                       }
                    </select> 
            </Grid>
            <Grid item >
            <Typography  className="text-left text-black" color="text.secondary" align="center">
             Select Sub Category <span style={{color:'red'}}>*</span>
            </Typography>
            <form>
                   <select  className='input-selector onselect' onChange={handleSubCategory} style={{ display: 'grid' }}>
                          <option value="">Select Option</option>
                          {
                          category? subCategory?.map(({_id ,tittle, subcategory}) =>  (
                            <option key={_id} className="updateall">{tittle}</option>
                          )):
                        <option value="text">Select Fast Category</option>
                       }
                    </select>
                </form>
               
            </Grid>
            <Grid item>
            <Typography  className="text-left text-black" color="text.secondary" align="center">
            Company Category <span style={{color:'red'}}>*</span>
            </Typography>
            <form>
                   <select  className='input-selector onselect' onChange={handleCompanyCategory} style={{ display: 'grid' }}>
                          <option value="">Select Company</option>
                          {
                         companyCategory?.map(({_id ,company_cate, subcategory}) =>{
                          return (
                            <option key={_id} value={company_cate} className="updateall">{company_cate}</option>
                          )
                        })
                       }
                    </select>
                </form>
              
            </Grid>

            { companySubCategory && (
              <Grid item>
            <Typography  className="text-left text-black" color="text.secondary" align="center">
            Company Sub Category (optional)
            </Typography>
             <form >
                   <select  className='input-selector onselect' onChange={handleCompanySubCategory} style={{ display: 'grid', width:"auto"}}>
                     <option value="">Select Company Sub</option>
                          {
                         companySubCategory?.map((data, idx) =>{
                          return (
                            <option key={idx} value={data} className="updateall">{data}</option>
                          )
                        })
                       }
                    </select>
                </form> 
            </Grid>  
            )}
          
              
          </Grid>
        </Toolbar>
      </AppBar>
       
          <Box p={4} py={0} sx={{ my: 2, mx: 2 }}>
          <Typography   className="text-left" color={'black'} align="center">
        Create a new content: {categoryState ? categoryState: ''} {categoryState ? '-':''}  {subcategoryState ? subcategoryState : ''}  {subcategoryState ? "-" : ''}   {companyState ? companyState : ''}   {companySubState ? "-" : ''} {companySubState ? companySubState : ''}  
      </Typography>
          <Typography className='text-left'>Currently, there are {filterContent?.data?.length? filterContent?.data?.length: 0} contents in this category. <Link to="">{filterContent?.data?.length? "See now..": ""} </Link></Typography>

               
            </Box>
       <Box  p={5} py={0}  sx={{minHeight:"700px"}}> 
        <ReactQuill theme="snow" style={{height:"200px"}} value={value} onChange={setValue} />; 

        <Box className="text-left" sx={{paddingTop:"50px"}}>
             <div
               dangerouslySetInnerHTML={{
               __html: value,
            }}>
           </div>
           <Divider/>
           <Box mb={5} mt={5}> <Button className="button-34" onClick={handleCreateButton} disabled={isDisabled} role="button">Add New Content</Button></Box>
       </Box>
       </Box>
       
    </Paper>
  );
}