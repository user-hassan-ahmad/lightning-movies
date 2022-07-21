const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const port = 8080;
const cors = require('cors');
const tmdbAPIKey = '4a6c4c931829a02d62c31795cb0cd336';

const app = express();

app.use(cors());

app.get('/parental-guide', function (req, res) {
	const ID = req.query.imdbID;
	let url = `https://www.imdb.com/title/${ID}/parentalguide`;
	axios(url)
		.then((response) => {
			let html = response.data;
			let $ = cheerio.load(html);
			let posts = [];
			$("section[id^='advisory']:lt(5)", html)
				.not("section[id*='spoilers']")
				.each(function () {
					const title = $(this).find('h4').text();
					const category = $(this).find('span.ipl-status-pill').text();
					const categoryVote = $(this)
						.find('a.advisory-severity-vote__message')
						.text();
					const descList = [];
					$(this)
						.find('li.ipl-zebra-list__item')
						.each(function () {
							descList.push(
								$(this)
									.contents()
									.filter(function () {
										return this.type === 'text';
									})
									.text()
									.trim()
									.replace(/[\r\n\s]{2,}/gm, '')
							);
						});
					posts.push({ title, category, categoryVote, descList });
					console.log(posts);
				});
			res.json(posts);
		})
		.catch((err) => console.log(err));
});

app.get('/watch-guide-v1', function (req, res) {
	const imdbID = req.query.imdbID;
	const tmdb_base_url = 'https://www.themoviedb.org';
	let posts = [];

	axios
		.get(
			`https://api.themoviedb.org/3/find/${imdbID}?api_key=${tmdbAPIKey}&external_source=imdb_id`
		)
		.catch(function (error) {
			console.log(error);
		})
		.then((response) => {
			if (response.data.tv_results[0]) {
				const newID = response.data.tv_results[0].id;
				let url = `https://api.themoviedb.org/3/tv/${newID}/watch/providers?api_key=${tmdbAPIKey}`;
				return url;
			}
			if (response.data.movie_results[0]) {
				const newID = response.data.movie_results[0].id;
				let url = `https://api.themoviedb.org/3/movie/${newID}/watch/providers?api_key=${tmdbAPIKey}`;
				return url;
			}
		})
		.catch(function (error) {
			console.log(error);
		})
		.then((url) => {
			axios
				.get(url)
				.catch(function (error) {
					console.log("couldn't find watch options");
				})
				.then((response) => {
					if (response.data.results.GB) {
						return response.data.results.GB.link;
					} else {
						return response.data.results[Object.keys(response.data.results)[0]]
							.link;
					}
				})
				.catch(function (error) {
					console.log(error);
				})
				.then((url) => {
					axios(url)
						.then((response) => {
							let html = response.data;
							let $ = cheerio.load(html);
							$('.ott_provider')
								.filter(function () {
									return $(this).find('h3').text().trim() === 'Stream';
								})
								.find('.ott_filter_best_price')
								.each(function () {
									const watch_platform_title = $(this)
										.find('a')
										.attr('title')
										.split(/(?<= on)/)[1]
										.trim();
									const watch_platform_img =
										tmdb_base_url + $(this).find('img').attr('src');
									const watch_link = $(this).find('a').attr('href');

									posts.push({
										watch_platform_title,
										watch_platform_img,
										watch_link,
									});
								});
							res.json(posts);
						})
						.catch(function (error) {
							console.log(error);
						});
				});
		});
});

app.get('/watch-yts', function (req, res) {
	const imdbID = req.query.imdbID;
	const MD_url = `https://yts.torrentbay.to/api/v2/movie_details.json?imdb_id=${imdbID}&with_cast=true`;
	const MS_url = `https://yts.torrentbay.to/api/v2/movie_suggestions.json?movie_id=`;

	let posts = [];
	axios
		.get(MD_url + imdbID)
		.then((response) => response.data.data.movie)
		.then((data) => {
			const movieDetails = data;
			posts.push({ movieDetails });

			axios.get(MS_url + data.id).then((response) => {
				const movieSuggestions = response.data.data.movies;
				posts.push({ movieSuggestions });
				res.json(posts);
			});
		});
});

app.listen(port, function (error) {
	if (error) {
		console.log('something went wrong', error);
	} else {
		console.log('server is listening on port', port);
	}
});

// imdbID = 'tt3522806';

// const MD_url = `https://yts.torrentbay.to/api/v2/movie_details.json?imdb_id=${imdbID}&with_cast=true`;
// const MS_url = `https://yts.torrentbay.to/api/v2/movie_suggestions.json?movie_id=`;

// const getData = async () => {
// 	let posts = [];
// 	axios
// 		.get(MD_url + imdbID)
// 		.then((response) => response.data.data.movie)
// 		.then((data) => {
// 			const movieDetails = data;
// 			posts.push({ movieDetails });

// 			axios.get(MS_url + data.id).then((response) => {
// 				const movieSuggestions = response.data.data.movies;
// 				posts.push({ movieSuggestions });
// 				console.log(posts);
// 			});
// 		});
// };

// getData();
