import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
const LobbyScreen = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    socket.emit('room:join', {email, room});

    console.log(email, room);
  }, [email, room, socket]);
   
  const handleJoinRoom = useCallback((data) =>{
    const {email, room} = data;
    console.log(email, room);
    navigate(`/room/${room}`)
  },[navigate]);

  useEffect(()=>{
     socket.on('room:join', handleJoinRoom );
     return() =>{
      socket.off('room:join', handleJoinRoom);
     }
  }, [socket, handleJoinRoom]);


  return (
    <>
      <div>
        <h1>Lobby</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email ID</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label htmlFor="room">Room ID</label>
          <input type="text" id="room" value={room} onChange={(e) => setRoom(e.target.value)} />
          <br />
          {/* Change type to "submit" to trigger the form submission */}
          <button type="submit">Join</button>
        </form>
      </div>
    </>
  );
};

export default LobbyScreen;
