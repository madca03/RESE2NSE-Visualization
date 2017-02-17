from datetime import datetime
import mysql.connector
import random

class linkPresentSeeder:
    def __init__(self, db_client, link_count, node_count, traffic_count,
        created_at):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self.link_count = link_count
        self.node_count = node_count
        self.traffic_count = traffic_count
        self.created_at = created_at

    def seed(self):
        link_count = 1
        node_pairs = []

        for i in range(self.link_count):
            insert_statement = (""
                "INSERT INTO links_present "
                "(id, "
                "source_id, "
                "target_id, "
                "traffic_id, "
                "created_at)"
                "VALUES "
                "(%(id)s, "
                "%(source_id)s, "
                "%(target_id)s, "
                "%(traffic_id)s, "
                "%(created_at)s);")

            while True:
                source_id = random.randint(1, self.node_count)
                target_id = random.randint(1, self.node_count)

                if (source_id != target_id) and \
                    ((source_id, target_id) not in node_pairs):
                    break

            node_pairs.append((source_id,target_id))

            data = {
                'id': link_count,
                'source_id': source_id,
                'target_id': target_id,
                'traffic_id': random.randint(1, self.traffic_count),
                'created_at': self.created_at
            }

            link_count += 1

            try:
                self.cursor.execute(insert_statement, data)
            except mysql.connector.Error as err:
                print("Error: {}".format(err))
                exit(1)

        self.db_client.commit()
