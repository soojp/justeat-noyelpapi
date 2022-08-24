from flask import jsonify, flash, Flask
from flask_app import app
from flask_app.models.eat import PreferenceModel
from flask_cors import CORS

# from dotenv import load_dotenv
# load_dotenv()

# Do we need a route for dashboard? 

app = Flask(__name__)
CORS(app)


@app.route('/api/preference/all')
def get_all_preferences(data):
    return jsonify(PreferenceModel.view_all, jsonify=True), 200

@app.route('/api/preference/add', methods=['POST'])
def add_preference(data):
    if new_item is not None: 
        new_item = PreferenceModel.add_preference(data)

        if new_item is not None:
            return jsonify(new_item.to_json()), 200  
    return jsonify({}), 422

@app.route('/api/preference/update/<id>', methods=['POST'])
def update_preference(id):
    item = PreferenceModel.find_by_id({
        'id': id  
    })

    if item is not None and PreferenceModel.is_valid(id):
        updated_item = PreferenceModel.update_preference(item, id)
        if updated_item:
            return jsonify(updated_item.to_json()), 200
        
    return jsonify({}), 422

@app.route('/api/preference/delete/<id>', methods=['DELETE'])
def delete_preference(id, *args, **kwargs):

    item = PreferenceModel.get_by_id({ 
        'id': id
    })

    if item is not None:
        PreferenceModel.delete_preference(id)
        return jsonify({'status': 'ok'}), 201

    return jsonify({}), 422