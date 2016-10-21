import mysql.connector

class tagsSeeder:
    def __init__(self, db_client):
        self.db_client = db_client
        self.cursor = db_client.cursor

    def seed(self):
        nlist = open("python/node_position.txt", "r")

        for line in nlist:
            fields = line.strip().split(',')
            mac = int(fields[0], 16)
            query = "SELECT COUNT(*) FROM tags WHERE src = '%s' AND tag = '%s'" % (mac, fields[1])
            self.cursor.execute(query)
            res_cnt = self.cursor.fetchone()[0]

            if res_cnt == 0:
                query = "INSERT INTO tags values ('%d', '%s')" % (mac, fields[1])
                self.cursor.execute(query)

        self.db_client.commit()
        nlist.close()
