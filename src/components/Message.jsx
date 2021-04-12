import { Avatar, Chip } from '@material-ui/core'
import { Face } from '@material-ui/icons'
import React from 'react'

function Message({message}) {
    return (
        <div className='m-2' >
            <Chip avatar={message.name && <Avatar>{message.name[0].toUpperCase()}</Avatar>} icon={!message.name && <Face /> } label={message.text} color='primary' variant="outlined" />
        </div>
    )
}

export default Message
