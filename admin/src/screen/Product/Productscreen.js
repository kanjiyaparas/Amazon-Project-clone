import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Editor } from '@tinymce/tinymce-react';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import ImageDialog from './ImageDialog';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import apiHelper from '../../commen/ApiHelper';
import MultiDialog from './MultiDialog';

export default function Productscreen() {
    const [media, setMedia] = useState([]);
    const [futureimg,setfutereimg] = useState({})
    const [relevantimg,setrelevantimg] = useState([])
    const [submited,setissubmited] = useState(false)
    const [Error,setError] = useState(false)
    const [product, setproduct] = useState({
        title:"",
        Brand:"",
        alias:"",
        price:0,
        description:"",
        countInstock:0,
        discount:0,
        totalprice:0
    })
    const fetchMediaFromBackend = async () => {
        try {
          const response = await apiHelper.fetchmedia()
          setMedia(response.data.media); 
         
          // Assuming response contains media data
        } catch (error) {
          console.error('Fetch media error:', error);
        }
      };

      const productHandler = async () => {
        try {
            product.Featureimg = futureimg._id
            product.relevantimg = Object.values(relevantimg)
            product.totalprice = product.price - (product.price * (product.discount / 100))
            console.log(product)
            const result = await apiHelper.Addproduct(product)

        } catch (error) {
            console.log(error);
        }
    }


      
      useEffect(()=>{
        console.log("paras")
        fetchMediaFromBackend()
      },[])

    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7">
                    <h2>Add new Post</h2>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex">
                    <Switch />
                    <p className='mt-2'>Published</p>
                </div>
                <div className="col-12 col-sm-6 col-md-2">
                    <Button variant="outlined" onClick={productHandler}>Add Product</Button>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Product Name</p>
                    <TextField id="outlined-basic" placeholder='Product Name' className='w-100' variant="outlined" 
                    
                    onChange={(e)=>{
                        setproduct({...product , title:e.target.value})
                    }}
                    
                    />

                    
                    
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Brand</p>
                    <TextField id="outlined-basic" placeholder='Brand' className='w-100' variant="outlined" 
                      onChange={(e)=>{
                        setproduct({...product , Brand:e.target.value})
                    }} />
                </div>

                <div className="col-12 col-md-4">
                    <p className='fw-bold mb-0'>Alias</p>
                    <TextField id="outlined-basic" placeholder='Alias' className='w-100' variant="outlined"  
                    
                    onChange={(e)=>{
                        setproduct({...product , alias:e.target.value})
                    }}

                    />
                </div>
            </div>

            <div className="container">
                <div className="row mt-3">
                    <div className="col-12 col-md-8">
                        <p className='fw-bold mb-1'>Description</p>
                        <Editor
                            // onInit={(evt, editor) => contentRef.current = editor}
                            // initialValue={postData.content}
                            apiKey="0br1siz57qb0y7dwnxtzccahui7x0el1mj2ygoziavfnzohu"
                            init={{
                                selector: 'textarea',
                                height: 486,
                                mobile: {
                                    theme: 'mobile',
                                    plugins: 'autosav5e lists autolink',
                                    toolbar: 'undo bold italic styleselect'
                                },
                                menubar: true,
                                plugins: ['print preview paste importcss searchreplace autolink save directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',],
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor code codesample | ltr rtl',
                                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }',
                                images_upload_handler: async (blobInfo, success, failure, _) => {
                                    const file = blobInfo.blob()
                                    let formdata = new FormData()
                                    formdata.append("file", file)
                                    const body = formdata
                                    const data = await axios.post("http://localhost:5000/admin/upload",body)
                                    if (data.status === 200) {
                                        success(data.data.media.url)
                                        fetchMediaFromBackend()
                                    }
                                }
                            }}
                            onKeyUp={(content, editor) => {
                                setproduct({ ...product, description: editor.getContent() })
                            }}
                           
                        />
                    </div>

                    <div className="col-12 col-md-4">
                        <p className='fw-bold mb-1'>Upload Media</p>
                        <div htmlFor='file' className='mb-2' style={{ width: "100%", height: "180px", border: "1px solid gray", overflow:"hidden"}}>
                            {
                                futureimg._id && (
                                    <img src={futureimg.url} width={"100%"} height={"100%"} />
                                )
                            }
                             </div>
                        <ImageDialog media={media} fetchMediaFromBackend={fetchMediaFromBackend} setfutereimg={setfutereimg}/>
                        <MultiDialog media={media} fetchMediaFromBackend={fetchMediaFromBackend} setrelevantimg={setrelevantimg} />
                        {/* <Button variant="contained" className='w-100'>ADD FEATURE IMAGE</Button> */}

                        <TextField id="outlined-basic" className='w-100 mt-3' label="Price" variant="outlined"  
                          onChange={(e)=>{
                            setproduct({...product , price:e.target.value})
                        }}
                        />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="discount" variant="outlined" 
                          onChange={(e)=>{
                            setproduct({...product , discount:e.target.value})
                        }}
                        />
                        <TextField id="outlined-basic" className='w-100 mt-3' label="countInstock" variant="outlined" 
                         
                         onChange={(e)=>{
                            setproduct({...product , countInstock:e.target.value})
                        }}
                        
                        />
                    </div>
                </div>
            </div>

        </>
    )
}