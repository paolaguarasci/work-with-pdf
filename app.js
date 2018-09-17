const fs = require('fs');
const path = require('path');
const textract = require('textract');
const pathFile = path.resolve(__dirname + '/sample/lorem1.pdf');
const hummus = require('hummus');
console.log(pathFile)
fs.readFile(pathFile, (err, data) => {
    if (err) console.log(err.message)
    const type = 'application/pdf';
    textract.fromBufferWithMime(type, data, function (error, text) {
        if (error) console.log(error.message)
        console.log(text);
    })
});


//merge
const files = process.argv.slice(3);
const pdfWriter = hummus.createWriter(__dirname + '/output/TestOnlyMerge.pdf');
for (let i in files) {
    pdfWriter.appendPDFPagesFromPDF(path.relative(__dirname, files[i]));
}
pdfWriter.end();