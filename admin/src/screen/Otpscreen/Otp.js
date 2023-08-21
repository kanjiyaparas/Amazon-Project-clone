import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'

export default function Otp() {
    const [otp, setOtp] = React.useState('')

    const handleChange = (newValue) => {
        setOtp(newValue)
    }

    return (
        <MuiOtpInput value={otp} onChange={handleChange} sx={{ mt:"5px" ,  width: "25vw" }} />
    )
}