import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt_eGHc98ovKeuhEo7x1i33Hi9rxR8trQ",
  authDomain: "sub4links-store.firebaseapp.com",
  projectId: "sub4links-store",
  storageBucket: "sub4links-store.firebasestorage.app",
  messagingSenderId: "951780236077",
  appId: "1:951780236077:web:8bfcba69d977d30f67d1a4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdmin() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, "admin@sup4links.com", "admin123");
    const user = userCredential.user;
    
    await setDoc(doc(db, "users", user.uid), {
      name: "أدمن النظام",
      email: "admin@sup4links.com",
      role: "admin",
      createdAt: new Date().toISOString()
    });
    console.log("Admin created successfully:", user.uid);
  } catch (error) {
    console.error("Error creating admin:", error.code, error.message);
  }
  process.exit();
}

createAdmin();
