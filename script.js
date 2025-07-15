// script.js - Versión Mejorada
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initializeAnimations();
    initializeNavigation();
    initializeResponsiveIframes();
    initializeScrollEffects();
    initializeButtonInteractions();
    
    // Configurar animaciones de entrada para el timeline
    function initializeAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (timelineItems.length > 0) {
            // Configurar observador de intersección para animaciones
            const observerOptions = {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Añadir delay escalonado basado en el índice
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                            entry.target.classList.add('animate-timeline');
                            
                            // Animar el punto del timeline
                            setTimeout(() => {
                                const dot = entry.target.querySelector('.timeline-dot');
                                if (dot) {
                                    dot.classList.add('animate-dot');
                                    dot.style.transform = 'translateX(-50%) scale(1.2)';
                                    setTimeout(() => {
                                        dot.style.transform = 'translateX(-50%) scale(1)';
                                    }, 300);
                                }
                            }, 200);
                        }, index * 100); // Delay escalonado
                        
                        // Dejar de observar una vez animado
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Inicializar estilos y observar elementos
            timelineItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
                observer.observe(item);
            });
        }
    }
    
    // Configurar navegación entre clases
    function initializeNavigation() {
        const currentClassPage = document.querySelector('.class-detail');
        if (currentClassPage) {
            const classNumber = parseInt(currentClassPage.getAttribute('data-class-number'));
            setupNavigation(classNumber);
        }
    }
    
    // Configurar navegación responsive
    function setupNavigation(currentClass) {
        const prevBtn = document.querySelector('.prev-class');
        const nextBtn = document.querySelector('.next-class');
        
        if (prevBtn) {
            if (currentClass > 1) {
                prevBtn.href = `clase${currentClass - 1}.html`;
                prevBtn.innerHTML = `← Clase ${currentClass - 1}`;
            } else {
                prevBtn.classList.add('disabled');
                prevBtn.innerHTML = '← Primera clase';
                prevBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                });
            }
        }
        
        if (nextBtn) {
            if (currentClass < 12) {
                nextBtn.href = `clase${currentClass + 1}.html`;
                nextBtn.innerHTML = `Clase ${currentClass + 1} →`;
            } else {
                nextBtn.classList.add('disabled');
                nextBtn.innerHTML = 'Última clase';
                nextBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                });
            }
        }
    }
    
    // Hacer los iframes responsivos y mejorar su carga
    function initializeResponsiveIframes() {
        const iframes = document.querySelectorAll('.iframe-container iframe');
        
        iframes.forEach(iframe => {
            // Añadir loading lazy para mejor rendimiento
            iframe.setAttribute('loading', 'lazy');
            
            // Añadir evento de carga para mostrar/ocultar indicador
            const container = iframe.closest('.iframe-container');
            if (container) {
                // Crear indicador de carga
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'iframe-loading';
                loadingIndicator.innerHTML = `
                    <div style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        color: #666;
                        font-family: var(--body-font);
                    ">
                        <div style="
                            width: 40px;
                            height: 40px;
                            border: 3px solid #f3f3f3;
                            border-top: 3px solid var(--primary-color);
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto 1rem;
                        "></div>
                        <p>Cargando presentación...</p>
                    </div>
                `;
                
                container.appendChild(loadingIndicator);
                
                // Remover indicador cuando se carga el iframe
                iframe.addEventListener('load', function() {
                    setTimeout(() => {
                        if (loadingIndicator.parentNode) {
                            loadingIndicator.remove();
                        }
                    }, 500);
                });
                
                // Timeout para remover indicador si tarda mucho
                setTimeout(() => {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.remove();
                    }
                }, 10000);
            }
        });
    }
    
    // Efectos de scroll suaves
    function initializeScrollEffects() {
        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Parallax suave para el header
        const header = document.querySelector('header');
        if (header) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                header.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    // Interacciones mejoradas para botones
    function initializeButtonInteractions() {
        // Efecto ripple para botones principales
        const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .timeline-btn, .nav-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Crear efecto ripple
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                `;
                
                // Asegurar posición relativa del botón
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Tracking de clics para botones importantes
        const trackingButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
        trackingButtons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.textContent.trim();
                console.log(`Botón clickeado: ${action}`);
                
                // Aquí podrías añadir analytics como Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        'event_category': 'Button',
                        'event_label': action
                    });
                }
            });
        });
    }
    
    // Resaltar código al hacer clic
    document.querySelectorAll('.script-example').forEach(block => {
        block.addEventListener('click', function() {
            this.classList.toggle('highlighted');
            
            // Copiar código al portapapeles
            const codeText = this.querySelector('.code, pre, code');
            if (codeText) {
                navigator.clipboard.writeText(codeText.textContent).then(() => {
                    // Mostrar feedback visual
                    const feedback = document.createElement('div');
                    feedback.textContent = '¡Código copiado!';
                    feedback.style.cssText = `
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: var(--secondary-color);
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 50px;
                        font-weight: 600;
                        z-index: 1000;
                        animation: fadeInOut 2s ease;
                    `;
                    
                    document.body.appendChild(feedback);
                    
                    setTimeout(() => {
                        feedback.remove();
                    }, 2000);
                }).catch(() => {
                    console.log('No se pudo copiar el código');
                });
            }
        });
    });
    
    // Optimizaciones para dispositivos móviles
    if (window.innerWidth <= 768) {
        // Reducir animaciones en móviles para mejor rendimiento
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        
        // Optimizar scrolling en iOS
        document.body.style.webkitOverflowScrolling = 'touch';
        
        // Prevenir zoom en inputs en iOS
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                const viewport = document.querySelector('meta[name=viewport]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            });
            
            input.addEventListener('blur', function() {
                const viewport = document.querySelector('meta[name=viewport]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            });
        });
    }
    
    // Mejorar accesibilidad
    initializeAccessibility();
    
    function initializeAccessibility() {
        // Añadir skip links para navegación por teclado
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            z-index: 1000;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Añadir ID al main si no existe
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
        
        // Mejorar focus visible para navegación por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
});

// Añadir estilos CSS dinámicamente para las nuevas funcionalidades
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .iframe-loading {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--light-bg);
        border-radius: var(--border-radius-small);
        z-index: 1;
    }
    
    .highlighted {
        background-color: #f0f8ff !important;
        border-left: 4px solid var(--primary-color) !important;
        cursor: pointer;
        transition: var(--transition);
    }
    
    .highlighted::before {
        content: "✓ Copiado";
        position: absolute;
        top: -30px;
        right: 10px;
        background: var(--secondary-color);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        z-index: 10;
    }
    
    /* Estilos para navegación por teclado */
    .keyboard-navigation *:focus {
        outline: 3px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
    
    /* Mejoras de accesibilidad */
    .disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
    }
    
    /* Optimizaciones para móviles */
    @media (max-width: 768px) {
        .timeline-card:hover {
            transform: none;
        }
        
        .btn-primary:hover,
        .btn-secondary:hover,
        .timeline-btn:hover {
            transform: none;
        }
        
        .timeline-card {
            transition: none;
        }
    }
    
    /* Mejoras para animaciones */
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Loading states */
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
    
    .loaded {
        opacity: 1;
        pointer-events: auto;
        transition: opacity 0.3s ease;
    }
`;

document.head.appendChild(additionalStyles);