### Understand what this does:
```
ExtractJwt.fromAuthHeaderAsBearerToken()
→ Looks for token in the Authorization header:
  "Authorization: Bearer eyJhbGc..."

validate(payload)
→ Called automatically after token is verified
→ Whatever you return here gets attached to req.user
→ So in any controller you can access req.user.userId