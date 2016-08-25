from keys import gmapsKey
import requests

def checkPostcode(postcode):
    link = "https://maps.googleapis.com/maps/api/distancematrix/json?mode=bicycling&origins=G58AF&destinations=" + postcode + "&key=" + gmapsKey
    result = requests.get(link).json()
    if result['rows'][0]['elements'][0]['status'] == "ZERO_RESULTS":
        return "invalid"
    if int(result['rows'][0]['elements'][0]['duration']['value']) < 1501:
        return True
    elif int(result['rows'][0]['elements'][0]['duration']['value']) > 1500:
        return False
    