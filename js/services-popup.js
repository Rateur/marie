document.addEventListener("DOMContentLoaded", () => {
    const modals = document.querySelectorAll(".modal");
    const openButtons = document.querySelectorAll("[data-service]");
    const closeButtons = document.querySelectorAll(".modal-close");
  
    openButtons.forEach(button => {
      button.addEventListener("click", () => {
        const type = button.getAttribute("data-service");
        const modal = document.getElementById(`popup-${type}`);
        if (modal) modal.style.display = "flex";
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        if (modal) modal.style.display = "none";
      });
    });
  
    window.addEventListener("click", event => {
      modals.forEach(modal => {
        if (event.target === modal) modal.style.display = "none";
      });
    });
  });
  
