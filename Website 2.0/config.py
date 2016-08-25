import os

my_dir = os.path.dirname(__file__)
final_path = os.path.join(my_dir, 'config.txt')
used = ""


def callTime():
    global used
    global final_path
    f = open(final_path, 'r')
    for line in f:
        if line[0] == "a":
            used = line
            return line[1:]
    f.close()


def visitTime():
    global used
    global final_path
    f = open(final_path, 'r')
    for line in f:
        if line == used:
            continue
        if line[0] == "a":
            user = line
            return line[1:]
    f.close()
