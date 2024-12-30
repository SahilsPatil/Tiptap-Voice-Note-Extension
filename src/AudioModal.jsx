import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import Dropzone from 'react-dropzone';

const AudioModal = ({ onInsertAudio }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);

    const startRecording = () => setIsRecording(true);
    const stopRecording = () => setIsRecording(false);

    const onStopRecording = (recordedData) => {
        setRecordedAudio(recordedData.blob);
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onInsertAudio(url);
        }
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            onInsertAudio(url);
        }
    };

    const handleInsertRecordedAudio = () => {
        if (recordedAudio) {
            const url = URL.createObjectURL(recordedAudio);
            onInsertAudio(url);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h3>Insert Audio</h3>
            <button onClick={startRecording}>Record Audio</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <ReactMic
                record={isRecording}
                onStop={onStopRecording}
                strokeColor="#000000"
                backgroundColor="#FF4081"
            />
            {recordedAudio && (
                <div>
                    <p>Audio Recorded!</p>
                    <button onClick={handleInsertRecordedAudio}>Insert Recorded Audio</button>
                </div>
            )}
            <h4>Or Upload Audio File</h4>
            <input type="file" accept="audio/*" onChange={handleUpload} />
            <h4>Or Drag & Drop Audio File</h4>
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        style={{
                            border: '2px dashed #ccc',
                            padding: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        <input {...getInputProps()} accept="audio/*" />
                        <p>Drag & drop audio file here</p>
                    </div>
                )}
            </Dropzone>
        </div>
    );
};

export default AudioModal;
