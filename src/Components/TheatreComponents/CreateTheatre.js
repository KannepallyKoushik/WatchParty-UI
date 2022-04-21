import React, { useEffect, useState } from "react";

import theatreaxios from "./theatreaxios";
import Theatre from "./Theatre";

function CreateTheatre() {
  const [load, setLoad] = useState(false);
  const [roomTopicID, setRoomTopicID] = useState("");
  const [mediaPath, setMediaPath] = useState("");
  useEffect(() => {
    const body = {
      roomTitle: "SOA_Watch_PartyRoom" + Math.random * 10000,
      mediaPath: "",
    };
    const bearerToken = "Bearer " + localStorage.access_token;
    const url = "/api/createRoom";
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
        setRoomTopicID(parseRes.roomTopicId);
        setMediaPath(parseRes.mediaPath);
        setLoad(true);
      });
  }, []);

  return load ? (
    <Theatre
      roomTopicID={roomTopicID}
      mediaPath={mediaPath}
      owner={true}
    ></Theatre>
  ) : (
    <div></div>
  );
}

export default CreateTheatre;
