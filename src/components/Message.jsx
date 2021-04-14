import { Avatar, Chip } from '@material-ui/core'
import { Face } from '@material-ui/icons'
import React from 'react'
import './Message.css'

function Message({username, message}) {
    let isUser = false
    if(username === message.username){
        isUser = true
    }
    return (
        <div className="m-2 wrap" id={isUser ? 'message__user' : 'message__guest'} >
            <Chip avatar={message.username && <Avatar>{message.username[0].toUpperCase()}</Avatar>} icon={!message.username && <Face /> } label={message.text} color='primary' variant={isUser ? 'default' : 'outlined'} />
        </div>
    )
}

export default Message
