from flask_app import app
from dotenv import load_dotenv
from flask_app.controllers import eats
from flask_cors import CORS

CORS(app)
if __name__=="__main__":
    app.run(debug=True)