const username = localStorage.getItem('username');
document.addEventListener("DOMContentLoaded", function () {

  const about = document.getElementById("credits");
  const displayItem = document.createElement("h6");
  const UserLocker = (responseStatus, responseData) => {
    console.log(responseStatus);
    console.log(responseData);

    if (responseStatus == 401) return window.location.href='login.html'
          Locker = responseData;
  }
  fetchMethod(currentUrl + "/api/locker/ShowLocker", UserLocker, 'GET', null, localStorage.getItem("token"))


    const getTotalCreditCallback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
      if (responseStatus == 200) {
        // Check if signup was successful
        if (responseData[0]["sum(Credit_Earned)"] == null){responseData[0]["sum(Credit_Earned)"] = 0}

        totalcredits = responseData[0]["sum(Credit_Earned)"]

        displayItem.innerHTML = `
        <h6 class="count h2" data-to="${responseData[0]["sum(Credit_Earned)"]}" data-speed="${responseData[0]["sum(Credit_Earned)"]}">${responseData[0]["sum(Credit_Earned)"]}</h6>` ;
        about.appendChild(displayItem);

        const name = document.getElementById("name");
        const displayItem1 = document.createElement("h6");
        displayItem1.innerHTML = `
        <h6 class="count h2" data-to="${username}" data-speed="${username}">${username}</h6>` ;
        name.appendChild(displayItem1);

        const TotalWinsCallback = (responseStatus,responseData) => { 
          if (responseData[0].totalpoints == null){responseData[0].totalpoints = 0}
          console.log(responseStatus)
          console.log(responseData)
          const wins = document.getElementById("Wins");
          const displayItem2 = document.createElement("h6");
          displayItem2.innerHTML = `
          <h6 class="count h2" data-to="${responseData[0].totalpoints}" data-speed="${responseData[0].totalpoints}">${responseData[0].totalpoints}</h6>`;
          wins.appendChild(displayItem2);
        } 
        fetchMethod(currentUrl + "/api/shop/Wins", TotalWinsCallback, 'GET', null, localStorage.getItem("token"));

      } 

    };
    fetchMethod(currentUrl + "/api/shop/TotalCredits", getTotalCreditCallback, 'GET', null, localStorage.getItem("token"));



    
    fetch("https://fortnite-api.com/v2/shop/br")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => { 
      const addedItems = new Set(); // Keep track of added items
      const itemshop = document.getElementById("itemshop");
      console.log(Locker)
      while (addedItems.size < 6) {
        const randomEntry = data.data.featured.entries[Math.floor(Math.random() * data.data.featured.entries.length)];
        const randomItem = randomEntry.items[Math.floor(Math.random() * randomEntry.items.length)];

        const name = randomItem.name;
        const image = randomItem.images.icon;
        const index = randomItem.id;
  
        if (!addedItems.has(name) && !Locker.includes(index)) {
          console.log()
          const displayItemShop = document.createElement("div");
          const price = Math.floor(Math.random() * 4000) + 1000;
  
          // if (item)
          displayItemShop.className = "col-lg-4";
          displayItemShop.innerHTML = `
            <div class="text-center card-box">
              <div class="member-card pt-2 pb-2">
                <div class="thumb-lg member-thumb mx-auto"><img src=${image} class="rounded-circle img-thumbnail" alt="profile-image"></div>
                <div class="">
                  <h4>${name}</h4>
                </div>
                <button type="button" class="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light" id='purchase-${index}' data-price=${price} data-image=${image} data-index=${index}>Purchase</button>
                <div class="mt-4">
                  <div class="row">
                    <div class=""">
                      <div class="mt-3">
                        <h4>${price}</h4>
                        <p class="mb-0 text-muted">Credits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
  
          itemshop.appendChild(displayItemShop);
          addedItems.add(name);

          const button = document.getElementById(`purchase-${index}`);
          button.onclick = () => {
            data = {name:button.getAttribute('data-index')}
            itemprice = button.getAttribute('data-price')
            if(itemprice > totalcredits) {
              alert("Too Expensive")
              console.log("Too Expensive"); 
              return window.location.reload() 
            }
              itemprice = itemprice - (itemprice * 2)
              console.log(itemprice)
              dataforcreditsupdate = {total_credits:itemprice}
              window.location.reload()
              const callback = (responseStatus,responseData) => {
                console.log(responseStatus)
                console.log(responseData)
              }
              fetchMethod(currentUrl + "/api/locker/InsertLocker", callback, "POST", data, localStorage.getItem("token"));

            const callbackForUpdate = (responseStatus, responseData) => {
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);
            };
            window.location.reload()
      
          fetchMethod(currentUrl + "/api/game/UpdateUser", callbackForUpdate, "POST", dataforcreditsupdate, localStorage.getItem("token"));
          }
        }
      }
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });

})