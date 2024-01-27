# from pymongo import MongoClient
# from flask import Flask, request, jsonify
# from flask_pymongo import PyMongo
# from bson import ObjectId

from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
# app.config["MONGO_URI"] = ""
# mongo = PyMongo(app)
CORS(app)

mongo_uri = "mongodb+srv://syed18638:mobileappfordev20001@cluster0.bhwqn1b.mongodb.net/?retryWrites=true&w=majority"


try:
    # Attempt to connect to MongoDB Atlas
    client = MongoClient(mongo_uri) 
    print("Connected to MongoDB Atlas")
except Exception as e:
    print(f"Error connecting to MongoDB Atlas: {e}")
    # Handle the error or exit the program
    exit(1)

database_name = "mobile-ashir"
collection_name = "user"
db = client[database_name]
collection = db[collection_name]

# @app.route("/tasks", methods=["GET"])
# def get_tasks():
#     tasks = mongo.db.tasks.find()
#     result = []
#     for task in tasks:
#         result.append({
#             "_id": str(task["_id"]),
#             "title": task["title"],
#             "description": task["description"]
#         })
#     return jsonify(result)

# @app.route("/tasks", methods=["POST"])
# def add_task():
#     data = request.get_json()
#     task_id = mongo.db.tasks.insert(data)
#     print(data)
#     return jsonify(str(task_id))

# @app.route("/users", methods=["POST"])
# def create_user():
#     data = request.get_json()

#     if not data or not all(key in data for key in ["name", "age", "email"]):
#         return jsonify({"error": "Invalid data format"}), 400

#     result = collection.insert_one(data)
#     return jsonify({"message": "User created successfully", "user_id": str(result.inserted_id)})

    

# @app.route("/tasks/<id>", methods=["PUT"])
# def update_task(id):
#     data = request.get_json()
#     mongo.db.tasks.update({"_id": ObjectId(id)}, {"$set": data})
#     return jsonify({"message": "Task updated successfully"})

# @app.route("/tasks/<id>", methods=["DELETE"])
# def delete_task(id):
#     mongo.db.tasks.delete_one({"_id": ObjectId(id)})
#     return jsonify({"message": "Task deleted successfully"})

# Define routes for your Flask application
@app.route('/users', methods=['GET'])
def get_users():    
    users = list(collection.find())
    # Convert ObjectId to string for JSON serialization
    users = [
        {
        '_id': str(user['_id']), 
        'title': user['title'],
        'completed': user['completed'],
        'editing': user['editing']
        } 
        for user in users
        ]
    return jsonify({'users': users})

@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    title = data.get('title')
    boolean =  data.get('boolean')
    # email = data.get('email')

    # if username and email:
    if title:
        user_id = collection.insert_one(
            {
                'title': title, 
                'completed': boolean,
                'editing': boolean
            }).inserted_id
        return jsonify({'_id': str(user_id)})
    else:
        return jsonify({'error': 'Both username and email are required'}), 400


@app.route('/users/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        # Convert the user_id to ObjectId before using it in the MongoDB query
        user_id_obj = ObjectId(user_id)
        
        # Check if the user with the specified ID exists
        user = collection.find_one({'_id': user_id_obj})
        
        if user:
            # Delete the user from the collection
            collection.delete_one({'_id': user_id_obj})
            
            return jsonify({'message': f'User with ID {user_id} has been deleted'})
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/users/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.get_json()
        title = data.get('title')
        boolean = data.get('boolean')

        # Convert the user_id to ObjectId before using it in the MongoDB query
        user_id_obj = ObjectId(user_id)

        # Check if the user with the specified ID exists
        user = collection.find_one({'_id': user_id_obj})

        if user:
            # Update the user in the collection
            collection.update_one(
                {'_id': user_id_obj},
                {'$set': {'title': title, 'completed': boolean, 'editing': boolean}}
            )

            return jsonify({'message': f'User with ID {user_id} has been updated'})
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500    
    
    
if __name__ == "__main__":
    app.run(debug=True)
