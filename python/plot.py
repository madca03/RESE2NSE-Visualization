from db.dbClient import dbClient
from seeder.sensordataSeeder import sensordataSeeder
from seeder.sensordataSeeder import sensordata_realtimeSeeder
from time import sleep
import sys
import signal

def handler(signum, frame):
    db_client.close_connection()
    print("Exiting...")
    sys.exit(0)


signal.signal(signal.SIGINT, handler)

db_config = {
    'user': 'rese2nse',
    'password': 'rese2nse',
    'host': '127.0.0.1'
}

db_client = dbClient(db_config)
db_client.start_connection()
db_client.use_database('graph')

sleep_time = 1
	
while True:

	print("Seeding sensors_data table...")
	sensordata_realtimeSeeder(db_client).seed()

    # pause for T seconds
	sleep(sleep_time)
