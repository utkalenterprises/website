// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Login successful");
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            loadClients();
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        });
}

function loadClients() {
    db.collection("clients").get().then(querySnapshot => {
        const tbody = document.getElementById('client-table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ""; // Clear existing rows

        querySnapshot.forEach(doc => {
            const client = doc.data();
            const row = tbody.insertRow();

            row.insertCell(0).textContent = client.name;
            row.insertCell(1).textContent = client.email;
            row.insertCell(2).textContent = client.subscription;

            const actionsCell = row.insertCell(3);
            actionsCell.innerHTML = `<button onclick="sendReceipt('${client.email}')">Send Receipt</button>`;
        });
    });
}

function addClient() {
    const name = prompt("Enter client name:");
    const email = prompt("Enter client email:");
    const subscription = prompt("Enter subscription amount:");

    db.collection("clients").add({
        name: name,
        email: email,
        subscription: subscription
    }).then(() => {
        alert("Client added successfully");
        loadClients();
    });
}

function sendReceipt(email) {
    alert("Receipt sent to " + email); // Add email sending logic here
}
