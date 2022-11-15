require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: './uploadedFiles'});
const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* contents of req.body: {}
   * contents of req.file:
   * {
   *    fieldname: 'upfile', 
   *    originalname: 'gmapping command things',
   *    encoding: '7bit',
   *    mimetype: 'application/octet-stream',
   *    destination: './uploadedFiles',
   *    filename: '17c50902a4a77b33051ff2387142a613',
   *    path: 'uploadedFiles/17c50902a4a77b33051ff2387142a613',
   *    size: 2051
   *  }
   */
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if (req.body && req.file) {
    let response = {
      name: req.file.originalname,
      type: req.file.mimetype, 
      size: req.file.size
    };
    res.json(response);
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
