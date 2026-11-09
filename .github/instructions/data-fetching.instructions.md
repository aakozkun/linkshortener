---
description: Read this file to understand how to fetch data in the project.
---
# Data Fetching Guidelines

When fetching data in this project, always use the appropriate database queries and ensure that you handle errors properly. Use the provided ORM methods for interacting with the database and avoid raw SQL queries unless absolutely necessary.

## 1. Use Server Components for Data Fetching

ALWAYS fetch data in server components whenever possible. This ensures that sensitive information, such as database credentials, is not exposed to the client and allows for better performance and security. NEVER fetch data directly in client components.

## 2. Data Fetching Methods

ALWAYS use the helper functions in the /data directory for fetching data. These functions encapsulate the database queries and provide a consistent and secure way to interact with the database. NEVER access the database directly from your components or other parts of the application.

ALL helper functions in the /data directory should use Drizzle ORM for interacting with the database. This ensures that all database operations are consistent, secure, and properly handled according to the project's standards.