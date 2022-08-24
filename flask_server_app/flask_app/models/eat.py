from flask_app.config.mysqlconnection import MySQLConnection 
from flask import flash

class PreferenceModel():

    db="eats_schema"
    table="preferences"
    json_fields=['id', 'cuisine', 'zipcode', 'distance']

    def __init__(self,data):
        self.id = data['id']
        self.cuisine = data['cuisine'] 
        self.zipcode = data['zipcode'] 
        self.distance = data['distance']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']

    @classmethod
    def add_preference(cls,data):
        query = "INSERT INTO preferences (cuisine, zipcode, distance) VALUES (%(cuisine)s, %(zipcode)s, %(distance)s);"
        return MySQLConnection(cls.db).query_db(query,data)
    
    @classmethod
    def update_preference(cls,data):
        query = "UPDATE preferences SET cuisine=%(cuisine)s, zipcode=%(zipcode)s, distance=%(distance)s, WHERE id=%(id)s;"
        return MySQLConnection(cls.db).query_db(query,data)
    
    @classmethod
    def delete_preference(cls,data):
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