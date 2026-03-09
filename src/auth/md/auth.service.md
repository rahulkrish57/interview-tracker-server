```

---

### Understand the key concepts:

**Password Hashing:**
```
bcrypt.hash(password, 10)

→ 10 is the "salt rounds" — how many times it processes
→ Same password hashed twice gives DIFFERENT results
→ You can NEVER reverse it back to plain text
→ bcrypt.compare() is the only way to verify it
```

**JWT Payload:**
```
{ sub: user.id, email: user.email }

→ sub = subject (standard JWT field for user id)
→ This data is EMBEDDED in the token
→ Server reads it on every request without DB lookup
→ Never put sensitive data like password in payload!
```

**Why "Invalid credentials" for both cases?**
```
If we said "email not found" vs "wrong password"
→ attackers could enumerate valid emails
→ Generic message keeps it secure