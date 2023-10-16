"""
Extracts data from savefiles and saves into seperate csv files
"""

import configparser
import csv

file_names = ['data/saveData1.ini', 'data/saveData2.ini', 'data/saveData3.ini']

keys = ['percent', 'minutes', 'seconds', 'snotty']

for index, file_name in enumerate(file_names, start=1):
    try:
        with open(file_name, 'r', encoding='utf-8') as file:
            content = file.read().splitlines()[:-1]

        config_reader = configparser.ConfigParser()
        config_reader.read_string('\n'.join(content))

        game_data = config_reader['Game']

        rows = [int(float(game_data.get(key, '0.000000').strip('"'))) for key in keys]

        headers = keys

        output_file = f'data/save_file_{index}.csv'

        with open(output_file, 'w', newline="", encoding='utf-8') as output:
            writer = csv.writer(output)
            writer.writerow(headers)
            writer.writerow(rows)
    except FileNotFoundError:
        print(f"File {file_name} not found. Skipping...")
