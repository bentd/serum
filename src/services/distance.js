// https://developers.google.com/maps/documentation/distance-matrix/start
export default class Distance {

  static compute(start, dest) {
    let api = "https://maps.googleapis.com/maps/api/distancematrix/";
    let format = "json?";
    let units = "units=imperial";
    let model = "&traffic_model=pessimistic";
    let origin = `&origins=${ start.latitude },${ start.longitude }`;
    let destination = `&destinations=${ dest.latitude },${ dest.longitude }`;
    let key = "&key=AIzaSyDfuvfoDCTgH0XmHgRpFwq0T2Zd_mpoJjQ";

    let promise = fetch(`${ api }${ format }${ units }${ origin }${ destination }${ key }`)
      .then(resp => resp.json())
      .then(resp => (resp.status == "OK" ? resp : null))
      .then(resp => (resp != null ? resp.rows[0].elements[0] : null))
      .catch(err => null);

    return promise;
  }

  static total(start, points, dest) {
    let api = "https://maps.googleapis.com/maps/api/directions/";
    let format = "json?";
    let units = "units=imperial";
    let origin = `&origin=${ start.latitude },${ start.longitude }`;
    let waypoints = "&waypoints=";
    let destination = `&destination=${ dest.latitude },${ dest.longitude }`;
    let key = "&key=AIzaSyDfuvfoDCTgH0XmHgRpFwq0T2Zd_mpoJjQ";

    for (let i = 0; i < points.length; i++) {
      waypoints += (i == 0) ? `${ points[i].latitude },${ points[i].longitude }` : `|${ points[i].latitude },${ points[i].longitude }`;
    }

    let promise = fetch(`${ api }${ format }${ units }${ origin }${ waypoints }${ destination }${ key }`)
      .then(resp => resp.json())
      .then(resp => (resp.status == "OK" ? resp : null))
      .then(resp => (resp != null ? resp.routes[0].legs : null))
      .catch(err => null);

    return promise;
  }

  static time(seconds) {
    let newTimeInMinutes = ((seconds - (seconds % 60)) / 60);
    if (newTimeInMinutes == 0) {
      newTimeInMinutes = 1;
    }
    return `${ newTimeInMinutes } MIN`;
  }

  static distance(meters) {
    let newDistanceInMiles = (meters / 1609.34);
    return `${ newDistanceInMiles.toPrecision(3) } MI`;
  }

}
