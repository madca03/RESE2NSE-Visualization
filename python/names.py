import mysql.connector as sql

conn = sql.connect(user='rese2nse', password='rese2nse', database='graph')
conn.autocommit = True
c = conn.cursor()

nlist = open("python/node_name.txt", "r")

for line in nlist:
	fields = line.strip().split(',')
	mac = int(fields[0], 16)
	query = "SELECT COUNT(*) FROM nodes WHERE mac_address = '%s'" % (mac)
	c.execute(query)
	res_cnt = c.fetchone()[0]
	if res_cnt == 0:
		query = "INSERT INTO nodes (label, mac_address) VALUES('%s','%s')" % (fields[1], mac)
		c.execute(query)

conn.commit()

nlist.close()
