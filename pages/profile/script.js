console.log("sd");
import {
    app,
    auth,
    db
} from "./firebase/initialize.mjs"
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
    query,
    collection,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const navbar = document.querySelector(".navbar")
const logo_img = document.querySelector(".logo-img")


const getData = async (user) => {
    const q = query(collection(db, "users"), where("user", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const buttons = document.querySelector(".buttons")
        buttons.innerHTML = `<i class="fa-solid fa-shopping-cart"></i>
<i class="fa-solid fa-heart"></i><a href="./pages/profile/index.html">${doc.data().name}</a>`
    });
}

onAuthStateChanged(auth, (user => {
    if (user) {
        getData(user)
    } else {
        console.log("SIng");
    }
}))