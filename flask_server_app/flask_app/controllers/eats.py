from flask import jsonify, flash, Flask, request
import json
from flask_app import app
from flask_app.models.eat import PreferenceModel
# from dotenv import load_dotenv
# load_dotenv()

# @app.route('/api/preference/<int:id>')
# def get_by_id(id):
#     return jsonify(PreferenceModel.get_by_id(id)), 200

@app.route('/api/preference/<int:id>')
def get_by_id(id):
    item = PreferenceModel.get_by_id(id)
    return jsonify(item), 200

@app.route('/api/preference/all')
def get_all_preferences():
    return jsonify(PreferenceModel.get_all_preferences()), 200


@app.route('/api/preference/add', methods=['POST'])
def add_preference():
    
    data = request.get_json()
    if data is not None: 
        data = PreferenceModel.add_preference(data)

        if data is not None:
            return jsonify(data.to_json()), 200  
    return jsonify({}), 422

@app.route('/api/preference/update/<int:id>', methods=['POST'])
def update_preference(id):
    item = PreferenceModel.get_by_id(id)

    if item is not None and PreferenceModel.is_valid(id):
        updated_item = PreferenceModel.update_preference(item, id)
        if updated_item:
            return jsonify(updated_item), 200
        
    return jsonify({}), 422

@app.route('/api/preference/delete/<int:id>', methods=['DELETE'])
def delete_preference(id, *args, **kwargs):

    item = PreferenceModel.get_by_id(id)

    if item is not None:
        PreferenceModel.delete_preference(id)
        return jsonify({'status': 'ok'}), 201

    return jsonify({}), 422
