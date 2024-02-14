document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("submit_message");
  // const warningCard = document.getElementById("warningCard");
  // const warningText = document.getElementById("warningText");

  signupForm.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("user_message").value;

    // Perform signup logic
    if (username != undefined) {
      username.value = '';
      // Passwords match, proceed with signup
      console.log("Message Sent");
      console.log("Message:", username);
      // warningCard.classList.add("d-none");

      const data = {
        message_text: username
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 200) {
          // Check if signup was successful
          if (responseData.token) {
            // Store the token in local storage
            localStorage.setItem("token", responseData.token);
          }
        } 
      };

      // Perform signup request
      fetchMethod(currentUrl + "/api/message/", callback, "POST", data, localStorage.getItem("token"));
      window.location.reload()
    }
  });
});