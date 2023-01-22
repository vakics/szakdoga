from flask import Flask, request, jsonify, session,json
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

@app.route('/add-train',methods=["POST"])
def add_train():
    train_type=request.json["train_type"]
    series_number=request.json["series_number"]
    nickname=request.json["nickname"]
    producer=request.json["producer"]
    produce_begins=request.json["produce_begins"]
    produce_ends=request.json["produce_ends"]
    info=request.json["info"]
    image_url=request.json["image_url"]
    new_train=models.Train(train_type=train_type,series_number=series_number,nickname=nickname,producer=producer,produce_begins=produce_begins,produce_ends=produce_ends,info=info,image_url=image_url)
    models.db.session.add(new_train)
    models.db.session.commit()
    return jsonify({
        "id":new_train.id,
        "train_type":new_train.train_type,
        "series_number":new_train.series_number,
        "nickname":new_train.nickname,
        "producer":new_train.producer,
        "produce_begins":new_train.produce_begins,
        "produce_ends":new_train.produce_ends,
        "info":new_train.info,
        "image_url":new_train.image_url
    })

@app.route("/get_all_trains")
def get_all_trains():
    return json.dumps([train.as_dict() for train in models.Train.query.all()])


@app.route("/get_train_by_id")
def get_train_by_id():
    args=request.args
    train=models.Train.query.filter_by(id=args.get("id")).first()
    if train is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps(train.as_dict())

@app.route("/add_favorite",methods=["POST"])
def add_favorite():
    train_id=request.json["train_id"]
    user_id=request.json["user_id"]
    new_favorite=models.Favorites(train_id=train_id,user_id=user_id)
    models.db.session.add(new_favorite)
    models.db.session.commit()
    return json.dumps(new_favorite.as_dict())

@app.route("/get_favorites")
def get_favorites():
    return json.dumps([favorite.as_dict() for favorite in models.Favorites.query.all()])

@app.route("/get_favorite_id")
def get_favorite_by_id():
    train_id=request.args.get("train_id")
    user_id=request.args.get("user_id")
    favorite=models.Favorites.query.filter_by(train_id=train_id,user_id=user_id).first()
    if favorite is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps(favorite.as_dict())

@app.route("/get_favorites_by_user_id/<string:user_id>")
def get_favorite_by_user_id(user_id):
    return json.dumps([favorite.as_dict() for favorite in models.Favorites.query.filter_by(user_id=user_id)])

@app.route("/delete_favorite/<string:id>",methods=['GET','DELETE'])
def delete_favorite(id):
    favorite=models.Favorites.query.get(int(id))
    if favorite is None:
        return jsonify({"error":"Not found"}),404
    if request.method=="DELETE":
        models.db.session.delete(favorite)
        models.db.session.commit()
    return jsonify({"message":"Successfully deleted!"}),200

if __name__ == '__main__':
    app.run(debug=True)
    