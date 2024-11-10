import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Room from "./components/Room";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5003");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, setChatScreen] = useState(false);
  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
          setChatScreen={setChatScreen}
          socket={socket}
        />
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
