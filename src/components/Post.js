import React, { useState }  from 'react'
import axios from 'axios'
import Navbar from './Navbar'

const Post = () => {
    const [responseData, setResponseData] = useState()
    const [requestId, setRequestId] = useState()
    const [showResult, setShowResult] = useState(false)

    const [selectedFiles, setSelectedFiles] = useState([]);
    const handleFileChange = (e) => {
       setSelectedFiles([...e.target.files]);
    };
    const handleUpload = async () => {
       if (selectedFiles.length === 0) {
          alert('Please select files first');
          return;
       }
       const formData = new FormData();
       selectedFiles.forEach((file) => {
          formData.append('files', file);
       });
 
       const response = await axios.post(
         `http://192.168.60.9:8089/upload`,
         formData,
       );
       console.log(response)
       setResponseData(response.data)
       setShowResult(true)
    };

    return (
      <>
        <Navbar/>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'center',flexDirection: 'column', gap: '20px', height: '80vh', marginTop: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '10px', width: '47%' }}>
            <h2>Upload files api</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '10px', width: '50%' }}>
          <input type="file" multiple onChange={handleFileChange} />
         <button className="btn" style={{backgroundColor : '#2d5485', color : '#fff'}} onClick={handleUpload}>Upload</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', width: '47%', gap: '10px' }}>
            <p style={{fontWeight :  'bold'}}>URL :</p>
            {/* <input type="text" class="form-control" id="url" placeholder="Enter request id" style={{ width: '70%' }} />
            <button id="submit" className="btn btn-primary">
              copy
            </button> */}
            <p>https://192.168.60.9:8089/upload</p>
          </div>
          <div style={{ width: '10px', display: 'flex', justifyContent: 'space-between', width: '47%' }}>
            <p style={{fontWeight :  'bold'}}>Response :</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <button id="submit" className="btn" style={{backgroundColor :  '#71a5e5' , color : '#fff'}} >
                JSON
              </button>
            </div>
          </div>
          <div style={{ width: '47%' }}>
                <pre style={{height : '300px', overflowY : 'scroll', display : `${showResult === true ? 'block' : 'none'}`}}>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        </div>
  
  
      </>
    )
}

export default Post