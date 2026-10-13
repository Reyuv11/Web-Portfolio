// Close menu when clicking on a link (mobile)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navList = document.getElementById('navList');
                
        if (hamburger) hamburger.classList.remove('active');
        if (navList) navList.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            console.log('Form submitted:', { name, email, message });
            
            alert('Message sent successfully!');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbar = document.querySelector('.nav');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation and scroll handling
    const navbar = document.querySelector('.nav');
    const scrollProgress = document.querySelector('.scroll-progress');
    
    console.log('Navbar element found:', navbar);
    console.log('Scroll progress element found:', scrollProgress);
    
    if (!navbar) {
        console.error('Navigation element not found!');
        return;
    }

    navbar.style.transform = 'translateY(0)';
    navbar.style.opacity = '1';
    console.log('Navigation should now be visible');
    
    let lastScrollTop = 0;
    
    function updateNavigation() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        console.log('Scroll position:', scrollTop, 'Window height:', windowHeight);
        
        if (scrollTop > windowHeight * 0.3) {
            navbar.classList.add('nav-visible');
            navbar.classList.remove('nav-hero');
            console.log('Added nav-visible class');
        } else {
            navbar.classList.add('nav-hero');
            navbar.classList.remove('nav-visible');
            console.log('Added nav-hero class');
        }
    }
    
    updateNavigation();
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        );
        
        const maxScroll = documentHeight - windowHeight;
        const scrollPercent = Math.min((scrollTop / maxScroll) * 100, 100);
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Navigation visibility logic
        if (scrollTop > lastScrollTop && scrollTop > windowHeight * 0.3) {
            navbar.classList.add('nav-visible');
            navbar.classList.remove('nav-hero');
        } else if (scrollTop < lastScrollTop || scrollTop <= windowHeight * 0.1) {
            if (scrollTop <= windowHeight * 0.1) {
                navbar.classList.remove('nav-visible');
                navbar.classList.add('nav-hero');
            } else {
                navbar.classList.add('nav-visible');
                navbar.classList.remove('nav-hero');
            }
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
