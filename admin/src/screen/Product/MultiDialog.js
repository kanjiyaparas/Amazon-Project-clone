import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHelper from '../../commen/ApiHelper';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import axios from 'axios';


export default function MultiDialog(props) {
    const {fetchMediaFromBackend, media,setrelevantimg} = props
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [tmpselectedimg, settmpselectedimg] = React.useState({})
 


    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
      handleUpload()
    };
  

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        settmpselectedimg({})
        // setfutereimg({})
    };

    const handleMaxWidthChange = (event) => {
        setMaxWidth(
            // @ts-expect-error autofill of arbitrary value is not handled.
            event.target.value,
        );
    };

   
  
    const handleFullWidthChange = (event) => {
        setFullWidth(event.target.checked);
    };

    const uploadmedia = async(file) => {
      try {
        const form = new FormData()
        form.append("file" , file)
        const result = await apiHelper.uploadmedia(form)
        fetchMediaFromBackend()
      } catch (error) {
        console.log(error)
      }
    }

  // console.log(tmpselectedimg)
    return (
        <>
      <React.Fragment>
        <Button variant="contained" className="w-100 mt-2" onClick={handleClickOpen}>
          ADD RELEVANT IMAGE
        </Button>
        <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose} sx={{zIndex:"100000000000"}}>
          <DialogTitle className="fw-bold">Uploaded Images</DialogTitle>

          <DialogContent  className='row justify-content-center m-0' >

          <label
              htmlFor="file"
              className="col-12 mb-3 col-sm-6 overflow-hidden col-md-6  d-flex align-items-center justify-content-center"
              style={{
                height: "15.3rem",
                border: "2px dashed #1976d2",
              }}
            >
                <>
                <AddAPhotoIcon className="fs-1" color="primary" />
                <input
                  onChange={(e) => uploadmedia(e.target.files[0])}
                  type="file"
                  id="file"
                  hidden
                 
                />
              </>
            </label>
           
            {media.map((image, index) => (
                <div className='col-12 mb-3 col-sm-6 overflow-hidden  col-md-6 ' key={index} >
                {image.mimetype === "image" ? (
              <img key={index} src={image.url} alt={`Image ${index}`} 
                style={{ 
                width: "100%" , 
                height:"15.3rem" , 
                objectFit: "cover", 
                border : tmpselectedimg[image._id] ? "2px solid blue" : ""}}  

                onClick={() => {
                    settmpselectedimg((imgdata) => {
                        const selectimg = { ...imgdata }
                        if(selectimg[image._id]){
                          delete selectimg[image._id]
                        }else{
                          selectimg[image._id] = image;
                        }
                        return selectimg
                    })
                }} />

            ) : (
                <video src={image.url} key={index} alt={`video ${index}`} muted={true} 
                style={{ width: "100%", 
                height:"15.3rem", 
                objectFit: "cover"}}  
                onMouseEnter={(e)=> {
                    e.target.play()
                }} 
                onMouseLeave={(e)=>{
                    e.target.pause()
                }}/>
            )}
            </div>
            ))}
          
          </DialogContent>

          <DialogActions>
            <Button onClick={(image)=>{
              handleClose()
              if(tmpselectedimg._id === image._id){
                setrelevantimg({})
              }
            }}>Close</Button>
            <Button onClick={(image)=>{
             Object.keys(tmpselectedimg).length === 0 ? alert("please select image") : setrelevantimg(tmpselectedimg)
            
              setOpen(false)
            }}>save</Button>
          
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
    )
}