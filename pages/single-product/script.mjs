import { storage, app, auth, db } from "../../firebase/initialize.mjs"
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import {
    query,
    collection,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const data = JSON.parse(localStorage.getItem("single-product"))
document.getElementById("title").innerHTML = data.name
const id = data.name + data.description
document.querySelector(".container").innerHTML = `
<div class="left-side " >
<img src="${data.image}" alt="">
</div>
<div class="right-side ${id.split(" ").join("")}">
<h1 class="name">${data.name}</h1>
<h3 class="price">${data.price}</h3>
<p>${data.description}</p>
    <div class="stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star-half-stroke"></i>
    </div>
    <button onclick="addtocart('${data.name}','${data.description}')">Add to Cart</button>
</div>
`


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
        console.log("SIng");
    }
}))

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
            cart.push(obj)
            localStorage.setItem("cartItem", JSON.stringify(cart))
            localStorage.setItem("cart", JSON.parse(localStorage.getItem("cartItem")).length)
            var i = localStorage.getItem("cart")
            document.querySelector(".cart").setAttribute("current-count", i)
        })
        .catch((error) => {
            console.log(error);
        });

}

window.addtocart = addtocart