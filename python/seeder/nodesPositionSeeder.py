from datetime import datetime
import mysql.connector

class nodesPositionSeeder:
    def __init__(self, db_client, node_count):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.node_count = node_count
        self.created_at = datetime.utcnow()

    def seed(self):
        for i in range(self.node_count):
            insert_statement = (""
                "INSERT INTO nodes_position "
                "(node_id, "
                "x_coordinate, "
                "y_coordinate, "
                "created_at) "
                "VALUES "
                "(%(node_id)s, "
                "%(x_coordinate)s, "
                "%(y_coordinate)s, "
                "%(created_at)s) "
                ";"
            )

            data = {
                'node_id': i + 1,
                'x_coordinate': 0,
                'y_coordinate': 0,
                'created_at': self.created_at
            }

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
