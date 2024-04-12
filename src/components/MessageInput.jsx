import React, { useState } from 'react';
import './MessageInput.css'; // Import CSS for MessageInput component

function MessageInput({ onSubmit }) {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(message);
    setMessage(''); // Clear the message input field after submitting
  };

  return (
    <div className="message-input-container"> {/* Container for styling */}
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form> 
    </div>
  );
}

export default MessageInput;
