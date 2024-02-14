document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("message");
  
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = document.getElementById("username").value;
  
      // Perform signup logic
      if (username != undefined) {
        // Passwords match, proceed with signup
        console.log("Signup successful");
        console.log("Name:", username);
        warningCard.classList.add("d-none");
  
        const data = {
          name: username
        };
  
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 200) {
            // Check if signup was successful
            if (responseData.token) {
              // Store the token in local storage
              localStorage.setItem("token", responseData.token);
              // Redirect or perform further actions for logged-in user
              window.location.href = "profile.html";
            }
          } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = responseData.message;
          }
        };
  
        // Perform signup request
        fetchMethod(currentUrl + "/api/player", callback, "POST", data, localStorage.getItem("token"));
  
        // Reset the form fields
        signupForm.reset();

        window.location.reload()
      } else {
        // Passwords do not match, handle error
        warningCard.classList.remove("d-none");
        warningText.innerText = "Passwords do not match";
      }
    });
  });
  