from flask import Flask, request, jsonify, session,json
import models
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS
from train_uploading import upload
from train_routes import train_blueprint
from favorite_routes import favorite_blueprint
from comment_routes import comment_blueprint

app=Flask(__name__)
app.register_blueprint(train_blueprint)
app.register_blueprint(favorite_blueprint)
app.register_blueprint(comment_blueprint)
app.config.from_object(ApplicationConfig)
bcrypt=Bcrypt(app)
server_session=Session(app)
models.db.init_app(app)
with app.app_context():
    models.db.create_all()
    upload(app)
CORS(app,supports_credentials=True)

@app.route("/register", methods=["POST"])
def register_user():
    email=request.json["email"]
    username=request.json["username"]
    password=request.json["password"]
    user_exists=models.User.query.filter_by(username=username).first() is not None
    if user_exists:
        return jsonify({"error":"User already exists"}),409
    hashed_password=bcrypt.generate_password_hash(password)
    new_user=models.User(email=email,password=hashed_password,username=username,is_contact_public=True)
    models.db.session.add(new_user)
    models.db.session.commit()
    return jsonify({
        "id":new_user.id,
        "username":new_user.username
    })

@app.route('/login',methods=["POST"])
def login():
    username=request.json["username"]
    password=request.json["password"]
    user=models.User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error":"Unauthorized"}),401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error":"Unauthorized"}),401
    session["user_id"]=user.id
    return jsonify({
        "id":user.id,
        "username":user.username,
        "email":user.email
    })

@app.route("/get_user/<string:username>")
def get_user(username):
    user=models.User.query.filter_by(username=username).first()
    if user is None:
        return jsonify({"error":"Not found"}),404
    return jsonify({
        "username":user.username,
        "email":user.email,
        "is_contact_public":user.is_contact_public
    })

@app.route("/update_contact_visibility",methods=["PUT"])
def update_contact_visibility():
    user_id=request.json["user_id"]
    visible=request.json["is_contact_public"]
    user=models.User.query.get(user_id)
    if user is None:
        return jsonify({"error":"Not found"}),404
    user.is_contact_public=visible
    models.db.session.commit()
    return jsonify({
        "username":user.username,
        "email":user.email,
        "is_contact_public":user.is_contact_public
    })

@app.route("/get_number_of_users")
def get_number_of_users():
    return jsonify({"number":len(models.User.query.all())})

@app.route('/logout',methods=["POST"])
def logout():
    session.pop("user_id",None)

if __name__ == '__main__':
    app.run(debug=True)
    