import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import Theatreheader from "./Theatreheader";
import Chat from "./ChatComponents/Chat";
import useTheatre from "./useTheatre";

import theatreaxios from "./theatreaxios";

var yt_event_listener = null;

function Theatre({ roomTopicID, mediaPath, owner }) {
  const [videoUrl, setVideoUrl] = useState(mediaPath);
  const [videoCode, setVideoCode] = useState("");

  const { evente, sendEvent } = useTheatre(roomTopicID);

  useEffect(() => {
    if (videoUrl) {
      console.log(videoUrl + "While joining to theatre");
      setVideoCode(videoUrl.split("v=")[1].split("&")[0]);
    }
  }, []);

  const initializeVideoCode = () => {
    if (videoUrl) {
      setVideoCode(videoUrl.split("v=")[1].split("&")[0]);
      sendEvent({
        action: "ChangeMedia",
        timeStamp: videoUrl,
      });
      const body = {
        mediaPath: videoUrl,
        roomTopicId: roomTopicID,
      };
      const bearerToken = "Bearer " + localStorage.access_token;
      const url = "/api/addMedia";
      theatreaxios
        .put(url, body, {
          headers: {
            "Content-type": "application/json",
            Authorization: bearerToken,
          },
        })
        .then((res) => {
          const parseRes = res.data;
          console.log(parseRes);
        });
    }
  };

  function playVideo(timeStamp) {
    if (yt_event_listener != null) {
      yt_event_listener.target.seekTo(timeStamp, true);
      yt_event_listener.target.playVideo();
    }
  }

  function pauseVideo(timeStamp) {
    if (yt_event_listener != null) {
      // yt_event_listener.target.seekTo(timeStamp, true);
      yt_event_listener.target.pauseVideo();
    }
  }

  function newJoin() {
    if (yt_event_listener != null) {
      if (owner) {
        const playerState = yt_event_listener.target.playerInfo.playerState;
        if (playerState === 1) yt_event_listener.target.pauseVideo();
        else if (playerState === 2) yt_event_listener.target.playVideo();
        else yt_event_listener.target.playVideo();
      }
    }
  }

  useEffect(() => {
    console.log("Change of Event Hapend");
    if (evente != null || evente !== undefined) {
      if (evente.action === "Play") playVideo(parseFloat(evente.timeStamp));
      else if (evente.action === "Pause")
        pauseVideo(parseFloat(evente.timeStamp));
      else if (evente.action === "NewJoin") newJoin();
      else if (evente.action === "ChangeMedia") {
        // setVideoUrl(evente.timeStamp);
        console.log(
          "Video URL after change Media",
          evente.timeStamp,
          typeof evente.timeStamp
        );
        const url = evente.timeStamp;
        setVideoCode(url.split("v=")[1].split("&")[0]);
      }
    }
  }, [evente]);

  const onReadyVideo = (e) => {
    console.log("Setting Event Listener");
    yt_event_listener = e;
  };

  const videoPauseEvent = (e) => {
    const currentTime = e.target.getCurrentTime();
    sendEvent({
      action: "Pause",
      timeStamp: currentTime,
    });
  };

  const videoPlayEvent = (e) => {
    const currentTime = e.target.getCurrentTime();
    sendEvent({
      action: "Play",
      timeStamp: currentTime,
    });
  };

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <Theatreheader></Theatreheader>
      <div class="container">
        <div class="row">
          <h1 class="header-dark">Theatre</h1>
          <h4 class="header-dark">Room Id: {roomTopicID} </h4>{" "}
          <p>share this roomID for your friends your friends</p>
          <div class="col-md-12 col-lg-8">
            <p>Input your YouTube video URL here:</p>
            <div class="url-input">
              <input
                className="col-9"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <button
                className="col-3"
                type="button"
                onClick={initializeVideoCode}
              >
                Submit
              </button>
            </div>
            <YouTube
              videoId={videoCode}
              containerClassName="embed embed-youtube"
              onPlay={(e) => videoPlayEvent(e)}
              onPause={(e) => videoPauseEvent(e)}
              onReady={(e) => onReadyVideo(e)}
              opts={opts}
            />
          </div>
          <div class="col-md-12 col-lg-4">
            <Chat></Chat>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theatre;
