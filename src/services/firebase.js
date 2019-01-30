import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBlS1cfp8Is61L_QvWlVQtIWBm4UdOQxCs",
  authDomain: "serum-1548601701872.firebaseapp.com",
  databaseURL: "https://serum-1548601701872.firebaseio.com",
  projectId: "serum-1548601701872",
  storageBucket: "serum-1548601701872.appspot.com",
  messagingSenderId: "473798917912"
};

firebase.initializeApp(config);

let db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
}); // disable deprecated features

export default db as Database;
