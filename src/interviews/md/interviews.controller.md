```

---

### Understand the decorators:
```
@Controller('api/interviews') → base route for all methods

@Post()      → handles POST   /api/interviews
@Get()       → handles GET    /api/interviews
@Get(':id')  → handles GET    /api/interviews/some-uuid
@Patch(':id')→ handles PATCH  /api/interviews/some-uuid
@Delete(':id')→handles DELETE /api/interviews/some-uuid

@Body()      → extracts request body → passes to DTO
@Param('id') → extracts :id from the URL
```

---

### Test your API with these requests:

Use **Postman** or **Thunder Client** (VS Code extension):

**Create an interview:**
```
POST http://localhost:3000/api/interviews
Content-Type: application/json

{
  "company": "Google",
  "hr_name": "Priya",
  "contact": "9876543210",
  "location": "Bengaluru",
  "mode_of_work": "hybrid",
  "expected_ctc": "20 LPA",
  "status": "phone",
  "applied_date": "2026-03-07"
}
```

**Get all interviews:**
```
GET http://localhost:3000/api/interviews


```

---

### Test the guard is working:

**Test 1 — Request without token (should fail):**
```
GET http://localhost:3000/api/interviews
No Authorization header

Expected: 401 Unauthorized
```

**Test 2 — Request with token (should pass):**
```
GET http://localhost:3000/api/interviews

Headers:
Authorization: Bearer <paste your access_token from login>

Expected: 200 with interviews array
```

---

### How to add Bearer token in Apidog:
```
1. Click the "Auth" tab (next to Headers/Body)
2. Select "Bearer Token" from dropdown
3. Paste your access_token
4. Send!