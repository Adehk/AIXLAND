document.addEventListener("DOMContentLoaded", function () {
  // Selecting DOM elements
  const form = document.querySelector(".form");
  const body = document.body;
  const loaderOverlay = document.getElementById("loader-overlay");
  const successPopup = document.querySelector(".success-popup");
  const successCloseButton = document.querySelector(
    ".success-popup__close-button"
  );
  const errorPopup = document.querySelector(".error-popup");
  const errorCloseButton = document.querySelector(".error-popup__close-button");

  //Initialize Swiper
  var swiper1 = new Swiper(".mySwiper1", {
    centeredSlides: true,
    slidesPerView: 1,
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
    },
    loop: true,
    keyboard: {
      enabled: true,
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
    autoplay: {
      delay: 3000,
      disableOnInteraction: true,
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

  //Initialize Intl-Tel-Input

  const phoneInput = document.getElementById("phone");

  let iti = window.intlTelInput(phoneInput, {
    separateDialCode: true,
    initialCountry: "auto",
    geoIpLookup: function (success, failure) {
      success("RU");
    },
  });

  // Function to show the loader and overlay
  function showLoader() {
    loaderOverlay.classList.add("show-loader-overlay");
    body.classList.add("disable-scroll");
  }

  // Function to hide the loader and overlay
  function hideLoader() {
    loaderOverlay.classList.remove("show-loader-overlay");
    body.classList.remove("disable-scroll");
  }

  // Function to show succsess popup
  function showSuccessPopup() {
    successPopup.classList.add("show-success-popup");
    // If success popup is shown
    if (successPopup.classList.contains("show-success-popup")) {
      body.classList.add("disable-scroll");
    }
  }
  successCloseButton.addEventListener("click", function () {
    successPopup.classList.remove("show-success-popup");
    body.classList.remove("disable-scroll");
  });

  // Function to show error popup
  function showErrorPopup() {
    errorPopup.classList.add("show-error-popup");
    // If error popup is shown
    if (errorPopup.classList.contains("show-error-popup")) {
      body.classList.add("disable-scroll");
    }
  }
  errorCloseButton.addEventListener("click", function () {
    errorPopup.classList.remove("show-error-popup");
    body.classList.remove("disable-scroll");
  });

  // Function to reset the form after submission
  function resetForm() {
    form.reset();
  }

  // Sending form data to email
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validation of the checkbox
    const checkbox = document.querySelector('.checkbox input[type="checkbox"]');
    if (!checkbox.checked) {
      // If checkbox is not checked
      alert("Please agree to the terms and conditions");
      return;
    }

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
        showSuccessPopup();
        resetForm(); // Reset the form
      } else {
        // Email sending failed
        showErrorPopup();
        resetForm(); // Reset the form
        console.error("Failed to send email. Check the console for details.");
      }
    };
    xhr.send(formData);
  });
});
