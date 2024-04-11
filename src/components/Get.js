import axios from 'axios'
import React, { useState } from 'react'

const Get = () => {
  const [responseData, setResponseData] = useState()
  const [requestId, setRequestId] = useState()
  const [toggleResonseType, setToggleResponseType] = useState('JSON')

  const getResponse = () => {
    console.log('outside api')
    axios.get(`https://fakestoreapi.com/products/${requestId}`).then((response) => {
      console.log('inside api')
      setResponseData(response.data)
      setToggleResponseType('JSON')
    })
  }
  return (
    <>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent : 'center',flexDirection: 'column', gap: '20px', height: '80vh', marginTop: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', gap: '10px', width: '47%' }}>
          {/* <h4>Get particular result</h4> */}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '10px', width: '60%' }}>
          <input type="text" class="form-control" id="url" placeholder="Enter request id" style={{ width: '72%' }} onChange={(e) => setRequestId(e.target.value)} />
          <button className="btn" style={{backgroundColor : '#2d5485', color : '#fff'}} onClick={() => getResponse()} >
            GET
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', width: '47%', gap: '10px' }}>
          <p style={{fontWeight :  'bold'}}>URL :</p>
          {/* <input type="text" class="form-control" id="url" placeholder="Enter request id" style={{ width: '70%' }} />
          <button id="submit" className="btn btn-primary">
            copy
          </button> */}
          <p>https://speakintResult/{requestId}</p>
        </div>
        <div style={{ width: '10px', display: 'flex', justifyContent: 'space-between', width: '47%' }}>
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
        <div style={{ width: '47%' }}>
          {
            toggleResonseType === 'JSON' ?
              <pre>{JSON.stringify(responseData, null, 2)}</pre>
              :
              <p>Graphical representation</p>
          }
        </div>
      </div>


    </>
  )
}

export default Get