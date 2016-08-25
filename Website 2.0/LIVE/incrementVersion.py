import os

my_dir = os.path.dirname(__file__)

x = input()
html = open(os.path.join(my_dir, 'templates\index.html'), 'r')
numbers = []
outputHTML = ""
for line in html:
    if "<script src=\"{{ url_for('static', filename='main" in line:
        outputHTML += "<script src=\"{{ url_for('static', filename='main" + str(x + 1) + ".js')}}\"></script>\n"
        continue
    if "<link rel=\"stylesheet\" href=\"{{ url_for('static', filename='styles" in line:
        outputHTML += "<link rel=\"stylesheet\" href=\"{{ url_for('static', filename='styles" + str(x + 1) + ".css')}}\">\n"
        continue
    outputHTML += line

html = open(os.path.join(my_dir, 'templates\index.html'), 'w')
html.write(outputHTML)
html.close()

os.rename(os.path.join(my_dir, 'static\main' + str(x) + '.js'),
          os.path.join(my_dir, 'static\main' + str(x + 1) + '.js'))

os.rename(os.path.join(my_dir, 'static\styles' + str(x) + '.css'),
          os.path.join(my_dir, 'static\styles' + str(x + 1) + '.css'))

