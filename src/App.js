import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import "./App.css";
import Message from "./components/Message";
import db from "./firebase";
import firebase from "firebase";
import { Send as SendIcon } from "@material-ui/icons";
function App() {
  const [username, setName] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // fire up when form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      setMessages([...messages, { username: username, text: input }]);
      db.collection("messenger").add({
        username: username,
        text: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    // create the input field after adding
    setInput("");
    // scroll messaege box top
    document.getElementById("message-box").scrollTop = document.getElementById(
      "message-box"
    ).scrollHeight;
  };

  useEffect(() => {
    db.collection("messenger")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  useEffect(() => {
    // runs once when app loads if dependency is empty
    setName(prompt("Please enter you name"));
  }, []);

  return (
    <div className="App">
      <h1 className="mt-2 text-center">Facebook Messenger 🚀 !</h1>
      <img
        src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=128&h=128"
        alt="messenger"
      />

      <div id="message-box" className="mt-5">
        {messages.map((message, index) => (
          <Message key={index} username={username} message={message} />
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className="text-center stick-bottom mt-2 App__form"
      >
        <Input
          className="App__input"
          id="my-input"
          aria-describedby="my-helper-text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type you message..."
        />
        <IconButton type="submit" className="App__send" color="primary">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
}
export default App;
