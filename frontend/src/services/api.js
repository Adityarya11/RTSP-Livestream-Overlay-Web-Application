import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const overlayAPI = {
    // Get all overlays
    getAll: () => axios.get(`${API_BASE}/overlays`),

    // Create overlay
    create: (data) => axios.post(`${API_BASE}/overlays`, data),

    // Update overlay
    update: (id, data) => axios.put(`${API_BASE}/overlays/${id}`, data),

    // Delete overlay
    delete: (id) => axios.delete(`${API_BASE}/overlays/${id}`)
};

export const streamAPI = {
    // Start stream
    start: (rtspUrl) => axios.post(`${API_BASE}/stream/start`, { rtsp_url: rtspUrl }),

    // Stop stream
    stop: () => axios.post(`${API_BASE}/stream/stop`),

    // Check status
    status: () => axios.get(`${API_BASE}/stream/status`)
};