// // script.js
// document.getElementById("paymentForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevents form from submitting

//     const phone = document.getElementById("phone").value;
//     const amount = document.getElementById("amount").value;
//     const statusMessage = document.getElementById("statusMessage");

//     if (validatePhone(phone) && validateAmount(amount)) {
//         statusMessage.textContent = "Processing payment...";
//         statusMessage.style.color = "green";
//         setTimeout(() => {
//             statusMessage.textContent = "Payment request sent!";
//         }, 2000);
//     } else {
//         statusMessage.textContent = "Please check your details and try again.";
//         statusMessage.style.color = "red";
//     }
// });

// function validatePhone(phone) {
//     return phone.length === 10 && /^[0-9]+$/.test(phone);
// }

// function validateAmount(amount) {
//     return amount > 0;
// }
