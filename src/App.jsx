import React from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import VoiceNoteExtension from './VoiceNote';
import './App.css';

function App() {
    const editor = useEditor({
        extensions: [StarterKit, VoiceNoteExtension],
        content: `<p>Welcome to Tiptap with Voice Notes!</p>`,
    });

    const insertVoiceNote = () => {
        editor.commands.insertVoiceNote();
    };

    return (
        <div className="app-container">
            <header className="header">
                <h1>Tiptap Voice Note Extension</h1>
            </header>
            <main className="main-content">
                <button className="action-button" onClick={insertVoiceNote}>
                    Insert Voice Note
                </button>
                <div className="editor-wrapper">
                    <EditorContent editor={editor} />
                </div>
            </main>
        </div>
    );
}

export default App;
