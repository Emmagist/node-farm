const fs = require('fs');

// Reading and Writting file in a syn way
const fileReader = fs.readFileSync("./starter/txt/input.txt", "utf-8");

// console.log(fileReader);

const fileWriter = `This is what we learnt about Avocado fruit: ${fileReader}. \nCreated on ${Date.now()}`;

fs.writeFileSync('./starter/txt/output.txt', fileWriter);

// console.log('File written');

//Reading and writting a file in Asyn way
fs.readFile('./starter/txt/read-this.txt', 'utf-8', (err, data) => {
    // console.log(data);
})

// Reading file in file
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        // console.log(data2);
    })
})

// Reading files and writting file
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, error => {
                console.log('writting file');
            })
        })
    })
})

console.log("Writting files");