import { Node } from '@tiptap/core';

const VoiceNote = Node.create({
  name: 'voiceNote',

  group: 'block',

  atom: true, // Marks this as an indivisible node

  addAttributes() {
    return {
      src: {
        default: null,
      },
      transcription: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-voice-note]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { 'data-voice-note': '', class: 'voice-note' },
      [
        'audio',
        {
          controls: true,
          src: HTMLAttributes.src || '',
        },
      ],
      [
        'p',
        { class: 'transcription' },
        HTMLAttributes.transcription || '',
      ],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-voice-note', '');
      wrapper.classList.add('voice-note');

      const audio = document.createElement('audio');
      audio.setAttribute('controls', 'true');
      audio.src = node.attrs.src;

      const transcription = document.createElement('p');
      transcription.classList.add('transcription');
      transcription.textContent = node.attrs.transcription;

      wrapper.appendChild(audio);
      wrapper.appendChild(transcription);

      return {
        dom: wrapper,
      };
    };
  },
});

export default VoiceNote;



// import React, { useRef, useState } from 'react';
// import { EditorContent, useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import VoiceNote from './VoiceNote';

// function App() {
//     const editor = useEditor({
//         extensions: [StarterKit, VoiceNote],
//         content: `<p>Welcome to Tiptap with Voice Notes!</p>`,
//     });

//     const [isRecording, setIsRecording] = useState(false);
//     const [audioUrl, setAudioUrl] = useState(null);
//     const [transcription, setTranscription] = useState('');
//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const audioStreamRef = useRef(null);

//     const startRecording = async () => {
//         setIsRecording(true);

//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         audioStreamRef.current = stream; // Save stream for later cleanup
//         const mediaRecorder = new MediaRecorder(stream);

//         // MediaRecorder events
//         mediaRecorder.ondataavailable = event => {
//             if (event.data.size > 0) {
//                 audioChunksRef.current.push(event.data);
//             }
//         };

//         mediaRecorder.onstop = async () => {
//             // Stop audio stream to release the mic
//             if (audioStreamRef.current) {
//                 audioStreamRef.current.getTracks().forEach(track => track.stop());
//                 audioStreamRef.current = null;
//             }

//             // Create the audio file
//             const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//             const audioUrl = URL.createObjectURL(audioBlob);
//             setAudioUrl(audioUrl);
//             audioChunksRef.current = [];

//             // Get transcription after recording is complete
//             const transcriptionText = await getTranscription(audioBlob);
//             setTranscription(transcriptionText);

//             // Insert into editor
//             editor.chain().focus().insertContent({
//                 type: 'voiceNote',
//                 attrs: {
//                     src: audioUrl,
//                     transcription: transcriptionText || 'No transcription available.',
//                 },
//             }).run();
//         };

//         mediaRecorder.start();
//         mediaRecorderRef.current = mediaRecorder;
//     };

//     const stopRecording = () => {
//         if (mediaRecorderRef.current) {
//             mediaRecorderRef.current.stop();
//             setIsRecording(false);
//         }
//     };

//     const getTranscription = async (audioBlob) => {
//         // Check if SpeechRecognition is available
//         if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
//             return 'Transcription not supported in this browser.';
//         }

//         const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//         const recognizer = new SpeechRecognition();

//         recognizer.lang = 'en-US';
//         recognizer.interimResults = false;

//         return new Promise((resolve, reject) => {
//             const audioUrl = URL.createObjectURL(audioBlob);
//             const audio = new Audio(audioUrl);

//             audio.onplay = () => {
//                 recognizer.start();
//             };

//             recognizer.onresult = (event) => {
//                 const transcript = event.results[0][0].transcript;
//                 resolve(transcript);
//             };

//             recognizer.onerror = (error) => {
//                 reject(error);
//                 resolve('Transcription failed.');
//             };

//             audio.play();
//         });
//     };

//     return (
//         <div>
//             <h1>Tiptap Voice Note Extension</h1>
//             <button onClick={isRecording ? stopRecording : startRecording}>
//                 {isRecording ? 'Stop Recording' : 'Start Recording'}
//             </button>
//             <EditorContent editor={editor} />
//         </div>
//     );
// }

// export default App;