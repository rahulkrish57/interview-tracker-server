
### Understand the decorators:
```
@IsNotEmpty()   → field must be present and not empty string
@IsOptional()   → field can be missing entirely
@IsEnum(X)      → value must be one of the enum values
@IsDateString() → must be a valid ISO date e.g. "2026-01-05"
```

---

### Now create the update DTO:
```
src/interviews/dto/update-interview.dto.ts