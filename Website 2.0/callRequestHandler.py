from pushbullet import Pushbullet
from keys import pushbulletKey

pb = Pushbullet(pushbulletKey)


def pushNote(content):
    push = pb.push_note("Callback request made at " + content['time'], content['number'])
