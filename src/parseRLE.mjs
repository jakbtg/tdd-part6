export function parseRLE(rle) {
  let decoded = rle.slice(0, rle.length - 1);
  decoded = decoded.replace(/(\d+)(\D)/g, function (match, num) {
    return match.split(num)[1].repeat(num);
  })
  decoded = decoded.split("$");
  decoded = decoded.map(row => row.replace(/o/g, "1").replace(/b/g, "0"));
  decoded = decoded.map(row => row.split(""));
  decoded = decoded.map(row => row.map(num => parseInt(num)));
  return decoded;
}
