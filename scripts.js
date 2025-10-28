// form submission
document. getElementById("lead form")
.addEventListerner("submit",function(e){
    e.preventDefault();

    // Get form values
    const firstname = this.elements[0].value;
    const lastname = this.element[1].value;
    const emailaddress = this.element[2].value;
    const phone = this.element[3].value;



    // in real scenario, you would send this data to a server
    console.log("Lead Captured:", {firstname, lastname,emailadress,phone});

    // show configuration
    alert("tnterest! We will contact you shortly with our plan details")

        // Reser form
        this.reset()

})

// show popup after 5 seconds
setTimeout(function(){
    document.getElementById("email-popup").style.display="flex" 
},5000);


   // close popup when X is clicked
        document.querySelector("close-btn").addEventListerner("click", function(){
    document.getElementById("email-popup").style.display="none";
})

// close when clicking outside content
document.getElementById("email-pop").addEventListener("click", function(e){
    if(e.target=== this){
        this.style.display="none";
    }
})

// =======================> Cookies<================================

function acceptCookies(){
    document.getElementById("cookie-banner").style.display="none";
    localStorage.setItem("cookieAccepted", "true")
    // loadAnalytics(); GA4
}

function declineCookies() {
    document.getElementById("cookie-banner").style.display="none";
    localStorage.setItem("cookieAccepted", "false")
    // loadAnalytics(); GA4
}


// on page load' check past choice

window.onload = function() {

    if(localStorage.getItem("cookiesAccepted")==="true"){
        loadAnalytics();
        document.getElementById("cookie-banner").style.display="none";


        }else if (localStorage.getItem("cookiesAccepted")==="false"){
            document.getElementById("cookie-banner").style.display ="none";
        }

    
    }


// footer

    document.getElementById("year").textContent - new Date().getFullYear();
    
// ===== Email Popup =====
const popup = document.getElementById('emailPopup');
const closePopup = document.querySelector('.close-popup');

// Function to open popup
function openEmailPopup() {
  popup.style.display = 'flex';
}

// Function to close popup
closePopup.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Optional: close on overlay click
popup.addEventListener('click', (e) => {
  if (e.target === popup) popup.style.display = 'none';
});

// Trigger: open when user clicks "Contact" in menu
document.querySelectorAll('a[href="contact.html"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openEmailPopup();
  });
});

// Optional: open automatically after 10 seconds
// setTimeout(openEmailPopup, 10000);    


document.addEventListener('DOMContentLoaded', function () {
const checkoutForm = document.getElementById("contactForm");

checkoutForm.addEventListener('submit', function (e){
    e.preventDefault();

    const name= document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const yourmessage = document.getElementById('message').value;

    const subject = `Get in touch `
const body = `
Hello Manasseh's Music

i would like to get in touch with you.

My Detailes:
-Name: ${name}
-Email: ${email}
-Message: ${yourmessage}

Please Reach out to me and let me know the next steps.

`.trim();


        const mailtolink = `mailto:larkaimas18@gmail.com?subject=${encodedURIComponent(subject)}&body-${encodeURIComponent(body)}`;
    
         window.location.href = mailtolink;


})

 })


























































