import configparser
import csv

with open('saveData2.ini', 'r') as file:
    content = file.read().splitlines()[:-1]

config_reader = configparser.ConfigParser()
config_reader.read_string('\n'.join(content))

game_data = config_reader['Game']

keys = ['percent', 'minutes', 'seconds']

values = [int(float(game_data.get(key, '0.000000').strip('"'))) for key in keys]

headers = keys
rows = [values]

with open('save_file_2.csv', 'w', newline="") as output:
    writer = csv.writer(output)
    writer.writerow(headers)
    writer.writerows(rows)
