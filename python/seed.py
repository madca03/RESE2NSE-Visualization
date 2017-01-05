from db.dbClient import dbClient
from seeder.trafficSeeder import trafficSeeder
from seeder.sensorTypeSeeder import sensorTypeSeeder
from seeder.nodesInfoSeeder import nodesInfoSeeder
from seeder.nodesDataSeeder import nodesDataSeeder
from seeder.nodesPositionSeeder import nodesPositionSeeder
from seeder.linkSeeder import linkSeeder
from seeder.sensorDataSeeder import sensorDataSeeder
from seeder.sensorDataSeeder2 import sensorDataSeeder2
from seeder.tagsSeeder import tagsSeeder

db_config = {
    'user': 'rese2nse',
    'password': 'rese2nse',
    'host': '127.0.0.1'
}

db_client = dbClient(db_config)
db_client.start_connection()
db_client.use_database('graph')

traffic_status = ['light', 'moderate', 'heavy']
sensor_types = ['Humidity', 'Temperature', 'Light', 'Pressure']
node_count= 40
link_count = 60

print("Removing old data...")
db_client.remove_database_data()

print("Seeding traffic table...")
trafficSeeder(db_client, traffic_status).seed()

print("Seeding sensor_type table...")
sensorTypeSeeder(db_client, sensor_types).seed()

print("Seeding nodes_info table...")
nodesInfoSeeder(db_client, node_count).seed()

print("Seeding nodes_data table...")
node_data_seeder = nodesDataSeeder(db_client, node_count)
node_data_seeder.seed()

print("Seeding nodes_position table...")
nodesPositionSeeder(db_client, node_count).seed()

print("Seeding tags table...")
tagsSeeder(db_client).seed()

print("Seeding links table...")
linkSeeder(db_client, link_count,
    node_count, len(traffic_status),
    node_data_seeder.created_at).seed()

print("Seeding sensor_data table...")
sensorDataSeeder(db_client, node_count, len(sensor_types)
    , node_data_seeder.created_at).seed()

print("Seeding sensor_data2 table...")
# sensorDataSeeder2(db_client).seed()

db_client.commit()
db_client.close_connection()
print("Exiting...")
