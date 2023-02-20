 



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

 

export default function UserEdit({ open, setOpen, user}) {

    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

 
    
     const onSubmit = (data) => {  
       
 
       if(user?.email && user?.userID){
        axios.put(`http://localhost:6060/api/v1/users/update`,  
        {
            email: user?.email,
            userID:user?.userID,
            fastname: data?.fastname,
            lastname: data?.lastname,
            familyName: data?.familyName,
            username: data?.username,
            info: data?.info
        })
          .then(res =>{ 
            if(res.status === 200){ 
               alert('Update successfully')
               setOpen(false)
            //    setState(true? false: true)
            }
         });  
       }else{
        alert('Error, please try again')
        setOpen(false)
       }
    }; 

    const handleClose = () => {
        // setValue(null)
        setOpen(false)    
       
    };

    console.log('user',user?.fastname)
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
                        <p className='Information'>Update profile</p>
                   
                 <form onSubmit={handleSubmit(onSubmit)}> 
                    <div className="mb-2 text-left">
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                Fast Name:
                                            </label>
 
                                            <input
                                                className="form-control p-1"
                                                type="text"
                                                id="displayName" 
                                                defaultValue={user?.fastname} 
                                                {...register('fastname'
                                                     )}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
 
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                Last Name:
                                            </label>

                                            <input
                                                className="form-control p-1"
                                                type="text"
                                                id="displayName"
                                                defaultValue={user?.lastname} 
                                                {...register('lastname', {
                                                    required:
                                                        'Last Name is required',
                                                })}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                Family Name:
                                            </label>
                                            <input
                                                className="form-control p-1"
                                                type="text"
                                                id="familyName"
                                                defaultValue={user?.familyName} 
                                                {...register('familyName', {
                                                    // required:
                                                    //     'Name is required',
                                                })}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                username:
                                            </label>
                                            <input
                                                className="form-control p-1"
                                                type="text"
                                                id="displayName"
                                                defaultValue={user?.username} 
                                                {...register('username')}
                                            />
                                        </div>

                                        <div className="mb-2 text-left">
                                            <label
                                                htmlFor="displayName"
                                                className="form-label m-0"
                                            >
                                                Profile Info:
                                            </label>
                                            <textarea
                                                className="form-control p-1"
                                                type="text" 
                                                {...register('info' 
                                                    )}
                                            />
                                        </div>
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



 