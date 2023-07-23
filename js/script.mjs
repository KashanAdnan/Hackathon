import {
    app,
    auth
} from "./firebase/initialize.mjs"
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
    query,
    collection,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
const navbar = document.querySelector(".navbar")
const logo_img = document.querySelector(".logo-img")

const getData = async (user) => {
    console.log(user);
    const q = query(collection(db, "users"), where("user", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        return doc.data()
    });
}

onAuthStateChanged(auth, (user => {
    if (user) {
        getData(user)
        const buttons = document.querySelector(".buttons")
        buttons.innerHTML = `<i class="fa-solid fa-shopping-cart"></i>
        <i class="fa-solid fa-heart"></i>`
    } else {
        console.log("SIng");
    }
}))


window.addEventListener("scroll", (() => {
    const scollY = window.scrollY;
    if (scollY >= 150) {
        navbar.classList.add("color")
        logo_img.src = "../img/black-logo.png"
    } else {
        navbar.classList.remove("color")
        logo_img.src = "../img/logo.png"
    }
}))