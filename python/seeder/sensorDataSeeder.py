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
                    'value': random.uniform(1,1000),
                    'created_at': self.created_at
                }

                data_count += 1

                try:
                    self.cursor.execute(insert_statement, data)
                except mysql.connector.Error as err:
                    print("Error: {}".format(err))
                    exit(1)

        self.db_client.commit()
