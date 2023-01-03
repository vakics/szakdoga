from flask import Flask
import models
from config import ApplicationConfig

app=Flask(__name__)
app.config.from_object(ApplicationConfig)
models.db.init_app(app)
with app.app_context():
    models.db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
    