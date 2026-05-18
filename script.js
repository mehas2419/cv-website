// ============= PARTICLES.JS CONFIG =============
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: { enable: true, value_area: 800 }
        },
        color: { value: '#ff4d9e' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1 }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1 }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ff4d9e',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out'
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'grab' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 0.5 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// ============= NAVIGATION =============
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');

function setActiveLink() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', setActiveLink);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
});

// ============= SCROLL ANIMATIONS =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .skill-category, .research-card, .project-card, .cert-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.addEventListener('styleLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
document.dispatchEvent(new Event('styleLoaded'));

// ============= SMOOTH SCROLL =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============= TYPING EFFECT =============
const typedText = document.querySelector('.typed-text');
const words = ['Researcher', 'Biotechnologist', 'Innovator', 'Scientist'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    const speed = isDeleting ? 50 : 100;
    setTimeout(typeEffect, speed);
}

typeEffect();

// ============= BLOG FUNCTIONALITY =============
const blogTitle = document.getElementById('blog-title');
const blogContent = document.getElementById('blog-content');
const blogSave = document.getElementById('blog-save');
const blogPosts = document.getElementById('blog-posts');

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    blogPosts.innerHTML = '';
    if (posts.length === 0) {
        blogPosts.innerHTML = '<p class="blog-empty">No posts yet. Write your first learning log above!</p>';
        return;
    }
    posts.reverse().forEach((post, index) => {
        const postEl = document.createElement('div');
        postEl.className = 'blog-post';
        postEl.innerHTML = `
            <h4>${post.title}</h4>
            <span class="blog-date">${post.date}</span>
            <p>${post.content}</p>
            <button class="blog-delete" data-index="${posts.length - 1 - index}"><i class="fas fa-trash"></i> Delete</button>
        `;
        blogPosts.appendChild(postEl);
    });
    document.querySelectorAll('.blog-delete').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
            posts.splice(idx, 1);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            loadPosts();
        });
    });
}

blogSave.addEventListener('click', () => {
    const title = blogTitle.value.trim();
    const content = blogContent.value.trim();
    if (!title || !content) return;
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    posts.push({ title, content, date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) });
    localStorage.setItem('blogPosts', JSON.stringify(posts));
    blogTitle.value = '';
    blogContent.value = '';
    loadPosts();
});

loadPosts();
