import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAbRiOPrglKpoW3J3CczhW19yWHDBJb52c",
    authDomain: "react-crud-app-54e58.firebaseapp.com",
    databaseURL: "https://react-crud-app-54e58-default-rtdb.firebaseio.com",
    projectId: "react-crud-app-54e58",
    storageBucket: "react-crud-app-54e58.appspot.com",
    messagingSenderId: "648881154888",
    appId: "1:648881154888:web:0e77d3dc37c486b92d617d"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();

  
