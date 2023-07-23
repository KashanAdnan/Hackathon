import {
    app,
    auth
} from "../../firebase/initialize.mjs"
import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const signBtn = document.querySelector("#sign")

signBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("Password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            window.location.href = "../../index.html"
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
        });
})