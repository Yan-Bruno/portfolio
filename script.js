document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('header nav');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Navegação
    const navLinks = document.querySelectorAll('header nav a');
    const logoLink = document.querySelector('.header-logo');

    const activePage = () => {
        navLinks.forEach(link => link.classList.remove('active'));
    };

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!link.classList.contains('active')) {
                activePage();
                link.classList.add('active');
            }
        });
    });

    logoLink.addEventListener('click', () => {
        if (!navLinks[0].classList.contains('active')) {
            activePage();
            navLinks[0].classList.add('active');
        }
    });

    // Seções do currículo
    const resumeButtons = document.querySelectorAll('.resume-btn');
    const resumeDetails = document.querySelectorAll('.resume-detail');

    resumeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');

            resumeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            resumeDetails.forEach(detail => {
                detail.classList.toggle('active', detail.id === section);
            });
        });
    });

    // Carrossel de portfólio - Versão melhorada
    const arrowRight = document.querySelector('.button-arrow-right');
    const arrowLeft = document.querySelector('.button-arrow-left');
    const portfolioCarrousel = document.querySelector('.portfolio-carrousel');
    const imgSlideItems = document.querySelectorAll('.img-slide-item'); // Corrigido o nome da classe
    const textSlides = document.querySelectorAll('.portfolio-detail');
    let currentSlide = 0;
    const totalSlides = imgSlideItems.length;
    let isAnimating = false;
    const animationDuration = 0; // troca instantânea

    // Função para atualizar o carrossel com animação suave
    const updateCarousel = (direction = 'next') => {
        if (isAnimating) return;
        isAnimating = true;

        // Oculta todas as imagens e textos
        imgSlideItems.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
        });
        textSlides.forEach(item => {
            item.classList.remove('active');
            item.style.opacity = '0';
        });

        // Atualiza o slide atual
        if (direction === 'next') {
            currentSlide = (currentSlide + 1) % totalSlides;
        } else {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        }

        // Mostra o novo slide
        imgSlideItems[currentSlide].classList.add('active');
        textSlides[currentSlide].classList.add('active');
        imgSlideItems[currentSlide].style.opacity = '1';
        textSlides[currentSlide].style.opacity = '1';

        // Atualiza a navegação
        updateNavigation();

        isAnimating = false;
    };

    // Função para atualizar o estado dos botões de navegação
    const updateNavigation = () => {
        // Desabilita seta esquerda no primeiro slide
        arrowLeft.style.opacity = currentSlide === 0 ? '0.5' : '1';
        arrowLeft.style.pointerEvents = currentSlide === 0 ? 'none' : 'auto';

        // Desabilita seta direita no último slide
        arrowRight.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
        arrowRight.style.pointerEvents = currentSlide === totalSlides - 1 ? 'none' : 'auto';
    };

    // Event listeners para as setas
    arrowRight.addEventListener('click', () => {
        updateCarousel('next');
    });

    arrowLeft.addEventListener('click', () => {
        updateCarousel('prev');
    });

    // Inicializa o carrossel
    updateNavigation();

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' && currentSlide < totalSlides - 1) {
            arrowRight.click();
        } else if (e.key === 'ArrowLeft' && currentSlide > 0) {
            arrowLeft.click();
        }
    });

    // Touch events para mobile (swipe)
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Mínimo de pixels para considerar um swipe

    portfolioCarrousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    portfolioCarrousel.addEventListener('touchmove', (e) => {
        touchEndX = e.changedTouches[0].clientX;
    }, { passive: true });

    portfolioCarrousel.addEventListener('touchend', () => {
        const diffX = touchEndX - touchStartX;

        if (Math.abs(diffX) > swipeThreshold) {
            if (diffX < 0 && currentSlide < totalSlides - 1) {
                // Swipe para esquerda (próximo)
                arrowRight.click();
            } else if (diffX > 0 && currentSlide > 0) {
                // Swipe para direita (anterior)
                arrowLeft.click();
            }
        }
    }, { passive: true });

    // Auto-rotacionar (opcional)
    // let autoRotateInterval = setInterval(() => {
    //     if (currentSlide < totalSlides - 1) {
    //         arrowRight.click();
    //     } else {
    //         // Volta ao primeiro slide
    //         currentSlide = -1;
    //         updateCarousel('next');
    //     }
    // }, 5000); // Muda a cada 5 segundos

    // Pausa o auto-rotate quando o mouse está sobre o carrossel
    // portfolioCarrousel.addEventListener('mouseenter', () => {
    //     clearInterval(autoRotateInterval);
    // });

    // portfolioCarrousel.addEventListener('mouseleave', () => {
    //     autoRotateInterval = setInterval(() => {
    //         if (currentSlide < totalSlides - 1) {
    //             arrowRight.click();
    //         } else {
    //             currentSlide = -1;
    //             updateCarousel('next');
    //         }
    //     }, 5000);
    // });
});

// Efeito de partículas (mantido igual)
function initParticleBackground() {
    const canvas = document.getElementById('particles-js');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Configurações
    const settings = {
        particleColor: 'rgba(144, 169, 85, 0.5)',
        lineColor: 'rgba(144, 169, 85, 0.2)',
        particleCount: Math.floor(window.innerWidth / 15),
        defaultRadius: 1.5,
        variantRadius: 1,
        defaultSpeed: 0.2,
        variantSpeed: 0.4,
        lineThreshold: 100
    };

    // Redimensionamento
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Partículas
    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = settings.defaultRadius + Math.random() * settings.variantRadius;
            this.speedX = (Math.random() - 0.5) * settings.defaultSpeed +
                (Math.random() - 0.5) * settings.variantSpeed;
            this.speedY = (Math.random() - 0.5) * settings.defaultSpeed +
                (Math.random() - 0.5) * settings.variantSpeed;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebate nas bordas
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = settings.particleColor;
            ctx.fill();
        }
    }

    // Inicialização
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < settings.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Atualiza e desenha partículas
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Conecta partículas próximas
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < settings.lineThreshold) {
                    ctx.beginPath();
                    ctx.strokeStyle = settings.lineColor;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', () => {
        resize();
        init();
    });

    // Iniciar
    init();
    animate();
}

// Iniciar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initParticleBackground);

// Novo estilo para a seção "Sobre" do currículo
const style = document.createElement('style');
style.textContent = `
    .resume-detail.sobre .resume-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 0.25rem;
    }
`;
document.head.appendChild(style);