import axios from 'axios'
import React, { useState } from 'react'
import Navbar from './Navbar'

const Get = () => {
  const [responseData, setResponseData] = useState()
  const [analyzeResponseData, setAnalyzeResponseData] = useState()

  const [requestId, setRequestId] = useState()
  const [analyzeRequestId, setAnalyzeRequestId] = useState()
  const [toggleResonseType, setToggleResponseType] = useState('JSON')

  const [wordImageUrl, setWordImageUrl] = useState('');
  
  const getResponse = () => {
    console.log('outside api')
    axios.get(`http://192.168.60.9:8089/result_text/${requestId}`).then((response) => {
      console.log(response)
      setResponseData(response.data)
    })
  }

  const getAnalyzedData = () => {
    console.log('outside api')
    axios.get(`http://192.168.60.9:8089/data_analyse/${analyzeRequestId}`).then((response) => {
      console.log(response)
      setAnalyzeResponseData(response.data)
      convertToWordCldImg(response.data[0].WordCloud_Path)
      setToggleResponseType('JSON')
    })
  }


  const convertToWordCldImg = (img) => {
    // Convert the Base64 string to a Blob
    const byteCharacters = atob(img);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob);
    setWordImageUrl(imageUrl);
  }

  return (
    <>
      <Navbar/>
      <div style={{ display: 'flex', alignItems: 'center', width : '97vw',gap: '20px', height: '85vh', overflow : 'hidden',marginTop: '10px' }}>

      <div style={{ width : '50%', height : '100%', padding : '20px', display : 'flex', flexDirection : 'column', gap : '20px'}}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', gap: '10px', width: '100%' }}>
            <h2>Get translated and transcribed text</h2>
          </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', gap: '10px', width: '100%' }}>
          <input autoComplete='off' type="text" class="form-control" id="url" placeholder="Enter RequestCode" style={{ width: '90%' }} onChange={(e) => setRequestId(e.target.value)} />
          <button className="btn" style={{backgroundColor : '#2d5485', color : '#fff'}} onClick={() => getResponse()} >
            GET
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', width: '100%', gap: '10px' }}>
          <p style={{fontWeight :  'bold'}}>URL :</p>
          {/* <input type="text" class="form-control" id="url" placeholder="Enter request id" style={{ width: '70%' }} />
          <button id="submit" className="btn btn-primary">
            copy
          </button> */}
          <p>http://192.168.60.9:8089/result_text/{requestId}</p>
        </div>
        <div style={{ width: '10px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <p style={{fontWeight :  'bold'}}>Response :</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button id="submit" className="btn" style={{backgroundColor : '#71a5e5', color : `${toggleResonseType === 'JSON' ? '#fff' : 'black'}`}} onClick={() => setToggleResponseType('JSON')}>
              JSON
            </button>
          </div>
        </div>
        <div style={{ width: '100%' }}>
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
        </div>

          {/* Sentiment, ner, wordcloud */}
        <div style={{ width : '50%', height : '100%', padding : '20px', display : 'flex', flexDirection : 'column', gap : '20px'}}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', gap: '10px', width: '100%' }}>
            <h2>Get Sentiment, Ner, Wordcloud</h2>
          </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', gap: '10px', width: '100%' }}>
          <input autoComplete='off' type="text" class="form-control" id="url" placeholder="Enter RequestCode" style={{ width: '90%' }} onChange={(e) => setAnalyzeRequestId(e.target.value)} />
          <button className="btn" style={{backgroundColor : '#2d5485', color : '#fff'}} onClick={() => getAnalyzedData()} >
            GET
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', width: '100%', gap: '10px' }}>
          <p style={{fontWeight :  'bold'}}>URL :</p>
          {/* <input type="text" class="form-control" id="url" placeholder="Enter request id" style={{ width: '70%' }} />
          <button id="submit" className="btn btn-primary">
            copy
          </button> */}
          <p>http://192.168.60.9:8089/data_analyse/{analyzeRequestId}</p>
        </div>
        <div style={{ width: '10px', display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <p style={{fontWeight :  'bold'}}>Response :</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button id="submit" className="btn" style={{backgroundColor : `${toggleResonseType === 'JSON' ? '#71a5e5' : '#fff'}`, color : `${toggleResonseType === 'JSON' ? '#fff' : 'black'}`}} onClick={() => setToggleResponseType('JSON')}>
              JSON
            </button>
            <button id="submit" className="btn" style={{backgroundColor : `${toggleResonseType === 'GRAPHICAL' ? '#71a5e5' : '#fff'}`, color : `${toggleResonseType === 'GRAPHICAL' ? '#fff' : 'black'}`}} onClick={() => setToggleResponseType('GRAPHICAL')}>
              GRAPHIC
            </button>
          </div>
        </div>
        <div style={{ width: '100%' }}>
          {
            toggleResonseType === 'JSON' ?
              <pre>{JSON.stringify(analyzeResponseData, null, 2)}</pre>
              :
              <div style={{height : '350px', overflowY : 'auto'}}>
              <p style={{fontSize: 'bold'}}>Wordcloud</p>
              <img src={wordImageUrl} style={{ height: '300px', width: '100%', cursor : 'pointer' }}></img>
              </div>
          }
        </div>
        </div>
      </div>


    </>
  )
}

export default Get