import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Message = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.user === 'Chatbot' ? 'flex-start' : 'flex-end')};
  max-width: 80%;
  font-size: 18px;
  position: relative;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #070806;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 5px;
  border: 3px solid #a0e00d;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
`;

const SendButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

function Chatbot({ match }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const chatType = match.params.type;

  useEffect(() => {
    // Fetch chat history for the specific chat type
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`/api/chatbot/history/${chatType}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [chatType]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (event) => {
    event.preventDefault();
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        user: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');

      try {
        const response = await axios.post('/api/chatbot', {
          userInput: inputText,
          chatType,
        });
        const botMessage = {
          id: messages.length + 2,
          text: response.data.chatbotResponse,
          user: 'Chatbot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error sending message to chatbot:', error);
      }
    }
  };

  return (
    <PageContainer>
      <MessagesContainer>
        {messages.map((msg) => (
          <Message key={msg.id} user={msg.user}>
            {msg.text}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <InputContainer>
        <form onSubmit={sendMessage} style={{ display: 'flex', width: '100%' }}>
          <Input
            type="text"
            placeholder="Escribe aquí tu mensaje"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <SendButton type="submit">Enviar</SendButton>
        </form>
      </InputContainer>
    </PageContainer>
  );
}

export default Chatbot;