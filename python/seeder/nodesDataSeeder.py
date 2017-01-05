from datetime import datetime
import random
import string
import mysql.connector

class nodesDataSeeder:
    def __init__(self, db_client, node_count):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.node_count = node_count
        self.created_at = datetime.utcnow()

    def random_word(self):
        return ''.join(random.choice(string.ascii_uppercase) for i in range(12))

    def seed(self):
        for i in range(self.node_count):
            insert_statement = (""
            "INSERT INTO nodes_data "
                "(node_id, "
                "last_transmission, "
                "packets_sent, "
                "packets_received, "
                "created_at) "
                "VALUES "
                "(%(node_id)s, "
                "%(last_transmission)s, "
                "%(packets_sent)s, "
                "%(packets_received)s, "
                "%(created_at)s);")

            data = {
                'node_id': i + 1,
                'last_transmission': self.random_word(),
                'packets_sent': random.randint(1,1000),
                'packets_received': random.randint(1,1000),
                'created_at': self.created_at
            }

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
