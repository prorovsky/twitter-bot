var Twit = require('twit'),
    config = require('./config'),
    T = new Twit(config),
    randomWords = [],
    newPost = '';

T.get('search/tweets', { q: 'vitebsk since:2011-07-11', count: 5 }, function(err, data, response) {
    if(err){
        console.error(err);
    }
    getData(data);
    tweetIt();
});

function tweetIt(){
    T.post('statuses/update', { status: newPost }, function(err, data, response) {
        if(err){
            console.error(err);
        }
    console.log(data);
    });
}

function getData(data){
    var tweets = data.statuses;
    for(var i = 0; i < tweets.length; i++){
        var tweetsArray = tweets[i].text.split(" ");
        var randomWord = tweetsArray[Math.floor(Math.random() * tweetsArray.length)];
        randomWords.push(randomWord);
    }
    newPost = randomWords.join(" ");
}