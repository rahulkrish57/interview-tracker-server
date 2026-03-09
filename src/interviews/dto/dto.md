DTO = Data Transfer Object

It defines the SHAPE and RULES of data coming INTO your API.

When React sends a POST request to create an interview,
the DTO answers:
  - Which fields are required?
  - Which are optional?
  - What type should each field be?

If the incoming data breaks any rule → NestJS 
automatically rejects it with a 400 Bad Request.
No manual validation code needed!