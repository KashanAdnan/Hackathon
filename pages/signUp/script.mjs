import {
    db,
    app,
    auth
} from "../../firebase/initialize.mjs"
import {
    setDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js"
import {
    getStorage,
    ref,
    uploadBytes
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const signUp = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("Password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCrediantial) => {
            const user = userCrediantial.user;
            try {
                const storage = getStorage();
                const storageRef = ref(storage, email);

                // 'file' comes from the Blob or File API
                uploadBytes(storageRef, document.getElementById("file").files[0]).then(async (snapshot) => {
                    await setDoc(doc(db, "users", user.uid), {
                        name: name,
                        email: email,
                        password: password,
                        user: user.uid
                    });
                    window.location.href = "../../index.html"
                });

            } catch (e) {
                console.log(e);
            }
        }).catch((err) => {
            console.log(err);
        })
}

window.signUp = signUp