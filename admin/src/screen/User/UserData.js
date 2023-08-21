import * as React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import ManageUser from './ManageUser';
import apiHelper from '../../commen/ApiHelper';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




export default function UserData() {
    const user = {
        fullName: "",
        email: "",
        password: "",
        roll: "0",
        otp:""
    }
    const [userDetails, setuserDetails] = React.useState(user)
   
    const [open, setopen] = React.useState(false)
    const [users, setuser] = React.useState([])

    const getuser = async () => {
        try {
            const result = await apiHelper.GetUser({})

            if (result && result.status === 200) {
                setuser(result.data.result)
            }
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getuser()
    }, [])



    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'fullName', headerName: 'Full Name', width: 160 },
        { field: 'email', headerName: 'EMAIL', width: 230 },
        { field: 'roll', headerName: 'Roll', width: 160 },
        {
            field: 'action', headerName: 'Actions', flex: 1, renderCell: (cell) => {
                return <>
                    <IconButton color="primary" onClick={() => { setuserDetails(cell.row); setopen(true) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => Removehandler(cell.row._id)}>
                        <DeleteIcon />
                    </IconButton>

                </>
            }
        },
    ];

    const Removehandler = async (id) => {
        try {
            const result = await apiHelper.Removeuser(id)

            if (result.status === 200) {
                getuser()
            }
        } catch (error) {
            console.log(error)
            return
        }
    }

    const Updateuser = async () => {
        try {
            console.log("first")
            const result = await apiHelper.Updateuser(userDetails._id, userDetails)

            if (result.status === 200) {
                getuser()
            }
            setopen(false)
            setuserDetails({
                fullName: "",
                email: "",
                password: "",
                roll: "0",
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <ManageUser updateuser={Updateuser} getuser={getuser} open={open} setopen={setopen} userDetails={userDetails} setuserDetails={setuserDetails} />
            <div className="row">
                <div className="col-12 mb-3 d-flex justify-content-between">
                    <h3>Show And Manage Users</h3>
                    <Button variant='outlined' onClick={() => {
                        // setuserDetails(user)
                        setopen(true)
                    }}>{userDetails._id ? "Update User" : "Add User"}</Button>
                </div>
                <div className="col-12">
                    <DataGrid rows={users} autoHeight={true} columns={columns} pageSizeOptions={[5, 10]} getRowId={(e) => e._id} />
                </div>
            </div>
        </>
    );
}
