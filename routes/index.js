const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, __dirname + '/../uploads/')
  },
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
  }
});
const upload = multer({ storage });
const fs = require('fs');
const models = require('../models');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/poster/:id', (req, res, next) => {
  models.User.findOne({_id: req.params.id}, function(err,obj) { 
    if (err) {
      console.log(err)
    } else {
      res.render('poster', {
          image: new Buffer(obj.image.data).toString("base64"),
          contentType: obj.image.contentType,
          summary: obj.summary,
          title: obj.title,
          timestamp: obj.time
       });
    }
  });
}); 

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const img = fs.readFileSync(req.file.path);
    const user = new models.User({
      title: req.body.title,
      summary: req.body.summary,
      image: {
        data: img,
        contentType: 'image/png'
      }
    });

    await user.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          id: data._id
        })
      }
    });
  } catch(e) {
    console.log(e)
  }

});

module.exports = router;