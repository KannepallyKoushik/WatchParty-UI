import React, { useEffect, useState } from "react";

import Theatre from "./Theatre";
import theatreaxios from "./theatreaxios";

function JoinTheatre() {
  const [load, setLoad] = useState(false);
  const [mediaPath, setMediaPath] = useState();
  const [roomIDD, setRoomIDD] = useState();
  useEffect(() => {
    const roomID = prompt("Enter the Room ID you want to join");
    setRoomIDD(roomID);
    const body = {
      roomTopicId: roomID,
    };
    const bearerToken = "Bearer " + localStorage.access_token;
    const url = "/api/joinRoom";
    theatreaxios
      .post(url, body, {
        headers: {
          "Content-type": "application/json",
          Authorization: bearerToken,
        },
      })
      .then((res) => {
        const parseRes = res.data;
        console.log(parseRes);
        setMediaPath(parseRes.mediaPath);
        setRoomIDD(roomID);
        setLoad(true);
      });
  }, []);
  return load ? (
    <Theatre
      roomTopicID={roomIDD}
      mediaPath={mediaPath}
      owner={false}
    ></Theatre>
  ) : (
    <div></div>
  );
}

export default JoinTheatre;
