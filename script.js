document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL MENÚ MÓVIL ---
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    const menuLinks = document.querySelectorAll('.nav-menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- LÓGICA DEL MODO OSCURO ---
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');

    // Comprobar si el usuario ya tenía guardada una preferencia previa
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Escuchar el click en el botón de modo oscuro
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        let theme = 'light';
        
        // Cambiar el ícono según el modo activo
        if (document.body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        
        // Guardar la elección en el navegador del alumno
        localStorage.setItem('theme', theme);
    });
});
// --- LÓGICA DEL CARRUSEL AUTOMÁTICO CON EFECTO FADE ---
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlideIndex = 0;
    let autoSlideInterval;

    // Función para cambiar de diapositiva
    function showSlide(index) {
        slides[currentSlideIndex].classList.remove('active');
        currentSlideIndex = (index + slides.length) % slides.length; // Ciclo infinito circular
        slides[currentSlideIndex].classList.add('active');
    }

    // Funciones de movimiento
    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // Configurar el temporizador automático (Cambia cada 4000 milisegundos = 4 segundos)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // Reiniciar el tiempo automático si el usuario hace clic manual
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Eventos de botones de flechas
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Iniciar el carrusel automatizado al cargar la página
    startAutoSlide();


// --- LÓGICA DEL FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Acá capturamos los datos por si en el futuro querés enviarlos a una base de datos o API
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        // Simulamos un envío exitoso mostrando el mensaje en pantalla
        formResponse.className = 'form-response success';
        formResponse.textContent = `¡Gracias por tu consulta, ${nombre}! El mensaje fue enviado con éxito.`;
        
        // Limpiamos los campos del formulario
        contactForm.reset();

        // Ocultamos el mensaje de éxito automáticamente después de 5 segundos
        setTimeout(() => {
            formResponse.style.display = 'none';
        }, 5000);
    });
// --- LÓGICA DE LOS DESPLEGABLES (ACORDEÓN DE APUNTES) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const content = currentItem.querySelector('.accordion-content');
            
            // Comprobar si ya estaba activo
            const isOpen = currentItem.classList.contains('active');
            
            // Opcional: Cerrar todos los demás desplegables abiertos (Efecto Acordeón Único)
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Si no estaba abierto, lo abrimos calculando su altura real de scroll
            if (!isOpen) {
                currentItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                currentItem.classList.remove('active');
                content.style.maxHeight = null;
            }
        });
    });    