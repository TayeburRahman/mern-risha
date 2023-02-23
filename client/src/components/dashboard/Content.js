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
  const [categoryState, setCategoryState] = useState('')
  const [subcategoryState, setSubCategoryState] = useState('')
  const [companyState, setCompanyState] = useState('')
  const [companySubState, setCompanySubState] = useState('')
  const [category, setCategory] = useState()
  const [subCategory, setSubCategory] = useState()
  const [companyCategory, setCompanyCategory] = useState()
  const [companySubCategory, setCompanySubCategory] = useState()
  const [isDisabled, setDisabled] = useState(true)
  const [saveDisabled, setSaveDisabled] = useState(true)
  const [inputData, setInputData] = useState()
  const [filterContent, setFilterContent] = useState(true)
  const [selectInputField, setSelectInputField] = useState()

  const [inputState0, setInputState0] = useState(false)
  const [inputState1, setInputState1] = useState(false)
  const [inputState2, setInputState2] = useState(false)
  const [inputState3, setInputState3] = useState(false)
  const [inputState4, setInputState4] = useState(false)
  const [inputState5, setInputState5] = useState(false)
  const [inputState6, setInputState6] = useState(false)
  const [inputState7, setInputState7] = useState(false)
  const [inputState8, setInputState8] = useState(false)
  const [inputStateEnd, setInputStateEnd] = useState(false)


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

  const [inputOfData0, setInputOfData0] = useState('')
  const [inputOfData1, setInputOfData1] = useState('')
  const [inputOfData2, setInputOfData2] = useState('')
  const [inputOfData3, setInputOfData3] = useState('')
  const [inputOfData4, setInputOfData4] = useState('')
  const [inputOfData5, setInputOfData5] = useState('')
  const [inputOfData6, setInputOfData6] = useState('')
  const [inputOfData7, setInputOfData7] = useState('')
  const [inputOfData8, setInputOfData8] = useState('')

  const [htmlValue, setHtmlValue] = useState('')

 

  // get main sub categories
  useEffect(() => {
    axios.get(' https://server1.rishati.com/api/v1/category/all')
      .then((response) => {
        setCategory(response.data);
      });
  }, []);

  // get filtering wic main sub categories
  useEffect(() => {
    axios.get(` https://server1.rishati.com/api/v1/category/subcategory/${categoryState}`)
      .then((response) => {
        setSubCategory(response?.data?.category?.subCategory)
      });
  }, [categoryState]);

  // get filtering wic company categories
  useEffect(() => {
    axios.get(` https://server1.rishati.com/api/v1/subcategory/get/${categoryState}/${subcategoryState}`)
      .then((response) => {
        setCompanyCategory(response.data);
      });
  }, [subcategoryState, categoryState, companyState]);

  // get filtering wic company sub categories
  useEffect(() => {
    axios.get(` https://server1.rishati.com/api/v1/subcategory/company-sub/${categoryState}/${subcategoryState}/${companyState}`, {
      company_cate: companyState,
      category: categoryState,
      subcategory: subcategoryState,
    })
      .then(res => {
        setCompanySubCategory(res?.data?.company?.com_sub_cate)
      })

  }, [categoryState, subcategoryState, companyState]);

  // set button state for setDisabled
  useEffect(() => {
    categoryState && subcategoryState && companyState && value ? setDisabled(false) : setDisabled(true)
    selectInputField && value ? setSaveDisabled(false) : setSaveDisabled(true)
  }, [categoryState, subcategoryState, companyState, value, selectInputField]);


  // get company category wic inputs
  useEffect(() => {
    if (companySubState) {
      axios.get(` https://server1.rishati.com/api/v1/subcategory/get/input/${categoryState}/${subcategoryState}/${companyState}/${companySubState}`)
        .then((response) => {
          setInputData(response.data.input);
        });
    } else {
      axios.get(` https://server1.rishati.com/api/v1/subcategory/get/input-c/${categoryState}/${subcategoryState}/${companyState}`)
        .then((response) => {
          setInputData(response.data.input);
        });
    }
  }, [companyCategory, companySubCategory]); 


 useEffect(() => {
  inputData?.filter((data, idx)=>  idx === 0).map(({inputData}) => (setInputOfData0(inputData)))
  inputData?.filter((data, idx)=>  idx === 1 ).map(({inputData}) => (setInputOfData1(inputData) ))
  inputData?.filter((data, idx)=>  idx === 2 ).map(({inputData}) => (setInputOfData2(inputData) ))
  inputData?.filter((data, idx)=>  idx === 3 ).map(({inputData}) => (setInputOfData3(inputData) ))
  inputData?.filter((data, idx)=>  idx === 4 ).map(({inputData}) => (setInputOfData4(inputData) ))
  inputData?.filter((data, idx)=>  idx === 5 ).map(({inputData}) => (setInputOfData5(inputData) ))
  inputData?.filter((data, idx)=>  idx === 6 ).map(({inputData}) => (setInputOfData6(inputData) ))
  inputData?.filter((data, idx)=>  idx === 7 ).map(({inputData}) => (setInputOfData7(inputData) ))
  inputData?.filter((data, idx)=>  idx === 8 ).map(({inputData}) => (setInputOfData8(inputData) ))
 },[inputData])


 useEffect(() => {
   let html =  inputValue0 +`<span>  ${inputValue0? `[Ans: ${inputOfData0} ]`: ''}</span>` + inputValue1 + `${inputValue1? `[Ans: ${inputOfData1} ]`:''}</p>` + inputValue2 + `<p>${inputValue2? `[Ans: ${inputOfData2} ]`: ''}</p>` + inputValue3 + `<p> ${inputValue3? `[Ans: ${inputOfData3} ]`:''} </p>` + inputValue4 + `<p>${inputValue4? ` [Ans: ${inputOfData4} ]`:''}</p>` + inputValue5 + `${inputValue5? `[Ans: ${inputOfData5} ]`:''}</p>` + inputValue6 + `<p> ${inputValue6? `[Ans: ${inputOfData6} ]`:''}</p>` + inputValue7 + `<p>${inputValue7? `[Ans: ${inputOfData7} ]`:''} </p>` + inputValue8 + ` ${inputValue8? `[Ans: ${inputOfData8} ]`:''}</p>` + inputValueEnd 
  
   setHtmlValue(html)

 },[inputValue0,inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8, inputValueEnd])

  // set filtering main category in state
  const handleOnCategory = (event) => {
    const value = event.target.value;
    setCategoryState(value)
    setCompanySubState('')
    setSubCategoryState('')
    setCompanyState('')
    setFilterContent('0')
    setCompanySubCategory('')
  };

  // set filtering main sub category in state
  const handleSubCategory = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    setSubCategoryState(value)
    setFilterContent('0')
  };

  // set filtering company category in state and get egesting content
  const handleCompanyCategory = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    setCompanyState(value)
    axios.get(` https://server1.rishati.com/api/v1/content/get/filter1/${categoryState}/${subcategoryState}/${value}`)
      .then(res => {
        setFilterContent(res?.data)
      })

  };

  // set filtering company sub category in state and get egesting content
  const handleCompanySubCategory = (event) => {
    const value = event.target.value;
    setCompanySubState(value)
    axios.get(` https://server1.rishati.com/api/v1/content/get/filter2/${categoryState}/${subcategoryState}/${companyState}/${value}`)
      .then(res => {
        setFilterContent(res?.data)
      })
  };
 
  // set input data in state
  const handleInput = (data) => {
    setValue('')
    const index = data.target.value 
    setSelectInputField(index)

    if (index === "0") {
      setInputState0(true)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)
    }
    if (index === "1") {
      setInputState0(false)
      setInputState1(true)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)

    }
    if (index === "2") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(true)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)
    }
    if (index === "3") {

      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(true)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)

    }
    if (index === "4") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(true)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)
    }
    if (index === "5") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(true)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)

    }
    if (index === "6") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(true)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(false)
    }
    if (index === "7") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(true)
      setInputState8(false)
      setInputStateEnd(false)
    }
    if (index === "8") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(true)
      setInputStateEnd(false)
    }
    if (index === "end") {
      setInputState0(false)
      setInputState1(false)
      setInputState2(false)
      setInputState3(false)
      setInputState4(false)
      setInputState5(false)
      setInputState6(false)
      setInputState7(false)
      setInputState8(false)
      setInputStateEnd(true)
    }
  }
 

  // save input content in state - is input wic
  const handleSave = (data) => {

    if (inputState0) {
      setInputValue0(value)
    }
    if (inputState1) {
      setInputValue1(value)
    }
    if (inputState2) {
      setInputValue2(value)
    }
    if (inputState3) {
      setInputValue3(value)
    }
    if (inputState4) {
      setInputValue4(value)
    }
    if (inputState5) {
      setInputValue5(value)
    }
    if (inputState6) {
      setInputValue6(value)
    }
    if (inputState7) {
      setInputValue7(value)
    }
    if (inputState8) {
      setInputValue8(value)
    }
    if (inputStateEnd) {
      setInputValueEnd(value)
    } 
  }



  // save content in database - is company category wic
  const handleCreateButton = () => {
    axios.post('http://localhost:5000/api/v1/content/create', {
      category: categoryState,
      subcategory: subcategoryState,
      company_cate: companyState,
      com_sub_cate: companySubState,
      inputValue0,
      inputValue1,
      inputValue2,
      inputValue3,
      inputValue4,
      inputValue5,
      inputValue6,
      inputValue7,
      inputValue8,
      inputValueEnd
    }).then((response) => {
      alert("Content added successfully")
      setValue('')
    });
  }

  console.log(inputValueEnd)


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
              <Typography className="text-left text-black" color="text.secondary" align="center">
                Select Category <span style={{ color: 'red' }}>*</span>
              </Typography>
              <select className='input-selector onselect' onChange={handleOnCategory} style={{ display: 'grid' }}>
                <option className='paddingTop' value="">Click Option</option>
                {
                  category && category?.map(({ _id, tittle, subcategory }) => {
                    return (
                      <option key={_id} value={tittle} className="updateall" >{tittle}</option>
                    )
                  })
                }
              </select>
            </Grid>
            <Grid item >
              <Typography className="text-left text-black" color="text.secondary" align="center">
                Select Sub Category <span style={{ color: 'red' }}>*</span>
              </Typography>
              <form>
                <select className='input-selector onselect' onChange={handleSubCategory} style={{ display: 'grid' }}>
                  <option value="">Select Option</option>
                  {
                    category ? subCategory?.map(({ _id, tittle, subcategory }) => (
                      <option key={_id} className="updateall">{tittle}</option>
                    )) :
                      <option value="text">Select Fast Category</option>
                  }
                </select>
              </form>
            </Grid>

            <Grid item>
              <Typography className="text-left text-black" color="text.secondary" align="center">
                Company Category <span style={{ color: 'red' }}>*</span>
              </Typography>
              <form>
                <select className='input-selector onselect' onChange={handleCompanyCategory} style={{ display: 'grid' }}>
                  <option value="">Select Company</option>
                  {
                    companyCategory?.map(({ _id, company_cate, subcategory }) => {
                      return (
                        <option key={_id} value={company_cate} className="updateall">{company_cate}</option>
                      )
                    })
                  }
                </select>
              </form>
            </Grid>

            {companySubCategory && (
              <Grid item>
                <Typography className="text-left text-black" color="text.secondary" align="center">
                  Company Sub Category (optional)
                </Typography>
                <form >
                  <select className='input-selector onselect' onChange={handleCompanySubCategory} style={{ display: 'grid', width: "auto" }}>
                    <option value="">Select Company Sub</option>
                    {
                      companySubCategory?.map((data, idx) => {
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
        <Typography className="text-left" color={'black'} align="center">
          Create a new content: {categoryState ? categoryState : ''} {categoryState ? '-' : ''}  {subcategoryState ? subcategoryState : ''}  {subcategoryState ? "-" : ''}   {companyState ? companyState : ''}   {companySubState ? "-" : ''} {companySubState ? companySubState : ''}
        </Typography>
        <Typography className='text-left'>Currently, there are {filterContent?.data?.length ? filterContent?.data?.length : 0} contents in this category. <Link to="">{filterContent?.data?.length ? "See now.." : ""} </Link></Typography>
      </Box>


      <Grid container gap={2} p={4} py={0} sx={{ my: 2, mx: 2 }}>
        <Grid item sx={12} md={12} lg={7}>
          <form>
            <select className='input-selector onselect' onChange={handleInput} style={{ display: 'grid' }}>
              <option value="">Select Input, you wont write before the text</option>
              {
                inputData ? inputData?.map(({ inputData, inputType }, idx) => (
                  <option key={idx} className="updateall" name={inputData} value={idx}>{inputData}</option>
                )) :
                  ''
              }
              {
                inputData?.length && (<option value="end"> Write end of the text after all inputs</option>)
              }
            </select>
          </form>
        </Grid>

        <Grid item sx={12} md={12} lg={3} >
          <Box><Button className="button-34" onClick={handleSave} disabled={saveDisabled} role="button">Add</Button></Box>
        </Grid>

      </Grid>


      <Box p={5} py={0} sx={{ minHeight: "700px" }}>
        <ReactQuill theme="snow" style={{ height: "200px" }} value={value} onChange={setValue} />;

        <Box className="text-left flex-container wrap" sx={{ paddingTop: "50px" }}>
          
                <div
                className='displayInline'
                  dangerouslySetInnerHTML={{
                    __html: htmlValue  ,
                  }}>
                </div>  
          <Divider /> 
        </Box>
        <Box mb={5} mt={5}> <Button className="button-34" onClick={handleCreateButton} disabled={isDisabled} role="button">Save New Content</Button></Box>
      </Box>

    </Paper>
  );
}