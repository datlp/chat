import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  Input,
  InputAdornment,
  Typography,
} from "@material-ui/core";

import firebase from "firebase";
import Message from "./Message";
import db from "./firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUserName] = useState("paulle98");

  useEffect(() => {
    setUserName(prompt("What's your name?"));
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    // All the logic to send a message
    db.collection("messages").add({
      message: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { message: input, username }]);
    setInput("");
  };
  return (
    <div className="app">
      <img
        alt="app__logo"
        className="logo"
        src="https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&ccb=1-3&_nc_sid=6825c5&_nc_ohc=7FwhBlP9HlgAX8RJ8pR&_nc_ht=scontent.fsgn2-5.fna&oh=6ecbb2ce3870c51c6ef9cf6bb1d163ab&oe=60A8D87D"
      ></img>
      <Typography align="center" variant="h5">
        Welcome {username}!
      </Typography>
      <div className="app__messages">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
        </FlipMove>
      </div>
      <form>
        <FormControl className="app__form ">
          <Input
            classname="app__form "
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <SendIcon onClick={sendMessage} disabled={!input}></SendIcon>
              </InputAdornment>
            }
          ></Input>
          <Button
            style={{ display: "none" }}
            disabled={!input}
            variant="outline"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
