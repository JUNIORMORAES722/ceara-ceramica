document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-orcamento');
    
    // MÁSCARA DE WHATSAPP - NOVO
    const inputWhatsapp = document.getElementById('whatsapp');
    if(inputWhatsapp) {
        inputWhatsapp.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, ''); // Tira tudo que não é número
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 10) {
                value = `${value.slice(0, 10)}-${value.slice(10)}`;
            }
            e.target.value = value;
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const botao = form.querySelector('button');
            const textoOriginalBotao = botao.innerHTML;
            botao.innerHTML = 'Enviando...';
            botao.disabled = true;

            const data = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                if (response.ok) {
                    form.innerHTML = `
                        <div class="mensagem-sucesso">
                            <i class="fas fa-check-circle"></i>
                            <p>Orçamento enviado com sucesso!</p>
                            <small>Em breve um consultor te chama no WhatsApp 👊</small>
                        </div>
                    `;
                } else {
                    throw new Error('Erro no envio');
                }
            }).catch(error => {
                alert('Ops! Não conseguimos enviar. Tenta pelo WhatsApp direto: (85) 9129-5366');
                botao.innerHTML = textoOriginalBotao;
                botao.disabled = false;
            });
        });
    }
});