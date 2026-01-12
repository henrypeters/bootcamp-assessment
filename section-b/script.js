  const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownEl = document.getElementById("countdown");
    const progressBar = document.getElementById("progressBar");
    const targetDateInput = document.getElementById("targetDate");

    const subscribeBtn = document.getElementById("subscribeBtn");
    const emailInput = document.getElementById("emailInput");

    let startTime = Date.now();
    let targetTime = Date.now() + 5 * 24 * 60 * 60 * 1000; 

    targetDateInput.value = new Date(targetTime).toISOString().slice(0, 16);

    function updateCountdown() {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        countdownEl.innerHTML = `<div class="launched">🚀 Launched!</div>`;
        progressBar.style.width = "100%";
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;

      const totalDuration = targetTime - startTime;
      const elapsed = totalDuration - diff;
      const progress = Math.min((elapsed / totalDuration) * 100, 100);
      progressBar.style.width = `${progress}%`;
    }

    targetDateInput.addEventListener("change", () => {
      targetTime = new Date(targetDateInput.value).getTime();
      startTime = Date.now();
    });

    subscribeBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();
      if (!email) return;

      console.log("Subscribed email:", email);
      emailInput.value = "";
      alert("Thanks for subscribing!");
    });

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();