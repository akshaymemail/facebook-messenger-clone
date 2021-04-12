import { Button, FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
function App() {
  const [name,setName] = useState('')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  // fire up when form is submitted
  const handleSubmit = e => {
    e.preventDefault()
    if(input){
      setMessages([{name : name, text : input}, ...messages])
    }
    // create the input field after adding 
    setInput('')
  }

  useEffect(() => {
    // runs once when app loads if dependency is empty 
    setName(prompt('Please enter you name'))
  },[])

  return (
    <div className="App">
      <h1 className='mt-5' >Facebook Messenger 🚀 !</h1>
      <form onSubmit={handleSubmit} >
        <FormControl >
          <InputLabel htmlFor="my-input">Type Message</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={input} onChange={ e => setInput(e.target.value)} />
          <FormHelperText id="my-helper-text">
            You can also press Enter to send message
          </FormHelperText>
          <Button type='submit' className='mt-3' variant='outlined' color='primary' >Send Message</Button>
        </FormControl>
      </form>
      <div className='mt-5' >
        {
          messages.map((message, index) => <Message key={index} message={message} />)
        }
      </div>
    </div>
  );
}
export default App;
