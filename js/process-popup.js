document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup-process");
    const trigger = document.querySelector(".collab-clickable");
    const closeBtn = popup.querySelector(".popup-close");
  
    trigger.addEventListener("click", () => {
      popup.classList.add("active");
    });
  
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });
  });
  