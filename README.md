# March Maddness - React/Flask/WebSocket/Postgresql App

This is the foundation for a March Madness Music App, but is also used as a place to test a lot of various services. Sorry if it's a bit messy :-)

## Services

### Fastapi

Really simple FAST Api set up for a book database.

Enter books-api folder

```
cd services/fastapi/books/
```


```
source bin/activate
```


Utilizes uvicorn
```
uvicorn book-api.main:app --reload
```


Use Postman to make post requests using Raw JSON with the following structure:

```
{
    "book": {
        "title": "The Odysee",
        "number_of_pages": 600
    },
    "author": {
        "first_name": "Homer",
        "last_name": "No LAst Name"
    }
}
```