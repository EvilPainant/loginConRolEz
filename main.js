import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { auth } from "./app/firebase.js";
import { loginCheck } from "./app/loginCheck.js";

import './app/signupForm.js'
import './app/signinForm.js'
import './app/logout.js'



const gerente = document.querySelector(".gerente");
//Se verifica el rol del usuario
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.rol === "gerente") {
        gerente.style.display = "block";
      } else {
        gerente.style.display = "none";
      }
    } else {
      gerente.style.display = "none";
    }
  } else {
    loginCheck(user);
    gerente.style.display = "none";
  }
});


const trabajador = document.querySelector(".trabajador");

// Listener para cambios en el estado de autenticación
onAuthStateChanged(auth, async (user) => {
  if (user) {
    loginCheck(user);

    // Verificar rol del usuario
    const userDoc = await getDoc(doc(db, "usuarios", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (userData.rol === "trabajador") {
        // Mostrar el botón "Ingresar" si el rol es admin
        trabajador.style.display = "block";
      } else {
        // Ocultar el botón si el rol no es admin
        trabajador.style.display = "none";
      }
    } else {
      console.log("El documento del usuario no existe");
      trabajador.style.display = "none"; // Ocultar por defecto
    }
  } else {
    loginCheck(user);
    trabajador.style.display = "none"; // Ocultar si no está autenticado
  }
});