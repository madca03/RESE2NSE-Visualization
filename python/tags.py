import mysql.connector as sql

conn = sql.connect(user='rese2nse', password='rese2nse', database='graph')
conn.autocommit = True
c = conn.cursor()

nlist = open("python/node_position.txt", "r")

for line in nlist:
	fields = line.strip().split(',')
	mac = int(fields[0], 16)
	query = "SELECT COUNT(*) FROM tags WHERE src = '%s' AND tag = '%s'" % (mac, fields[1])
	c.execute(query)
	res_cnt = c.fetchone()[0]
	if res_cnt == 0:
		query = "INSERT INTO tags VALUES('%d','%s')" % (mac,fields[1])
		c.execute(query)

conn.commit()

nlist.close()
