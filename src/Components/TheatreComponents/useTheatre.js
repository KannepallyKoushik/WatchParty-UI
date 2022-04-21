import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_NEW_EVENT_CHANGE_MESSAGE = "newEventChangeMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";

const useTheatre = (roomTopicID) => {
  const [evente, setEvent] = useState();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomTopicID },
    });

    socketRef.current.on(NEW_NEW_EVENT_CHANGE_MESSAGE, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      console.log(incomingMessage);
      if (!incomingMessage.ownedByCurrentUser) setEvent(incomingMessage.body);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomTopicID]);

  const sendEvent = (eventData) => {
    socketRef.current.emit(NEW_NEW_EVENT_CHANGE_MESSAGE, {
      body: eventData,
      senderId: socketRef.current.id,
    });
  };

  return { evente, sendEvent };
};

export default useTheatre;
