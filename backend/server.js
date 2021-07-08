const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const pdfparse = require('pdf-parse');
const cors = require('cors');

const app = express();
app.use(fileUpload());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  let pdftext;
  await pdfparse(file).then((data) => {
    pdftext = data.text;
  });
  console.log(pdftext);
  res.json({
    data: pdftext,
    fileName: file.name,
    filePath: `/uploads/${file.name}`,
  });

  // file.mv(`${__dirname}/../gpa-converter-react/public/uploads/${file.name}`, err => {
  //     if (err){
  //         console.error(err);
  //         return res.status(500).send(err);
  //     }

  //     res.json({data: pdftext, fileName: file.name, filePath: `/uploads/${file.name}`})
  // });
});

app.listen(process.env.PORT || 5000, () => console.log('Server started...'));
