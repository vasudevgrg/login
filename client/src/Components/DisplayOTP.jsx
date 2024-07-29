import React from 'react'

const DisplayOTP = ({setShowDisplayModal, otp}) => {
  return (
    <>
    <div className='modal-wrapper' onClick={()=>setShowDisplayModal(false)}></div>
    <div className='modal-container'>
   <h1>{otp}</h1>
    </div>
    </>
  )
}

export default DisplayOTP