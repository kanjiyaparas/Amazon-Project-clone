const Validator = (data, type) =>{
    let errors = []


    console.log(data)
    if(type === "Register"){
        if(!data.firstname){
            errors.push({key:"firstname", message:"Required Field Empty"})

        }else if(data.firstname.length <= 2){
            errors.push({key:"firstname" , message:"Firstname Atleast 3 Characters"})
        }

        if(!data.lastname){
            errors.push({key:"lastname", message:"Required Field Empty"})

        }else if(data.lastname.length<=2){
            errors.push({key:"lastname" , message:"Firstname Atleast 3 Characters"})
        }

        // For Email
        if (!data.email) {
            errors.push({ key: "email", message: "Please Enter email" })
        }
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
            errors.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!data.password) {
            errors.push({ key: "password", message: "Please Enter password" })
        }
        
        return errors
    }
     else if(type === "Admin-Register"){
      
            if(!data.fullName){
                errors.push({key:"firstname", message:"Required Field Empty"})
    
            }else if(data.fullName.length <= 2){
                errors.push({key:"firstname" , message:"Firstname Atleast 3 Characters"})
            }
    
    
            // For Email
            if (!data.email) {
                errors.push({ key: "email", message: "Please Enter email" })
            }
            else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
                errors.push({ key: "email", message: "Inavalid Email" })
            }
    
            //For Password
            if (!data.password) {
                errors.push({ key: "password", message: "Please Enter password" })
            } 
             else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
                errors.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
            }

            if(!data.roll){
                errors.push({key:"roll" , message:"please enter your roll"})
            } 
            else if (data.roll.length <= 2 && (/^([^0-9]*)$/.test(data.roll))){
                errors.push({key:"roll" , message:"roll is invalid"})
            }
            
            return errors
     }
    
    
    
    
    else{
       // For Email
       if (!data.email) {
        errors.push({ key: "email", message: "Please Enter email" })
    }
    else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,4})+$/.test(data.email))) {
        errors.push({ key: "email", message: "Inavalid Email" })
    }

    //For Password
    if (!data.password) {
        errors.push({ key: "password", message: "Please Enter password" })
    }
    else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(data.password))) {
        errors.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
    }

    }
    return errors
}

export default Validator