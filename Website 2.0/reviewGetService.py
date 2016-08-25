from keys import gmapsKey
import requests
import datetime
import time
import pickle


def getReviews():
    link = "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ01Qo1T3PiUgRbych9LlwU9w" + "&key=" + gmapsKey
    result = requests.get(link).json()
    reviewsFormatted = []
    reviews = result['result']['reviews']
    epoch_time = int(time.time())
    # reviews += [{"author_name":"Bartek Juszczak", "time":1471037110, "rating":"3","author_url":"google.co.uk","text":"We the best computer service"}]
    for review in reviews:
        reviewFormatted = {}
        reviewFormatted['name'] = review['author_name']
        # if (int(review['time']) - 604800) < epoch_time:
        #     reviewFormatted['date'] = "In the last week"
        # else:
        reviewFormatted['date'] = datetime.datetime.fromtimestamp(int(review['time'])).strftime('%d/%m/%Y')
        reviewFormatted['stars'] = review['rating']
        reviewFormatted['emptystars'] = str(5 - int(review['rating']))
        reviewFormatted['url'] = review['author_url']
        reviewFormatted['content'] = review['text']
        reviewsFormatted += [reviewFormatted]
    return reviewsFormatted


def cache(mode, content=""):
    currentTime = epoch_time = int(time.time())
    if mode == "save":
        pickle.dump(favorite_color, open("save.p", "wb"))
    if mode == "get":
        timestampFile = open('timestamp.cfg', 'r')
        if (currentTime - 86400) > int(timestampFile[0]):
            return False
        else:
            return pickle.load(open("reviews.cache", "rb"))
