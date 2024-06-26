from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from textblob import TextBlob  # Import TextBlob for sentiment analysis

app = Flask(__name__)
CORS(app, origins='*')

# Connect to MongoDB
client = MongoClient('mongodb://127.0.0.1:27017/')
db = client['myntra']
collection = db['pythonrevs']

@app.route("/api/<string:id>", methods=['GET'])
def get_reviews(id):
    review_data = collection.find_one({"product_id": id}, {'_id': 0, 'review_text': 1, 'ratings': 1})
    if review_data:
        return jsonify({
            "review_text": review_data['review_text'],
            "ratings": review_data['ratings']
        })
    else:
        return jsonify({
            "review_text": ["Add review"],
            "ratings": [0]
        })

@app.route("/api/sentiment/<string:id>", methods=['GET'])
def get_sentiment_counts(id):
    review_data = collection.find_one({"product_id": id}, {'_id': 0, 'review_text': 1})
    if review_data:
        reviews = review_data['review_text']
        sentiment_counts = analyze_sentiment(reviews)
        print("Sentiment Counts:", sentiment_counts)  # Log sentiment counts
        return jsonify(sentiment_counts)
    else:
        return jsonify({"message": "No reviews found for the given ID."})

def analyze_sentiment(reviews):
    sentiment_counts = {'positive': 0, 'neutral': 0, 'negative': 0}
    for review in reviews:
        analysis = TextBlob(review)
        sentiment = analysis.sentiment.polarity
        if sentiment > 0:
            sentiment_counts['positive'] += 1
        elif sentiment == 0:
            sentiment_counts['neutral'] += 1
        else:
            sentiment_counts['negative'] += 1
    return sentiment_counts

if __name__ == "__main__":
    app.run(debug=True, port=8082)#oracle is running on 8080 port
