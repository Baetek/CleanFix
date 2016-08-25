import gspread

gc = gspread.login('youremail@gmail.com', 'yourpassword')
sh = gc.open_by_url(
    'https://docs.google.com/spreadsheets/d/1AOOdOo1Z_QDMC6piaRylh1T5CQnwYim5SU5uJoPPS5c/edit?usp=sharing')
