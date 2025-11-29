// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_APP.firebaseapp.com",
    databaseURL: "https://YOUR_APP-default-rtdb.firebaseio.com",
    projectId: "YOUR_APP",
    storageBucket: "YOUR_APP.appspot.com",
    messagingSenderId: "0000000",
    appId: "1:000000:web:00000"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
