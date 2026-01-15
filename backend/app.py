from flask import Flask, send_from_directory
from flask_cors import CORS
from routes import api
import os

app = Flask(__name__)
CORS(app)

# Register API blueprint
app.register_blueprint(api, url_prefix='/api')

# Serve HLS stream files
STREAM_DIR = os.path.join(os.path.dirname(__file__), 'stream')
os.makedirs(STREAM_DIR, exist_ok=True)

@app.route('/stream/<path:filename>')
def serve_stream(filename):
    """Serve HLS stream files"""
    return send_from_directory(STREAM_DIR, filename)

@app.route('/')
def health():
    """Health check endpoint"""
    return {"status": "Backend is running", "message": "RTSP Overlay API"}, 200

if __name__ == '__main__':
    print("Starting Flask server...")
    print("API available at: http://localhost:5000/api")
    print("Stream available at: http://localhost:5000/stream")
    app.run(debug=True, host='0.0.0.0', port=5000)