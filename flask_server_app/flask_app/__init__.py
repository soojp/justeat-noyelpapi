from flask import Flask
import os
from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
FLASK_SECRET = os.getenv('FLASK_SECRET')



app.secret_key = FLASK_SECRET


print("inside the init file")