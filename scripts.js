document.addEventListener("DOMContentLoaded", function () {
  // Selecting elements from DOM
  const submitBtn = document.querySelector(".submit_btn");
  const modalClose = document.querySelector(".modal-close");
  const modal = document.querySelector(".modal");
  const gross_amount = document.querySelector(".gross");
  const age = document.querySelector(".age");
  const extra = document.querySelector(".extra");
  const total = document.querySelector(".total");

  // Initial setup of the DOM
  modal.style.display = "none";
  document.querySelector(".gross_div").style.display = "none";
  document.querySelector(".extra_div").style.display = "none";
  document.querySelector(".total_div").style.display = "none";

  // Update the submit button according to the validity of the inputs
  function updateSubmitButton() {
    if (
      gross_amount.value !== "" &&
      isNumeric(gross_amount.value) &&
      extra.value !== "" &&
      isNumeric(extra.value) &&
      total.value !== "" &&
      isNumeric(total.value)
    ) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  }

  // Event listeners for the input fields
  gross_amount.onkeyup = () => {
    updateSubmitButton();
    if (gross_amount.value !== "" && !isNumeric(gross_amount.value)) {
      console.log("first");
      document.querySelector(".gross_div").style.display = "block";
      document.querySelector(".gross_icon").style.color = "red";
      document
        .querySelector(".gross_icon")
        .addEventListener("mouseover", () => {
          console.log("over first");
          document.querySelector(".gross_tooltip").style.display = "block";
        });
      document
        .querySelector(".gross_icon")
        .addEventListener("mouseleave", () => {
          console.log("over out");
          document.querySelector(".gross_tooltip").style.display = "none";
        });
    } else {
      document.querySelector(".gross_div").style.display = "none";
    }
  };

  extra.onkeyup = () => {
    updateSubmitButton();
    if (extra.value !== "" && !isNumeric(extra.value)) {
      console.log("first");
      document.querySelector(".extra_div").style.display = "block";
      document.querySelector(".extra_icon").style.color = "red";
      document
        .querySelector(".extra_icon")
        .addEventListener("mouseover", () => {
          console.log("over first");
          document.querySelector(".extra_tooltip").style.display = "block";
        });
      document
        .querySelector(".extra_icon")
        .addEventListener("mouseleave", () => {
          console.log("over out");
          document.querySelector(".extra_tooltip").style.display = "none";
        });
    } else {
      document.querySelector(".extra_div").style.display = "none";
    }
  };

  total.onkeyup = () => {
    updateSubmitButton();
    if (total.value !== "" && !isNumeric(total.value)) {
      console.log("first");
      document.querySelector(".total_div").style.display = "block";
      document.querySelector(".total_icon").style.color = "red";
      document
        .querySelector(".total_icon")
        .addEventListener("mouseover", () => {
          console.log("over first");
          document.querySelector(".total_tooltip").style.display = "block";
        });
      document
        .querySelector(".total_icon")
        .addEventListener("mouseleave", () => {
          console.log("over out");
          document.querySelector(".total_tooltip").style.display = "none";
        });
    } else {
      document.querySelector(".total_div").style.display = "none";
    }
  };

  // Event listener for modal close button
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    document.querySelector(".full").style.filter = "blur(0px)";
  });

  // Preventing modal close event from bubbling up
  modalClose.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Event listener for submit button

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const val = document.querySelector(".value");
    const value = calculateTax();
    val.textContent = value;
    modal.style.display = "flex";
    document.querySelector(".full").style.filter = "blur(4px)";
  });

  // Function to check if value is numeric
  function isNumeric(value) {
    return (
      !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0
    );
  }

  // Function to calculate tax
  function calculateTax() {
    console.log(gross_amount.value, extra.value, total.value);
    const overallIncome =
      parseInt(gross_amount.value) +
      parseInt(extra.value) -
      parseInt(total.value);
    let tax = 0;

    if (overallIncome <= 800000) {
      // No tax if overall income is less than or equal to 8 Lakhs
      tax = 0;
    } else {
      const taxableAmount = overallIncome - 800000;

      if (age.vaue === "40") {
        tax = 0.3 * taxableAmount;
      } else if (age.value === "40-60") {
        tax = 0.4 * taxableAmount;
      } else {
        tax = 0.1 * taxableAmount;
      }
    }
    console.log(overallIncome, tax);
    return parseInt(overallIncome - tax);
  }
});
