import models
from flask import json, request, jsonify, Blueprint

favorite_blueprint=Blueprint("favorite", __name__)

@favorite_blueprint.route("/add_favorite",methods=["POST"])
def add_favorite():
    train_id=request.json["train_id"]
    user_id=request.json["user_id"]
    new_favorite=models.Favorites(train_id=train_id,user_id=user_id)
    models.db.session.add(new_favorite)
    models.db.session.commit()
    return json.dumps(new_favorite.as_dict())

@favorite_blueprint.route("/get_favorites")
def get_favorites():
    return json.dumps([favorite.as_dict() for favorite in models.Favorites.query.all()])

@favorite_blueprint.route("/get_favorite_id")
def get_favorite_by_id():
    train_id=request.args.get("train_id")
    user_id=request.args.get("user_id")
    favorite=models.Favorites.query.filter_by(train_id=train_id,user_id=user_id).first()
    if favorite is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps(favorite.as_dict())

@favorite_blueprint.route("/get_favorites_by_user_id/<string:user_id>")
def get_favorite_by_user_id(user_id):
    return json.dumps([favorite.as_dict() for favorite in models.Favorites.query.filter_by(user_id=user_id)])

@favorite_blueprint.route("/delete_favorite/<int:id>",methods=['GET','DELETE'])
def delete_favorite(id):
    favorite=models.Favorites.query.get(id)
    if favorite is None:
        return jsonify({"error":"Not found"}),404
    if request.method=="DELETE":
        models.db.session.delete(favorite)
        models.db.session.commit()
    return jsonify({"message":"Successfully deleted!"}),200