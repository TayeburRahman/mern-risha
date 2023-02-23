import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserList() {

    const [users, setAllUsers] =  useState([])

    useEffect(()=>{ 
        axios.get(' https://server1.rishati.com/api/v1/users/all')
          .then(response => { 
           setAllUsers(response?.data)
           }); 
    }, [])

    return (
        <Fragment>
            <div className="main-page">
                <div className="container-fluid">
                    <div className="page-title-div">
                        <h2 className="title text-left">Create Subject</h2>
                    </div>
                </div>

                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">User ID</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((row, idx) => (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row?.email}
                                        </TableCell>
                                        <TableCell align="right">{row?.username}</TableCell>
                                        <TableCell align="right">{row?.userID}</TableCell>
                                        <TableCell align="right">{row?.status}</TableCell>
                                        <TableCell align="right"> <Link to={`profile/${row?.userID}`} > <Button>User Details</Button> </Link>   </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Fragment>
    )
}

export default UserList
