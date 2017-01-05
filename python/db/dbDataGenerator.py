import random
import string
import mysql.connector
from time import sleep
from datetime import datetime

class dbDataGenerator:
    def __init__(self, db_client):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.links_table = linksTable(db_client)
        self.nodes_table = nodesTable(db_client)

    def generate_random_data(self):
        self.links_table.update()
        self.nodes_table.update()

class table:
    def __init__(self, db_client):
        self.db_client = db_client
        self.cursor = db_client.cursor

    def random_word(self):
        return ''.join(random.choice(string.ascii_uppercase) for i in range(12))

    def data_count(self, table):
        query = "SELECT count(*) from {}".format(table)

        try:
            self.cursor.execute(query)
        except mysql.connector.Error as err:
            print("Error: {}".format(err))
            exit(1)

        (count,) = self.cursor.fetchone()
        return count

class linksTable(table):
    def update(self):
        source_id = None
        target_id = None
        node_count = self.data_count('nodes_info')
        traffic_count = self.data_count('traffic')
        link_count = 60
        node_pairs = []
        created_at = datetime.utcnow()

        for i in range(link_count):
            insert_statement = (""
                "INSERT INTO links "
                "(source_id, "
                "target_id, "
                "traffic_id, "
                "created_at) "
                "VALUES "
                "(%(source_id)s, "
                "%(target_id)s, "
                "%(traffic_id)s, "
                "%(created_at)s);")

            while True:
                source_id = random.randint(1, node_count)
                target_id = random.randint(1, node_count)

                if (source_id != target_id) and \
                    ((source_id, target_id) not in node_pairs):
                    break

            node_pairs.append((source_id,target_id))

            data = {
                'source_id': source_id,
                'target_id': target_id,
                'traffic_id': random.randint(1, traffic_count),
                'created_at': created_at
            }

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()

class nodesTable(table):
    def update(self):
        node_count = 40

        for i in range(node_count):
            query = (""
                "INSERT INTO nodes_data "
                "VALUES ("
                "%(node_id)s, "
                "%(last_transmission)s, "
                "%(packets_sent)s, "
                "%(packets_received)s, "
                "%(created_at)s);"
            )

            data = {
                'node_id': i + 1,
                'last_transmission': self.random_word(),
                'packets_sent': random.randint(1,1000),
                'packets_received': random.randint(1,1000),
                'created_at': datetime.utcnow()
            }

            try:
                self.cursor.execute(query, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
