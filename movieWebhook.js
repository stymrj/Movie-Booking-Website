const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const axios = require('axios');



exports.dialogflowWebhook = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({ request, response });
  
    function movieInfoHandler(agent) {
      const apiKey = 'b751332a72ef22786f5a31f26756b4b4';
      const movieTitle = agent.parameters.movieTitle;
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieTitle)}`;
  
      return axios.get(apiUrl)
        .then(res => {
          const movieData = res.data.results[0];
          const movieTitle = movieData.title;
          const movieOverview = movieData.overview;
          const responseText = `Here is the overview for ${movieTitle}: ${movieOverview}`;
          agent.add(responseText);
        })
        .catch(err => {
          console.log(err);
          agent.add('Sorry, something went wrong. Please try again later.');
        });
    }
  
    let intentMap = new Map();
    intentMap.set('movieInfo', movieInfoHandler);
    agent.handleRequest(intentMap);
  });
  