var debug = require('debug')('watchitlater:server');
var Q = require('q');
var mongoose = require('mongoose');

var AppConfigSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Array
	},
	key: {
		type: String,
		trim: true
	},
	value: {
		type: Array,
		trim: true
	}
});
var AppConfig = mongoose.model('AppConfig', AppConfigSchema);
var LATEST_BO_KEY = 'latest-box-office';
var LATEST_TM_KEY = 'latest-top-movies';

var appModule = {
	updateLatestBoxOffice: updateLatestBoxOffice,
	updateLatestTopMovies: updateLatestTopMovies,
	getLatestBoxOffice: getLatestBoxOffice,
	getLatestTopMovie: getLatestTopMovie
};
module.exports = appModule;

function getLatestBoxOffice() {
	return getValue(LATEST_BO_KEY);
}

function getLatestTopMovie() {
	return getValue(LATEST_TM_KEY);
}

function getValue(key) {
	var deferred = Q.defer();
	var query = {key: key};
	AppConfig.findOne(query, function(err, doc) {
		if (err)
			debug('error ', err);
		else
			deferred.resolve(doc.value);
	});
	return deferred.promise;	
}

function updateLatestBoxOffice(movieIds) {
	debug('AppConfig updateLatestBoxOffice() ', movieIds);
	return findOneAndUpdate(LATEST_BO_KEY, movieIds);
}

function updateLatestTopMovies(movieIds) {
	debug('AppConfig updateLatestTopMovies() ', movieIds);
	return findOneAndUpdate(LATEST_TM_KEY, movieIds);
}

function findOneAndUpdate(key, value) {
	var deferred = Q.defer();
	var query = {key: key};
	var opt = {upsert: true};

	var data = {
		key: key,
		value: value
	};

	AppConfig.findOneAndUpdate(query, data, opt, function(err) {
		if (err)
			debug('  error ', err);
		else
			debug('  saved ');

		deferred.resolve();
	});
	return deferred.promise;
}