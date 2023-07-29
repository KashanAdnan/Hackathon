import { db, storage } from "../../firebase/initialize.mjs"
import { uploadBytes, ref } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const addProduct = async () => {
    const name = document.getElementById("name").value;
    const file = document.getElementById("image").files[0];
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    try {
        const storageRef = ref(storage, `${name + description}`);
        uploadBytes(storageRef, file).then(async (snapshot) => {
            await setDoc(doc(db, "products", name), {
                name: name,
                description: description,
                price: price
            });
            window.location.href = "../../index.html"
        });
    } catch (error) {
        console.log(error);
    }
}

window.addProduct = addProduct