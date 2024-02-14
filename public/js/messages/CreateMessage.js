document.addEventListener("DOMContentLoaded", function () {
  const Send_Message = document.getElementById("submit_message");
  // const warningCard = document.getElementById("warningCard");
  // const warningText = document.getElementById("warningText");

  Send_Message.addEventListener("click", function (event) {
    event.preventDefault();
    const message = document.getElementById("user_message").value;

    // Perform signup logic
    if (message != undefined) {
      message.value = '';
      // Passwords match, proceed with signup
      console.log("Message Sent");
      console.log("Message:", message);
      // warningCard.classList.add("d-none");

      const data = {
        message_text: message
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      };

      // Perform signup request
      fetchMethod(currentUrl + "/api/message/", callback, "POST", data, localStorage.getItem("token"));
      window.location.reload()
    }
  });
});