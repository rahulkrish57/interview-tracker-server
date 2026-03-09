```

---

### Test in Apidog once terminal is green:

**Register:**
```
POST http://localhost:3000/api/auth/register

{
  "name": "Rahul",
  "email": "rahul@gmail.com",
  "password": "rahul123"
}
```

**Login:**
```
POST http://localhost:3000/api/auth/login

{
  "email": "rahul@gmail.com",
  "password": "rahul123"
}