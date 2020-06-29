import firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCG3CNdopoId6uZe0PTMPPdaFIu_I1ecwk",
  authDomain: "vue-shop-88385.firebaseapp.com",
  databaseURL: "https://vue-shop-88385.firebaseio.com",
  projectId: "vue-shop-88385",
  storageBucket: "vue-shop-88385.appspot.com",
  messagingSenderId: "652045377240",
  appId: "1:652045377240:web:9636fb4fd85cdbd553c1ad"
};

const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { fb, db };
