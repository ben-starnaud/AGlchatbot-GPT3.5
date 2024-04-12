import React, { useState } from 'react';
import './App.css'; // Import CSS for App component
import MessageInput from './components/MessageInput'; // Import MessageInput component
import ChatBubble from './components/ChatBubble'; // Import ChatBubble component

import OpenAI from 'openai'; // Import OpenAI

const openai = new OpenAI({ apiKey: '', dangerouslyAllowBrowser: true }); // Replace 'your_api_key_here' with your actual OpenAI API key

function App() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    setMessages([...messages, { message, user_identifier: 'SELF' }]);
  
    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: 'gpt-3.5-turbo',
      });
  
      console.log('OpenAI Response:', completion); // Log the OpenAI API response
  
      // Check if completion object and choices array exist
      if (
        completion &&
        Array.isArray(completion.choices) &&
        completion.choices.length > 0 &&
        completion.choices[0].message &&
        completion.choices[0].message.content
      ) {
        // Extract AI response from the first choice
        const aiResponse = completion.choices[0].message.content;
  
        // Append AI response to messages
        setMessages((prevMessages) => [
          ...prevMessages,
          { message: aiResponse, user_identifier: 'AI' },
        ]);
      } else {
        console.error(
          'Error: Invalid response from OpenAI API - Missing data property',
          completion
        );
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: 'Error: Invalid response from OpenAI API',
            user_identifier: 'SYSTEM',
          },
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: 'Error: Failed to fetch response from OpenAI API',
          user_identifier: 'SYSTEM',
        },
      ]);
    }
  };
  
  

  return (
    <div className="App">
      <MessageInput onSubmit={handleSendMessage} />
      {messages.map((chat, index) => (
        <ChatBubble key={index} chat={chat} />
      ))}
    </div>
  );
}

export default App;
