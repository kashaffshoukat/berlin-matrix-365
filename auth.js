import { 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

if (emailInput && passwordInput) {
  // LOGIN PAGE LOGIC ONLY
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    // login code here
  });
}


const userCredential = await signInWithEmailAndPassword(auth, email, password);

const adminRef = doc(db, "admins", email);
const adminSnap = await getDoc(adminRef);

if (!adminSnap.exists()) {
  throw new Error("Not an admin");
}

if (!adminSnap.data().active) {
  throw new Error("Admin inactive");
}

window.location.href = "admin.html";

