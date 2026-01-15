# User Guide

## Quick Start

1. **Backend**: Run `python app.py` (starts at `http://localhost:5000`).
2. **Frontend**: Run `npm start` (opens `http://localhost:3000`).

## Video Playback

- **HLS Stream (Recommended)**: Click "Load HLS Stream" for immediate playback.
- **RTSP Stream**: Enter an RTSP URL (e.g., `rtsp://rtsp.stream/pattern`) and click "Start RTSP Stream". Wait 10-15s for the video to start.

## Overlay Management

- **Create**: Use the control panel to add Text or Image overlays.
- **Move**: Click and drag any overlay to reposition it.
- **Resize**: Drag the bottom-right corner of an overlay to resize it.
- **Delete**: Click the red "×" button on the overlay.
- **Save**: All changes are automatically saved to the database.

## Troubleshooting

- **Video not playing?** Ensure FFmpeg is installed and the RTSP URL is valid.
- **Overlays not saving?** Ensure MongoDB is running.
