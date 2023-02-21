import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import '../dashboard/StudentsAdmission.css';
 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    minHeight: 600,
    bgcolor: 'background.paper',
    border: '2px solid  #75aac3',
    boxShadow: 24,
    p: 4,
};

export default function UpdateContent({ open, setOpen, updateData, state}) {
    const [value, setValue] = useState(''); 
     
    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
 

 
      
    const handleUpdateButton = async (data) => {   
        
        axios.put(` http://localhost:5000/api/v1/content/update/${updateData?._id}`,  
        {
            content: value
        })
          .then(res =>{ 
            if(res.status === 201){ 
               alert('Update successfully')
               setOpen(false)
            }
         });

    };

 
    const handleClose = () => {
        setValue(null)
        setOpen(false)    
       
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}  
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="row justify-content-center">
                        <ReactQuill theme="snow" style={{height:"400px"}}  defaultValue={updateData?.content} onChange={setValue} />; 
                        </div>
                         <Box  mt={5} pt={4} style={{display:"flex", justifyContent: "space-between"}}>
                         <Box >
                        <Button className="button-34" onClick={handleUpdateButton} role="button">Add New Content</Button> 
                        </Box>
                        <Box > 
                        <Button className="button-34"id="button-34" onClick={handleClose} role="button" >Cancel</Button>
                        </Box>
                         </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


 