import models
from flask import request, json, jsonify, Blueprint

comment_blueprint=Blueprint("comment", __name__)

@comment_blueprint.route("/add_comment",methods=['POST'])
def add_comment():
    username=request.json["username"]
    train_id=request.json["train_id"]
    comment=request.json["comment"]
    created=request.json["created"]
    answer_to=request.json["answer_to"]
    new_comment=models.Comments(username=username,train_id=train_id,comment=comment,created=created,answer_to=answer_to)
    models.db.session.add(new_comment)
    models.db.session.commit()
    return json.dumps(new_comment.as_dict())

@comment_blueprint.route("/get_comments_by_train_id/<int:train_id>")
def get_comments_by_train_id(train_id):
    comments=models.Comments.query.filter_by(train_id=train_id)
    if comments is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps([comment.as_dict() for comment in comments])

@comment_blueprint.route("/get_comment/<int:id>")
def get_comment(id):
    comment=models.Comments.query.get(id)
    if comment is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps(comment.as_dict())

''' @comment_blueprint.route("/delete_comment_by_id/<int:id>",methods=['GET','DELETE'])
def delete_comment_by_id(id):
    comment=models.Comments.query.get(id)
    if comment is None:
        return jsonify({"error":"Not found"}),404
    if request.method=="DELETE":
        models.db.session.delete(comment)
        models.db.session.commit()
    return jsonify({"message":"Successfully deleted!"}),200 '''