import React, { useState, useEffect } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Home() {
  let video = document.getElementById("video");

  const [voiceOn, setVoiceOn] = useState(true);
  const [message, setMessage] = useState("");
  const [promptConfirm, setPromptConfirm] = useState("");

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
  });

  const commands = [
    {
      command: "Jarvis",
      //callback: () => setMessage("How may I assist you?"),
    },
    {
      command: "Play",
      callback: () => video.playVideo(),
    },
    {
      command: "Pause",
      callback: () => video.pause(),
    },
    {
      command: "Rewind",
      callback: () => (video.currentTime -= 10),
    },
    {
      command: "Fast Forward",
      callback: () => (video.currentTime += 10),
    },
    {
      command: "Mute",
      callback: () => (video.muted = true),
    },
    {
      command: "Unmute",
      callback: () => (video.muted = false),
    },
    {
      command: "clear",
      callback: ({ resetTranscript }) => resetTranscript(),
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  //console.log(transcript);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const listen = () => {
    SpeechRecognition.startListening({ continuous: true });
    setVoiceOn(true);
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    setVoiceOn(false);
  };

  const submitPrompt = () => {
    setPromptConfirm("Prompt Sumbitted");
    setTimeout(function () {
      setPromptConfirm("");
    }, 2000);
  };

  return (
    <div>
      <div>
        {!voiceOn ? (
          <button onClick={listen} className="voice-button">
            Turn On Voice Command
          </button>
        ) : (
          <button onClick={stopListening} className="voice-button">
            Turn Off Voice Command
          </button>
        )}
      </div>
      <div>{message}</div>
      <div>{transcript}</div>
      <button onClick={submitPrompt}>Submit</button>
      <div>{promptConfirm}</div>
    </div>
  );
}

export default Home;
