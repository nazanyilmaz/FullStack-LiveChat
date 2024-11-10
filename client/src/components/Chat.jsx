import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  useEffect(() => {
    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });
  }, [socket]);

  const sendMessage = async () => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      timestamp: Date.now(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);
    setMessage("");
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const minutesAgo = Math.floor((now - timestamp) / 60000);
    return minutesAgo > 0 ? `${minutesAgo} min. ago` : "now";
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/2 h-[600px]  bg-gray-200 relative">
        <div className="w-full h-16 bg-indigo-600 flex items-center p-2">
          <div className="w-36 h-12 bg-white rounded-full text-md font-bold text-indigo-600 py-3 px-4">
            Socket Chat
          </div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => {
              return (
                <div
                  className={`${
                    username === msg.username ? "flex justify-end" : ""
                  }`}
                  key={i}
                >
                  <div
                    className={`w-1/2 h-14 ${
                      username === msg.username ? "bg-blue-600" : "bg-green-600"
                    } text-white  m-2 px-3 py-1 rounded-3xl rounded-br-none`}
                  >
                    <div>{msg.message}</div>
                    <div className="w-full flex justify-end text-xs">
                      <span>{msg.username}</span>
                      <span className="ml-2 text-xs text-gray-300">
                        {formatTimeAgo(msg.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className=" absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="message send"
            className="w-3/4 h-12  py-1 px-3 outline-none"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 bg-indigo-600 text-white h-12 hover:opacity-70 cursor-pointer"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
