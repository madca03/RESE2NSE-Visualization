var models = require('../../models/index');

var nextData_query = "SELECT id,ts,pid,src,tid,sdata FROM sensor_data WHERE id > init_id ORDER BY id ASC LIMIT count";
var id_query = "SELECT * FROM sensor_data WHERE ts >= \"last_update\" ORDER BY id ASC LIMIT 1";
var tid_obj = {};
var src_obj = {};
var sensor_data_obj = {};
var count = 1000;
var data_array_length;
var ts, pid, src, tid, sdata;
var src_dummy = require('binascii');
var multiplier;
var init_id = {};
var last = 0;
var last_update = 0;
var last_update_dt = 0;

// DO PROCESSING FOR init_id BASED ON RESOLUTION HERE
// init_id MUST BE DETERMINED BASED ON THE TIMESTAMP CORRESPONDING TO THE RESOLUTION
// example for testing purposes only
resolution = "10";
init_id[resolution] = 0;
resolution = "1h";
init_id[resolution] = 0;
resolution = "3h";
init_id[resolution] = 0;
resolution = "6h";
init_id[resolution] = 0;
resolution = "12";
init_id[resolution] = 0;
resolution = "1d";
init_id[resolution] = 0;

module.exports = function(req, res, next){
	multiplier = req.params.multiplier;
	resolution = req.params.resolution;
	group = req.params.group;
	
	x = new Date().getTime();
	x = x + (480*60000);
	console.log(x + " , " + last);
	if (x > (last + 600000)){
		last = x;

		last_update = x - 600000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		console.log(last_update_dt);
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["10"] = resp[0].id;
					console.log("init_id\[\"10\"\] = " + init_id["10"]);
				}
			});
	
		last_update = x - 3600000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		console.log(last_update_dt);
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["1h"] = resp[0].id;
					console.log("init_id\[\"1h\"\] = " + init_id["1h"]);
				}
			});
				
		last_update = x - 10800000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["3h"] = resp[0].id;
					console.log("init_id\[\"3h\"\] = " + init_id["3h"]);
				}
			});
			
		last_update = x - 21600000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["6h"] = resp[0].id;
					console.log("init_id\[\"6h\"\] = " + init_id["6h"]);
				}
			});
				
		last_update = x - 43200000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["12"] = resp[0].id;
					console.log("init_id\[\"12\"\] = " + init_id["12"]);
				}
			});
				
		last_update = x - 86400000;
		last_update_dt = new Date(last_update).toISOString().slice(0, 19).replace('T', ' ');
		models.sequelize.query(id_query.replace("last_update", last_update_dt), {type: models.sequelize.QueryTypes.SELECT})
			.then(function(resp){
				if (typeof(resp[0]) != 'undefined'){
					init_id["1d"] = resp[0].id;
					console.log("init_id\[\"1d\"\] = " + init_id["1d"]);
					}
			});
	}

	// retrieves the data from the next row of the database
	// INSTEAD OF USING THE replace METHOD, USE PLACEHOLDERS FOR THE QUERY
	models.sequelize.query(nextData_query.replace("init_id", init_id[resolution] + multiplier*count).replace("count", count), {type: models.sequelize.QueryTypes.SELECT})
	.then(function(resp){
		// empties the objects used for the data in JSON
		tid_obj = {};
		src_obj = {};

		if (resp.length != 0)
			console.log("Retrieved " + resp.length + " rows of data");

		// wraps the data structures such that the data is in JSON format
		for (i = 0; i < count; i++){
			// handles empty query results, which means that there is no new data yet
			if (typeof(resp[i]) == 'undefined'){
				if (resp.length == 0)
					console.log("No more additional data");
				break;
			}

			ts = resp[i].ts;
			pid = resp[i].ts;
			src = parseInt(resp[i].src).toString(16);
			tid = resp[i].tid;
			//sdata = resp[i].sdata;
			if (tid == 0){
				//batter voltage
				sdata = resp[i].sdata * 5.0 / 1023.0;
			}else if (tid == 1){
				//internal temp
				sdata = ((resp[i].sdata*27069-18169625)/65536.0);
			}else if (tid == 4 || tid == 5){
				sdata = resp[i].sdata/10.0;
			}
			sdata = sdata / 1.0;
			sdata = sdata.toFixed(2);

			sensor_data_obj = {};
			sensor_data_obj["ts"] = 1*ts;
			sensor_data_obj["sdata"] = sdata;

			if (typeof(tid_obj[tid]) == 'undefined')
				tid_obj[tid] = {};

			if (typeof(tid_obj[tid][src]) == 'undefined')
				tid_obj[tid][src] = [];

			data_array_length = tid_obj[tid][src].length
			tid_obj[tid][src][data_array_length] = sensor_data_obj;
		}
		
		json_data = [JSON.stringify(tid_obj)];
		res.json(JSON.parse(json_data));
	});
}

//multiplier = row number in the csv file
// JSON: array
//		elements are objects with properties tid and with a object property value
//			object properties are src with array values
//				array elements are objects
//					object properties are ts and sdata
