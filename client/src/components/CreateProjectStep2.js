import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function CreateProjectStep2({ inputData, setFromState, setSubmitFrom }) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
    const [inputFiledData, setInputData] = useState(true)

  

    const onSubmit = (data) => {
        // const name = event.target.name;
        // const value = event.target.value;
        // setFromState(e => ({...e, [name]: value}))

        setFromState(data)
        localStorage.setItem('input', JSON.stringify(data))
        setSubmitFrom(false)
    };


    return (
        <div>
            <Box mt={5} m={5} p={5}sx={{ borderRadius: "5px", border: "1px solid #c7c7c7" }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'grid' }}>
                    {inputData && inputData?.map(({ inputData,  inputType}, idx) => (
                        <Box sx={{display:"grid"}}>
                            <Typography className='text-left' variant="subtitle2">{inputData}</Typography>
                            <input className='input-filed text-left' type={inputType}  {...register( `${idx}`, { required: true })}  />
                        </Box> 
                    ))}

                     
                    <input className='button-submit' type="submit" />
                </form>
            </Box>
        </div>
    )
}

export default CreateProjectStep2
