from db.dbClient import dbClient
from seeder.nodeSeeder import nodeSeeder
from seeder.sensorTypeSeeder import sensorTypeSeeder
from seeder.trafficSeeder import trafficSeeder
from seeder.nodePresentSeeder import nodePresentSeeder
from seeder.linkPresentSeeder import linkPresentSeeder
from seeder.sensorDataSeeder import sensorDataSeeder
from seeder.sensorDataSeeder2 import sensorDataSeeder2
from seeder.tagsSeeder import tagsSeeder
import sys

if len(sys.argv) != 3:
    sys.exit('Wrong number of arguments')

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
node_count = int(sys.argv[1]);
link_count = int(sys.argv[2]);

print("Removing old data...")
db_client.remove_database_data()

print("Seeding traffic table...")
trafficSeeder(db_client, traffic_status).seed()

print("Seeding sensor_type table...")
sensorTypeSeeder(db_client, sensor_types).seed()

print("Seeding nodes table...")
nodeSeeder(db_client, node_count).seed()

print("Seeding nodes_present table...")
node_present_seeder = nodePresentSeeder(db_client, node_count)
node_present_seeder.seed()

print("Seeding tags table...")
tagsSeeder(db_client).seed()

print("Seeding sensor_data table...")
sensorDataSeeder(db_client, node_count, len(sensor_types)
    , node_present_seeder.created_at).seed()

# print("Seeding sensor_data2 table...")
# sensorDataSeeder2(db_client).seed()

print("Seeding links_present table...")
linkPresentSeeder(db_client, link_count,
    node_count, len(traffic_status),
    node_present_seeder.created_at).seed()

db_client.commit()
db_client.close_connection()
print("Exiting...")
