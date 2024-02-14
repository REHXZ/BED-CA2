  document.addEventListener("DOMContentLoaded",function () {
      const token = localStorage.getItem('token')
      if(!token){window.location.href = 'login.html'}
      const user = document.getElementById("user")
      const TotalUsercallback = (responseStatus,responseData) => {
          console.log(responseStatus)
          console.log(responseData)
          display = document.createElement("div")
          display.className = "h5 mb-0 font-weight-bold text-gray-800"
          display.innerHTML = `${responseData[0].totaluser}`
          user.appendChild(display)
      }
      fetchMethod(currentUrl + "/api/user/TotalUser", TotalUsercallback, 'GET', null, localStorage.getItem("token"))


      const message_count = document.getElementById("message_count")
      const message_countCallback = (responseStatus,responseData) => {
          console.log(responseStatus)
          console.log(responseData)
          display = document.createElement("div")
          display.className = "h5 mb-0 font-weight-bold text-gray-800"
          display.innerHTML = `${responseData[0].totalmessages}`
          message_count.appendChild(display)
      }
      fetchMethod(currentUrl + "/api/message/TotalMessages", message_countCallback, 'GET', null, localStorage.getItem("token"))



      const Credit_Count = document.getElementById("total_credits")
      const Credit_CountCallback = (responseStatus,responseData) => {
          console.log(responseStatus)
          console.log(responseData)
          if (responseData[0].Credit_Count == null) {responseData[0].Credit_Count = 0}
          display = document.createElement("div")
          display.className = "h5 mb-0 font-weight-bold text-gray-800"
          display.innerHTML = `${responseData[0].Credit_Count}`
          Credit_Count.appendChild(display)
      }
      fetchMethod(currentUrl + "/api/game/TotalCredit", Credit_CountCallback, 'GET', null, localStorage.getItem("token"))

      const task = document.getElementById("task")
      const taskcallback = (responseStatus,responseData) => {
          console.log(responseStatus)
          console.log(responseData)
          display = document.createElement("div")
          display.className = "h5 mb-0 font-weight-bold text-gray-800"
          display.innerHTML = `${responseData[0].totaltaskcompleted}`
          task.appendChild(display)
      }
      fetchMethod(currentUrl + "/api/game/TotalTasks", taskcallback, 'GET', null, localStorage.getItem("token"))

      const AllUser = document.getElementById("AllUser")
      const AlluserCallbacks = (responseStatus,responseData) => {
          console.log(responseStatus)
          console.log(responseData)
          responseData.forEach((element) => {
              const displayUser = document.createElement("tr")
              displayUser.innerHTML = `
              <td id='username=${element.user_id}'>${element.username}</td>
              <td id='email=${element.user_id}'>${element.email}</td>
              <td id='authorization=${element.user_id}'>${element.Authorization}</td>
              <td>${element.created_on}</td>
              <td><button type="button" class="btn btn-primary" id="update=${element.user_id}">Update</button>
              </td>
              <td><button type="button" class="btn btn-danger" id="delete=${element.user_id}">Delete</button>
              </td>
              `
              AllUser.appendChild(displayUser);

              const deleteButton = document.getElementById(`delete=${element.user_id}`)
              deleteButton.addEventListener("click", (event) => {
                  event.preventDefault();
                  const callbackForDelete = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                  };
                  fetchMethod(currentUrl + "/api/user/" + element.user_id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
                  window.location.reload()
                });

              const UpdateButton = document.getElementById(`update=${element.user_id}`);
              UpdateButton.addEventListener("click", (event) => {
                  // Check if input fields are already present
                  const isEditing = UpdateButton.classList.contains('btn-success');
                  if (!isEditing) {
                      // Replace the username, email, and authorization cells with input fields
                      UpdateButton.classList.add('btn-success');
                      UpdateButton.innerHTML = `Submit`;
                      const usernameCell = document.getElementById(`username=${element.user_id}`);
                      const emailCell = document.getElementById(`email=${element.user_id}`);
                      const authorizationCell = document.getElementById(`authorization=${element.user_id}`);
              
                      const usernameInput = document.createElement("input");
                      usernameInput.type = "text";
                      usernameInput.value = element.username;
                      usernameCell.innerHTML = "";
                      usernameCell.appendChild(usernameInput);
              
                      const emailInput = document.createElement("input");
                      emailInput.type = "text";
                      emailInput.value = element.email;
                      emailCell.innerHTML = "";
                      emailCell.appendChild(emailInput);
              
                      const authorizationInput = document.createElement("input");
                      authorizationInput.type = "text";
                      authorizationInput.value = element.Authorization;
                      authorizationCell.innerHTML = "";
                      authorizationCell.appendChild(authorizationInput);
                  } else {
                      const updatedUsername = document.getElementById(`username=${element.user_id}`).querySelector('input').value;
                      const updatedEmail = document.getElementById(`email=${element.user_id}`).querySelector('input').value;
                      const updatedAuthorization = document.getElementById(`authorization=${element.user_id}`).querySelector('input').value;
              
                      // Create a data object to store the updated values
                      const updatedData = {
                          user_id: element.user_id,
                          username: updatedUsername,
                          email: updatedEmail,
                          Authorization: updatedAuthorization,
                      };
              
                      const UserUpdatecallback = (responseStatus, responseData) => {
                          console.log(responseStatus);
                          console.log(responseData);
                      };
              
                      fetchMethod(currentUrl + "/api/user/" + element.user_id, UserUpdatecallback, "PUT", updatedData, localStorage.getItem("token"));
                      window.location.reload();
                  }
              });
              
          });
      }
      fetchMethod(currentUrl + "/api/user", AlluserCallbacks, 'GET', null, localStorage.getItem("token"))


      const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          if (responseStatus == 401) {return window.location.href = 'login.html'}
          const playerList = document.getElementById("message");
          responseData.forEach((Messages) => {
            const displayItem = document.createElement("p");
                  displayItem.innerHTML = `
                  <div class="card-body text-dark" id="message">
                  <p class="text-start fs-4" style="border: 3px solid #000000; border-radius: 5px; padding-right: 10px;">${Messages.message_text}<blockquote class="text-end" style="color: #000000; padding-right: 5px;">
                      <div class="btn-group px-3" role="group" >
                      <a href="#" id="Mdelete=${Messages.id}" class="btn btn-outline-danger">
                      <i class="bx bx-trash"></i></a>
                      <a href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal=${Messages.id}" data-bs-whatever="@mdo">
                      <i class="bx bx-rename"></i></a>
                      </div>${Messages.username}
                      &nbsp;&nbsp;&nbsp;${Messages.created_at}
                      </blockquote>
                    </p>
                    <div class="modal fade" id="modal=${Messages.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content bg-dark text-light">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="exampleModalLabel">Update text</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                          <div id="bottom" class="input-group" style="background: inherit; border-color: inherit;">
                          <input id="updated_input=${Messages.id}" value='${Messages.message_text}' type="text" class="form-control" style="max-width: 100%;">
                          <button class="btn btn-outline-success" style="--bs-btn-color:#000000; --bs-btn-border-color:#000000;" href='chat.html?id=${Messages.id}' id="updated_button=${Messages.id}" type='submit'><i class="bx bx-send"></i></button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>`;
                  playerList.appendChild(displayItem);
        
                  const messageupdate = document.getElementById(`updated_button=${Messages.id}`);
                  messageupdate.addEventListener("click", (event) => {
                    event.preventDefault();
                    console.log(Messages.id)
                    const message = document.getElementById(`updated_input=${Messages.id}`).value;
                    const data = {
                      user_id: Messages.user_id,
                      message_text: message }
        
                    const callbackForUpdate = (responseStatus, responseData) => {
                      console.log("responseStatus:", responseStatus);
                      console.log("responseData:", responseData);
                    };
        
                    fetchMethod(currentUrl + "/api/message/" + Messages.id , callbackForUpdate, "PUT", data, localStorage.getItem("token"));
                    window.location.reload()
                  });
              
                  const messagedelete = document.getElementById(`Mdelete=${Messages.id}`);
                  messagedelete.addEventListener("click", (event) => {
                    event.preventDefault();
                    const callbackForDelete = (responseStatus, responseData) => {
                      console.log("responseStatus:", responseStatus);
                      console.log("responseData:", responseData);
                    };
                    fetchMethod(currentUrl + "/api/message/" + Messages.id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
                    window.location.reload()
                  });
          }); 
        };
        
        fetchMethod(currentUrl + "/api/message/", callback, 'GET', null, localStorage.getItem("token"));
        
        

  })