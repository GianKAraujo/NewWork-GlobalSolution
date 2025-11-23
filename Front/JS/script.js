function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('#nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});

const form = document.querySelector('form');
if(form) {
    form.addEventListener('submit', function(event) {
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        
        let valido = true;

        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(campo => {
            if (campo.value.trim() === '') {
                campo.style.border = "1px solid #ef4444";
                valido = false;
            } else {
                campo.style.border = "1px solid #334155";
            }
        });

        if (!valido) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            event.preventDefault();
        } else {
            alert("Mensagem enviada com sucesso!");
        }
    });
}

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

if(chatBox && userInput) {
    function sendMessage() {
        const text = userInput.value.trim();
        if (text !== "") {
            addMessage(text, 'user-message');
            userInput.value = "";
            setTimeout(() => {
                generateBotResponse(text);
            }, 1000);
        }
    }

    function addMessage(text, className) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', className);
        
        messageDiv.innerHTML = `
            <p>${text}</p>
            <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        `;

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function generateBotResponse(userText) {
        let botText = "Desculpe, não entendi. Pode reformular?";
        userText = userText.toLowerCase();

        if (userText.includes("começar") || userText.includes("olá") || userText.includes("oi")) {
            botText = "Olá! Sou sua IA de carreira. Você quer entrar na área de tecnologia ou mudar de área?";
        } 
        else if (userText.includes("não sei") || userText.includes("zero") || userText.includes("perdido")) {
            botText = "Sem problemas! Recomendo começar pela base: Lógica de Programação. Posso gerar um roadmap para você?";
        }
        else if (userText.includes("sim") || userText.includes("quero")) {
            botText = "Perfeito! Criei um plano personalizado. <br><br> <a href='roadmap.html' style='color: #4ade80; font-weight: bold; text-decoration: underline;'>Clique aqui para ver seu Roadmap</a>";
        }
        else if (userText.includes("trabalho") || userText.includes("experiência")) {
            botText = "Ótimo! Podemos focar em especialização. Qual sua stack atual?";
        }
        
        addMessage(botText, 'bot-message');
    }

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    const sendBtn = document.getElementById('send-btn');
    if(sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
}