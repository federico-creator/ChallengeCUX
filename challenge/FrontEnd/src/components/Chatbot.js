import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #ffd1dc;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  height: calc(100% - 60px);
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 100%;
  background-color: #070806;
  position: relative;
`;

const RightColumn = styled.div`
  width: 30%;
  background-color: #2c2c2c;
  color: #ffffff;
  padding: 20px;
  overflow-y: auto;
`;

const Divider = styled.div`
  width: 5px;
  background-color: #a0e00d;
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
  color: #a0e00d;
  font-size: 24px;
`;

const PromptOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const PromptOption = styled.button`
  background: #1a1a1a;
  color: #ffffff;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid #a0e00d;
  margin-bottom: 10px;
  cursor: pointer;
`;

const NewChatButton = styled.button`
  background: none;
  border: 1px solid #a0e00d;
  color: #a0e00d;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  margin: 10px 0;
`;

const SearchHistoryContainer = styled.div`
  margin-top: 20px;
`;

const SearchHistoryTitle = styled.h2`
  color: #a0e00d;
  justify-content: center;
  align-items: center;
`;

const SearchItem = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  font-size: 20px;
  border: 1px solid #a0e00d;
  cursor: pointer;
`;

function Chatbot() {
  const { type } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState({
    clasico: [],
    astrologia: [],
    romance: [],
    trabajo: []
  });
  const [showPromptOptions, setShowPromptOptions] = useState(true);
  const messagesEndRef = useRef(null);

  const promptOptions = [
    "hola",
    "Hoy me siento medio mal",
    "que me recomiendas el día de hoy",
    "me pregunto cual es el sentido de la vida",
    "crees que todo va a salir bien"
  ];

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chatbot/history/${type}`);
        if (response.data) {
          const validMessages = response.data.flatMap(chat => chat.messages || []);
          setMessages(validMessages);
          setShowPromptOptions(false);
        }
        console.log('Chat history fetched:', response.data.length); 
        if (response.data.length == 0) {
          setShowPromptOptions(true);
        }
        else{
          setShowPromptOptions(false);
        }
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory();
  }, [type]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (event, text) => {
    event.preventDefault();
    const messageText = text || inputText;
    if (messageText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: messageText,
        user: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
      setShowPromptOptions(false);

      try {
        console.log('Sending message:', messageText);
        const response = await axios.post(`http://localhost:5000/chatbot/${type}`, {
          userInput: messageText
        });
        console.log('Chatbot response:', response.data); 
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

  const startNewChat = () => {
    const currentChat = [...messages];
    if (currentChat.length > 0) {
      setChatHistory(prevHistory => ({
        ...prevHistory,
        [type]: [
          ...prevHistory[type],
          {
            id: prevHistory[type].length + 1,
            messages: currentChat,
            firstMessage: currentChat[0].text
          }
        ]
      }));
    }
    setMessages([]);
    setShowPromptOptions(true);
  };

  /* const GuardarChatEnCambio = (newType) => {
    const currentChat = [...messages];
    if (currentChat.length > 0) {
      setChatHistory(prevHistory => ({
        ...prevHistory,
        [type]: [
          ...prevHistory[type],
          {
            id: prevHistory[type].length + 1,
            messages: currentChat,
            firstMessage: currentChat[0].text
          }
        ]
      }));
    }
    setMessages([]);
    setShowPromptOptions(true);
    navigate(`/chatbot/${newType}`);
  }; 
  No pude resolverlo, tiene que venir como parametro*/

  const selectChat = (chatId) => {
    const currentChat = [...messages];
    console.log(`este es el mesnaje antes del cambio: ${currentChat.length} `);
    if (currentChat.length > 0) {
      setChatHistory(prevHistory => ({
        ...prevHistory,
        [type]: [
          ...prevHistory[type],
          {
            id: prevHistory[type].length + 1,
            messages: currentChat,
            firstMessage: currentChat[0].text
          }
        ]
      }));
    }

    const selectedChat = chatHistory[type].find(chat => chat.id === chatId);
    if (selectedChat) {
      setChatHistory(prevHistory => ({
        ...prevHistory,
        [type]: prevHistory[type].filter(chat => chat.id !== chatId)
      }));
      setMessages(selectedChat.messages);
      setShowPromptOptions(false);
    }
  };

  return (
    <PageContainer>
      <MainContent>
        <ChatContainer>
          <MessagesContainer>
            {Message.length !== 0 ? console.log(`esto tiene el mesnaje ${Message}`) : console.log("La longitud del mensaje es 0")}
            {showPromptOptions && (
              <PromptOptions>
                {promptOptions.map((option, index) => (
                  <PromptOption key={index} onClick={(e) => sendMessage(e, option)}>
                    {option}
                  </PromptOption>
                ))}
              </PromptOptions>
            )}
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
              <SendButton type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </SendButton>
            </form>
          </InputContainer>
        </ChatContainer>
        <Divider />
        <RightColumn>
          <NewChatButton onClick={startNewChat}>Nuevo Chat</NewChatButton>
          <SearchHistoryContainer>
            <SearchHistoryTitle>Historial de Chats</SearchHistoryTitle>
            {chatHistory[type].slice().reverse().map((chat) => (
              <SearchItem key={chat.id} onClick={() => selectChat(chat.id)}>
                {chat.firstMessage}
              </SearchItem>
            ))}
          </SearchHistoryContainer>
        </RightColumn>
      </MainContent>
    </PageContainer>
  );
}

export default Chatbot;
