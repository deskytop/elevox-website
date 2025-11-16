/* ===================================
   PROJETO ELEVOX - JAVASCRIPT PRINCIPAL
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Animação 3D Hero (Three.js) ---
    let scene, camera, renderer, particles; // Variáveis globais

    function init3D() {
        try {
            const canvas = document.getElementById('elevox-canvas');

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 3;

            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true // Fundo transparente
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // --- LUZES ---
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            // --- PARTÍCULAS (Com novas cores) ---
            const particleCount = 20000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                size: 0.005,
                vertexColors: true,
                transparent: true,
                opacity: 0.6, // Opacidade levemente reduzida para o fundo claro
                blending: THREE.NormalBlending, // Mudado de Additive para Normal
                sizeAttenuation: true
            });

            // Cores do EleVox (Azul Vibrante)
            const colorBlue = new THREE.Color(0x281dc2);
            const colorBlueDark = new THREE.Color(0x201799);

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;

                const radius = 2.0 + Math.random() * 3.0;
                const phi = Math.acos(2 * Math.random() - 1);
                const theta = Math.random() * Math.PI * 2;

                let x = radius * Math.sin(phi) * Math.cos(theta);
                let y = radius * Math.sin(phi) * Math.sin(theta);
                let z = radius * Math.cos(phi);

                positions[i3] = x;
                positions[i3 + 1] = y;
                positions[i3 + 2] = z;

                // Alterna entre as cores da marca
                const color = Math.random() > 0.5 ? colorBlue : colorBlueDark;
                colors[i3] = color.r;
                colors[i3 + 1] = color.g;
                colors[i3 + 2] = color.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            window.addEventListener('resize', onWindowResize);

        } catch (error) {
            console.error("Falha ao inicializar a cena 3D:", error);
            const canvas = document.getElementById('elevox-canvas');
            if(canvas) canvas.style.display = 'none';
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    function animate() {
        if (!renderer) return;

        requestAnimationFrame(animate);
        const elapsedTime = Date.now() * 0.0001;

        if (particles) {
            particles.rotation.y = elapsedTime * 0.5;
            particles.rotation.x = elapsedTime * 0.2;
        }

        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    // --- Animação de Scroll (IntersectionObserver) ---
    function initScrollAnimations() {
        const sections = document.querySelectorAll('.reveal-section');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Efeito de Scroll no Header ---
    function initHeaderScroll() {
        const header = document.getElementById('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('py-3');
                header.classList.remove('py-4');
            } else {
                header.classList.add('py-4');
                header.classList.remove('py-3');
            }
        });
    }

    // --- Carrossel da Equipe ---
    function initTeamCarousel() {
        const carousel = document.getElementById('team-carousel');
        const prevBtn = document.getElementById('team-prev');
        const nextBtn = document.getElementById('team-next');
        const indicators = document.querySelectorAll('.team-indicator');

        if (!carousel || !prevBtn || !nextBtn) return;

        let currentSlide = 0;
        const totalSlides = 4; // 4 slides no total
        let autoplayInterval;

        // Função para atualizar o carrossel
        function updateCarousel() {
            const translateX = -currentSlide * 100;
            carousel.style.transform = `translateX(${translateX}%)`;

            // Atualizar indicadores
            indicators.forEach((indicator, index) => {
                if (index === currentSlide) {
                    indicator.classList.remove('bg-slate-300');
                    indicator.classList.add('bg-brand-blue');
                } else {
                    indicator.classList.remove('bg-brand-blue');
                    indicator.classList.add('bg-slate-300');
                }
            });
        }

        // Função para próximo slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        // Função para slide anterior
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        // Função para ir para um slide específico
        function goToSlide(slideIndex) {
            currentSlide = slideIndex;
            updateCarousel();
        }

        // Event listeners para botões
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });

        // Event listeners para indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoplay();
            });
        });

        // Autoplay - Tempo
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 10000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Iniciar autoplay
        startAutoplay();

        // Pausar autoplay quando o mouse estiver sobre o carrossel
        const carouselContainer = carousel.closest('.relative');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                clearInterval(autoplayInterval); // Limpar antes de iniciar novo
                startAutoplay();
            });
        }
    }

    // Iniciar funções
    init3D();
    animate();
    initScrollAnimations();
    initHeaderScroll();
    initTeamCarousel();
});
