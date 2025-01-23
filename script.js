// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9w493AqKQMB3QFNMI2pgH8B2iJIKMaG0",
    authDomain: "autenticate-8786c.firebaseapp.com",
    databaseURL: "https://autenticate-8786c-default-rtdb.firebaseio.com",
    projectId: "autenticate-8786c",
    storageBucket: "autenticate-8786c.firebasestorage.app",
    messagingSenderId: "729475935644",
    appId: "1:729475935644:web:74c836dfd35d8cda5cac59",
    measurementId: "G-TFY8HTB83F"
  };

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Función para calcular el signo zodiacal
function getZodiacSign(day, month) {
    const zodiacSigns = [
        {name: "Capricornio", start: [1, 1], end: [1, 19]},
        {name: "Acuario", start: [1, 20], end: [2, 18]},
        {name: "Piscis", start: [2, 19], end: [3, 20]},
        {name: "Aries", start: [3, 21], end: [4, 19]},
        {name: "Tauro", start: [4, 20], end: [5, 20]},
        {name: "Géminis", start: [5, 21], end: [6, 20]},
        {name: "Cáncer", start: [6, 21], end: [7, 22]},
        {name: "Leo", start: [7, 23], end: [8, 22]},
        {name: "Virgo", start: [8, 23], end: [9, 22]},
        {name: "Libra", start: [9, 23], end: [10, 22]},
        {name: "Escorpio", start: [10, 23], end: [11, 21]},
        {name: "Sagitario", start: [11, 22], end: [12, 21]},
        {name: "Capricornio", start: [12, 22], end: [12, 31]}
    ];

    const date = new Date(2000, month - 1, day);
    return zodiacSigns.find(sign => {
        const start = new Date(2000, sign.start[0] - 1, sign.start[1]);
        const end = new Date(2000, sign.end[0] - 1, sign.end[1]);
        return date >= start && date <= end;
    }).name;
}

// Manejar el envío del formulario
document.getElementById('zodiac-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    
    try {
        // Guardar en Firebase
        await db.collection('birthdays').add({
            day: day,
            month: month,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Calcular y mostrar el signo zodiacal
        const zodiacSign = getZodiacSign(day, month);
        document.getElementById('zodiac-sign').textContent = zodiacSign;
        document.getElementById('result').classList.remove('hidden');
    } catch (error) {
        console.error("Error al guardar en Firebase:", error);
        alert("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.");
    }
});