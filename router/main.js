module.exports = function(app) {
	
	app.get('/',function(req,res){
		res.render('index.html')
	});

	app.get('/lists',function(req,res){
		res.render('lists.html')
	});

}