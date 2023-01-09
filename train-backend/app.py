from flask import Flask, request, jsonify, session
import models
from config import ApplicationConfig
from flask_bcrypt import Bcrypt
from flask_session import Session
from flask_cors import CORS

app=Flask(__name__)
app.config.from_object(ApplicationConfig)
bcrypt=Bcrypt(app)
server_session=Session(app)
models.db.init_app(app)
with app.app_context():
    models.db.create_all()
CORS(app,supports_credentials=True)


@app.route("/@me", methods=["GET"])
def get_current_user():
    user_id=session.get("user_id")
    if user_id is None:
        return jsonify({"error":"Unauthorized"}),401
    user=models.User.query.filter_by(user_id=user_id).first()
    return jsonify({
        "id":user.id,
        "username":user.username,
        "email":user.email
    })

@app.route("/register", methods=["POST"])
def register_user():
    email=request.json["email"]
    username=request.json["username"]
    password=request.json["password"]
    user_exists=models.User.query.filter_by(username=username).first() is not None
    if user_exists:
        return jsonify({"error":"User already exists"}),409
    hashed_password=bcrypt.generate_password_hash(password)
    new_user=models.User(email=email,password=hashed_password,username=username)
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

@app.route('/logout',methods=["POST"])
def logout():
    session.pop("user_id",None)


if __name__ == '__main__':
    app.run(debug=True)
    