const Suggestion = require('../models/suggestion.model');


//Simple version, without validation or sanitation
exports.getSuggestion = function (req, res)
{
    //res.send('Greetings from Get suggestions!');
    var name = req.body;
    console.log(name);
    Suggestion.find({course_name:req.body.course_name, keyword: {$regex: '.*'+ req.body.keyword+'.*'} }, function(err, suggestion) {
      //Do your action here..
      if (err) {
          console.log("Unable to get student details from the cluster");
          throw err;
      }

      else {
          console.log("Successfully retrieved suggestion");
          res.send(suggestion);
          console.log(suggestion);
      }
    });
};

exports.createSuggestion = function (req, res) {
    let suggestion = new Suggestion(
        {
            course_name:req.body.course_name,
            keyword:req.body.keyword,
            suggestion:req.body.suggestion
        }
    );

    suggestion.save(function (err)
    {
        if (err)
        {
             console.log("Unable to create Suggestion to this course");
            throw err;
        }
        res.send('Suggestion Created successfully');

    })


};
