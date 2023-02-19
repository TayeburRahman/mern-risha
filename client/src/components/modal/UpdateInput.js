 



import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import * as React from 'react';
import { useForm } from 'react-hook-form';
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

 

export default function UpdateInput({ inputId, inputSingleData, open, setOpen, setState}) {

    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    console.log( 'inputSingleData', inputId)
    
     const onSubmit = (data) => { 
     const newInputData = data?.inputData
 
     axios.put(`http://localhost:6060/api/v1/subcategory/single/input/update/${inputId}`,  
        {
            inputData: inputSingleData,
            newInputData
        })
          .then(res =>{ 
            if(res.status === 200){ 
               alert('Update successfully')
               setOpen(false)
               setState(true? false: true)
            }
         }); 
 
    }; 

    const handleClose = () => {
        // setValue(null)
        setOpen(false)    
       
    };
    return (
        <div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
               
                        {/* <img width="80px" src={`updateData.`} alt="" /> */}
                   
                    <form onSubmit={handleSubmit(onSubmit)}> 
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>
                         Input filed
                        </span>
                        <input
                           style={{
                            height: '80px',
                            width: '100%',
                            marginBottom: '5px',
                            fontSize: 'revert'
                        }}
                         className="text-from description width "
                         required
                         {...register("inputData")}
                         defaultValue={inputSingleData}
                       />

                        <br />
                        <div className='d-flex' style={{justifyContent: 'space-between'}}>
                        <button
                            style={{
                                padding: '8px 14px',
                                color: 'white',
                                backgroundColor: 'rgb(31 165 130)',
                                border: 'none',
                                borderRadius: '4px',
                                marginRight: '5px',
                                fontSize:"15px"
                            }}
                            type="submit"
                        >
                            Update
                        </button>
                        <button
                         onClick={handleClose}
                            style={{
                                padding: '8px 14px',
                                color: 'white',
                                backgroundColor: 'rgb(230 60 86)',
                                border: 'none',
                                borderRadius: '4px',
                                marginRight: '5px',
                                fontSize:"15px"
                            }} 
                        >
                           Cancel
                        </button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}



 