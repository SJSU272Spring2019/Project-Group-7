var https = require('https');
var cheerio = require('cheerio');
var Promise = require('bluebird');

exports.get_recommendation = function (req, res) {

    console.log("get recommendation");
    query = "NCERT 8th grade " + req.body.course_name + " " + req.body.test_name;

    get_youtube_results(query).then(function (results) {
        console.log(results);
        res.send(results);
    });
}

function get_youtube_results(query) {
    return new Promise(function (resolve, reject) {
        try {
            https.get('https://www.youtube.com/results?search_query=' + query, function(res) {
            var page = '';
            var youtube_links = [];

            res.on('data', function(part) {page += part;});

            res.on('end', function() {
                var $ = cheerio.load(page);
                var type_video = $('.yt-lockup-video');

                for (i = 0; i < type_video.length; i++) {
                    var youtube_uri = $(type_video[i]).find('.yt-uix-sessionlink').attr('href');
                    if (!youtube_uri.startsWith('/watch')) { continue; }

                    youtube_links.push({
                        title: $(type_video[i]).find('.yt-lockup-title a').text(),
                        uri: 'https://youtube.com' + youtube_uri
                    });
                }

                resolve(youtube_links);

            });
            });

        } catch (err) {
          reject(err);
        }
    });
};