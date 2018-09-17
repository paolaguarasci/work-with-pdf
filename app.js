const fs = require('fs');
const path = require('path');
const textract = require('textract');
const pathFile = path.resolve(__dirname + '/sample/lorem1.pdf');
const hummus = require('hummus');
// console.log(pathFile)
// fs.readFile(pathFile, (err, data) => {
//     if (err) console.log(err.message)
//     const type = 'application/pdf';
//     textract.fromBufferWithMime(type, data, function (error, text) {
//         if (error) console.log(error.message)
//         console.log(text);
//     })
// });


// //merge
// const files = process.argv.slice(3);
// const pdfWriter = hummus.createWriter(__dirname + '/output/TestOnlyMerge.pdf');
// for (let i in files) {
//     pdfWriter.appendPDFPagesFromPDF(path.relative(__dirname, files[i]));
// }
// pdfWriter.end();

// //split pagina per pagina
// const file = process.argv[3];
// const pdfReader = hummus.createReader(path.relative(__dirname, file));
// const pageNum = pdfReader.getPagesCount();
// console.log(pageNum);

// for (let i = 0; i < pageNum; i++) {
//     let pdfWriter = hummus.createWriter(__dirname + '/output/' + i + '.pdf');
//     let copyingContext = pdfWriter.createPDFCopyingContext(path.relative(__dirname, file));
//     copyingContext.appendPDFPageFromPDF(i);
//     pdfWriter.end();
// }



// add watermark
const logo = '/sample/nodejs.png';
var pdfWriter = hummus.createWriterToModify('./sample/lorem1.pdf', {
    modifiedFilePath: './output/watermarked.pdf'
});
var formXObject = pdfWriter.createFormXObjectFromPNG(__dirname + logo);
var pageModifier = new hummus.PDFPageModifier(pdfWriter, 0);
pageModifier.startContext().getContext().q()
    // .cm(1, 0, 0, 1, 0, 400)
    .doXObject(formXObject)
    .Q();
pageModifier.endContext().writePage();
pdfWriter.end();