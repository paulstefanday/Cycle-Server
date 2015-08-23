var config 		= require(__base+'/api/config/config.js'),
    thinky 		= require(__base+'/api/config/thinky.js'),
	type 		= thinky.type,
	r 			= thinky.r,
	validator 	= require('validator');

var activities = thinky.createModel("activities", {
    id: type.string(),
    userId: type.string(),
    ip: type.string(),
    location: type.object(),
    type: type.string(),
    createdAt: type.date().default(r.now())
});

activities.ensureIndex("createdAt");

module.exports = activities;