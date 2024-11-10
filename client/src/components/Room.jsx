import React from "react";

const Room = ({
  username,
  room,
  setUsername,
  setRoom,
  setChatScreen,
  socket,
}) => {
  const sendRoom = () => {
    socket.emit("room", room);
    setChatScreen(true);
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className=" w-1/2 h-[300px] bg-indigo-600 flex flex-col  space-y-4 py-3 px-5 rounded-lg shadow-md shadow-indigo-400">
        <h1 className="font-bold text-3xl my-4 text-center text-gray-400">
          Welcome to Chat
        </h1>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Username"
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Room"
        />
        <div
          onClick={sendRoom}
          className="text-white h-12 pt-2 text-xl text-center   rounded-xl bg-indigo-900 cursor-pointer  hover:opacity-70 tracking-wider"
        >
          Let's Start Chat
        </div>
      </div>
    </div>
  );
};

export default Room;
