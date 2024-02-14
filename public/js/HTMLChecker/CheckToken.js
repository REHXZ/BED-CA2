document.addEventListener("DOMContentLoaded", function () {
    const x = localStorage.getItem("token")
    const Signout_Button = document.getElementById('Signout')

    Signout_Button.addEventListener('click', (event) => {
      console.log("Token Removed")
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')
      localStorage.removeItem('exp')
    })
 
    if (!x) {
        console.log("LOL")
        window.location.href = 'login.html'
    }
})  