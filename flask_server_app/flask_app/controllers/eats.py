from flask import jsonify, flash
from flask_app import app
from flask_app.models.eat import PreferenceModel

# from dotenv import load_dotenv
# load_dotenv()

# Do we need a route for dashboard? 

@app.route('/preference/add', methods=['POST'])
def add_preference(data):
    if new_item is not None: 
        new_item = PreferenceModel.add_preference(data)

        if new_item is not None:
            return jsonify(new_item.to_json()), 200
        
    return jsonify({}), 422

@app.route('/preference/update', methods=['POST'])
def update_preference(data):
    item = PreferenceModel.find_by_id({
        'id': data['id']
    })

    if item is not None and PreferenceModel.is_valid(data):
        updated_item = PreferenceModel.update_preference(item, data)
        if updated_item:
            return jsonify(updated_item.to_json()), 200
        
    return jsonify({}), 422

@app.route('/preference/delete/<id>', methods=['DELETE'])
def delete_preference(id, *args, **kwargs):

    item = PreferenceModel.get_by_id({ 
        'id': id
    })

    if item is not None:
        PreferenceModel.delete_preference(id)
        return jsonify({'status': 'ok'}), 201

    return jsonify({}), 422