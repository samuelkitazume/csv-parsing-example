const fs = require("fs");
const parse = require("csv-parse");

const parser = parse({ delimiter: ';' });
const stream = fs.createReadStream('file.csv');
const output = [];

const start = Date.now();

// Use the readable stream api
parser.on('readable', function(){
  let record
  while (record = parser.read()) {
    output.push(record)
  }
});

// Catch any error
parser.on('error', function(err){
  console.error(`error on parsing...`, err.message);
});

// When we are done, test that the parsed output matched what expected
parser.on('end', function(){
  console.log(`That's it!`);
  console.log(output[output.length-1]);
  console.log(`Final time in ms: ${Date.now() - start}`);
})

stream.on('open', () => {
  stream.pipe(parser);
});

stream.on('error', function(err) {
  console.log('Error onn streaming...', err);
});