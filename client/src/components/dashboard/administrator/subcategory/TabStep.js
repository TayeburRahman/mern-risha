import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CreateProjectStep1 from '../../../CreateProjectStep1';
import CreateProjectStep2 from '../../../CreateProjectStep2';
import CreateProjectStep3 from '../../../CreateProjectStep3';
import CreateProjectStep4 from '../../../CreateProjectStep4';

const steps = ['Step 1', 'Step 2', 'Step 3'];

export default function HorizontalLinearStepper({ category, subcategory }) {
    // -----------LinearStepper----------------
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    // ---------------------------------
    const [selectSubCategory, setSelectSubCategory] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [projectName, setProjectName] = useState('')
    const path = useParams()
    const [inputData, setInputData] = useState()
    const [isDisabled, setDisabled] = useState()
    const [errors, setErrors] = useState(false)
    const [fromState, setFromState] = useState({})
    const [submitFrom, setSubmitFrom] = useState(true)
    const [projectServerReq, setProjectServerReq] = useState()

    let auth = JSON.parse(localStorage.getItem('auth'))   
    const user_email= auth?.user?.email
    const user = auth?.user 



    // error state 
    useEffect(() => {
        projectName && selectCategory ? setDisabled(false) : setDisabled(true)
 
    }, [projectName, selectCategory, selectSubCategory])
 

    useEffect(() => {
        if(selectSubCategory){
            axios.get(` https://server1.rishati.com/api/v1/subcategory/get/input/${category}/${subcategory}/${selectCategory}/${selectSubCategory}`)
            .then((response) => {
                setInputData(response.data.input);
            }); 
        }else {
            axios.get(` https://server1.rishati.com/api/v1/subcategory/get/input-c/${category}/${subcategory}/${selectCategory}`)
            .then((response) => {
                setInputData(response.data.input);
            }); 
        }
        
    }, [selectCategory, selectSubCategory, path]);


    // -----------LinearStepper----------------
    const isStepSkipped = (step) => {
        return skipped.has(step);
    };



    const handleNext = () => {
            // -----------LinearStepper Handel----------------
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        // ---------------------------------

        if(activeStep === 2){
            
            axios.post(` https://server1.rishati.com/api/v1/project/create`,  
            { 
                category,
                subcategory,
                company_cate: selectCategory, 
                com_sub_cate: selectSubCategory,
                project_name: projectName,
                input_form: fromState,
                user_email,
                user
            })
              .then(res =>{ 
                 if(res.status === 200){ 
                    
                    setProjectServerReq(res.data)
                 }  
              }).catch((err) => { 
                
              })
        }

    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    // ----------- ----------------

  

    return (
        <Box p={5} sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 0 && (

                <Fragment>

                    <Box>
                        <CreateProjectStep1 category={category} subcategory={subcategory} setSelectSubCategory={setSelectSubCategory} setSelectCategory={setSelectCategory} setProjectName={setProjectName} errors={errors} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button disabled={isDisabled} onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Fragment>
            )}

            {activeStep === 1 && (

                <Fragment>

                    {
                        inputData &&
                        (<Box>
                            <CreateProjectStep2 category={category} subcategory={subcategory} inputData={inputData} setSubmitFrom={setSubmitFrom} setFromState={setFromState} />
                        </Box>)
                    }

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button disabled={submitFrom} onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Fragment>
            )}

            {activeStep === 2 && (

                <Fragment>

                    <Box>
                        <CreateProjectStep3 selectSubCategory={selectSubCategory} selectCategory={selectCategory} fromState={fromState} projectName={projectName} inputData={inputData} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === 2 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Fragment>
            )}

            {activeStep === 3 && (

                <Fragment>

                    <Box>
                        <CreateProjectStep4 com_sub_cate={selectSubCategory} company_cate={selectCategory}   category={category} subcategory={subcategory} projectName={projectName} projectServerReq={projectServerReq} />
                    </Box>


                </Fragment>
            )}
        </Box>
    );
}