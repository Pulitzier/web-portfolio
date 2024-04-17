// ChatBot.js
import React, { useState } from "react";
import axios from "axios";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

const ChatBot = () => {
  const [message, setMessage] = useState("");

  const handleNewUserMessage = async (newMessage) => {
    try {
      const response = await axios.post("/webhook", { message: newMessage });
      const { fulfillmentText } = response.data;
      addResponseMessage(fulfillmentText);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </div>
  );
};

export default ChatBot;
