# API Reference

**Base URL**: `http://localhost:5000/api`

## Endpoints

### Overlay Management

| Method     | Endpoint        | Description          | Payload / Notes                                                                        |
| :--------- | :-------------- | :------------------- | :------------------------------------------------------------------------------------- |
| **GET**    | `/overlays`     | Get all overlays     | Returns array of overlay objects.                                                      |
| **POST**   | `/overlays`     | Create overlay       | `{"type": "text/image", "content": "...", "x": 0, "y": 0, "width": 100, "height": 50}` |
| **GET**    | `/overlays/:id` | Get specific overlay | Returns single overlay object.                                                         |
| **PUT**    | `/overlays/:id` | Update overlay       | Partial JSON allowed (e.g., `{"x": 50, "y": 50}`).                                     |
| **DELETE** | `/overlays/:id` | Delete overlay       | Returns `{"deleted": true, "id": "..."}`.                                              |

### Stream Management

| Method   | Endpoint         | Description         | Payload / Notes                                         |
| :------- | :--------------- | :------------------ | :------------------------------------------------------ |
| **POST** | `/stream/start`  | Start RTSP stream   | `{"rtsp_url": "rtsp://..."}`. Takes ~10s to initialize. |
| **POST** | `/stream/stop`   | Stop current stream | No payload required.                                    |
| **GET**  | `/stream/status` | Check status        | Returns `{"running": true/false}`.                      |

### Data Model (Overlay)

```json
{
  "_id": "ObjectId",
  "type": "text|image",
  "content": "string (text or URL)",
  "x": "number",
  "y": "number",
  "width": "number",
  "height": "number"
}
```
