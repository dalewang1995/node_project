var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var Movie = require('./models/movie');
var bodyParser = require('body-parser');
var _ = require('underscore');
var multer = require('multer'); 

var port = process.env.PORT || 3000;
var app = express();

//数据库连接
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/imooc');
app.set('views','./views/pages');
app.set('view engine','pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment');
//app.use('/static', express.static('./bower_components'));
app.listen(port)

console.log('movie_website started on ' + port)


// index  page

app.get('/',function (req, res) {
	Movie.fetch(function(err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('index', {
			title: 'imooc 首页',
			movies: movies
		})
	})
})

// detail  page

app.get('/movie/:id',function (req, res) {
	var id = req.params.id;
	Movie.findById(id, function(err, movie){
		if (err) {
			console.log(err)
		}
		res.render('detail', {
			title: 'imooc ' + movie.title,
			movie: movie		
		})
	})
})

// admin update movie
app.get('/admin/update/:id', function (req, res) {
	var id = req.params.id;

	if (id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})


// admnin post movie
//后台录入页 post 提交的数据
app.post('/admin/movie/new', function(req, res) {
	console.log("enter app.post_____________________");

	console.log(req.body.movie);

	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;

	if (id !== '') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}

			_movie = _.extend(movie, movieObj);    // movie 查询到的   movieObj  post提交的
			_movie.save(function (err, movie) {
				if (err) {
					console.log(err)
				}

				res.redirect('/movie/' + movie._id)
			})
		})
	}else {
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash
		})

		_movie.save(function (err, movie) {
			if (err) {
				console.log(err)
			}

			res.redirect('/movie/' + movie._id)
		})
	}
})


// list  page

app.get('/admin/list',function (req, res) {

	Movie.fetch(function(err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('list', {
			title: 'imooc 首页',
			movies: movies
		})
	})
})
// list  delete
app.delete('/admin/list', function(req, res) {
	var id = req.query.id
	console.log(id)
	if (id) {
		Movie.remove({_id: id}, function(err, movie) {
			if (err) {
				console.log(err)
			}else{
				res.json({success: 1})
			}
		})
	}
})
// admin  page

app.get('/admin/movie',function (req, res) {
	res.render('admin', {
		title: 'imooc 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
})