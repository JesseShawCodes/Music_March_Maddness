# March Maddness - React/Flask/WebSocket/Postgresql App

This is the foundation for a March Madness Music App, but is also used as a place to test a lot of various services. Sorry if it's a bit messy :-)

## Fastapi

Really simple FAST Api set up for a book database.

Enter books-api folder

```
cd services/fastapi/books/books-api 
```

Utilizes uvicorn
```
uvicorn book-api.main:app --reload
```