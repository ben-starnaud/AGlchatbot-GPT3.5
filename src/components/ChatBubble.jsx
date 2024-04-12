import React from 'react';
import './ChatBubble.css'; // Import CSS for ChatBubble component

function ChatBubble({ chat }) {
  const {message, user_identifier } = chat;

  return (
    <div className="card-body p-3 pt-0">
      <div className="my-1 rounded-lg">
        <div className="position-relative w-100">
          <div className={`border-0 ${user_identifier === 'SELF' ? 'chat-bubble-send' : 'chat-bubble-receive'}`}>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;