from datetime import datetime
from bson import ObjectId

class Overlay:
    """Overlay data model"""
    
    @staticmethod
    def create(type, content, x=0, y=0, width=100, height=50):
        """Create a new overlay document"""
        return {
            "type": type,
            "content": content,
            "x": x,
            "y": y,
            "width": width,
            "height": height,
            "createdAt": datetime.utcnow()
        }
    
    @staticmethod
    def serialize(overlay):
        """Convert MongoDB document to JSON-serializable dict"""
        if overlay is None:
            return None
        
        overlay["_id"] = str(overlay["_id"])
        overlay["createdAt"] = overlay["createdAt"].isoformat()
        return overlay
    
    @staticmethod
    def validate(data, partial=False):
        """Validate overlay data"""
        if not partial:
            if "type" not in data or data["type"] not in ["text", "image"]:
                return False, "Invalid or missing type"
            if "content" not in data or not data["content"]:
                return False, "Content is required"
        
        # Validate numeric fields if present
        numeric_fields = ["x", "y", "width", "height"]
        for field in numeric_fields:
            if field in data:
                try:
                    data[field] = int(data[field])
                except (ValueError, TypeError):
                    return False, f"{field} must be a number"
        
        return True, None