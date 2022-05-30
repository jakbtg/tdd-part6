import fs from 'fs';

export function parseRLE(rle, x) {
  let decoded = rle.slice(0, rle.length - 1);
  decoded = decoded.replace(/(\d+)(\D)/g, function (match, num) {
    return match.split(num)[1].repeat(num);
  })
  decoded = decoded.split("$");
  decoded = decoded.map(row => row.replace(/o/g, "1").replace(/b/g, "0"));
  decoded = decoded.map(row => row.split(""));
  decoded = decoded.map(row => row.map(num => parseInt(num)));
  decoded = decoded.map(row => {
    if (row.length < x) {
      let diff = x - row.length;
      let zeros = Array(diff).fill(0);
      let newRow = row.concat(zeros);
      return newRow;
    }
    return row;
  });
  return decoded;
}

export function parseFile(path) {
  try {
    let file = fs.readFileSync(path, "utf8");
    let lines = file.split("\n");
    let name = lines.filter(line => line.startsWith("#N"))[0].split(" ")[1];
    let x = lines.filter(line => /x\s*=\s*\d+/.test(line))[0].split(" ")[2];
    x = parseInt(x);
    let y = lines.filter(line => /y\s*=\s*\d+/.test(line))[0].split(" ")[5];
    y = parseInt(y);
    let rule = lines.filter(line => /rule\s*=\s*\w+\/\w+/.test(line))[0].split(" ")[8];
    let rle = lines[lines.length - 1];
    return {name, x, y, rule, rle};
  } catch (e) {
    throw "File not found";
  }
}

export function encodeRLE(matrix) {
  let rle = "";
  let block = matrix.map(row => row.join(""));
  block = block.join("$");
  block = block.replace(/1/g, "o").replace(/0/g, "b");
  var count = 1;
  for (let i = 0; i < block.length; i++) {
    if (block[i] === block[i + 1]) {
      count++;
    } else {
      if (count > 1) {
        rle += count;
      }
      rle += block[i];
      count = 1;
    }
  }
  rle += "!";
  return rle;
}

export function writeRLEFile(name, comment, rle) {
  let file = "#C " + comment + "\n";
  file += rle;
  fs.writeFileSync(`./output/${name}.rle`, file);
}
