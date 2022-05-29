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

export function parseFile(file) {
  try {
    let rle = fs.readFileSync(file, "utf8");
  } catch (e) {
    throw "File not found";
  }
}
