LOGIN REQUEST
─────────────
Client → POST /auth/login { email, password }
Server → finds user in DB
Server → compares password hash ✓
Server → signs JWT with SECRET_KEY
Server → returns { access_token: "eyJ..." }

PROTECTED REQUEST
─────────────────
Client → GET /api/interviews
         Authorization: Bearer eyJ...
Server → verifies JWT signature ✓
Server → extracts userId from payload
Server → allows request