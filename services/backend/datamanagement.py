import os
import requests

from sqlalchemy import select, desc
from sqlalchemy.orm import Session

from flask import jsonify

from database import SpotifyAuth, engine

# Import date class from datetime module
from datetime import date

def get_newest_auth():

    with Session(engine) as session:
        smt = select(SpotifyAuth).order_by(desc(SpotifyAuth.time_created)).limit(1)
        result = session.execute(smt)
        most_recent_auth = result.scalar()

    return f"{most_recent_auth.auth}"

def delete_old_records():
    return jsonify({"Success": True})
