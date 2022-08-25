from flask_app.config.mysqlconnection import MySQLConnection 
from flask import flash

class CuisineModel:

    db="eat_schema"
    table="cuisines"
    json_fields=['id', 'name']

    def __init__(self,data):
        self.id = data['id']
        self.name = data['name']

    @classmethod
    def add_cuisine(cls,data):
        query = "INSERT INTO cuisines (preference_id, name) VALUES (%(preference_id)s, %(name)s);"
        new_id = MySQLConnection(cls.db).query_db(query,data)
        return None if not new_id else cls.get_by_id(new_id)

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
        query = "SELECT * FROM cuisines WHERE id = %(id)s;"
        results = MySQLConnection(cls.db).query_db(query,data)
        return(cls(results[0]))
    
    @classmethod
    def get_cuisine_by_pref(cls,id):
        data = {"id" : id}
        query = "SELECT * FROM cuisines WHERE preference_id=%(id)s"
        results = MySQLConnection(cls.db).query_db(query,data)
        cuisines = []
        for row in results:
            cuisines.append(cls(row).name)
        return(cuisines)