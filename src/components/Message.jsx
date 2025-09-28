import React, { useEffect } from "react";
import { assets } from "../assets/assets";
import moment from "moment";
import Markdown from 'react-markdown';

import Prism from 'prismjs'

const Message = ({ message }) => {
  Prism.highlightAll()

  useEffect(()=>{


  },[message.content])

  // Validate message object
  if (!message || !message.content) {
    return null; // or return a placeholder
  }

  const content = String(message.content).trim();

  const renderContent = () => {
    if (message.isImage) {
      return (
        <img
          src={content}
          alt=""
          className="w-full max-w-md mt-2 rounded-md"
        />
      );
    }

    // For non-image content, check if it's valid for markdown
    if (content && content.length > 0) {
      return (
        <div className="text-sm dark:text-primary reset-tw">
          <Markdown>{content}</Markdown>
        </div>
      );
    }

    return <p className="text-sm dark:text-primary">No content</p>;
  };

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={assets.user_icon} alt="" className="w-8 rounded-full" />
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {renderContent()}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;