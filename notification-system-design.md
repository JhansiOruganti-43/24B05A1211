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

# Stage 2

## Database Selection

### Chosen Database: PostgreSQL

PostgreSQL is selected because the notification system stores structured data and requires efficient querying, filtering, sorting, and pagination. It provides strong consistency through ACID transactions, excellent indexing support, and scales well as the number of notifications grows.

### Why PostgreSQL?

- Supports ACID transactions for reliable data storage.
- Efficient indexing for faster notification retrieval.
- Excellent support for filtering, sorting, and pagination.
- Handles concurrent users efficiently.
- Supports replication and partitioning for future scalability.

---

# Database Schema

## Table: notifications

| Column | Data Type | Constraints | Description |
|---------|-----------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique notification identifier |
| type | VARCHAR(20) | NOT NULL | Event / Result / Placement |
| message | TEXT | NOT NULL | Notification content |
| timestamp | TIMESTAMP | NOT NULL | Time when notification was created |
| is_read | BOOLEAN | DEFAULT FALSE | Read status of notification |

---

## SQL Schema

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL,
    is_read BOOLEAN DEFAULT FALSE
);
```

---

# Database Indexes

```sql
CREATE INDEX idx_notifications_type
ON notifications(type);

CREATE INDEX idx_notifications_timestamp
ON notifications(timestamp DESC);

CREATE INDEX idx_notifications_is_read
ON notifications(is_read);
```

### Why these indexes?

- **type** → Faster filtering by notification category.
- **timestamp** → Faster retrieval of latest notifications.
- **is_read** → Efficient unread notification queries.

---

# Sample Queries

### Fetch Latest Notifications

```sql
SELECT *
FROM notifications
ORDER BY timestamp DESC
LIMIT 10;
```

### Filter by Notification Type

```sql
SELECT *
FROM notifications
WHERE type = 'Placement'
ORDER BY timestamp DESC;
```

### Fetch Unread Notifications

```sql
SELECT *
FROM notifications
WHERE is_read = FALSE;
```

### Mark Notification as Read

```sql
UPDATE notifications
SET is_read = TRUE
WHERE id = '<notification_id>';
```

### Count Unread Notifications

```sql
SELECT COUNT(*)
FROM notifications
WHERE is_read = FALSE;
```

---

# Scalability Considerations

To support future growth:

- Use UUIDs to avoid ID collisions.
- Apply indexes on frequently queried columns.
- Use pagination (`LIMIT` and `OFFSET`) to reduce query cost.
- Enable PostgreSQL replication for high availability.
- Partition tables by timestamp if notification volume grows significantly.
- Archive old notifications periodically to improve performance.

---

# Conclusion

The proposed PostgreSQL schema is simple, normalized, scalable, and optimized for fast retrieval of notifications while supporting future growth and high user traffic.