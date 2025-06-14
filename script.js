// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state to clicked link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Intersection Observer for section highlighting
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -60% 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Update active navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.pattern-card, .overview-item, .analysis-card, .learning-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial animation check
    animateOnScroll();
    
    // Animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Navigation background on scroll
    const navigation = document.querySelector('.navigation');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navigation.style.background = 'rgba(255, 255, 255, 0.95)';
            navigation.style.backdropFilter = 'blur(10px)';
        } else {
            navigation.style.background = '#ffffff';
            navigation.style.backdropFilter = 'none';
        }
    });
    
    // Copy to clipboard functionality for prompt text
    const promptTexts = document.querySelectorAll('.prompt-text');
    
    promptTexts.forEach(prompt => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 コピー';
        copyButton.className = 'copy-btn';
        copyButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: var(--tech-gradient);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s ease;
            opacity: 0.8;
        `;
        
        prompt.style.position = 'relative';
        prompt.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const text = prompt.textContent.replace('📋 コピー', '').trim();
            
            navigator.clipboard.writeText(text).then(function() {
                copyButton.innerHTML = '✅ コピー完了';
                copyButton.style.background = 'var(--creator-gradient)';
                
                setTimeout(function() {
                    copyButton.innerHTML = '📋 コピー';
                    copyButton.style.background = 'var(--tech-gradient)';
                }, 2000);
            }).catch(function() {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                copyButton.innerHTML = '✅ コピー完了';
                copyButton.style.background = 'var(--creator-gradient)';
                
                setTimeout(function() {
                    copyButton.innerHTML = '📋 コピー';
                    copyButton.style.background = 'var(--tech-gradient)';
                }, 2000);
            });
        });
        
        copyButton.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.05)';
        });
        
        copyButton.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '⬆️';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-gradient);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: var(--shadow-medium);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Pattern card interactions
    const patternCards = document.querySelectorAll('.pattern-card');
    
    patternCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });
    
    // Audio button enhancements
    const audioButtons = document.querySelectorAll('.audio-btn');
    
    audioButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
            
            // Track click analytics (if needed)
            console.log('Audio button clicked:', this.href);
        });
    });
    
    // Transcript button enhancements
    const transcriptButtons = document.querySelectorAll('.transcript-btn');
    
    transcriptButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
            
            // Track click analytics (if needed)
            console.log('Transcript button clicked:', this.href);
        });
    });
    
    // Loading screen simulation
    const showLoadingEffect = function() {
        const elements = document.querySelectorAll('.section, .pattern-card, .overview-item');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    };
    
    // Run loading effect
    setTimeout(showLoadingEffect, 100);
    
    // Performance monitoring
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    });
    
    // Error handling for external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = '読み込み中...';
            
            // Reset text after a brief moment
            setTimeout(() => {
                this.textContent = originalText;
            }, 1000);
        });
    });
    
    // Mobile menu toggle (if needed for smaller screens)
    const createMobileMenu = function() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.navigation');
            const navLinks = document.querySelector('.nav-links');
            
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '☰';
                menuBtn.style.cssText = `
                    display: none;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    padding: 10px;
                `;
                
                nav.querySelector('.container').appendChild(menuBtn);
                
                menuBtn.addEventListener('click', function() {
                    navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
                });
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        background: var(--primary-gradient);
        color: white;
        transform: translateY(-2px);
        box-shadow: var(--shadow-medium);
    }
    
    .animate {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .copy-btn:hover {
        box-shadow: var(--shadow-medium);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            display: block !important;
        }
        
        .nav-links {
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: var(--shadow-medium);
            padding: 20px 0;
        }
    }
`;

document.head.appendChild(style); 