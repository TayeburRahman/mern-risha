import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


function CreateProjectStep3 ({fromState, selectCategory, selectSubCategory, projectName, inputData}) {
 
    let input =  JSON.parse(localStorage.getItem('input'))  
    
    return (
        <div> 

             <Box p={5} pb={2}>
             <Typography className='text-left text6'  >Company Category: <spam className="spamText">{selectCategory}</spam></Typography>
             <Typography className='text-left text6'  > Company Subcategory: <spam className="spamText"> {selectSubCategory} </spam> </Typography>
             <Typography className='text-left text6'   >Project Name: <spam className="spamText"> {projectName}</spam></Typography>
             </Box>

            <Box p={5}>
            { input && inputData?.map((data, idx)=>(
                 <Box pb={1} className='text-left' style={{display:"flex"}}> 
                 <Box pr={2}>
                    <Typography> {idx + 1}. </Typography>
                 </Box>
                 <Box>
                    <Typography>Qu: {data?.inputData}</Typography>
                     <Typography>Ans: {fromState?.[idx]}</Typography>
                 </Box>
                    
                 </Box>
            ))}
            </Box> 
        </div>
    )
}

export default CreateProjectStep3



 