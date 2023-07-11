import configparser
import csv

config_reader = configparser.ConfigParser()
config_reader.read('saveData2.ini')

game_data = config_reader['Game']

keys = ['seconds', 'minutes', 'percent']

values = [int(float(game_data.get(key, '0.000000').strip('"'))) for key in keys]

headers = keys
rows = [values]

with open('game_data.csv', 'w', newline="") as output:
    writer = csv.writer(output)
    writer.writerow(headers)
    writer.writerows(rows)
