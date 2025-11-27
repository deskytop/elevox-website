/* ===================================
   PROJETO ELEVOX - JAVASCRIPT PRINCIPAL
   =================================== */

// --- Dados e Funções do Modal (Escopo Global) ---
const componentSpecs = {
    'arduino': {
        title: 'Arduino Mega 2560',
        desc: 'Placa de microcontrolador baseada no ATmega2560. O cérebro do projeto.',
        price: 'R$ 199,00',
        details: [
            'Tensão de Operação: 5V',
            'Pinos de E/S Digitais: 54 (15 PWM)',
            'Pinos de Entrada Analógica: 16',
            'Memória Flash: 256 KB',
            'Clock Speed: 16 MHz'
        ]
    },
    'voz': {
        title: 'Módulo de Reconhecimento de Voz V3',
        desc: 'Permite o controle do elevador através de comandos de voz pré-gravados.',
        price: 'R$ 235,00',
        details: [
            'Tensão: 4.5-5.5V',
            'Corrente: <40mA',
            'Interface: Serial UART (TTL)',
            'Precisão: 99% (ambiente controlado)'
        ]
    },
    'bluetooth': {
        title: 'ESP32 CP2102',
        desc: 'Módulo de comunicação sem fio para o aplicativo móvel.',
        price: 'R$ 62,00',
        details: [
            'Protocolo: Wifi 2.4Ghz e Bluetooth BLE 4.2',
            'Frequência: 2.4GHz ISM band',
            'Flash: 4 MB',
            'Tensão de lógica: 3.3V'
        ]
    },
    'motores': {
        title: 'Drivers e Motores',
        desc: 'Sistema elétrico para o elevador.',
        price: 'R$ 179,00',
        details: [
            'Sensor Magnético Reed Switch',
            'Micro Servo Motor 360',
            'Sensor Detector Fogo Chama',
            'Módulo MP3',
            'Potenciometro',
            'Servo Motor MG99S Metal'
        ]
    },
    'estrutura': {
        title: 'Estrutura em MDF',
        desc: 'Corpo físico do protótipo.',
        price: 'R$ 150,00',
        details: [
            'Material: MDF 3mm e 6mm',
            'Corte: Laser CNC de alta precisão',
            'Peso: 265g'
        ]
    },
    'outros': {
        title: 'Outros Materiais',
        desc: 'Componentes diversos para montagem e acabamento.',
        price: 'R$ 225,35',
        details: [
            'Display OLED I2C 0.96" Azul',
            'Plug P2 MP3',
            'Conector de bateria',
            'Chaves Push Button',
            'Resistor 100',
            'LEDs Verde',
            'Barra de Pinos Macho',
            'Kit Jumper',
            'Conector Plug P4',
            'Chave Botão',
            'LEDs Branco',
            'Jumper Fêmea-Fêmea',
            'Protoboard 830 Furos',
            'Protoboard 1260 Furos',
            'Jumper Macho-Macho'
        ]
    }
};

// Função para abrir o modal (GLOBAL)
function openModal(componentId) {
    const modal = document.getElementById('specs-modal');
    const contentDiv = document.getElementById('modal-content');
    const data = componentSpecs[componentId];

    if (data) {
        // Constrói a lista de detalhes
        let detailsHtml = '<ul class="text-left text-sm text-text-secondary space-y-2 bg-gray-50 p-4 rounded-lg mt-4">';
        data.details.forEach(detail => {
            detailsHtml += `<li class="flex items-center"><span class="w-2 h-2 bg-brand-blue rounded-full mr-2"></span>${detail}</li>`;
        });
        detailsHtml += '</ul>';

        // Injeta o HTML no modal
        contentDiv.innerHTML = `
            <h3 class="text-2xl font-bold text-brand-blue mb-2">${data.title}</h3>
            <p class="text-text-primary font-bold text-xl mb-2">${data.price}</p>
            <p class="text-text-secondary mb-4">${data.desc}</p>
            <hr class="border-gray-200 my-4">
            <h4 class="text-left font-semibold text-text-primary mb-2">Especificações Técnicas:</h4>
            ${detailsHtml}
        `;

        // Remove a classe 'hidden' para mostrar o modal
        modal.classList.remove('hidden');
    }
}

// Função para fechar o modal (GLOBAL)
function closeModal() {
    const modal = document.getElementById('specs-modal');
    modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {

    /* ===================================
       CÓDIGO DE PARTÍCULAS 3D
       =================================== */

    /*
    // --- Animação 3D Hero (Three.js) ---
    let scene, camera, renderer, particles;

    function init3D() {
        try {
            const canvas = document.getElementById('elevox-canvas');

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 3;

            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
            scene.add(ambientLight);

            const particleCount = 20000;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            const geometry = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({
                size: 0.005,
                vertexColors: true,
                transparent: true,
                opacity: 0.5,
                blending: THREE.NormalBlending,
                sizeAttenuation: true
            });

            const colorBlue = new THREE.Color(0x6b8fff);
            const colorBlueDark = new THREE.Color(0x4d7cfe);

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
    */

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

    // --- Carrossel Infinito de Equipe (GSAP) ---
    function initTeamCarousel() {
        const cards = gsap.utils.toArray('.team-cards li');

        if (cards.length === 0) return;

        // Fade in suave das imagens
        gsap.to(".team-cards li img", { opacity: 1, delay: 0.1 });

        let currentIndex = 0;
        const spacing = 0.06;
        const seamlessLoop = buildSeamlessLoop(cards, spacing);
        const scrub = gsap.to(seamlessLoop, {
            totalTime: 0,
            duration: 0.5,
            ease: "power3",
            paused: true
        });

        function goToIndex(index) {
            // Normaliza o índice para estar sempre entre 0 e cards.length-1
            index = ((index % cards.length) + cards.length) % cards.length;
            currentIndex = index;

            const totalTime = currentIndex * spacing;
            scrub.vars.totalTime = totalTime;
            scrub.invalidate().restart();
        }

        function next() {
            goToIndex(currentIndex + 1);
        }

        function prev() {
            goToIndex(currentIndex - 1);
        }

        // Auto-play: avança automaticamente a cada 5 segundos
        setInterval(() => {
            next();
        }, 5000);

        document.querySelector(".team-next").addEventListener("click", next);
        document.querySelector(".team-prev").addEventListener("click", prev);

        function buildSeamlessLoop(items, spacing) {
            let overlap = Math.ceil(1 / spacing);
            let startTime = items.length * spacing + 0.5;
            let loopTime = (items.length + overlap) * spacing + 1;
            let rawSequence = gsap.timeline({ paused: true });
            let seamlessLoop = gsap.timeline({
                paused: true,
                repeat: -1,
                onRepeat() {
                    this._time === this._dur && (this._tTime += this._dur - 0.01);
                }
            });
            let l = items.length + overlap * 2;
            let time = 0;
            let i, index, item;

            gsap.set(items, { xPercent: 400, opacity: 0, scale: 0 });

            for (i = 0; i < l; i++) {
                index = i % items.length;
                item = items[index];
                time = i * spacing;
                rawSequence.fromTo(item, { scale: 0, opacity: 0 }, {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.in",
                    immediateRender: false
                }, time)
                    .fromTo(item, { xPercent: 400 }, {
                        xPercent: -400,
                        duration: 1,
                        ease: "none",
                        immediateRender: false
                    }, time);
            }

            rawSequence.time(startTime);
            seamlessLoop.to(rawSequence, {
                time: loopTime,
                duration: loopTime - startTime,
                ease: "none"
            }).fromTo(rawSequence, { time: overlap * spacing + 1 }, {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none"
            });
            return seamlessLoop;
        }
    }


    // --- Carrossel de Imagens do Protótipo ---
    function initPrototypeCarousel() {
        const carousel = document.getElementById('prototype-carousel');
        const prevBtn = document.getElementById('prototype-prev');
        const nextBtn = document.getElementById('prototype-next');
        const indicators = document.querySelectorAll('.prototype-indicator');

        if (!carousel || !prevBtn || !nextBtn) return;

        let currentSlide = 0;
        const totalSlides = 5; // 5 imagens no total
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

        // Autoplay - 7 segundos
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, 7000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
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

        // Iniciar autoplay
        startAutoplay();

        // Pausar autoplay quando o mouse estiver sobre o carrossel
        const carouselContainer = carousel.closest('.tech-card');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', () => {
                clearInterval(autoplayInterval);
            });

            carouselContainer.addEventListener('mouseleave', () => {
                clearInterval(autoplayInterval);
                startAutoplay();
            });
        }
    }

    // --- Event Listener para fechar modal ao clicar fora ---
    const specsModal = document.getElementById('specs-modal');
    if (specsModal) {
        specsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Iniciar funções
    // init3D(); // Descomente para ativar partículas
    // animate(); // Descomente para ativar partículas
    initScrollAnimations();
    initHeaderScroll();
    initTeamCarousel();
    initPrototypeCarousel();
});
