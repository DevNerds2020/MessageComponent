import React from 'react'
const Message = (props) => {
  return (
    <div className="message-container">
        {props.messageData.tocontactinfo}
        <div  
          dangerouslySetInnerHTML={{ __html: props.messageData.messagebody }}
        >
        </div>
        {console.log(props.messageData.messagebody)}
        <button onClick={props.close}>Cancel</button>
    </div>
  )
}

export default Message