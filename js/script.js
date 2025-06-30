// script.js

// Espera o DOM estar completamente carregado para executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA DO PRELOADER ---
    const preloader = document.querySelector('.preloader');
    const body = document.querySelector('body');

    // Assim que a página e todos os seus recursos (imagens, etc.) estiverem carregados
    window.addEventListener('load', () => {
        // Adiciona a classe para iniciar o efeito de fade-out
        preloader.classList.add('fade-out');
        
        // Revela o corpo da página
        body.classList.add('loaded');

        // Remove o preloader do DOM após a transição para não atrapalhar
        preloader.addEventListener('transitionend', () => {
            preloader.style.display = 'none';
        });
    });


    // --- 2. LÓGICA DO CABEÇALHO COM SCROLL ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Adiciona a classe 'scrolled' se o usuário rolar mais de 50 pixels para baixo
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 3. LÓGICA DE ANIMAÇÃO AO ROLAR (FADE-IN) ---
    const sections = document.querySelectorAll('.content-section');

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, {
        threshold: 0.15 // A animação começa quando 15% da seção está visível
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // --- 4. LÓGICA DA GALERIA MODAL ---
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeModal = document.querySelector('.modal-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const highResSrc = item.getAttribute('data-src');
            const captionText = item.getAttribute('data-caption');

            modal.style.display = 'block'; // Mostra o modal
            modalImage.src = highResSrc;   // Define a imagem de alta resolução
            modalCaption.textContent = captionText; // Define a legenda
        });
    });

    // Função para fechar o modal
    const closeTheModal = () => {
        modal.style.display = 'none';
    };

    // Eventos para fechar o modal
    closeModal.addEventListener('click', closeTheModal);

    // Fecha o modal se o usuário clicar fora da imagem (no fundo escuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });

    // Fecha o modal se o usuário pressionar a tecla "Escape"
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeTheModal();
        }
    });
});