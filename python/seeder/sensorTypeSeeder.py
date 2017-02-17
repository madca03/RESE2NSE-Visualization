import mysql.connector

class sensorTypeSeeder:
    def __init__(self, db_client, sensors):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self._sensors = sensors

    def seed(self):
        for index, sensor in enumerate(self._sensors):
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
                'min': None,
                'max': None,
                'step': None
            };

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
