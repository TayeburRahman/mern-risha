import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import '../dashboard/StudentsAdmission.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid  #75aac3',
    boxShadow: 24,
    p: 4,
};

export default function AddCategory({ open, setOpen }) {

    const [file, setFile] = useState()
    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    const onSubmit = async (data) => {   
        axios.post(' https://server1.rishati.com/api/v1/category/create',  
        {
            tittle: data.tittle,
            description: data.description,
            avatar: file,
        }, {
            headers: {
              "Content-Type": "multipart/form-data",
            }
          })
          .then(res =>{ 
            if(res.status === 200){ 
               alert('Add new sub category successfully')
               setOpen(false)
            }
         });

    };

    const handleOnChange = (data)=>{ 
        setFile(data)
    }

    const handleClose = () => setOpen(false);

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
                            <div className="col-10">
                                <div className="card">
                                    <div className="card-body ">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3 text-left  ">
                                                <label
                                                    htmlFor="tittle"
                                                    className="form-label  "
                                                >
                                                    Category Tittle :
                                                </label>
                                                {/* <input type='text' name="tittle"/> */}
                                                <input
                                                    className="form-control p-2"
                                                    type="text"
                                                    id="tittle"
                                                    placeholder="Enter Category Tittle :"
                                                    {...register('tittle', {
                                                        required:
                                                            ' Category Tittle is required',
                                                    })}
                                                />
                                            </div>

                                            <div className=" mb-3 text-left ">
                                                <label
                                                    htmlFor="description"
                                                    className="form-label  "
                                                >
                                                    Category Description :
                                                </label>

                                                {/* <textarea type='text' name="description"/> */}


                                                <textarea
                                                    className="form-control p-2 "
                                                    type="text"
                                                    id="description"

                                                    {...register('description', {

                                                    })}
                                                />
                                            </div>
                                            
                                            <div className=" mb-3 text-left t-bold">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label  "
                                                >
                                                    Media :
                                                </label>
                                                <input type='file' name="avatar" onChange={(e)=> handleOnChange(e.target.files[0])}/>
                                                 
                                            </div>


                                            <div className=" mb-0 text-center">
                                                <button
                                                    className="btn btn-primary form-control"
                                                    type="submit"
                                                    style={{
                                                        background: '#1560FF',
                                                    }}
                                                // disabled={isLoading}
                                                >
                                                    Submit
                                                </button>
                                            </div>


                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


 