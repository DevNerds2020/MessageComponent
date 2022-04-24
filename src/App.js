import React from 'react'
import { useState } from 'react';
import { data } from './data';
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsTelephoneOutbound, BsReplyFill, BsReplyAllFill } from "react-icons/bs";
import Dialog from '@mui/material/Dialog';
import Input from './Input';
import Message from './Message';
import moment from "moment-jalaali";

// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import image from './image.png'
import './App.css'
function App() {
  const [mydatas, setMydatas] = useState(data.data)
  const [openInput, setOpenInput] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const handleClickOpen = () => {
    setOpenInput(true);
  };
  const handleClose = () => {
    setOpenInput(false);
  };
  const handleClickMessageOpen = () => {
    setOpenMessage(true);
  };
  const handleMessageClose = () => {
    setOpenMessage(false);
  };
  const convertDate = (date) => {
    const d = new Date(date)
    new Intl.DateTimeFormat('fa-IR', {dateStyle: 'full', timeStyle: 'long'}).format(d)
  }
  const handleStar = (id) => {
      const data = mydatas.find(mydata=> mydata.uniqueid === id)
      console.log(data)
      data.isImportant = !data.isImportant
      setMydatas([...mydatas])
  }
  return (
    <div className='main-container' id="container">
      <Dialog open={openInput} onClose={handleClose}>
        <Input />
      </Dialog>
      {mydatas.map((mydata)=>
        <div className='message-container' key={mydata.uniqueid}>
           <Dialog open={openMessage} onClose={handleMessageClose} fullWidth>
              <Message messageData={mydata} close={handleMessageClose}/>
           </Dialog>
          <div className='right-container'>
            <div className='icon-container'>
              {/* <Popup trigger={<button>hello</button>} position="right-center">
                <div>my pop up screen</div>
              </Popup> */}
              <BsTelephoneOutbound color='red' className='icon'/>
                {mydata.isImportant 
                  ? <AiFillStar color='#FFDB58' className='icon' onClick={() => handleStar(mydata.uniqueid)}/>
                  :  <AiOutlineStar className='icon' onClick={() => handleStar(mydata.uniqueid)}/>
                }
                <BsReplyAllFill className='icon' onClick={handleClickOpen}/>
                <BsReplyFill className='icon' onClick={handleClickOpen}/>
            </div>
            <div className='time-container'>
              {new Intl.DateTimeFormat('fa-IR', {dateStyle: 'full', timeStyle: 'long'}).format(new Date(mydata.createdate))}
            </div>
          </div>
          <div className='left-container'  onClick={handleClickMessageOpen}>
            <div className='image-container'>
              <img className="avatar" src={image} width={'85px'}></img>
            </div>
            <div className='message-info-container'>
              <div>
                <div className='contact-info-container'>
                  {mydata.contactinfo}
                  <div className='label-container'>
                    <div className='label' style={{backgroundColor:`${mydata.lablecolor1}` }}/>
                    <div className='label' style={{backgroundColor:`${mydata.lablecolor2}` }}/>
                    <div className='label' style={{backgroundColor:`${mydata.lablecolor3}` }}/>
                  </div>
                </div>
              </div>
              <div className='subject-container'>
                {mydata.subject}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
