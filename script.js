document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. MÁSCARA DE WHATSAPP (Mantida)
  // ==========================================
  const inputWhatsapp = document.getElementById("whatsapp");
  if (inputWhatsapp) {
    inputWhatsapp.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

      if (value.length > 11) value = value.slice(0, 11); // Limita a 11 dígitos

      if (value.length > 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, 10)}-${value.slice(10)}`;
      }
      e.target.value = value;
    });
  }

  // ==========================================
  // 2. ENVIO DO FORMULÁRIO (Direto para WhatsApp)
  // ==========================================
  const form = document.getElementById("form-orcamento");
  if (form) {
    form.addEventListener("submit", function (e) {
      // Interrompe o recarregamento da página e o envio por e-mail
      e.preventDefault();

      // Pega o número que o cliente digitou (já bonitinho com a máscara)
      const numeroCliente = inputWhatsapp.value;

      // Número da Ceará Cerâmica (apenas números, com DDI e DDD)
      const numeroEmpresa = "558591295366";

      // Monta a mensagem personalizada
      const mensagem = `Olá, Ceará Cerâmica! Quero a tabela com preço de fábrica. Meu número de contato é: ${numeroCliente}`;

      // Codifica a mensagem para formato de link
      const mensagemCodificada = encodeURIComponent(mensagem);

      // Cria o link final e abre em uma nova aba
      const url = `https://wa.me/${numeroEmpresa}?text=${mensagemCodificada}`;
      window.open(url, "_blank");
    });
  }

  // ==========================================
  // 3. LÓGICA DO MENU MOBILE
  // ==========================================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    // Abre/fecha o menu ao clicar no ícone
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Fecha o menu automaticamente quando um link é clicado
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});
