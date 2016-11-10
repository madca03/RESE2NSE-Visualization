import mysql.connector

class sensorTypeSeeder:
    def __init__(self, db_client, sensors):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.sensors = sensors

    def seed(self):
        for index, sensor in enumerate(self.sensors):
            insert_statement = (""
                "INSERT INTO sensor_type "
                "(id, "
                "type, "
                "min, "
                "max, "
                "step) "
                "VALUES ("
                "%(id)s, "
                "%(type)s, "
                "%(min)s, "
                "%(max)s, "
                "%(step)s "
                ");")

            data = {
                'id': index + 1,
                'type': sensor,
                'min': 15,
                'max': 60,
                'step': 1
            };

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
