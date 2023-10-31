import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUx3vdDuoUaN8tsqIPuXSGJSEEM3Tfw-o",
  authDomain: "todo-app-59947.firebaseapp.com",
  projectId: "todo-app-59947",
  storageBucket: "todo-app-59947.appspot.com",
  messagingSenderId: "949229937776",
  appId: "1:949229937776:web:7479cbf5e42ff349c400b5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// async function getUser() {
//   console.log(auth);
//   const docRef = doc(db, "users", auth.currentUser.uid);
//   const docSnap = await getDoc(docRef);
//   return await docSnap._document.data.value.mapValue.fields;
// }

// auth.onAuthStateChanged(async (user) => {
//   if (user) {
//     localStorage.setItem("user", JSON.stringify(await getUser()));
//   } else {
//     localStorage.removeItem("user");
//   }
// });
export const userUid = await auth.onAuthStateChanged(function (user) {
  if (user) {
    return user.uid;
  }
});
