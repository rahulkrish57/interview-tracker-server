```

---

### Understand the key concepts:

**`@InjectRepository(Interview)`**
```
This injects the TypeORM repository for the Interview entity.
The repository gives you built-in methods:
  .create()   → builds an entity instance from plain object
  .save()     → INSERT or UPDATE in the database
  .find()     → SELECT all rows
  .findOne()  → SELECT one row by condition
  .remove()   → DELETE a row
```

**`NotFoundException`**
```
A built-in NestJS exception.
When thrown → automatically sends 404 response to client.
No manual res.status(404) needed!
```

**`Object.assign(interview, dto)`**
```
Merges only the fields present in dto into the 
existing interview object.
Perfect for PATCH — update only what was sent.