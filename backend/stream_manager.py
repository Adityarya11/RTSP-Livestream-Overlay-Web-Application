import subprocess
import os
import signal
import atexit

class StreamManager:
    def __init__(self):
        self.process = None
        self.stream_dir = os.path.join(os.path.dirname(__file__), 'stream')
        os.makedirs(self.stream_dir, exist_ok=True)
        atexit.register(self.stop_stream)
    
    def start_stream(self, rtsp_url):
        """Start FFmpeg HLS conversion"""
        if self.process:
            self.stop_stream()
        
        output_path = os.path.join(self.stream_dir, 'index.m3u8')
        
        # FFmpeg command to convert RTSP to HLS
        command = [
            'ffmpeg',
            '-rtsp_transport', 'tcp',
            '-i', rtsp_url,
            '-c:v', 'copy',
            '-c:a', 'aac',
            '-f', 'hls',
            '-hls_time', '2',
            '-hls_list_size', '3',
            '-hls_flags', 'delete_segments',
            output_path
        ]
        
        try:
            self.process = subprocess.Popen(
                command,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            return True, "Stream started successfully"
        except Exception as e:
            return False, str(e)
    
    def stop_stream(self):
        """Stop FFmpeg process"""
        if self.process:
            try:
                self.process.send_signal(signal.SIGTERM)
                self.process.wait(timeout=5)
            except:
                self.process.kill()
            finally:
                self.process = None
    
    def is_running(self):
        """Check if stream is running"""
        return self.process is not None and self.process.poll() is None

# Global instance
stream_manager = StreamManager()