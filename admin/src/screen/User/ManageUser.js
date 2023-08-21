import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import apiHelper from '../../commen/ApiHelper';
import Validator from '../../commen/Validator';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, FormHelperText } from '@mui/material';
import Otp from '../Otpscreen/Otp';



export default function ManageUser(props) {
    const { open, setopen, getuser, userDetails, setuserDetails, updateuser } = props
    const [Error, setError] = useState([])
    const [showPassword, setShowPassword] = useState(false);
    const [issubmit, setissubmit] = useState(false)

    const handleClose = () => {
        setopen(false);
        setError([])
        setuserDetails({
            fullName: "",
            email: "",
            password: "",
            roll: "0",
        
        })
    };
    const AddUSer = async () => {
        try {
            setissubmit(true)
            const validationresult = Validator(userDetails, "Admin-user")

            console.log(validationresult)

            if (validationresult.length >= 0) setError(validationresult)


            // eslint-disable-next-line no-unused-vars
            const result = await apiHelper.createuser(userDetails)
            setissubmit(false)
            console.log(result)
            setopen(false)
            getuser()
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


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div>

            <Dialog open={open} onClose={handleClose}>
                <center>
                    <DialogTitle>{userDetails._id ? "Update User" : "Add User"}</DialogTitle>
                </center>
                <hr className='mb-0' />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="FullName"
                        type="text"
                        error={Error?.find(x => x.key === "fullName")}
                        helperText={Error?.find(x => x.key === "fullName")?.message}
                        value={userDetails.fullName}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, fullName: e.target.value })

                            if (issubmit) {
                                const ValidationResult = Validator({ ...userDetails, fullName: e.target.value }, "Admin-user")
                                setError(ValidationResult)
                            }

                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        error={Error?.find(x => x.key === "email")}
                        helperText={Error?.find(x => x.key === "email")?.message}
                        value={userDetails.email}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, email: e.target.value })

                            if (issubmit) {
                                const ValidationResult = Validator({ ...userDetails, email: e.target.value }, "Admin-user")
                                setError(ValidationResult)
                            }

                        }}
                        fullWidth
                        variant="outlined"
                    />
                    <FormControl sx={{ mt: 1, minWidth: 120 }} fullWidth>
                        <Select    helperText={Error?.find(x => x.key === "roll")?.message} onChange={(e) => {
                            setuserDetails({ ...userDetails, roll: e.target.value })

                            if (issubmit) {
                                const ValidationResult = Validator({ ...userDetails, roll: e.target.value }, "Admin-user")
                                setError(ValidationResult)
                            }


                        }} value={userDetails.roll} error={Error?.find(x => x.key === "roll")} className='mt-1' fullWidth>
                            <MenuItem value={"0"}><i>---Select Roll---</i></MenuItem>
                            <MenuItem value={"Editor"}>Editor</MenuItem>
                            <MenuItem value={"Admin"}>Admin</MenuItem>
                            <MenuItem value={"sco"}>Sco</MenuItem>
                        </Select>
                        <FormHelperText error={Error?.find(x => x.key === "roll")}>{Error?.find(x => x.key === "roll")?.message}</FormHelperText>
                    </FormControl>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Password"
                        type="password"
                        error={Error?.find(x => x.key === "password")}
                        helperText={Error?.find(x => x.key === "password")?.message}
                        value={userDetails.password}
                        onChange={(e) => {
                            setuserDetails({ ...userDetails, password: e.target.value })
                            if (issubmit) {
                                const ValidationResult = Validator({ ...userDetails, password: e.target.value })
                                setError(ValidationResult)
                            }
                        }}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={userDetails._id ? updateuser : AddUSer}>{userDetails._id ? "Update" : "Add "}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}