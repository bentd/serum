// Geography Utilities


function sum(val1, val2) {
  return val1 + val2;
}

function absdiff(val1, val2) {
  return Math.abs(val1 - val2);
}

function avg(val1, val2) {
  return val1 * 0.5 + val2 * 0.5;
}

function sqr(val) {
  return val ** 2;
}

function pythagorean(val1, val2) {
  return Math.sqrt([sqr(val1), sqr(val2)].reduce(sum));
}

function degreesRadians(deg) {
  return deg * Math.PI / 180.0;
}

function kilometersMiles(dist) {
  return dist * 0.621371;
}

function latitudeKilometers(latDelta) {
  return latDelta * 110.574;
}

function longitudeKilometers(longDelta, lat) {
  return longDelta * Math.cos(degreesRadians(lat)) * 111.320;
}

function coordinatesDeltas(coord1, coord2) {
  return [absdiff(coord1.lat, coord2.lat), absdiff(coord1.long, coord2.long), avg(coord1.lat, coord2.lat)];
}

function deltasKilometers(latDelta, longDelta, avgLat) {
  return pythagorean(latitudeKilometers(latDelta), longitudeKilometers(longDelta, avgLat));
}

function coordinatesKilometers(coord1, coord2) {
  return deltasKilometers(...coordinatesDeltas(coord1, coord2));
}

function coordinatesMiles(coord1, coord2) {
  return kilometersMiles(coordinatesKilometers(coord1,coord2));
}

function test() {
  coord1 = { lat: 30.299958, long: -81.566240 };
  coord2 = { lat: 30.299976, long: -81.560250 };
  console.log(coordinatesKilometers(coord1, coord2));
  // estimated distance - 576.85m
  // printed distance - 575.72m
}

// test();

export coordinatesMiles,
       coordinatesKilometers


/* References

// delta distance conversions
// https://stackoverflow.com/questions/1253499/simple-calculations-for-working-with-lat-lon-km-distance

*/
