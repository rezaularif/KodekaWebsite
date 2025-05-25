// GSAP Animations for Kodeka Website
// Optimized for performance and smooth scrolling

// Register GSAP plugins with reduced size
const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);

// Performance optimization
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Skip animations if user prefers reduced motion
    if (reduceMotion) {
        gsap.set("*", { clearProps: "opacity, transform, filter" });
        return;
    }
    
    // Batch set initial states for better performance
    const initialStates = [
        { selector: ".hero-title, .hero-subtitle, .hero-description, .hero-cta, .hero-marquee, .bento-item, .process-step, .work-item, .testimonial-card, .pricing-card, .faq-item", 
          props: { opacity: 0, y: 20 } },
        { selector: ".faq-item", props: { opacity: 0, x: -30 } },
        { selector: ".hero-cta, .bento-item, .work-item, .pricing-card", 
          props: { scale: 0.95 } }
    ];
    
    initialStates.forEach(({ selector, props }) => {
        gsap.set(selector, { ...props, force3D: true, willChange: 'opacity, transform' });
    });

    // Hero Section Load Animation
    function heroAnimation() {
        const tl = gsap.timeline({ delay: 0.5 });
        
        tl.to(".hero-title", { 
            opacity: 1, 
            y: 0, 
            duration: 1.2, 
            ease: "power3.out" 
        })
        .to(".hero-subtitle", { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            ease: "power3.out" 
        }, "-=0.8")
        .to(".hero-description", { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out" 
        }, "-=0.6")
        .to(".hero-cta", { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8, 
            ease: "back.out(1.2)" 
        }, "-=0.4")
        .to(".hero-marquee", { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power3.out" 
        }, "-=0.3");
    }

    // Floating Animation for Hero Elements
    function floatingAnimation() {
        // Remove floating animation for hero mask image
        gsap.set(".hero-mask-image", {
            clearProps: "y,transform"
        });

        // Subtle floating for decorative stars
        gsap.to(".star-decoration", {
            y: -5,
            rotation: 10,
            duration: 3,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
            stagger: 0.5
        });
    }

    // Optimized scroll-triggered animations with batch processing
    function scrollAnimations() {
        // Batch animations with similar properties
        const scrollAnimations = [
            {
                selector: ".bento-item",
                trigger: ".bento-container",
                props: { opacity: 1, y: 0, scale: 1 },
                options: { duration: 0.8, ease: "power3.out", stagger: 0.1, clearProps: "transform" }
            },
            {
                selector: ".pricing-card",
                trigger: ".pricing-grid",
                props: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity'
                },
                options: { 
                    duration: 0.6, 
                    ease: "power3.out", 
                    stagger: 0.15,
                    force3D: true
                }
            }
        ];

        scrollAnimations.forEach(anim => {
            gsap.to(anim.selector, {
                ...anim.props,
                scrollTrigger: {
                    trigger: anim.trigger,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    markers: false,
                    invalidateOnRefresh: true
                },
                ...anim.options,
                force3D: true,
                willChange: 'opacity, transform'
            });
        });

        // Pricing cards animation
        gsap.to(".pricing-card", {
            scrollTrigger: {
                trigger: ".pricing-grid",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.1)",
            stagger: 0.1
        });

        // FAQ items animation
        gsap.to(".faq-item", {
            scrollTrigger: {
                trigger: ".faq-list",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1
        });

        // Process steps animation with improved responsive behavior
        gsap.to(".process-step", {
            scrollTrigger: {
                trigger: ".process-steps-container",
                start: "top 85%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            clearProps: "transform"
        });

        // Work portfolio grid animation
        gsap.to(".work-item", {
            scrollTrigger: {
                trigger: ".work-grid",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1
        });

        // Testimonials animation with improved responsive behavior
        gsap.to(".testimonial-card", {
            scrollTrigger: {
                trigger: ".testimonials-container",
                start: "top 85%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            clearProps: "transform"
        });

        // Section headers animation
        gsap.utils.toArray(".section-header").forEach(header => {
            gsap.fromTo(header, 
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        });
    }

    // Enhanced navbar scroll effect
    function navbarAnimation() {
        const navbar = document.getElementById('main-navbar');
        
        ScrollTrigger.create({
            start: "top -80",
            end: 99999,
            onUpdate: self => {
                gsap.to(navbar, {
                    y: self.direction === -1 ? 0 : -100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });

        // Navbar scale effect on scroll
        ScrollTrigger.create({
            start: "top -50",
            end: 99999,
            onToggle: self => {
                gsap.to(navbar, {
                    scale: self.isActive ? 0.95 : 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }

    // Text reveal animation for large headings
    function textRevealAnimation() {
        gsap.utils.toArray(".reveal-text").forEach(text => {
            gsap.fromTo(text, 
                { 
                    backgroundPosition: "200% center" 
                },
                {
                    scrollTrigger: {
                        trigger: text,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    backgroundPosition: "0% center",
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        });
    }

    // Parallax effect for hero background
    function parallaxAnimation() {
        gsap.to(".hero-bg", {
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            y: "50%"
        });
    }

    // Smooth scroll for navigation links
    function smoothScroll() {
        // Smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if it's open when clicking a link
                    const mobileMenu = document.getElementById('mobile-menu');
                    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
                    if (mobileMenu && mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        mobileMenu.classList.add('hidden');
                        mobileMenuToggle.classList.remove('open');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Loading animation
    function loadingAnimation() {
        // Hide loading indicator after content loads
        const loadingIndicator = document.getElementById('loading-indicator');
        if (loadingIndicator) {
            gsap.to(loadingIndicator, { 
                opacity: 0, 
                duration: 0.5, 
                ease: "power2.out",
                onComplete: () => {
                    loadingIndicator.style.display = 'none';
                }
            });
        }
        
        // Fade in body content
        gsap.fromTo("body", 
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    }


    // FAQ Accordion Animation Enhancement
    function enhanceFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        console.log('enhanceFAQ: Initializing FAQ items. Found:', faqItems.length);

        faqItems.forEach((item, index) => {
            const btn = item.querySelector('.faq-toggle');
            const content = item.querySelector('.faq-content');
            const icon = btn.querySelector('svg');

            btn.setAttribute('aria-expanded', 'false');
            content.setAttribute('aria-hidden', 'true');
            content.classList.remove('hidden'); 
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            content.style.overflow = 'hidden';

            // Define the plus and arrow-up icons HTML
            const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5 text-indigo-400 transition-transform duration-300 transform"><title>c-add</title><g fill="#ffffff" stroke-linejoin="round" stroke-linecap="round"><circle cx="12" cy="12" r="10" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"></circle><line x1="12" y1="8" x2="12" y2="16" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"></line><line x1="16" y1="12" x2="8" y2="12" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1"></line></g></svg>`;
            
            const arrowUpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="w-5 h-5 text-indigo-400 transition-transform duration-300 transform"><title>circle-arrow-up</title><g fill="#ffffff" stroke-linejoin="round" stroke-linecap="round"><line fill="none" stroke="#ffffff" stroke-width="1" stroke-miterlimit="10" x1="12" y1="18" x2="12" y2="7" stroke-linejoin="round" stroke-linecap="round"></line> <polyline fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-miterlimit="10" points=" 8,11 12,7 16,11 " stroke-linejoin="round"></polyline> <circle fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" stroke-miterlimit="10" cx="12" cy="12" r="11" stroke-linejoin="round"></circle></g></svg>`;
            
            btn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                console.log(`enhanceFAQ: Item ${index + 1} clicked. Was active: ${isActive}, ScrollHeight: ${content.scrollHeight}px`);

                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        console.log(`enhanceFAQ: Closing other active item.`);
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
                        const otherContent = otherItem.querySelector('.faq-content');
                        const otherIconContainer = otherItem.querySelector('.faq-icon-container');
                        otherContent.style.maxHeight = '0px';
                        otherContent.style.opacity = '0';
                        otherContent.setAttribute('aria-hidden', 'true');
                        
                        // Replace arrow with plus icon
                        otherIconContainer.innerHTML = plusIcon;
                        otherItem.querySelector('.faq-toggle').classList.remove('active');
                    }
                });

                if (isActive) {
                    console.log(`enhanceFAQ: Item ${index + 1} - Closing.`);
                    item.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                    btn.classList.remove('active');
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                    content.setAttribute('aria-hidden', 'true');

                    // Replace arrow with plus icon
                    const iconContainer = item.querySelector('.faq-icon-container');
                    iconContainer.innerHTML = plusIcon;
                } else {
                    console.log(`enhanceFAQ: Item ${index + 1} - Opening. Target maxHeight: ${content.scrollHeight}px`);
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                    btn.classList.add('active');
                    content.setAttribute('aria-hidden', 'false');
                    content.style.maxHeight = '1000px'; // Use a large fixed value to ensure all content is visible
                    content.style.opacity = '1';

                    // Replace plus with arrow-up icon
                    const iconContainer = item.querySelector('.faq-icon-container');
                    iconContainer.innerHTML = arrowUpIcon;
                }
            });
        });
    }

    // Mobile menu toggle functionality
    function setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', function() {
                // Toggle open class on the button for animation
                this.classList.toggle('open');
                
                // Toggle the mobile menu visibility
                if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenu.classList.add('open');
                    // Animate with GSAP
                    gsap.fromTo(mobileMenu, 
                        { opacity: 0, height: 0 }, 
                        { opacity: 1, height: 'auto', duration: 0.3, ease: 'power2.out' }
                    );
                } else {
                    // Animate closing with GSAP
                    gsap.to(mobileMenu, { 
                        opacity: 0, 
                        height: 0, 
                        duration: 0.3, 
                        ease: 'power2.in',
                        onComplete: () => {
                            mobileMenu.classList.add('hidden');
                            mobileMenu.classList.remove('open');
                        }
                    });
                }
            });
        }
    }

    // Initialize all animations
    loadingAnimation();
    heroAnimation();
    floatingAnimation();
    scrollAnimations();
    navbarAnimation();
    textRevealAnimation();
    parallaxAnimation();
    smoothScroll();
    enhanceFAQ();
    setupMobileMenu();

    // Debounced resize handler for ScrollTrigger refresh
    let resizeTimeout;
    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    }
    
    // Performance optimization: Debounced ScrollTrigger refresh on resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup function for when the component is destroyed
    function cleanup() {
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        gsap.killTweensOf('*');
    }
    
    // Return cleanup function for frameworks that support it
    return cleanup;
});

// Utility function to add stagger animation to any elements
function animateElements(selector, options = {}) {
    const defaults = {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1
    };
    
    const config = { ...defaults, ...options };
    
    gsap.to(selector, config);
} 