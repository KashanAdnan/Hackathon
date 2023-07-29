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
    if (email === "admin@gmail.com" && password === "admin1234") {
        window.location.href = "../admin/index.html"
    } else {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                window.location.href = "../../index.html"
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }
})