function copyadd() {
 navigator.clipboard.writeText("55 Wormwood Hill Road, Wormwood Hills NJ, 00411");
 alert("Copied Address to clipboard");
}
function copytel() {
 navigator.clipboard.writeText("2012012012");
 alert("Copied Telephone Number to clipboard");
}
function copyemail() {
 navigator.clipboard.writeText("info@wormwoodhillscomunitycenter.com");
 alert("Copied Email to clipboard");
}
function copywhatsapp() {
 navigator.clipboard.writeText("12012012012");
 alert("Copied WhatsApp Number to clipboard");
}
fdocument.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('email-list');

  // Check if the form exists on this page so we don't get errors on other pages
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop the page from reloading

      // 1. Get the token from the widget
      const captchaResponse = grecaptcha.getResponse();

      // 2. If the token is empty, they didn't click the box.
      if (captchaResponse.length === 0) {
        alert("Please check the CAPTCHA box.");
        return;
      }

      // 3. Prepare the data
      // Note: Make sure your Google Apps Script is deployed and this URL is current
      const scriptURL = 'https://script.google.com/macros/s/AKfycbwD7m51C5T875qXt2sew3zWkQE3puTP7QbMISBS9nZK1c26alXyOxt7lK6ZTi0rMXah/exec';
      
      const formData = {
        captchaToken: captchaResponse,
        // Using 'fname' and 'lname' to match your HTML IDs
        fname: document.getElementById('fname').value,
        lname: document.getElementById('lname').value,
        email: document.getElementById('email').value
      };

      // 4. Send the data
      const submitButton = form.querySelector('button');
      const originalButtonText = submitButton.innerText;
      submitButton.innerText = "Sending...";
      submitButton.disabled = true;

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(formData)
      })
      .then(() => {
        alert("Sent successfully!");
        grecaptcha.reset(); 
        form.reset();
        submitButton.innerText = originalButtonText;
        submitButton.disabled = false;
      })
      .catch(error => {
        console.error('Error!', error.message);
        alert("Something went wrong. Check console.");
        submitButton.innerText = originalButtonText;
        submitButton.disabled = false;
      });
    });
  }
});
