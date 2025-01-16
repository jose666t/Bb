import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKjNNEm-YqZORFrereFo3OnlHhJ9xQq-0",
  authDomain: "app1-11e27.firebaseapp.com",
  projectId: "app1-11e27",
  storageBucket: "app1-11e27.firebasestorage.app",
  messagingSenderId: "388734549117",
  appId: "1:388734549117:web:d2a65240cc316dd0280514",
  measurementId: "G-340G89GT5C"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funcionalidad de chat
const sendMessageBtn = document.getElementById("sendMessageBtn");
const messageInput = document.getElementById("messageInput");
const messagesDiv = document.getElementById("messages");

// Enviar mensaje
sendMessageBtn.addEventListener("click", async () => {
  const message = messageInput.value;
  if (message.trim() !== "") {
    try {
      await addDoc(collection(db, "chats"), {
        message: message,
        timestamp: new Date()
      });
      messageInput.value = ""; // Limpiar el campo de entrada
    } catch (e) {
      console.error("Error al enviar el mensaje: ", e);
    }
  }
});

// Escuchar nuevos mensajes en tiempo real
const q = query(collection(db, "chats"), orderBy("timestamp"));
onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = ""; // Limpiar los mensajes antes de agregar nuevos
  snapshot.forEach((doc) => {
    const messageData = doc.data();
    const messageDiv = document.createElement("div");
    messageDiv.textContent = messageData.message;
    messagesDiv.appendChild(messageDiv);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Hacer scroll hacia el mensaje más reciente
});