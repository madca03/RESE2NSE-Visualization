class archiveManager:
    def __init__(self, db_client):
        self.db_client = db_client
        self.cursor = db_client.cursor
        self._database_tables = {'nodes_archive': nodeArchiver(self.db_client),
                                'links_archive': linkArchiver(self.db_client),
                                'datetime_archive': datetimeArchiver(self.db_client),
                                'sensor_data_archive': sensorDataArchiver(self.db_client)}

    def archive_database(self):
        if self.has_nodes_for_display():
            self._archive('datetime_archive')
            self._archive('nodes_archive')
            self._archive('links_archive')
            self._archive('sensor_data_archive')

    def has_nodes_for_display(self):
        query = (""
            "SELECT COUNT(coordinate_set) AS node_count "
            "FROM nodes WHERE coordinate_set = true;")

        self.cursor.execute(query)
        (node_count,) = self.cursor.fetchone()
        return (node_count > 0)

    def _archive(self, table):
        if table in self._database_tables:
            self._database_tables[table].archive()
        else:
            raise ValueError("Invalid value for table: {0}".format(table))

class archiver:
    def __init__(self, db_client):
        self.db_client = db_client
        self.cursor = db_client.cursor

    def archive(self):
        raise NotImplementedError("no subclass implementation")

class datetimeArchiver(archiver):
    def _new_datetime_archive_id(self):
        """This method gets the next available id for a new data row in
            datetime_archive table.
        """

        query = "SELECT MAX(id) FROM datetime_archive;"

        self.cursor.execute(query)

        (last_row_id,) = self.cursor.fetchone()
        if last_row_id == None:
            return 1
        else:
            return last_row_id + 1

    def _new_datetime_archive_data(self):
        query = "SELECT created_at FROM nodes_present LIMIT 1;"

        self.cursor.execute(query)

        # check if "nodes_present" table is empty
        if self.cursor.rowcount == 0:
            return None
        else:
            (created_at,) = self.cursor.fetchone()
            return created_at

    def archive(self):
        """This method saves the date and time when the Nodes table is
        archived. It stores the new datetime of the archive in the
        Datetime_archives table.

            Args:
                created_at (datetime): the time when the Nodes table
                    is archived.

        """

        id = self._new_datetime_archive_id()
        data = self._new_datetime_archive_data()

        insert_statement = ("INSERT INTO datetime_archive "
                            "(id, datetime_archive) "
                            "VALUES (%s, %s);")

        # Add extra comma to the tuple (current_time,)
        self.cursor.execute(insert_statement, (id, data,))
        self.db_client.commit()

class sensorDataArchiver(archiver):
    def new_sensor_data_archive_id(self):
        query = "SELECT MAX(id) FROM sensor_data_archive;"

        self.cursor.execute(query)
        (last_row_id,) = self.cursor.fetchone()

        if last_row_id == None:
            return 1
        else:
            return last_row_id + 1

    def sensor_data_creation_date(self):
        query = "SELECT DISTINCT(created_at) FROM sensor_data LIMIT 1;"

        self.cursor.execute(query);
        (created_at,) = self.cursor.fetchone()

        return created_at

    def datetime_archive_id(self):
        query = (""
            "SELECT id FROM datetime_archive "
            "WHERE datetime_archive = '{}';").format(self.sensor_data_creation_date())

        self.cursor.execute(query)
        (id,) = self.cursor.fetchone()

        return id

    def query_sensor_data(self):
        """This method queries all of the node objects from the "nodes_present" table.

        """
        query = ("SELECT "
            "sensor_data.node_id, "
            "sensor_data.sensor_type_id, "
            "sensor_data.value "
            "FROM sensor_data;")

        self.cursor.execute(query)

    def archive(self):
        sensor_data_archive_id = self.new_sensor_data_archive_id()
        date_created_id = self.datetime_archive_id()

        if date_created_id == None:
            return

        self.query_sensor_data()
        rows = self.cursor.fetchall()

        for (node_id,
            sensor_type_id,
            value,) in rows:

            insert_statement = (""
                "INSERT INTO sensor_data_archive "
                "(id, "
                "node_id, "
                "sensor_type_id, "
                "value, "
                "date_created_id) "
                "VALUES ("
                "%(id)s, "
                "%(node_id)s, "
                "%(sensor_type_id)s, "
                "%(value)s, "
                "%(date_created_id)s);")

            data = {
                'id': sensor_data_archive_id,
                'node_id': node_id,
                'sensor_type_id': sensor_type_id,
                'value': value,
                'date_created_id': date_created_id
            }

            sensor_data_archive_id += 1

            self.cursor.execute(insert_statement, data)

        self.db_client.commit()


class nodeArchiver(archiver):
    def new_nodes_archive_id(self):
        query = "SELECT MAX(id) FROM nodes_archive;"

        self.cursor.execute(query)
        (last_row_id,) = self.cursor.fetchone()

        if last_row_id == None:
            return 1
        else:
            return last_row_id + 1

    def nodes_creation_date(self):
        query = "SELECT DISTINCT(created_at) FROM nodes_present LIMIT 1;"

        self.cursor.execute(query);
        (created_at,) = self.cursor.fetchone()

        return created_at

    def datetime_archive_id(self):
        query = (""
            "SELECT id FROM datetime_archive "
            "WHERE datetime_archive = '{}';").format(self.nodes_creation_date())

        self.cursor.execute(query)
        (id,) = self.cursor.fetchone()

        return id

    def query_nodes(self):
        """This method queries all of the node objects from the "nodes_present" table.

        """

        query = ("SELECT "
            "nodes_present.node_id, "
            "nodes_present.x_coordinate, "
            "nodes_present.y_coordinate, "
            "nodes.coordinate_set, "
            "nodes_present.last_transmission, "
            "nodes_present.packets_sent, "
            "nodes_present.packets_received "
            "FROM nodes_present "
            "INNER JOIN nodes "
            "ON (nodes.id = nodes_present.node_id);")

        self.cursor.execute(query)

    def archive(self):
        """This method creates an archive of the current nodes. It first
        queries all of the nodes from the "Nodes" table and then it stores
        the result set to the "Node_archives" table

        """
        nodes_archive_id = self.new_nodes_archive_id()
        date_created_id = self.datetime_archive_id()

        if date_created_id == None:
            return

        self.query_nodes()
        rows = self.cursor.fetchall()
        # After executing the query, the cursor object will contain a list
        # of tuples and each tuple represents a row in the result set

        for (node_id,
            x_coordinate,
            y_coordinate,
            coordinate_set,
            last_transmission,
            packets_sent,
            packets_received,) in rows:

            # archive only those nodes that have been already set in a location
            if coordinate_set == True:

                insert_statement = (""
                    "INSERT INTO nodes_archive "
                    "(id, node_id, x_coordinate, y_coordinate, "
                    "last_transmission, packets_sent, "
                    "packets_received, date_created_id) "
                    "VALUES ("
                    "%(id)s, "
                    "%(node_id)s, "
                    "%(x_coordinate)s, "
                    "%(y_coordinate)s, "
                    "%(last_transmission)s, "
                    "%(packets_sent)s, "
                    "%(packets_received)s, "
                    "%(date_created_id)s);")

                data = {
                    'id': nodes_archive_id,
                    'node_id': node_id,
                    'x_coordinate': x_coordinate,
                    'y_coordinate': y_coordinate,
                    'last_transmission': last_transmission,
                    'packets_sent': packets_sent,
                    'packets_received': packets_received,
                    'date_created_id': date_created_id,
                }

                nodes_archive_id += 1

                self.cursor.execute(insert_statement, data)

        self.db_client.commit()

class linkArchiver(archiver):
    def links_creation_date(self):
        """This method returns the datetime when the links in the links_present
        table were created.
        """
        query = "SELECT DISTINCT(created_at) FROM links_present LIMIT 1;"

        self.cursor.execute(query);
        (created_at,) = self.cursor.fetchone()

        return created_at

    def datetime_archive_id(self):
        """This method returns the datetime_archive id of the datetime
        corresponding to the creation date of the links in the links_present
        table.
        """
        query = (""
            "SELECT id FROM datetime_archive "
            "WHERE datetime_archive = '{}';").format(self.links_creation_date())

        self.cursor.execute(query)
        (id,) = self.cursor.fetchone()

        return id

    def new_links_archive_id(self):
        """This method queries for the last id stored in the "links_archive"
        table. It then returns the next id for the insertion of new data in
        "links_archive" table.

        """

        query = "SELECT MAX(id) FROM links_archive;"

        self.cursor.execute(query)
        (last_row_id,) = self.cursor.fetchone()

        if last_row_id == None:
            return 1
        else:
            return last_row_id + 1

    def query_links_present(self):
        """This method queries data from the links_present table. The data
        to be returned are the links that have their source node and
        target node fixed in location.
        """
        query = (""
            "SELECT id, "
            "source_id, "
            "target_id, "
            "traffic_id, "
            "floor_id "
            "FROM links_present "
            "WHERE source_id "
            "IN (SELECT id FROM nodes WHERE coordinate_set = true) "
            "AND target_id "
            "IN (SELECT id FROM nodes WHERE coordinate_set = true);")

        self.cursor.execute(query)

        return self.cursor.fetchall()

    def archive(self):
        """ This method copies the data in the "edges_present" table to
        "edges_archive" table

        """
        link_archive_id = self.new_links_archive_id()
        date_created_id = self.datetime_archive_id()
        rows = self.query_links_present()
        links = []

        for (link_id, source_id, target_id, traffic_id, floor_id) in rows:
            insert_statement = (""
                "INSERT INTO links_archive "
                "(id, link_id, source_id, target_id, traffic_id, floor_id, "
                "date_created_id) "
                "VALUES ( "
                "%(id)s, "
                "%(link_id)s, "
                "%(source_id)s, "
                "%(target_id)s, "
                "%(traffic_id)s, "
                "%(floor_id)s, "
                "%(date_created_id)s);")

            data = {
                'id': link_archive_id,
                'link_id': link_id,
                'source_id': source_id,
                'target_id': target_id,
                'traffic_id': traffic_id,
                'floor_id': floor_id,
                'date_created_id': date_created_id,
            }

            link_archive_id += 1

            self.cursor.execute(insert_statement, data)

        self.db_client.commit()
