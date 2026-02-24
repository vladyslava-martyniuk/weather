from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Cat backend working 🐱"

mock_stories = [
    {
        "title": "Hero Cat Saves Family From Fire",
        "url": "#",
        "image": "https://placekitten.com/300/200"
    },
    {
        "title": "Cat Travels 200 Miles To Return Home",
        "url": "#",
        "image": "https://placekitten.com/301/200"
    },
    {
        "title": "Cat Becomes Internet Star",
        "url": "#",
        "image": "https://placekitten.com/302/200"
    },
    {
        "title": "Rescue Cat Finds Forever Home",
        "url": "#",
        "image": "https://placekitten.com/303/200"
    }
]

@app.route("/api/pet-stories")
def get_pet_stories():
    return jsonify(mock_stories)

if __name__ == "__main__":
    app.run(debug=True)