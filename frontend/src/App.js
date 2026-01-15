import React, { useState, useEffect } from 'react';
import VideoPlayer from './components/VideoPlayer';
import Overlay from './components/Overlay';
import OverlayControls from './components/OverlayControls';
import { overlayAPI } from './services/api';
import './App.css';

function App() {
  const [overlays, setOverlays] = useState([]);
  const [streamUrl, setStreamUrl] = useState('');

  // Load overlays on mount
  useEffect(() => {
    loadOverlays();
  }, []);

  const loadOverlays = async () => {
    try {
      const response = await overlayAPI.getAll();
      setOverlays(response.data);
    } catch (error) {
      console.error('Error loading overlays:', error);
    }
  };

  const addTextOverlay = async (text) => {
    try {
      const response = await overlayAPI.create({
        type: 'text',
        content: text,
        x: 50,
        y: 50,
        width: 200,
        height: 50
      });
      setOverlays([...overlays, response.data]);
    } catch (error) {
      console.error('Error adding overlay:', error);
    }
  };

  const addImageOverlay = async (url) => {
    try {
      const response = await overlayAPI.create({
        type: 'image',
        content: url,
        x: 50,
        y: 150,
        width: 150,
        height: 150
      });
      setOverlays([...overlays, response.data]);
    } catch (error) {
      console.error('Error adding overlay:', error);
    }
  };

  const updateOverlay = async (id, updates) => {
    try {
      await overlayAPI.update(id, updates);
      setOverlays(overlays.map(o => o._id === id ? { ...o, ...updates } : o));
    } catch (error) {
      console.error('Error updating overlay:', error);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      await overlayAPI.delete(id);
      setOverlays(overlays.filter(o => o._id !== id));
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  return (
    <div className="App">
      <h1>RTSP Livestream Overlay Application</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Load Video Stream</h3>
        <button
          onClick={() => setStreamUrl('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')}
          style={{ padding: '10px 20px', cursor: 'pointer', marginRight: '10px' }}
        >
          Load HLS Stream
        </button>
        <button
          onClick={() => setStreamUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Load MP4 Video
        </button>
      </div>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        {streamUrl && <VideoPlayer streamUrl={streamUrl} />}

        {overlays.map(overlay => (
          <Overlay
            key={overlay._id}
            overlay={overlay}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        ))}
      </div>

      <OverlayControls
        onAddText={addTextOverlay}
        onAddImage={addImageOverlay}
      />
    </div>
  );
}

export default App;