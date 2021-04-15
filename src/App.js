import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import db from "./firebase";
import firebase from 'firebase'
function App() {
  const [username,setName] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  // fire up when form is submitted
  const handleSubmit = e => {
    e.preventDefault()
    if(input){
      setMessages([...messages, {username : username, text : input}])
      db.collection('messenger').add({
        username : username,
        text: input,
        timestamp : firebase.firestore.FieldValue.serverTimestamp()
      })
    }
    // create the input field after adding 
    setInput('')
    // scroll messaege box top 
    document.getElementById('message-box').scrollTop = document.getElementById('message-box').scrollHeight
  }

  useEffect(() => {
    db.collection('messenger').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    // runs once when app loads if dependency is empty 
    setName(prompt('Please enter you name'))
  },[])

  return (
    <div className="App">
      <h1 className='mt-5 text-center' >Facebook Messenger 🚀 !</h1>
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=180&h=399" alt='messenger' />

      <div id='message-box' className='mt-5' >
        {
          messages.map((message, index) => <Message key={index} username={username} message={message} />)
        }
      </div>
      <form onSubmit={handleSubmit} className='text-center stick-bottom' >
        <FormControl >
          <InputLabel htmlFor="my-input">Type Message</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={input} onChange={ e => setInput(e.target.value)} />
          <FormHelperText id="my-helper-text">
            You can also press Enter to send message
          </FormHelperText>
          <Button type='submit' className='mt-3' variant='outlined' color='primary' >Send Message</Button>
        </FormControl>
      </form>
    </div>
  );
}
export default App;
