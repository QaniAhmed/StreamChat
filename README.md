# 🚀 StreamChat | Multimodal Real-Time Communication System

StreamChat is a high-performance, full-stack messaging application designed for instant, rich-media communication. It leverages **WebSockets** for bi-directional data streaming and **React** for a modular, event-driven frontend.

## 🌟 Core Features & Implementation

### 📸 Optimized Image Sharing (`ImageBtn`)

- **Base64 Encoding**: Uses the `FileReader` API to convert client-side images into Data URLs for seamless transmission.
- **Server-Side Compression**: Integrated with a backend utility (`ResizedBase64`) to optimize image resolution before broadcasting, reducing bandwidth overhead.
- **Ownership Tracking**: Automatically attaches `sender_id` from `localStorage` to ensure correct UI alignment (Right vs. Left).

### 🎙️ Voice Messaging (`RecordeBtn`)

- **MediaRecorder API**: Captures high-quality audio directly from the browser's microphone.
- **Chunked Data Processing**: Utilizes `audioChunks` to manage data streams efficiently before finalizing a `Blob`.
- **Binary-to-Base64 Conversion**: Converts audio blobs into strings for transmission over the WebSocket protocol, supporting native playback via Data URLs.

### ⚡ Real-Time Dynamics

- **WebSocket Heartbeat**: Persistent connection maintained via `useRef` for low-latency messaging.
- **Identity Integrity**: Every payload (Text, Voice, Image) is mapped to a `userId`, enabling a "sent vs. received" visual distinction.
- **Typing Awareness**: Real-time broadcast of "User is typing..." status via a synchronized timeout mechanism.

## 🛠 Technical Stack

| Layer           | Technologies                                              |
| :-------------- | :-------------------------------------------------------- |
| **Frontend**    | React, CSS3 Modules                                       |
| **Networking**  | WebSocket API, Axios (HTTP Onboarding)                    |
| **Backend**     | Node.js, Express.js, `ws` (WebSocket Server)              |
| **Media APIs**  | MediaRecorder API, FileReader API, Navigator MediaDevices |
| **Persistence** | PostgreSQL (Supabase), Browser LocalStorage               |

🚀 Getting Started

1. Server Environment
   Bash
   cd server
   npm install
   node index.js

2. Client Environment
   Bash
   cd client
   npm install
   npm run dev
