module.exports = function(app, __dirname) {
	app.get('*', function(req, res) {
		res.sendFile('/public/index.html',{"root": __dirname});
	});
};