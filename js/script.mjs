import { storage, app, auth, db } from "../firebase/initialize.mjs"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
    query,
    collection,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const navbar = document.querySelector(".navbar")
const logo_img = document.querySelector(".logo-img")

const redirect = () => {
    window.location.href = './pages/profile/index.html'
}


const getData = async (user) => {
    const q = query(collection(db, "users"), where("user", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getDownloadURL(ref(storage, doc.data().email))
            .then((url) => {
                const buttons = document.querySelector(".buttons")
                buttons.innerHTML = `<div class="cart" current-count="0" ><i class="fa-solid fa-shopping-cart"></i></div>
            <i class="fa-solid fa-heart"></i>
            <img onclick="redirect()" src=${url}>
            `
                localStorage.setItem("cart", JSON.parse(localStorage.getItem("cartItem")).length)
                var i = localStorage.getItem("cart")
                document.querySelector(".cart").setAttribute("current-count", i)
            })
            .catch((error) => {
                console.log(error);
            });
    });
}






onAuthStateChanged(auth, (user => {
    if (user) {
        getData(user)
    } else {
        console.log("sign-out");
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

const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
    getDownloadURL(ref(storage, doc.data().name + doc.data().description))
        .then((url) => {
            const id = doc.data().name + doc.data().description;
            document.querySelector(".products").innerHTML += `
        <div onclick="productCard('${doc.data().name}' , '${doc.data().description}')"  class="product-card ${id.split(" ").join("")}">
        <img src="${url}" alt="">
        <h1 class="name">${doc.data().name}</h1>
        <div class="button-price">
                  <p class="price">$${doc.data().price}</p>
                  <button><i onclick="addtocart('${doc.data().name}','${doc.data().description}')" class="fa-solid fa-shopping-cart"></i></button>
              </div>
             </div>
            `
        })
        .catch((error) => {
            console.log(error);
        });
});

var i = localStorage.getItem("cart")
const addtocart = (name, description) => {
    const id = name + description;
    const element = document.querySelector(`.${id.split(" ").join("")}`)
    const name2 = element.querySelector(".name").innerText
    const price = element.querySelector(".price").innerText
    getDownloadURL(ref(storage, name + description))
        .then((url) => {
            let obj = {
                name: name2,
                description,
                price,
                image: url
            }
            const cart = JSON.parse(localStorage.getItem("cartItem")) ? JSON.parse(localStorage.getItem("cartItem")) : []
            localStorage.setItem("cart", JSON.parse(localStorage.getItem("cartItem")).length)
            document.querySelector(".cart").setAttribute("current-count", i)
            cart.push(obj)
            localStorage.setItem("cartItem", JSON.stringify(cart))
        })
        .catch((error) => {
            console.log(error);
        });

}

const productCard = (name, description) => {
    const id = name + description;
    const formula = id.split(" ").join("")
    const element = document.querySelector(`.${formula}`)
    const name2 = element.querySelector(".name").innerText
    const price = element.querySelector(".price").innerText
    getDownloadURL(ref(storage, name + description))
        .then((url) => {
            let obj = {
                name: name2,
                description,
                price,
                image: url
            }
            localStorage.setItem("single-product", JSON.stringify(obj))
            window.location.href = "./pages/single-product/index.html"
        }).catch((err => {
            console.log(err);
        }))
}


window.redirect = redirect
window.addtocart = addtocart
window.productCard = productCard