# PIC-UP

> *A place where you can save images anywhere, anytime*

## Technologies

- Frontend
    - React
    - Tailwind
    - React Query
- Backend
    - Python
    - Flask

## Project structure

This project was planned as a *monorepo*:
```
frontend/
├─ package.json
├─ ...
backend/
├─ models/
├─ controllers/
app.py (starts API)
Config.py
requirements.txt 
package.json
```

## Build

First install corresponding packages

> Backend

```
pip install -r requirements.txt 
```

> Frontend

```
npm run install-front
```

## Database (Postgres - SQLAlchemy)

Create database tables initial 
```
from yourapplication import db
db.create_all()
```

Upgrade database and apply changes from migrations
```
flask db upgrade
```

Generate a new database migration which detects model changes
```
flask db migrate -m "mensaje"
```