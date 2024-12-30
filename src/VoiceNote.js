import { Node } from '@tiptap/core';
import './App.css'

const VoiceNoteExtension = Node.create({
    name: 'voiceNote',

    group: 'block',
    atom: true,

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
                HTMLAttributes.transcription || 'No transcription available.',
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

    addCommands() {
        return {
            insertVoiceNote:
                () =>
                    ({ editor }) => {
                        navigator.mediaDevices
                            .getUserMedia({ audio: true })
                            .then((stream) => {
                                const mediaRecorder = new MediaRecorder(stream);
                                const audioChunks = [];

                                mediaRecorder.ondataavailable = (event) => {
                                    if (event.data.size > 0) {
                                        audioChunks.push(event.data);
                                    }
                                };

                                mediaRecorder.onstop = async () => {

                                    stream.getTracks().forEach((track) => track.stop());


                                    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                                    const audioUrl = URL.createObjectURL(audioBlob);


                                    const transcriptionText = await VoiceNoteExtension.transcribeAudio(audioBlob);


                                    editor.chain().focus().insertContent({
                                        type: 'voiceNote',
                                        attrs: {
                                            src: audioUrl,
                                            transcription: transcriptionText || 'No transcription available.',
                                        },
                                    }).run();
                                };

                                mediaRecorder.start();


                                setTimeout(() => {
                                    mediaRecorder.stop();
                                }, 5000);
                            })
                            .catch((error) => {
                                console.error('Error accessing microphone:', error);
                            });

                        return true;
                    },
        };
    },
});


VoiceNoteExtension.transcribeAudio = async (audioBlob) => {

    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
        return 'Transcription not supported in this browser.';
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognizer = new SpeechRecognition();

    recognizer.lang = 'en-US';
    recognizer.interimResults = false;

    return new Promise((resolve) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);

        recognizer.onresult = (event) => {
            resolve(event.results[0][0].transcript);
        };

        recognizer.onerror = () => {
            resolve('Transcription failed.');
        };

        recognizer.onend = () => {
            audio.remove();
        };

        audio.onplay = () => {
            recognizer.start();
        };

        audio.play();
    });
};

export default VoiceNoteExtension;
