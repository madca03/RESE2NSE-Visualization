from datetime import datetime
import random
import mysql.connector

class sensorDataSeeder:
    def __init__(self, db_client, num_nodes, num_sensors, created_at):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.num_nodes = num_nodes
        self.num_sensors = num_sensors
        self.created_at = created_at

    def seed(self):
        data_count = 1

        for i in range(self.num_nodes):
            for j in range(self.num_sensors):
                insert_statement = (""
                    "INSERT INTO sensor_data "
                    "(id, "
                    "node_id, "
                    "sensor_type_id, "
                    "value, "
                    "created_at) "
                    "VALUES (%(id)s, "
                    "%(node_id)s, "
                    "%(sensor_type_id)s, "
                    "%(value)s, "
                    "%(created_at)s);")

                data = {
                    'id': data_count,
                    'node_id': i + 1,
                    'sensor_type_id': j + 1,
                    # 'value': random.uniform(1,1000),
                    'created_at': self.created_at
                }

                if (data['sensor_type_id']==2):
                    data['value'] = random.uniform(20,60)
                else:
                    data['value'] = random.uniform(1,100)

                data_count += 1

                try:
                    self.cursor.execute(insert_statement, data)
                except mysql.connector.Error as err:
                    print("Error: {}".format(err))
                    exit(1)

        self.db_client.commit()


# def get_needed_table_data(db_client):
#     query = 'select distinct(created_at) from nodes_present limit 1;'
#     cursor = db_client.cursor
#     cursor.execute(query)
#     (created_at,) = cursor.fetchone()
#
#     query = 'select count(*) from nodes_present;'
#     cursor.execute(query)
#     (node_count,) = cursor.fetchone()
#
#     query = 'select count(*) from sensor_type;'
#     cursor.execute(query)
#     (sensor_count,) = cursor.fetchone()
#     return created_at, node_count, sensor_count
#
# if __name__ == "__main__":
#     import sys
#     sys.path.insert(0, '../db')
#
#     from dbClient import dbClient
#     db_config = {
#         'user': 'rese2nse',
#         'password': 'rese2nse',
#         'host': '127.0.0.1'
#     }
#
#     db_client = dbClient(db_config)
#     db_client.start_connection()
#     db_client.use_database('graph')
#     db_client.remove_table_data('sensor_data')
#
#     created_at, node_count, sensor_count = get_needed_table_data(db_client)
#     sensorDataSeeder(db_client, node_count, sensor_count, created_at).seed()
