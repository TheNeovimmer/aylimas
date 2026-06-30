document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    const App = {
        init() {
            this.loadingAnimation();
            this.navbar();
            this.heroSlider();
            this.bookingForm();
            this.scrollEffects();
            this.scrollReveal();
            this.lightbox();
            this.testimonialsSlider();
            this.roomFilter();
            this.galleryFilter();
            this.roomsSection();
            this.tilt3D();
            this.smoothScroll();
        },

        loadingAnimation() {
            window.addEventListener('load', () => {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 500);
                    }, 1500);
                }
            });
        },

        scrollReveal() {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            
            const revealOnScroll = () => {
                reveals.forEach(el => {
                    const windowHeight = window.innerHeight;
                    const elementTop = el.getBoundingClientRect().top;
                    const revealPoint = 100;
                    
                    if (elementTop < windowHeight - revealPoint) {
                        el.classList.add('active');
                    }
                });
            };
            
            window.addEventListener('scroll', revealOnScroll);
            revealOnScroll();
        },

        tilt3D() {
            const tiltElements = document.querySelectorAll('[data-tilt]');
            if (!tiltElements.length) return;

            tiltElements.forEach(el => {
                el.addEventListener('mousemove', (e) => {
                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;

                    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                });

                el.addEventListener('mouseleave', () => {
                    el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
                });
            });
        },

        navbar() {
            const navbar = document.getElementById('navbar');
            const navToggle = document.getElementById('navToggle');
            const navMenu = document.getElementById('navMenu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    navToggle.classList.toggle('active');
                });

                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    });
                });
            }

            window.addEventListener('scroll', () => {
                if (navbar) {
                    if (window.scrollY > 100) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }
            });
        },

        heroSlider() {
            const slides = document.querySelectorAll('.hero-slide');
            const dots = document.querySelectorAll('.dot');

            if (slides.length === 0) return;

            let currentSlide = 0;
            let slideInterval = setInterval(nextSlide, 5000);

            function nextSlide() {
                slides[currentSlide].classList.remove('active');
                if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

                currentSlide = (currentSlide + 1) % slides.length;

                slides[currentSlide].classList.add('active');
                if (dots[currentSlide]) dots[currentSlide].classList.add('active');
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(slideInterval);

                    slides[currentSlide].classList.remove('active');
                    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

                    currentSlide = index;
                    slides[currentSlide].classList.add('active');
                    if (dots[currentSlide]) dots[currentSlide].classList.add('active');

                    slideInterval = setInterval(nextSlide, 5000);
                });
            });
        },

        bookingForm() {
            const bookingForm = document.getElementById('bookingForm');
            const contactForm = document.getElementById('contactForm');
            const bookingFormFull = document.getElementById('bookingFormFull');

            const setMinDate = (inputId) => {
                const input = document.getElementById(inputId);
                if (input) {
                    const today = new Date().toISOString().split('T')[0];
                    input.setAttribute('min', today);
                }
            };

            setMinDate('checkIn');
            setMinDate('checkOut');

            if (bookingForm) {
                bookingForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Vérification de disponibilité! Nous allons vous montrer les chambres disponibles.');
                });
            }

            if (contactForm) {
                contactForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Thank you for your message! We will get back to you within 2 hours.');
                    contactForm.reset();
                });
            }

            if (bookingFormFull) {
                bookingFormFull.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Booking request submitted! We will confirm your reservation shortly.');
                    bookingFormFull.reset();
                });
            }
        },

        scrollEffects() {
            const scrollTop = document.getElementById('scrollTop');

            window.addEventListener('scroll', () => {
                if (scrollTop) {
                    if (window.scrollY > 500) {
                        scrollTop.classList.add('visible');
                    } else {
                        scrollTop.classList.remove('visible');
                    }
                }
            });

            if (scrollTop) {
                scrollTop.addEventListener('click', () => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                });
            }

            let statsAnimated = false;
            const animateNumbers = () => {
                if (statsAnimated) return;
                const stats = document.querySelectorAll('.stat-number[data-count]');
                if (!stats.length) return;

                const firstStat = stats[0];
                const rect = firstStat.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    statsAnimated = true;
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        if (isNaN(target)) return;
                        const duration = 2000;
                        const step = target / (duration / 16);
                        let current = 0;

                        const updateNumber = () => {
                            current += step;
                            if (current < target) {
                                stat.textContent = Math.floor(current).toLocaleString();
                                requestAnimationFrame(updateNumber);
                            } else {
                                stat.textContent = target.toLocaleString();
                            }
                        };

                        updateNumber();
                    });
                }
            };

            window.addEventListener('scroll', animateNumbers);
            animateNumbers();
        },

        lightbox() {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxClose = document.getElementById('lightboxClose');

            const galleryItems = document.querySelectorAll('.gallery-item');

            galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    const img = item.querySelector('img');
                    if (lightbox && lightboxImg && img) {
                        lightboxImg.src = img.src;
                        lightbox.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            if (lightboxClose) {
                lightboxClose.addEventListener('click', closeLightbox);
            }

            if (lightbox) {
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
            }

            function closeLightbox() {
                if (lightbox) {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });
        },

        testimonialsSlider() {
            const cards = document.querySelectorAll('.testimonial-card');
            const dots = document.querySelectorAll('.t-dot');

            if (cards.length === 0) return;

            let currentIndex = 0;
            let testimonialInterval = setInterval(nextTestimonial, 5000);

            function showTestimonial(index) {
                cards.forEach(card => card.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));

                if (cards[index]) cards[index].classList.add('active');
                if (dots[index]) dots[index].classList.add('active');
            }

            function nextTestimonial() {
                currentIndex = (currentIndex + 1) % cards.length;
                showTestimonial(currentIndex);
            }

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    clearInterval(testimonialInterval);
                    currentIndex = index;
                    showTestimonial(index);
                    testimonialInterval = setInterval(nextTestimonial, 5000);
                });
            });
        },

        roomFilter() {
            const filterBtns = document.querySelectorAll('.filter-btn');
            const roomCards = document.querySelectorAll('.room-card[data-category]');

            if (filterBtns.length === 0) return;

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');

                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    roomCards.forEach(card => {
                        const category = card.getAttribute('data-category');

                        if (filter === 'all' || category === filter) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        },

        galleryFilter() {
            const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
            const galleryItems = document.querySelectorAll('.gallery-masonry .gallery-item');

            if (filterBtns.length === 0) return;

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.getAttribute('data-filter');

                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    galleryItems.forEach(item => {
                        const category = item.getAttribute('data-category');

                        if (filter === 'all' || category === filter) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        },

        roomsSection() {
            const modal = document.getElementById('roomModal');
            const modalClose = document.getElementById('modalClose');
            const detailsBtns = document.querySelectorAll('.room-details-btn');

            const roomData = {
                standard: {
                    title: 'Chambre Standard',
                    desc: 'Chambre confortable de 35m² avec équipements modernes, parfaite pour les couples ou voyageurs solos recherchant un hébergement de qualité à bon prix.',
                    img: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600',
                    features: ['Lit Queen', '35m²', 'Vue Jardin', 'Smart TV', 'Douche Cascade', 'WiFi Gratuit', 'Machine à Café', 'Climatisation']
                },
                deluxe: {
                    title: 'Chambre Deluxe Océan',
                    desc: 'Réveillez-vous avec une vue imprenable sur l\'océan dans cette chambre élégamment meublée de 45m² avec balcon privé.',
                    img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
                    features: ['Lit King Size', '45m²', 'Vue Mer', 'Balcon', 'Douche Cascade', 'WiFi Gratuit', 'Smart TV', 'Climatisation']
                },
                'deluxe-beach': {
                    title: 'Deluxe Accès Plage',
                    desc: 'Sortez directement sur le sable depuis votre chambre. Profitez d\'un accès direct à la plage et d\'une grande terrasse.',
                    img: 'https://images.unsplash.com/photo-1602002418816-5c0ae9dea8ba?w=600',
                    features: ['Lit King Size', '50m²', 'Accès Plage', 'Terrasse', 'Baignoire', 'Service Chambre', 'Mini Bar', 'Serviettes Plage']
                },
                suite: {
                    title: 'Suite Plage',
                    desc: 'Suite spacieuse de 85m² avec salon séparé, chambre principale, accès direct à la plage et jacuzzi. Service majordome inclus.',
                    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
                    features: ['Lit King Size', '85m²', 'Salon', 'Accès Plage', 'Jacuzzi', 'Service Majordome', 'Grande Terrasse', 'Mini Bar']
                },
                family: {
                    title: 'Suite Familiale',
                    desc: 'Parfaite pour les familles avec 100m² d\'espace, deux chambres, salon spacieux et équipements adaptés aux enfants.',
                    img: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
                    features: ['2 Chambres', '100m²', 'Salon', 'Kitchenette', '2 Salles de Bain', 'Coin Enfants', 'WiFi Gratuit', 'Smart TV']
                },
                villa: {
                    title: 'Villa Plage',
                    desc: 'Le luxe ultime avec 150m² d\'espace, piscine privée, service de majordome dévoué et jardin isolé. Votre paradis privé.',
                    img: 'https://images.unsplash.com/photo-1540544660406-8735e5fbb3bd?w=600',
                    features: ['2 Chambres', '150m²', 'Piscine Privée', 'Plage Privée', 'Majordome Dévoué', 'Jardin Privé', 'Chef Privé', 'Salle de Sport']
                },
                royal: {
                    title: 'Villa Royale',
                    desc: 'Le summum du luxe. 250m² avec trois chambres, piscine infinity privée, salle de cinéma et service inégalé.',
                    img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600',
                    features: ['3 Chambres', '250m²', 'Piscine Infinity', 'Salle de Cinéma', 'Salle de Sport Privée', 'Accès Héliport', 'Chef Personnel', 'Service 24h/24']
                }
            };

            detailsBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const roomType = btn.getAttribute('data-room');
                    const data = roomData[roomType];

                    if (modal && data) {
                        const modalImg = modal.querySelector('#modalImg');
                        const modalTitle = document.getElementById('modalTitle');
                        const modalDesc = document.getElementById('modalDesc');
                        const modalFeatures = document.getElementById('modalFeatures');

                        if (modalImg) modalImg.src = data.img;
                        if (modalTitle) modalTitle.textContent = data.title;
                        if (modalDesc) modalDesc.textContent = data.desc;
                        if (modalFeatures) {
                            modalFeatures.innerHTML = data.features
                                .map(f => `<li><i class="fas fa-check"></i> ${f}</li>`)
                                .join('');
                        }

                        modal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }
                });
            });

            if (modalClose) {
                modalClose.addEventListener('click', closeModal);
            }

            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
            }

            function closeModal() {
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        },

        smoothScroll() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    App.init();

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]');
            if (email && email.value) {
                alert('Merci de vous être abonné! Vous recevrez nos dernières actualités et offres exclusives.');
                email.value = '';
            }
        });
    }

    const videoContainer = document.querySelector('.video-container');
    if (videoContainer) {
        videoContainer.addEventListener('click', () => {
            alert('La visite vidéo s\'ouvrirait dans une fenêtre modale!');
        });
    }
});
