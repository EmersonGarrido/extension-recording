import React, { useState } from 'react';

function App() {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { mediaSource: 'screen' }
    });
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    recorder.start();
    setRecording(true);

    // Grava por 15 segundos
    setTimeout(() => {
      recorder.stop();
      setRecording(false);
      // Limpa a stream
      stream.getTracks().forEach(track => track.stop());
    }, 15000);

    recorder.ondataavailable = e => {
      const url = URL.createObjectURL(e.data);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'recording.webm';
      a.click();
      window.URL.revokeObjectURL(url);
    };
  };

  console.log(mediaRecorder)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Screen Recorder</h1>
        <button onClick={startRecording} disabled={recording}>
          {recording ? 'Recording...' : 'Start Recording'}
        </button>
      </header>
    </div>
  );
}

export default App;
