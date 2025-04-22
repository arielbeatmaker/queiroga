document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper('.mySwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        touchRatio: 1,
        observer: true,
        observeParents: true
    });
    
    document.addEventListener('touchstart', function() {
        swiper.autoplay.start();
    }, {passive: true});

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    particlesJS('particles-js', {
        particles: {
            number: {
                value: isMobile ? 15 : 30,
                density: {
                    enable: true,
                    value_area: isMobile ? 800 : 1000
                }
            },
            color: {
                value: '#0056b3'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.4,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: isMobile ? 2 : 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 30,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: isMobile ? 120 : 150,
                color: '#0056b3',
                opacity: 0.3,
                width: isMobile ? 0.8 : 1
            },
            move: {
                enable: true,
                speed: isMobile ? 0.8 : 1.5,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: isMobile ? 'window' : 'canvas',
            events: {
                onhover: {
                    enable: !isMobile,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: isMobile ? 1 : 2
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: false
    });
    
    if (isMobile) {
        window.addEventListener('orientationchange', function() {
            setTimeout(function() {
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.vendors.destroypJS();
                    window.pJSDom = [];
                    particlesJS('particles-js', window.particlesJSConfig);
                }
            }, 500);
        });
    }

    const serviceCards = document.querySelectorAll('.service-card');
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
    
    const handleCardHover = debounce(function(event) {
        if (event.type === 'mouseenter') {
            this.style.zIndex = '5';
            document.querySelectorAll('.service-card:not(:hover)').forEach(card => {
                card.style.opacity = '0.8';
            });
        } else {
            this.style.zIndex = '1';
            document.querySelectorAll('.service-card').forEach(card => {
                card.style.opacity = '1';
            });
        }
    }, 50);
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardHover);
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .about-text, .about-image, .contact-item, .social-icon');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    const requestBtns = document.querySelectorAll('.request-btn');
    requestBtns.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px)';
        });
        btn.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    let lastScrollTop = 0;
    let scrollThrottle = false;
    
    window.addEventListener('scroll', function() {
        if (scrollThrottle) return;
        scrollThrottle = true;
        
        setTimeout(function() {
            const scrollPosition = window.scrollY;
            if (Math.abs(scrollPosition - lastScrollTop) > 50) {
                const particles = document.getElementById('particles-js');
                if (particles) {
                    particles.style.transform = `translateY(${scrollPosition * 0.05}px)`;
                }
                
                const titles = document.querySelectorAll('.section-title');
                titles.forEach(title => {
                    const titlePosition = title.getBoundingClientRect().top + window.scrollY;
                    const offset = (scrollPosition - titlePosition) * 0.03;
                    if (Math.abs(offset) < 15) {
                        title.style.transform = `translateY(${offset}px)`;
                    }
                });
                
                lastScrollTop = scrollPosition;
            }
            scrollThrottle = false;
        }, 100);
    });

    const addButtonGlow = () => {
        const buttons = document.querySelectorAll('.request-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', debounce(function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.background = `radial-gradient(circle at ${x}px ${y}px, #00a1ff, #0077cc)`;
            }, 30));
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'var(--gradient-primary)';
            });
        });
    };
    
    addButtonGlow();
});

document.head.insertAdjacentHTML('beforeend', `
<style>
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeIn 0.5s ease forwards;
    }
    
    @keyframes fadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .in-view {
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.03); }
        100% { transform: scale(1); }
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
        100% { transform: translateY(0px); }
    }
    
    .service-icon {
        animation: pulse 4s infinite;
    }
    
    .social-icon {
        animation: float 6s ease-in-out infinite;
        animation-delay: calc(var(--i, 0) * 0.5s);
    }
    
    .service-card::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(45deg, #0077cc, transparent, #ff8c00);
        z-index: -1;
        border-radius: 12px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .service-card:hover::before {
        opacity: 0.5;
    }
</style>
`);