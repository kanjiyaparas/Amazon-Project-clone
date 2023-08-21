import React from 'react'
import  { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

export default function DashBoard() {
  const editorRef = useRef(null);
  const log = () => {
  if (editorRef.current) {
      console.log(editorRef.current.getContent());
  }
};
const handleImageUpload = async(blobInfo, success, failure) => {
  const formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());
  try {
    const result = await axios.post("http://localhost:5000/admin/upload", formData)
    let path = result.data.media.path
    path = `http://localhost:5000${path}`
    console.log(path)
    
    setTimeout(()=>{
      console.log("u67u6u66")
      return success(path)
    },500)
  } catch (error) {
    console.log(error)
  }
  
  // axios.post('http://localhost:5000/admin/upload', formData).then((response) => {
      
  //     success(response.data.Media);
    
  //   }).catch((error) => {
   
  //     failure('Image upload failed. Please try again later.');
  //   });
};


const editorConfig = {
  height: 500,
  images_upload_handler: handleImageUpload,

  // Other TinyMCE configuration options can be added here
};
  return (
    // <div>Homescreen</div>
    <>
    <Editor
        apiKey='pfslezhfceo05a2eada79zz1b5fzlq1bqrcamv0r3b3wqs4i'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          ...editorConfig,
          plugins:"image",
          file_picker_types:"image",
        }}
    />
    <button onClick={log}>Log editor content</button>
    </>
  )
}
