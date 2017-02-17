from datetime import datetime
import random
import string
import mysql.connector

class nodeSeeder:
    def __init__(self, db_client, node_count):
        """ Constructor
        """
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.node_count = node_count

    def random_mac_address(self):
        return ''.join(random.choice(string.ascii_uppercase) for i in range(12))

    def seed(self):
        node_count = 1

        for i in range(self.node_count):
            insert_statement = (""
                "INSERT INTO nodes "
                "(id, "
                "label, "
                "mac_address, "
                "coordinate_set) "
                "VALUES (%(id)s, "
                "%(label)s, "
                "%(mac_address)s, "
                "%(coordinate_set)s);")

            data = {
                'id': node_count,
                'label': 'Node ' + str(node_count),
                'mac_address': self.random_mac_address(),
                'coordinate_set': False
            }

            node_count += 1

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
