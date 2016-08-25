from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
import callRequestHandler
import serviceAreaHandler
import reviewGetService
import config

app = Flask(__name__)


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return render_template('index.html', name="CleanFix")
    if request.method == 'POST':
        response = request.get_json()
        if response['type'] == "get-times":
            return jsonify({"call": config.callTime(), "visit": config.visitTime()})
        if response['type'] == "callback":
            callRequestHandler.pushNote(response)
            return jsonify()
        if response['type'] == "postcode":
            print "Checking postcode " + response['postcode']
            return jsonify({"result": serviceAreaHandler.checkPostcode(response['postcode'])})
        if response['type'] == "review":
            return jsonify({"reviews": reviewGetService.getReviews()})


@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html', name="CleanFix")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
