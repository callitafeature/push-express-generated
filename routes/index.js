var express = require('express');
const webpush = require('web-push')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* SUBSCRIBE to push notifications */
router.post('/notifications/subscribe', (req, res) => {
  const subscription = req.body

  console.log("Received subscription",subscription);

  const payload = JSON.stringify({
    title: 'Hello from Express',
    body: 'Sent from Heroku',
  })

  webpush.sendNotification(subscription, payload)
    .then(result => console.log(result))
    .catch(e => console.log("ERROR!", e.stack))

  res.status(200).json({'success': true})
});

module.exports = router;
