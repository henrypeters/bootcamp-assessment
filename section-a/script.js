  const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("lengthValue");
    const passwordInput = document.getElementById("password");
    const strengthText = document.getElementById("strengthText");

    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");

    const generateBtn = document.getElementById("generate");
    const copyBtn = document.getElementById("copyBtn");

    lengthValue.textContent = lengthSlider.value;

    lengthSlider.addEventListener("input", () => {
      lengthValue.textContent = lengthSlider.value;
    });

    function generatePassword() {
      const length = Number(lengthSlider.value);

      const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
      const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numberChars = "0123456789";
      const symbolChars = "!@#$%^&*()_+{}[]<>?";

      let charSet = lowercaseChars;

      if (uppercaseCheckbox.checked) charSet += uppercaseChars;
      if (numbersCheckbox.checked) charSet += numberChars;
      if (symbolsCheckbox.checked) charSet += symbolChars;

      if (charSet.length === 0) {
        alert("Please select at least one character type.");
        return;
      }

      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
      }

      passwordInput.value = password;
      evaluateStrength(password);
    }

    function evaluateStrength(password) {
      let score = 0;

      if (password.length >= 12) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      if (score <= 1) {
        strengthText.textContent = "Strength: Weak";
        strengthText.className = "strength weak";
      } else if (score === 2 || score === 3) {
        strengthText.textContent = "Strength: Medium";
        strengthText.className = "strength medium";
      } else {
        strengthText.textContent = "Strength: Strong";
        strengthText.className = "strength strong";
      }
    }

    generateBtn.addEventListener("click", generatePassword);

    copyBtn.addEventListener("click", () => {
      if (!passwordInput.value) return;
      navigator.clipboard.writeText(passwordInput.value);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy"), 1500);
    });