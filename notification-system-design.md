# Stage 1

## Notification REST API Design

### Base URL

```
/api/v1/notifications
```

---

## 1. Get Notifications

### Endpoint

```
GET /api/v1/notifications
```

### Query Parameters

| Parameter | Type | Required | Description |
|----------|------|----------|-------------|
| page | number | No | Page number |
| limit | number | No | Number of notifications |
| notification_type | string | No | Event / Placement / Result |

### Request Headers

```
Authorization: Bearer <token>
Accept: application/json
```

### Response (200)

```json
{
  "notifications": [
    {
      "id": "146095a...",
      "type": "Result",
      "message": "Mid Sem Results",
      "timestamp": "2026-04-22T17:51:30Z",
      "isRead": false
    }
  ],
  "page": 1,
  "limit": 10,
  "total": 200,
  "totalPages": 20
}
```

---

## 2. Get Notification by ID

### Endpoint

```
GET /api/v1/notifications/{id}
```

### Response

```json
{
  "id":"146095a",
  "type":"Placement",
  "message":"Google Hiring",
  "timestamp":"2026-04-22T17:51:30Z",
  "isRead":false
}
```

---

## 3. Mark Notification as Read

### Endpoint

```
PATCH /api/v1/notifications/{id}/read
```

### Response

```json
{
  "message":"Notification marked as read"
}
```

---

## 4. Mark All Notifications as Read

### Endpoint

```
PATCH /api/v1/notifications/read-all
```

### Response

```json
{
  "message":"All notifications marked as read"
}
```

---

## 5. Get Unread Notification Count

### Endpoint

```
GET /api/v1/notifications/unread-count
```

### Response

```json
{
    "count": 12
}
```

---

## JSON Schema

```json
{
  "id": "string",
  "type": "Placement | Result | Event",
  "message": "string",
  "timestamp": "ISO-8601",
  "isRead": "boolean"
}
```

---

## HTTP Status Codes

| Status | Meaning |
|---------|----------|
|200|Success|
|201|Created|
|400|Bad Request|
|401|Unauthorized|
|404|Not Found|
|500|Internal Server Error|

---

## Naming Conventions

- Use plural resource names (`/notifications`)
- Use nouns in endpoints
- JSON keys in camelCase
- ISO-8601 timestamps
- JWT Bearer Authentication