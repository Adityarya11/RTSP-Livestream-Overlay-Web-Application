# User Guide

Complete guide for using the RTSP Livestream Overlay Application.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Playing Videos](#playing-videos)
3. [Managing Overlays](#managing-overlays)
4. [Advanced Features](#advanced-features)
5. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

Before using the application, ensure:

- ✅ Backend server is running at `http://localhost:5000`
- ✅ Frontend is running at `http://localhost:3000`
- ✅ MongoDB is running
- ✅ FFmpeg is installed (for RTSP streams)

### First Time Setup

1. Open browser and navigate to `http://localhost:3000`
2. You'll see the main application page with video player area
3. No overlays will be present initially

---

## Playing Videos

The application supports three methods of video playback:

### Method 1: Quick Test with HLS Stream (Recommended)

**Best for**: Immediate testing without setup

1. Click the **"Load HLS Stream"** button
2. Video begins playing within 2-3 seconds
3. You can now add overlays on top of the video

**Advantages**:

- Instant playback
- No configuration needed
- Reliable streaming

---

### Method 2: Load MP4 Video

**Best for**: Testing with standard video files

1. Click the **"Load MP4 Video"** button
2. Sample video (Big Buck Bunny) loads immediately
3. Standard video controls (play, pause, volume) are available

---

### Method 3: RTSP Stream Conversion

**Best for**: Demonstrating RTSP capability

#### Step 1: Get an RTSP URL

**Option A: Use Public Test Stream**

```
rtsp://rtsp.stream/pattern
```

**Option B: Create Custom Stream**

1. Visit https://rtsp.me
2. Upload any video file
3. Copy the generated RTSP URL

#### Step 2: Start Stream

1. Paste RTSP URL into the input field
2. Click "Start RTSP Stream" button
3. Wait 10-15 seconds for conversion
4. Video will begin playing

**What's Happening**:

- FFmpeg converts RTSP → HLS in the backend
- HLS files are generated in `backend/stream/`
- Browser plays the HLS stream using HLS.js

---

## Managing Overlays

### Adding Text Overlays

1. Locate the **"Add Text Overlay"** section
2. Type your text in the input field
   - Example: `"LIVE"`, `"Breaking News"`, `"Channel Logo"`
3. Click the **"Add Text"** button
4. Text appears on the video at default position (50, 50)

**Default Properties**:

- Position: (50, 50)
- Size: 200×50 pixels
- Background: Semi-transparent black
- Text Color: White

---

### Adding Image Overlays

1. Locate the **"Add Image Overlay"** section
2. Enter a valid image URL
   - Example: `https://via.placeholder.com/150`
   - Example: `https://example.com/logo.png`
3. Click the **"Add Image"** button
4. Image appears on the video

**Supported Formats**:

- PNG, JPG, JPEG, GIF, SVG
- Must be publicly accessible URL
- HTTPS recommended

**Image URL Examples**:

```
https://via.placeholder.com/150
https://via.placeholder.com/200x100/FF0000/FFFFFF?text=LOGO
https://i.imgur.com/your-image.png
```

---

### Moving Overlays (Drag)

1. **Click** on any overlay
2. **Hold** the mouse button
3. **Drag** to new position
4. **Release** to drop
5. Position automatically saves to database

**Tips**:

- Click anywhere on the overlay box
- Cursor changes to "move" icon
- Overlays stay within video boundaries

---

### Resizing Overlays

1. **Hover** over bottom-right corner of overlay
2. Corner shows a **resize handle**
3. **Click and drag** the handle
4. **Release** to set new size
5. Size automatically saves to database

**Constraints**:

- Minimum size: 50×30 pixels
- Maximum size: Video dimensions

---

### Deleting Overlays

1. **Hover** over the overlay you want to delete
2. Click the **red "×" button** in top-right corner
3. Overlay is immediately removed
4. Deletion is saved to database

**Note**: This action cannot be undone.

---

## Advanced Features

### Real-Time Updates

All overlay changes are saved in real-time:

| Action         | Database Update          |
| -------------- | ------------------------ |
| Add overlay    | Immediately saved        |
| Drag overlay   | Saved on mouse release   |
| Resize overlay | Saved on resize complete |
| Delete overlay | Immediately deleted      |

### Data Persistence

**Your overlays persist across sessions**:

1. Add overlays and position them
2. Close the browser
3. Reopen `http://localhost:3000`
4. Click "Load HLS Stream" or "Load MP4 Video"
5. Your overlays appear in saved positions

**Storage Location**: MongoDB database `rtsp_overlay_db`

---

### Multiple Overlays

You can add **unlimited overlays**:

1. Add multiple text overlays
2. Add multiple image overlays
3. Mix text and images
4. Each overlay is independently movable and resizable

**Example Use Case**:

```
[Logo Image] (Top-left)
[LIVE Text] (Top-right)
[Channel Name Text] (Bottom-left)
[Sponsor Logo] (Bottom-right)
```

---

### Video Controls

Built-in HTML5 video controls:

- ▶️ **Play/Pause**: Click video or use spacebar
- 🔊 **Volume**: Click volume icon and drag slider
- ⏩ **Seek**: Drag progress bar (for non-live content)
- 🖵 **Fullscreen**: Click fullscreen icon

---

## Troubleshooting

### Video Not Loading

**Problem**: Clicked "Load HLS Stream" but nothing happens

**Solutions**:

1. Check browser console (F12) for errors
2. Verify backend is running: `curl http://localhost:5000/`
3. Try "Load MP4 Video" instead
4. Refresh the page

---

### RTSP Stream Not Working

**Problem**: Entered RTSP URL but video doesn't play

**Solutions**:

1. **Wait longer**: Stream conversion takes 10-15 seconds
2. **Verify RTSP URL**: Test in VLC Media Player first
   - Open VLC → Media → Open Network Stream
   - Paste RTSP URL
   - If VLC can't play it, URL is invalid
3. **Check FFmpeg**: Run `ffmpeg -version` in terminal
4. **Check backend logs**: Look for FFmpeg errors in terminal
5. **Use alternative**: Try HLS/MP4 buttons instead

---

### Overlays Not Saving

**Problem**: Overlays disappear after refresh

**Solutions**:

1. **Check MongoDB**: Run `mongod` to start database
2. **Verify connection**: Check backend terminal for errors
3. **Test API manually**:

```bash
   curl http://localhost:5000/api/overlays
```

4. **Check browser console**: Look for network errors (F12)

---

### Overlay Won't Move

**Problem**: Can't drag overlay

**Solutions**:

1. Click on the overlay **box**, not the text/image
2. Ensure cursor shows "move" icon
3. Try clicking a different part of the overlay
4. Refresh the page

---

### Overlay Won't Resize

**Problem**: Can't resize overlay

**Solutions**:

1. Hover over **bottom-right corner**
2. Look for resize handle (diagonal arrows)
3. Click and drag from exact corner
4. If still not working, delete and recreate overlay

---

### Image Overlay Shows Broken Icon

**Problem**: Image overlay displays broken image icon

**Solutions**:

1. **Check URL**: Paste URL directly in browser
2. **Verify accessibility**: Image must be publicly accessible
3. **Check CORS**: Some images block cross-origin requests
4. **Use tested URLs**:

```
   https://via.placeholder.com/150
   https://via.placeholder.com/200x100
```

---

## Keyboard Shortcuts

Currently, no keyboard shortcuts are implemented. All interactions are mouse-based.

---

## Performance Tips

### For Best Performance:

1. **Limit overlays**: 10-15 overlays maximum
2. **Optimize images**: Use compressed images
3. **Image size**: Keep images under 500KB
4. **Close unused tabs**: Browser performance matters
5. **Use HLS/MP4**: Faster than RTSP conversion

---

## Common Workflows

### Workflow 1: Quick Demo

```
1. Open http://localhost:3000
2. Click "Load MP4 Video"
3. Add text overlay: "LIVE"
4. Drag to top-right corner
5. Add image: https://via.placeholder.com/100
6. Resize image to smaller
7. Demo complete
```

### Workflow 2: RTSP Production Setup

```
1. Get RTSP URL from camera/source
2. Test RTSP URL in VLC first
3. Enter URL in application
4. Click "Start RTSP Stream"
5. Wait for stream initialization
6. Add required overlays (logo, text, etc.)
7. Position and size overlays
8. Ready for production
```

### Workflow 3: Creating Broadcast Graphics

```
1. Load video source
2. Add channel logo (image overlay, top-left)
3. Add "LIVE" indicator (text overlay, top-right)
4. Add ticker/news text (text overlay, bottom)
5. Add sponsor logo (image overlay, bottom-right)
6. Adjust sizes and positions
7. Test with different videos
```

---

## API Integration

If you want to programmatically manage overlays, use the REST API:

**Example: Add overlay via JavaScript**

```javascript
fetch("http://localhost:5000/api/overlays", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type: "text",
    content: "AUTO-GENERATED",
    x: 100,
    y: 100,
  }),
})
  .then((res) => res.json())
  .then((data) => console.log("Created:", data));
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

---

## Getting Help

If you encounter issues:

1. Check this guide first
2. Check [README.md](README.md) for setup issues
3. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API issues
4. Review browser console (F12) for errors
5. Review backend terminal for server errors

---

## Feature Requests

This application supports the core required features. Additional features can be added based on requirements.

---

**Last Updated**: January 2026
