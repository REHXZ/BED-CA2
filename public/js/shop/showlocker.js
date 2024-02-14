document.addEventListener("DOMContentLoaded", () => {
    const shop = document.getElementById("itemshop");
    const lockerbutton = document.getElementById("ShowUsersLocker");
    const Shopbutton = document.getElementById("ShowShop");
    const locker = document.getElementById("locker")

    lockerbutton.onclick = () => {
        shop.classList.toggle("d-none");
    };

    Shopbutton.onclick = () => {
        shop.classList.remove('d-none')
    }


    const lockercallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
      
        responseData.forEach((element) => {
            fetch(`https://fortnite-api.com/v2/cosmetics/br/${element}`)
            .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
            })
            .then(data => { 
                const name = data.data.name
                const image = data.data.images.icon
                const displayLocker = document.createElement("div");
                displayLocker.className = "col-lg-4"
                displayLocker.innerHTML = `
                <div class="text-center card-box">
                <div class="member-card pt-2 pb-2">
                    <div class="thumb-lg member-thumb mx-auto"><img src=${image} class="rounded-circle img-thumbnail" alt="profile-image"></div>
                    <div class="">
                    <h4>${name}</h4>
                    </div>
                    <div class="mt-4">
                    <div class="row">
                        <div class=""">
                        <div class="mt-3">
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                `;
                locker.appendChild(displayLocker);
    
            })
            .catch(error => {
            console.error("Error fetching data:", error);
            });
        });
    };

    fetchMethod(currentUrl + "/api/locker/ShowLocker", lockercallback, 'GET', null, localStorage.getItem("token"))

});