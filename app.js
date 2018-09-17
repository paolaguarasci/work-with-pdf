const fs = require('fs');
const path = require('path');
const textract = require('textract');
const pathFile = path.resolve(__dirname + '/sample/lorem1.pdf');
console.log(pathFile)
fs.readFile(pathFile, (err, data) => {
    if (err) console.log(err.message)
    const type = 'application/pdf';
    textract.fromBufferWithMime(type, data, function (error, text) {
        if (error) console.log(error.message)
        console.log(text);
    })
});