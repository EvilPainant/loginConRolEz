import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { showMessage } from "./showMessage.js";
import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const signUpForm = document.querySelector("#signup-form");

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombreUsuario = signUpForm["signup-nombreUsuario"].value;
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Nuevos datos para guardars
    await setDoc(doc(db, "usuarios", user.uid), {
      nombreUsuario: nombreUsuario,
      email: email,
      rol: "usuario", // Rol por defecto, luego se le puede hacer un
      // crud al gerente para que el mismo le de rol al usuario
      fechaCreada: new Date(),
    });

    const signupModal = document.querySelector("#signupModal");
    const modal = bootstrap.Modal.getInstance(signupModal);
    modal.hide();

    signUpForm.reset();

    showMessage("Bienvenido " + nombreUsuario);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showMessage("Email en uso", "error");
    } else if (error.code === "auth/invalid-email") {
      showMessage("Email inválido", "error");
    } else if (error.code === "auth/weak-password") {
      showMessage("Contraseña débil", "error");
    } else {
      showMessage("Algo malió sal", "error");
    }
  }
});
