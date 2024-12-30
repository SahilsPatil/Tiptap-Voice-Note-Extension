# **🎙️ Tiptap Voice Note Extension**

Welcome to the **Tiptap Voice Note Extension**! This powerful, easy-to-use extension allows users to insert voice notes directly into the [Tiptap](https://tiptap.dev/) rich-text editor. It’s perfect for creating interactive, audio-embedded documents with seamless transcription support.

---

## **🌟 Features**
- 🎧 **Insert Voice Notes**: Record audio directly from your browser and embed it into the editor.
- 📜 **Real-Time Transcription**: Automatically transcribe audio to text (powered by browser speech recognition).
- 🎨 **Custom Styling**: Clean and professional design for an intuitive user experience.
- ⚡ **Fast and Lightweight**: Built on Tiptap's StarterKit, ensuring performance and simplicity.

---

## **🚀 Getting Started**

### **1️⃣ Installation**

To get started, clone the repository and install dependencies:

```bash
git clone https://github.com/SahilsPatil/Tiptap-Voice-Note-Extension.git
cd tiptap-voice-note-extension
npm install
```

---

### **2️⃣ Usage**

#### **Start the Development Server**
Run the app locally with:

```bash
npm start
```

#### **Record and Embed Voice Notes**
1. Click the **"Insert Voice Note"** button.
2. Record your audio (5 seconds max).
3. The voice note with transcription will be added directly to the editor.

---

## **🛠️ Implementation**

### **Core Files**
1. **`App.js`**:
   - Main component housing the Tiptap editor and custom button for inserting voice notes.
2. **`VoiceNoteExtension.js`**:
   - Implements the voice note functionality, including:
     - Audio recording.
     - Transcription.
     - Embedding into the Tiptap editor.

### **Styling**
All styles are handled via `App.css`, ensuring a clean and modern UI. Key features include:
- Professional fonts and hover effects.
- Subtle animations for interactivity.
- Responsive design for various screen sizes.

---

## **📸 Screenshots**

### **Editor UI**
![image](https://github.com/user-attachments/assets/16425509-c466-4043-964c-99bf931b8a65)


### **Voice Note Block**
![image](https://github.com/user-attachments/assets/2dc6ae64-d894-4ded-917e-98519eda08ab)


---

## **📋 Dependencies**
- **React**: Core framework for building the UI.
- **Tiptap**: Rich-text editor used as the foundation.
- **Browser APIs**:
  - `MediaRecorder` for audio recording.
  - `SpeechRecognition` for transcription.

