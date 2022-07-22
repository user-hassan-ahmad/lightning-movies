'use strict';
Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: 'Module' },
});
var express = require('express');
var cheerio = require('cheerio');
var axios = require('axios');
var cors = require('cors');
function _interopDefaultLegacy(e) {
	return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}
var express__default = /* @__PURE__ */ _interopDefaultLegacy(express);
var cheerio__default = /* @__PURE__ */ _interopDefaultLegacy(cheerio);
var axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
var cors__default = /* @__PURE__ */ _interopDefaultLegacy(cors);
const tmdbAPIKey = '4a6c4c931829a02d62c31795cb0cd336';
const app = express__default['default']();
app.use(cors__default['default']());
app.get('/api/parental-guide', function (req, res) {
	const ID = req.query.imdbID;
	let url = `https://www.imdb.com/title/${ID}/parentalguide`;
	axios__default['default'](url)
		.then((response) => {
			let html = response.data;
			let $ = cheerio__default['default'].load(html);
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
app.get('/api/watch-guide-v1', function (req, res) {
	const imdbID = req.query.imdbID;
	const tmdb_base_url = 'https://www.themoviedb.org';
	let posts = [];
	axios__default['default']
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
			axios__default['default']
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
				.then((url2) => {
					axios__default['default'](url2)
						.then((response) => {
							let html = response.data;
							let $ = cheerio__default['default'].load(html);
							$('.ott_provider')
								.filter(function () {
									return $(this).find('h3').text().trim() === 'Stream';
								})
								.find('.ott_filter_best_price')
								.each(function () {
									const watch_platform_title = $(this)
										.find('a')
										.attr('title')
										.split(new RegExp('(?<= on)'))[1]
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
app.get('/api/watch-yts', function (req, res) {
	const imdbID = req.query.imdbID;
	const MD_url = `https://yts.torrentbay.to/api/v2/movie_details.json?imdb_id=${imdbID}&with_cast=true`;
	const MS_url = `https://yts.torrentbay.to/api/v2/movie_suggestions.json?movie_id=`;
	let posts = [];
	axios__default['default']
		.get(MD_url)
		.then((response) => response.data.data.movie)
		.then((data) => {
			const movieDetails = data;
			posts.push({ movieDetails });
			axios__default['default'].get(MS_url + data.id).then((response) => {
				const movieSuggestions = response.data.data.movies;
				posts.push({ movieSuggestions });
				res.json(posts);
			});
		});
});
const handler = app;
exports.handler = handler;
