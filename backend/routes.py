from flask import Blueprint, request, jsonify
from bson import ObjectId
from config import get_overlays_collection
from models import Overlay
from stream_manager import stream_manager

api = Blueprint('api', __name__)
overlays_collection = get_overlays_collection()

@api.route('/overlays', methods=['POST'])
def create_overlay():
    """Create a new overlay"""
    try:
        data = request.get_json()
        
        # Validate data
        valid, error = Overlay.validate(data)
        if not valid:
            return jsonify({"error": error}), 400
        
        # Create overlay document
        overlay = Overlay.create(
            type=data["type"],
            content=data["content"],
            x=data.get("x", 0),
            y=data.get("y", 0),
            width=data.get("width", 100),
            height=data.get("height", 50)
        )
        
        # Insert into database
        result = overlays_collection.insert_one(overlay)
        overlay["_id"] = result.inserted_id
        
        # Return serialized overlay
        return jsonify(Overlay.serialize(overlay)), 201
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/overlays', methods=['GET'])
def get_overlays():
    """Get all overlays"""
    try:
        overlays = list(overlays_collection.find())
        serialized = [Overlay.serialize(overlay) for overlay in overlays]
        return jsonify(serialized), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/overlays/<id>', methods=['GET'])
def get_overlay(id):
    """Get a single overlay by ID"""
    try:
        overlay = overlays_collection.find_one({"_id": ObjectId(id)})
        
        if not overlay:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify(Overlay.serialize(overlay)), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/overlays/<id>', methods=['PUT'])
def update_overlay(id):
    """Update an overlay"""
    try:
        data = request.get_json()
        
        # Validate partial data
        valid, error = Overlay.validate(data, partial=True)
        if not valid:
            return jsonify({"error": error}), 400
        
        # Prepare update data
        update_fields = {}
        allowed_fields = ["type", "content", "x", "y", "width", "height"]
        
        for field in allowed_fields:
            if field in data:
                update_fields[field] = data[field]
        
        if not update_fields:
            return jsonify({"error": "No valid fields to update"}), 400
        
        # Update in database
        result = overlays_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": update_fields}
        )
        
        if result.matched_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        
        # Return updated overlay
        updated_overlay = overlays_collection.find_one({"_id": ObjectId(id)})
        return jsonify(Overlay.serialize(updated_overlay)), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/overlays/<id>', methods=['DELETE'])
def delete_overlay(id):
    """Delete an overlay"""
    try:
        result = overlays_collection.delete_one({"_id": ObjectId(id)})
        
        if result.deleted_count == 0:
            return jsonify({"error": "Overlay not found"}), 404
        
        return jsonify({"deleted": True, "id": id}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/stream/start', methods=['POST'])
def start_stream():
    """Start RTSP stream conversion"""
    try:
        data = request.get_json()
        rtsp_url = data.get('rtsp_url')
        
        if not rtsp_url:
            return jsonify({"error": "rtsp_url is required"}), 400
        
        success, message = stream_manager.start_stream(rtsp_url)
        
        if success:
            return jsonify({
                "status": "started",
                "message": message,
                "hls_url": "http://localhost:5000/stream/index.m3u8"
            }), 200
        else:
            return jsonify({"error": message}), 500
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/stream/stop', methods=['POST'])
def stop_stream():
    """Stop RTSP stream conversion"""
    try:
        stream_manager.stop_stream()
        return jsonify({"status": "stopped"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/stream/status', methods=['GET'])
def stream_status():
    """Check stream status"""
    return jsonify({
        "running": stream_manager.is_running()
    }), 200