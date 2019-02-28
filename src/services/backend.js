import { AsyncStorage } from 'react-native';
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({

  apiKey: "AIzaSyBlS1cfp8Is61L_QvWlVQtIWBm4UdOQxCs",
  authDomain: "serum-1548601701872.firebaseapp.com",
  databaseURL: "https://serum-1548601701872.firebaseio.com",
  projectId: "serum-1548601701872",
  storageBucket: "serum-1548601701872.appspot.com",
  messagingSenderId: "473798917912"

});

let _geopoint = new firebase.firestore.GeoPoint(10,10);

let _firestore = firebase.firestore();

let _auth = firebase.auth();

export class Database {

  static database = _firestore;

  static getCollectionReference(c) {
    return this.database.collection(c);
  }

  static getDocumentReference(c, d) {
    return this.database.collection(c).doc(d);
  }

  static readAllData(c) {
    return this.database.collection(c).get();
  }

  static readData(c, d) {
    return this.database.collection(c).doc(d).get();
  }

  static updateData(c, d, data) {
    this.database.collection(c).doc(d).update({
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  static newGeoPoint(latitude, longitude) {
    return _geopoint;
  }

  // https://firebase.google.com/docs/firestore/query-data/listen
  static createDataListener(c, d, callback) {
    return this.database.collection(c).doc(d).onSnapshot(callback);
  }

  // https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
  static deleteDataListener(listener) {
    listener();
  }

  // https://firebase.google.com/docs/firestore/query-data/listen#listen_to_multiple_documents_in_a_collection
  static createAllDataListener(c, callback) {
    return this.database.collection(c).onSnapshot(callback);
  }

  // https://firebase.google.com/docs/firestore/query-data/listen#detach_a_listener
  static deleteAllDataListener(listener) {
    listener();
  }

}

export class Users {

  static users = _auth;

  static signIn(email, password) {
    return this.users.signInWithEmailAndPassword(email, password)
      .then((cred) => {
        try {
          AsyncStorage.setItem("DRIVER_EMAIL", email);
        } catch(err) {
          //NOTHING NEEDED HERE
        }
        return true

      })
      .catch((err) => {
        return false
      });
  }

  static signOut() {
    this.users.signOut()
      .then(() => {
        try {
          AsyncStorage.removeItem("DRIVER_EMAIL");
          AsyncStorage.removeItem("DRIVER_SHUTTLE");
        } catch(err) {
          //FIXME IF NECESSARY
        }
      })
      .catch(err => {
      })
  }



}
