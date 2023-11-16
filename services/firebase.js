import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFebTVYTFPyMkCNENzPmEO4hrB8ac-YTc",
  authDomain: "bigbrother-4321.firebaseapp.com",
  databaseURL: "https://bigbrother-4321.firebaseio.com",
  projectId: "bigbrother-4321",
  storageBucket: "bigbrother-4321.appspot.com",
  messagingSenderId: "555916862823",
  appId: "1:555916862823:web:d13134935cf32cb92f7bc2",
  measurementId: "G-CGJQQ8EVKS",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyDApWK94fGn-R32hR6habosGfBq-5lP5vI",
//   authDomain: "subhub-148f9.firebaseapp.com",
//   projectId: "subhub-148f9",
//   storageBucket: "subhub-148f9.appspot.com",
//   messagingSenderId: "330108131545",
//   appId: "1:330108131545:web:a960c4d2e31dd4877c46c8",
//   measurementId: "G-ZJQ2VS4TY0",
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (auth, formData) => {
  console.log(formData);
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email: formData.email,
      password: formData.password,
      city: formData.city,
      age: formData.age,
      name: formData.name,
      lastName: formData.name,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = async () => {
  await signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logOut,
};
