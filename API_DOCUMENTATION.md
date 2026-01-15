# API Documentation

Complete REST API reference for RTSP Livestream Overlay Application.

**Base URL**: `http://localhost:5000/api`

---

## Table of Contents

1. [Overlay Management](#overlay-management)
2. [Stream Management](#stream-management)
3. [Data Models](#data-models)
4. [Error Handling](#error-handling)

---

## Overlay Management

### 1. Get All Overlays

Retrieve all overlay configurations from the database.

**Endpoint**: `GET /overlays`

**Request**:

```bash
curl http://localhost:5000/api/overlays
```

**Response** (200 OK):

```json
[
  {
    "_id": "6967b37909e912904883f9c1",
    "type": "text",
    "content": "Hello World",
    "x": 100,
    "y": 200,
    "width": 200,
    "height": 50,
    "createdAt": "2026-01-14T15:17:13.293000"
  },
  {
    "_id": "6967b45a09e912904883f9c2",
    "type": "image",
    "content": "https://example.com/logo.png",
    "x": 50,
    "y": 150,
    "width": 150,
    "height": 150,
    "createdAt": "2026-01-14T15:20:42.158000"
  }
]
```

---

### 2. Get Single Overlay

Retrieve a specific overlay by ID.

**Endpoint**: `GET /overlays/:id`

**Request**:

```bash
curl http://localhost:5000/api/overlays/6967b37909e912904883f9c1
```

**Response** (200 OK):

```json
{
  "_id": "6967b37909e912904883f9c1",
  "type": "text",
  "content": "Hello World",
  "x": 100,
  "y": 200,
  "width": 200,
  "height": 50,
  "createdAt": "2026-01-14T15:17:13.293000"
}
```

**Error Response** (404 Not Found):

```json
{
  "error": "Overlay not found"
}
```

---

### 3. Create Overlay

Create a new overlay configuration.

**Endpoint**: `POST /overlays`

**Request Body**:

```json
{
  "type": "text",
  "content": "Sample Text",
  "x": 100,
  "y": 200,
  "width": 200,
  "height": 50
}
```

**Field Descriptions**:

- `type` (required): `"text"` or `"image"`
- `content` (required): Text string or image URL
- `x` (optional): X-axis position (default: 0)
- `y` (optional): Y-axis position (default: 0)
- `width` (optional): Width in pixels (default: 100)
- `height` (optional): Height in pixels (default: 50)

**Request Example**:

```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "type": "text",
    "content": "Breaking News",
    "x": 50,
    "y": 50,
    "width": 300,
    "height": 60
  }'
```

**Response** (201 Created):

```json
{
  "_id": "6967b67809e912904883f9c3",
  "type": "text",
  "content": "Breaking News",
  "x": 50,
  "y": 50,
  "width": 300,
  "height": 60,
  "createdAt": "2026-01-14T15:29:28.447000"
}
```

**Error Response** (400 Bad Request):

```json
{
  "error": "Invalid or missing type"
}
```

---

### 4. Update Overlay

Update an existing overlay's properties.

**Endpoint**: `PUT /overlays/:id`

**Request Body** (partial updates allowed):

```json
{
  "x": 150,
  "y": 250,
  "width": 250,
  "height": 70,
  "content": "Updated Text"
}
```

**Request Example**:

```bash
curl -X PUT http://localhost:5000/api/overlays/6967b67809e912904883f9c3 \
  -H "Content-Type: application/json" \
  -d '{
    "x": 150,
    "y": 250
  }'
```

**Response** (200 OK):

```json
{
  "_id": "6967b67809e912904883f9c3",
  "type": "text",
  "content": "Breaking News",
  "x": 150,
  "y": 250,
  "width": 300,
  "height": 60,
  "createdAt": "2026-01-14T15:29:28.447000"
}
```

**Error Response** (404 Not Found):

```json
{
  "error": "Overlay not found"
}
```

---

### 5. Delete Overlay

Delete an overlay from the database.

**Endpoint**: `DELETE /overlays/:id`

**Request**:

```bash
curl -X DELETE http://localhost:5000/api/overlays/6967b67809e912904883f9c3
```

**Response** (200 OK):

```json
{
  "deleted": true,
  "id": "6967b67809e912904883f9c3"
}
```

**Error Response** (404 Not Found):

```json
{
  "error": "Overlay not found"
}
```

---

## Stream Management

### 1. Start RTSP Stream

Convert an RTSP stream to HLS format using FFmpeg.

**Endpoint**: `POST /stream/start`

**Request Body**:

```json
{
  "rtsp_url": "rtsp://rtsp.stream/pattern"
}
```

**Request Example**:

```bash
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{"rtsp_url": "rtsp://rtsp.stream/pattern"}'
```

**Response** (200 OK):

```json
{
  "status": "started",
  "message": "Stream started successfully",
  "hls_url": "http://localhost:5000/stream/index.m3u8"
}
```

**Error Response** (400 Bad Request):

```json
{
  "error": "rtsp_url is required"
}
```

**Notes**:

- Stream conversion takes 10-15 seconds to initialize
- HLS segments are generated in `backend/stream/` directory
- Only one stream can run at a time (starting new stream stops previous)

---

### 2. Stop Stream

Stop the active RTSP stream conversion.

**Endpoint**: `POST /stream/stop`

**Request**:

```bash
curl -X POST http://localhost:5000/api/stream/stop
```

**Response** (200 OK):

```json
{
  "status": "stopped"
}
```

---

### 3. Check Stream Status

Check if a stream conversion is currently running.

**Endpoint**: `GET /stream/status`

**Request**:

```bash
curl http://localhost:5000/api/stream/status
```

**Response** (200 OK):

```json
{
  "running": true
}
```

---

## Data Models

### Overlay Schema

```json
{
  "_id": "ObjectId (auto-generated)",
  "type": "string (text|image)",
  "content": "string",
  "x": "number",
  "y": "number",
  "width": "number",
  "height": "number",
  "createdAt": "ISO 8601 timestamp"
}
```

**Field Constraints**:

- `type`: Must be either `"text"` or `"image"`
- `content`:
  - For text overlays: Any string
  - For image overlays: Valid image URL
- `x`, `y`, `width`, `height`: Non-negative integers
- `_id`: MongoDB ObjectId (24-character hex string)
- `createdAt`: Automatically set on creation

---

## Error Handling

### HTTP Status Codes

| Code | Meaning                        |
| ---- | ------------------------------ |
| 200  | Success                        |
| 201  | Created                        |
| 400  | Bad Request (validation error) |
| 404  | Not Found                      |
| 500  | Internal Server Error          |

### Common Error Responses

**Invalid ObjectId**:

```json
{
  "error": "'invalid-id' is not a valid ObjectId"
}
```

**Missing Required Field**:

```json
{
  "error": "Content is required"
}
```

**Invalid Data Type**:

```json
{
  "error": "x must be a number"
}
```

---

## Testing Examples

### Complete Workflow Test

```bash
# 1. Create text overlay
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{"type":"text","content":"Live","x":10,"y":10}'

# Response: {"_id": "...", ...}

# 2. Get all overlays
curl http://localhost:5000/api/overlays

# 3. Update position
curl -X PUT http://localhost:5000/api/overlays/<id-from-step-1> \
  -H "Content-Type: application/json" \
  -d '{"x":50,"y":50}'

# 4. Delete overlay
curl -X DELETE http://localhost:5000/api/overlays/<id-from-step-1>

# 5. Start stream
curl -X POST http://localhost:5000/api/stream/start \
  -H "Content-Type: application/json" \
  -d '{"rtsp_url":"rtsp://rtsp.stream/pattern"}'

# 6. Check status
curl http://localhost:5000/api/stream/status
```

---

## Rate Limits

Currently, there are no rate limits implemented. For production use, consider adding rate limiting middleware.

---

## CORS Configuration

The API allows requests from all origins (`*`). Configured in `backend/app.py`:

```python
CORS(app)
```

For production, restrict to specific origins:

```python
CORS(app, origins=["https://yourdomain.com"])
```

---

## Notes

- All timestamps are in UTC
- MongoDB connection uses local instance by default
- File uploads are not supported (images must be URLs)
- Stream files in `backend/stream/` are auto-deleted by FFmpeg
