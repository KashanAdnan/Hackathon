console.log("sd");
import {
    app,
    auth,
    db
} from "../../firebase/initialize.mjs"
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
onAuthStateChanged(auth, (user) => {
    if (user) {

    } else {
        window.location.href = "../../index.html"
    }
})
import {
    query,
    collection,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import {
    getStorage,
    getDownloadURL,
    ref
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const getData = async (user) => {
    const q = query(collection(db, "users"), where("user", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const storage = getStorage();
    querySnapshot.forEach((doc) => {
        getDownloadURL(ref(storage, doc.data().email))
            .then((url) => {
                const buttons = document.querySelector(".buttons")
                buttons.innerHTML = `<i class="fa-solid fa-shopping-cart"></i>
              <i class="fa-solid fa-heart"></i>
              <img onclick="redirect()" src=${url}>`
                document.querySelector(".container").innerHTML = `
              <img src=${url} />
              <h1>${doc.data().name}</h1>
              <p>${doc.data().email}</p>
              <button onclick="logout()">Logout</button>
              `
            });


    })
}

const logout = () => {
    signOut(auth).then(() => {
        window.location.href = "../../index.html"
    }).catch((error) => {
        // An error happened.
    });
}

onAuthStateChanged(auth, (user => {
    if (user) {
        getData(user)
    } else {
        console.log("SIng");
    }
}))


window.logout = logout