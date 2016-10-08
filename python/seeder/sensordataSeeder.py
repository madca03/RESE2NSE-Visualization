from datetime import datetime
import time
import random
import string
import mysql.connector

SEC_PER_DAY = 86400
INIT_DATA_POINTS = SEC_PER_DAY
#INIT_DATA_POINTS = 30

class sensordataSeeder:
	def __init__(self, db_client):
		self.db_client = db_client
		self.cursor = db_client.cursor

	def random_src(self):
		return ''.join(random.choice(string.digits) for i in range(1))

	def random_pid(self):
		return ''.join(random.choice(string.digits) for i in range(5))
		
	def seed(self):
		index = 1
		while (index < INIT_DATA_POINTS):
			epoch_time = int(time.mktime(time.gmtime()))
			ts_set = datetime.fromtimestamp(epoch_time - SEC_PER_DAY/4 + index)
			#ts_set = datetime.fromtimestamp(epoch_time + 1800*index)
			pid_set = self.random_pid()
			
			src_set = self.random_src()
			
			for i in range(1,5):
				insert_statement = (""
					"INSERT INTO sensor_data "
					"(ts, pid, src, tid, sdata) "
					"VALUES (%(ts)s, %(pid)s, %(src)s, %(tid)s,"
					"%(sdata)s);")
				if i == 1:
					data = {
						'ts': ts_set,
						'pid': pid_set,
						'src': src_set,
						'tid': 0, 
						'sdata': random.randint(700,800)
					}
				elif i == 2:
					data = {
						'ts': ts_set,
						'pid': pid_set,
						'src': src_set,
						'tid': 1, 
						'sdata': random.randint(700,800)
					}
				elif i == 3:
					data = {
						'ts': ts_set,
						'pid': pid_set,
						'src': src_set,
						'tid': 3, 
						'sdata': random.randint(200,300)
					}
				else:
					data = {
						'ts': ts_set,
						'pid': pid_set,
						'src': src_set,
						'tid': 4, 
						'sdata': random.randint(400,600)
					}

				index += 1
				
				try:
					self.cursor.execute(insert_statement, data)
				except mysql.connector.Error as err:
					print("Error: {}".format(err))
					exit(1)
			
		self.db_client.commit()
		
class sensordata_realtimeSeeder:
	def __init__(self, db_client):
		self.db_client = db_client
		self.cursor = db_client.cursor

	def random_src(self):
		return ''.join(random.choice(string.digits) for i in range(1))

	def random_pid(self):
		return ''.join(random.choice(string.digits) for i in range(5))
		
	def seed(self):
		epoch_time = int(time.mktime(time.gmtime()))
		ts_set = datetime.fromtimestamp(epoch_time)
		pid_set = self.random_pid()

		src_set = self.random_src()

		for i in range(1,5):
			insert_statement = (""
				"INSERT INTO sensor_data "
				"(ts, pid, src, tid, sdata) "
				"VALUES (%(ts)s, %(pid)s, %(src)s, %(tid)s,"
				"%(sdata)s);")
			if i == 1:
				data = {
					'ts': ts_set,
					'pid': pid_set,
					'src': src_set,
					'tid': 0, 
					'sdata': random.randint(700,800)
				}
			elif i == 2:
				data = {
					'ts': ts_set,
					'pid': pid_set,
					'src': src_set,
					'tid': 1, 
					'sdata': random.randint(700,800)
				}
			elif i == 3:
				data = {
					'ts': ts_set,
					'pid': pid_set,
					'src': src_set,
					'tid': 4, 
					'sdata': random.randint(200,300)
				}
			else:
				data = {
					'ts': ts_set,
					'pid': pid_set,
					'src': src_set,
					'tid': 5, 
					'sdata': random.randint(400,600)
				}	
				
			try:
				self.cursor.execute(insert_statement, data)
			except mysql.connector.Error as err:
				print("Error: {}".format(err))
				exit(1)

		self.db_client.commit()