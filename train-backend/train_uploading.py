from models import db
from models import Train
import json

def upload(app):
    with app.app_context():
        with open("train.json", encoding="utf-8") as json_file:
            data=json.load(json_file)
        if len(Train.query.all()) < len(data):
            for train in Train.query.all():
                db.session.delete(train)
            db.session.commit()
            for train in data:
                new_train=Train(train_type=train["train_type"],series_number=train["series_number"],producer=train["producer"],
                produce_begins=train["produce_begins"],produce_ends=train["produce_ends"],nickname=train["nickname"],info=train["info"],image_url=train["image_url"])
                db.session.add(new_train)
            db.session.commit()
        if len(Train.query.all()) > len(data):
            with open("train.json","w") as json_file:
                json_file.write(json.dumps([train.as_dict() for train in Train.query.all()]))

if __name__ == '__main__':
    upload()
    
    