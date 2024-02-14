const callback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);
  const userId = localStorage.getItem('userId')
  if (responseStatus == 401) {return window.location.href = 'login.html'}
  const playerList = document.getElementById("message");
  responseData.forEach((Messages) => {
    const displayItem = document.createElement("p");
        if(Messages.user_id == userId){
          displayItem.innerHTML = `
            <p class="text-end" style="border: 3px solid #33ffa0; border-radius: 5px; padding-right: 10px;">${Messages.message_text}<blockquote class="text-end" style="color: #00ff88; padding-top: 10px; padding-right: 5px;">
              <div class="btn-group px-3" role="group" >
              <a href="#" id="delete=${Messages.id}" class="btn btn-outline-danger">
              <i class="bx bx-trash"></i></a>
              <a href="#" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modal=${Messages.id}" data-bs-whatever="@mdo">
              <i class="bx bx-rename"></i></a>
              </div>
              ${Messages.username}
              <kbd>&nbsp;${Messages.created_at}</kbd>
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
                  <button class="btn btn-outline-success" style="--bs-btn-color:#00ff88; --bs-btn-border-color:#00ff88;" href='chat.html?id=${Messages.id}' id="updated_button=${Messages.id}" type='submit'><i class="bx bx-send"></i></button>
                </div>
                </div>
              </div>
            </div>
          </div>
          </div>`;
          playerList.appendChild(displayItem);

          const updateButton = document.getElementById(`updated_button=${Messages.id}`);
          updateButton.addEventListener("click", (event) => {
            event.preventDefault();
            console.log(Messages.id)
            const message = document.getElementById(`updated_input=${Messages.id}`).value;
            const data = {
              user_id: userId,
              message_text: message }

            const callbackForUpdate = (responseStatus, responseData) => {
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);
            };

            fetchMethod(currentUrl + "/api/message/" + Messages.id , callbackForUpdate, "PUT", data, localStorage.getItem("token"));
            window.location.reload()
          });
      
          const deleteButton = document.getElementById(`delete=${Messages.id}`);
          deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);
            };
            fetchMethod(currentUrl + "/api/message/" + Messages.id, callbackForDelete, 'DELETE', null, localStorage.getItem("token"));
            window.location.reload()
          });
        }

        else{
          displayItem.innerHTML = `
          <p style="border: 3px solid #ffffff; border-radius: 5px; padding-left: 10px;" class="text-start">${Messages.message_text}<blockquote class="text-start" style="color: #ffffff;">${Messages.username}<kbd>${Messages.created_at}</kbd></blockquote></p>`;

          playerList.appendChild(displayItem);
        };

  }); 
};

fetchMethod(currentUrl + "/api/message/", callback, 'GET', null, localStorage.getItem("token"));

