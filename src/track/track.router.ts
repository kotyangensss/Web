const express = require('express');
const router = express.Router();

router.get('/:id', async function (req, res) {
  console.log(res.status());
  if (res.status(200)) {
    await res.render('track', { res: res });
  } else {
    await res.render('error', { res: res });
  }
});

module.exports = router;
