from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
import callRequestHandler
import serviceAreaHandler
import config

app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'GET':
        return render_template('index.html',name="Openn")
    if request.method == 'POST':
        response = request.get_json()
        if response['type'] == "get-times":
            return jsonify({"call":config.callTime(),"visit":config.visitTime()})
        if response['type'] == "callback":
            callRequestHandler.pushNote(response)
            return jsonify()
        if response['type'] == "postcode":
            return jsonify({"result":serviceAreaHandler.checkPostcode(response['postcode'])})
            
@app.route('/priv')
def priv():
    return render_template('priv.html',name="Openn")

if __name__ == "__main__":
    app.run(host='0.0.0.0')
