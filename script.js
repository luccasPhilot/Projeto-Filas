document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("customAlert");
  const closeBtn = document.getElementById("closeBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const confirmBtn = document.getElementById("confirmBtn");

  // Mostra o modal automaticamente quando a página é carregada
  modal.style.display = "block";

  // Event listener para fechar o modal ao clicar no botão de fechar
  closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Event listener para fechar o modal ao clicar no botão de cancelar
  cancelBtn.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Event listener para o botão de confirmar
  confirmBtn.addEventListener("click", () => {
      const code = document.getElementById("numericCode").value;
      console.log("Código numérico digitado:", code);
      modal.style.display = "none";
  });

  // Event listener para fechar o modal ao clicar fora da área do modal
  window.addEventListener("click", (event) => {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  });
});
