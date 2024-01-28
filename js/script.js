//Form validation
// document.getElementById("form").addEventListener("submit", function (event) {
//   // Prevent the form from submitting
//   event.preventDefault();

//   // Validate the form fields
//   var name = document.getElementById("name").value.trim();
//   var phone = document.getElementById("phone").value.trim();
//   var email = document.getElementById("email").value.trim();
//   var checkbox = document.querySelector(".checkbox input");

//   // Example validation criteria, you can customize these as needed
//   if (name === "" || phone === "" || email === "" || !checkbox.checked) {
//     alert("Please fill in all fields and agree to the terms.");
//   } else {
//     // If the form is valid, you can submit it or perform other actions
//     alert("Form submitted successfully!");
//     // Add code here to submit the form or perform other actions
//   }
// });

//Initialize Swiper
var swiper1 = new Swiper(".mySwiper1", {
  centeredSlides: true,
  loop: true,
  keyboard: {
    enabled: true,
  },
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    1440: {
      slidesPerView: 1.5,
      spaceBetween: 20,
    },
  },
});

var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 2,
  loop: true,
  spaceBetween: 32,
  keyboard: {
    enabled: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    560: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
    768: {
      slidesPerView: 2.3,
      spaceBetween: 20,
    },
    1000: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

let input = document.querySelector("#phone");
let iti = intlTelInput(input, {
  initialCountry: "ru",
  separateDialCode: true,
  nationalMode: false,
});

// Listen for the country change event
input.addEventListener("countrychange", function (e) {
  let selectedCountryData = iti.getSelectedCountryData();
  let countryCode = "+" + selectedCountryData.dialCode;

  // Update the display of the country code wherever needed
  updateCountryCodeDisplay(countryCode);
});

function updateCountryCodeDisplay(countryCode) {
  // Update the display of the country code in your UI
  // For example, you can set the value of a separate element with id "country-code"
  document.getElementById("country-code").innerText = countryCode;
}

// Sending form data to email
form.addEventListener("submit", function (e) {
  e.preventDefault();
  showLoader();
  let formData = new FormData(form);
  formData.set(
    "phone",
    iti.getNumber(intlTelInputUtils.numberFormat.INTERNATIONAL)
  );

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "sendmail.php", true);

  xhr.onload = function () {
    hideLoader();
    if (xhr.status === 200) {
      // Email sent successfully
      console.log("Email sent successfully");
      toggleModal();
      handleSuccess();
    } else {
      // Email sending failed
      toggleModal();
      handleError();
      console.error("Failed to send email. Check the console for details.");
    }
  };
  xhr.send(formData);
});
