# RTSP Livestream Overlay Web Application

A full-stack web application that plays RTSP livestreams and allows users to create, manage, and display custom overlays on top of the video in real-time.

## 🎯 Features

- **RTSP Stream Playback**: Plays livestream from RTSP sources via FFmpeg HLS conversion
- **Real-time Overlays**: Add text and image overlays on top of video
- **Drag & Resize**: Freely movable and resizable overlays
- **Persistent Storage**: All overlay configurations saved to MongoDB
- **CRUD APIs**: Complete REST API for overlay management

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Database**: MongoDB
- **Frontend**: React
- **Video Streaming**: FFmpeg (RTSP → HLS conversion)
- **Libraries**:
  - HLS.js (video playback)
  - react-draggable (drag functionality)
  - react-resizable (resize functionality)
  - Axios (API calls)

## 📋 Prerequisites

Before running this application, ensure you have:

- **Python** installed
- **Node.js** and npm installed
- **MongoDB** installed and running
- **FFmpeg** installed (for RTSP stream conversion)

**Check FFMPEG:**

```bash
ffmpeg -version
```

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd rtsp-overlay-app
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start MongoDB (if not already running)
mongod

# Run Flask server
python app.py
```

Backend will start at: **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start React development server
npm start
```

Frontend will open at: **http://localhost:3000**

## 🎮 Usage

### Playing a Livestream

#### Option 1: Direct HLS/MP4 (Quick Test)

1. Click "Load HLS Stream" or "Load MP4 Video" buttons
2. Video plays immediately

#### Option 2: RTSP Stream Conversion

1. Enter an RTSP URL in the input field
   - Example: `rtsp://rtsp.stream/pattern`
   - Or use: https://rtsp.me to create a temporary RTSP stream
2. Click "Start RTSP Stream"
3. Wait 10-15 seconds for FFmpeg to convert the stream
4. Video will begin playing

### Managing Overlays

#### Add Text Overlay

1. Enter text in "Add Text Overlay" input
2. Click "Add Text" button
3. Overlay appears on video

#### Add Image Overlay

1. Enter image URL in "Add Image Overlay" input
   - Example: `https://via.placeholder.com/150`
2. Click "Add Image" button
3. Image overlay appears on video

#### Move Overlay

- Click and drag any overlay to reposition

#### Resize Overlay

- Drag the bottom-right corner to resize

#### Delete Overlay

- Click the red "×" button on any overlay

### Data Persistence

All overlays are automatically saved to MongoDB. When you refresh the page, overlays will reappear in their saved positions.

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Overlays

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/overlays`     | Get all overlays   |
| GET    | `/overlays/:id` | Get single overlay |
| POST   | `/overlays`     | Create new overlay |
| PUT    | `/overlays/:id` | Update overlay     |
| DELETE | `/overlays/:id` | Delete overlay     |

### Streaming

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/stream/start`  | Start RTSP stream conversion |
| POST   | `/stream/stop`   | Stop stream conversion       |
| GET    | `/stream/status` | Check stream status          |

**See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for detailed API reference with examples.**

## 📁 Project Structure

```
rtsp-overlay-app/
├── backend/
│   ├── app.py              # Flask application entry point
│   ├── routes.py           # API routes
│   ├── models.py           # Data models
│   ├── config.py           # MongoDB configuration
│   ├── stream_manager.py   # FFmpeg stream management
│   ├── requirements.txt    # Python dependencies
│   └── stream/             # HLS output folder (auto-generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── VideoPlayer.js      # Video player component
│   │   │   ├── Overlay.js          # Overlay component
│   │   │   └── OverlayControls.js  # Control panel
│   │   ├── services/
│   │   │   └── api.js              # API service layer
│   │   ├── App.js                  # Main application
│   │   └── App.css                 # Styles
│   └── package.json
│
├── README.md
├── API_DOCUMENTATION.md
└── USER_GUIDE.md
```

## 🔧 Configuration

### Changing RTSP URL

**Method 1: Via Frontend UI**

- Enter RTSP URL in the input field and click "Start RTSP Stream"

**Method 2: Via API**

```bash
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{"rtsp_url":"rtsp://your-stream-url"}'
```

### MongoDB Connection

Edit `backend/config.py` to change MongoDB URI:

```python
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "rtsp_overlay_db"
```

Or create `backend/.env`:

```
MONGO_URI=mongodb://localhost:27017/
```

## 🧪 Testing

### Test Backend APIs

```bash
# Health check
curl http://localhost:5000/

# Create overlay
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"Test","x":100,"y":100}'

# Get all overlays
curl http://localhost:5000/api/overlays
```

### Verify MongoDB

```bash
mongosh
use rtsp_overlay_db
db.overlays.find().pretty()
```

## 🐛 Troubleshooting

### Video Not Playing

- **Check FFmpeg**: Run `ffmpeg -version` to verify installation
- **Check RTSP URL**: Test URL in VLC Media Player first
- **Wait Time**: FFmpeg conversion takes 10-15 seconds
- **Try Direct Stream**: Use HLS/MP4 buttons for immediate playback

### Overlays Not Saving

- **Check MongoDB**: Ensure MongoDB is running (`mongod`)
- **Check Backend**: Verify Flask is running without errors
- **Check Console**: Open browser DevTools → Console for errors

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## 📦 Dependencies

### Backend (Python)

```
Flask==3.0.0
Flask-CORS==4.0.0
pymongo==4.6.0
python-dotenv==1.0.0
```

### Frontend (Node.js)

```
react
axios
hls.js
react-draggable
react-resizable
```
