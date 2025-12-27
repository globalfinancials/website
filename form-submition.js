const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submitButton");
const buttonText = submitButton.querySelector("span");
const buttonIcon = submitButton.querySelector("i");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  // 1. UI Loading State
  const originalText = buttonText.innerText;
  submitButton.disabled = true;
  buttonText.innerText = "Sending...";
  buttonIcon.className = "fa-solid fa-spinner fa-spin"; // Change icon to spinner
  submitButton.classList.add("opacity-75", "cursor-not-allowed");

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  result.innerHTML = ""; // Clear previous messages

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        
        // 2. UI Success State
        buttonText.innerText = "Message Sent Successfully!";
        buttonIcon.className = "fa-solid fa-check";
        
        // Change button color to Green
        submitButton.classList.remove("bg-accent", "hover:bg-blue-600");
        submitButton.classList.add("bg-green-600", "hover:bg-green-700");
        
        form.reset();
        
      } else {
        console.log(response);
        result.innerHTML = json.message || "Something went wrong!";
        result.className = "text-center text-sm font-semibold mt-2 text-red-500";
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.className = "text-center text-sm font-semibold mt-2 text-red-500";
    })
    .then(function () {
        // 3. Reset Button after 5 seconds
        setTimeout(() => {
            submitButton.disabled = false;
            buttonText.innerText = originalText;
            buttonIcon.className = "fa-solid fa-paper-plane group-hover:translate-x-1 transition-transform";
            
            // Revert colors
            submitButton.classList.remove("bg-green-600", "hover:bg-green-700", "opacity-75", "cursor-not-allowed");
            submitButton.classList.add("bg-accent", "hover:bg-blue-600");
            
            result.innerHTML = "";
        }, 5000);
    });
});
