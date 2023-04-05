from flask import request, jsonify, json, Blueprint
import models

train_blueprint=Blueprint("train", __name__)

@train_blueprint.route('/add-train',methods=["POST"])
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

@train_blueprint.route("/get_all_trains")
def get_all_trains():
    return json.dumps([train.as_dict() for train in models.Train.query.all()])


@train_blueprint.route("/get_train_by_id")
def get_train_by_id():
    args=request.args
    train=models.Train.query.filter_by(id=args.get("id")).first()
    if train is None:
        return jsonify({"error":"Not found"}),404
    return json.dumps(train.as_dict())