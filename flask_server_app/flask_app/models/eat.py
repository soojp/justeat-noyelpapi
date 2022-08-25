from flask_app.config.mysqlconnection import MySQLConnection 
from flask import flash

class PreferenceModel:

    db="eat_schema"
    table="preferences"
    json_fields=['id', 'cuisine', 'zipcode', 'distance']

    def __init__(self,data):
        self.id = data['id']
        self.cuisine = data['cuisine'] 
        self.zipcode = data['zipcode'] 
        self.distance = data['distance']
        # self.created_at = data['created_at']
        # self.updated_at = data['updated_at']
    

    def to_json(self, add_fields=[], fields=[]): # fields will replace default fields
        fields = fields if len(fields) > 0 else self.json_fields

        ret = {}
        for field in fields + add_fields:
            if hasattr(self, field): # check if exists in the object being serialized
                ret[field] = getattr(self, field)

        return ret
        
    @classmethod
    def get_by_id(cls,id):
        data = {"id":id}
        query = "SELECT * FROM preferences WHERE id = %(id)s;"
        results = MySQLConnection(cls.db).query_db(query,data)
        return cls(results[0])

    @classmethod
    def get_all_preferences(cls):
        query = "SELECT * FROM preferences"
        results = MySQLConnection(cls.db).query_db(query)
        preferences = []
        for row in results: 
            preferences.append(cls(row).to_json())
        return preferences
        # if data.preferences is None: 
        #     data.preferences = PreferenceModel.view_all ({data.id}, jsonify=True)
        # return data.preferences

    @classmethod
    def add_preference(cls,data):
        query = "INSERT INTO preferences (cuisine, zipcode, distance) VALUES (%(cuisine)s, %(zipcode)s, %(distance)s);"
        new_id = MySQLConnection(cls.db).query_db(query,data)
        return None if not new_id else cls.get_by_id(new_id)
    
    @classmethod
    def update_preference(cls,id):
        data = {"id":id}
        query = "UPDATE preferences SET cuisine=%(cuisine)s, zipcode=%(zipcode)s, distance=%(distance)s, WHERE id=%(id)s;"
        return MySQLConnection(cls.db).query_db(query,data)
    
    @classmethod
    def delete_preference(cls,id):
        data = {"id":id}
        query = "DELETE FROM preferences WHERE id = %(id)s;"
        return MySQLConnection(cls.db).query_db(query,data)

    
    @staticmethod
    def validate_preference(form_data):
        print(form_data)
        is_valid = True
        if len(form_data["cuisine"]) <1 :
            is_valid = False
            flash("All fields required.")
        if len(form_data["zipcode"]) < 1:
            is_valid = False
            flash("All fields required.")
        if len(form_data["distance"]) == "":
            is_valid = False
            flash("All fields required.")
        return is_valid
