// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMemoryGame();
    initCarousel();
    initTherapyMonitor();
    initChatBot();
    initContactForm();
});

// Navbar functionality
function initNavbar() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.navbar-links');
    const navbar = document.getElementById('navbar');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

// Memory Game functionality
function initMemoryGame() {
    const icons = ['🏥', '🧠', '💊', '🍎', '🌡️', '🩺', '💉', '🔬'];
    const gameGrid = document.getElementById('memoryGameGrid');
    let cards = [...icons, ...icons];
    let flipped = [];
    let matched = [];
    
    // Shuffle cards
    cards.sort(() => Math.random() - 0.5);
    
    // Create cards
    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">${icon}</div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card, index));
        gameGrid.appendChild(card);
    });
    
    function flipCard(card, index) {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;
        
        card.classList.add('flipped');
        flipped.push(index);
        
        if (flipped.length === 2) {
            const [first, second] = flipped;
            if (cards[first] === cards[second]) {
                matched.push(first, second);
                flipped = [];
                
                if (matched.length === cards.length) {
                    showCongratsModal();
                }
            } else {
                setTimeout(() => {
                    document.querySelectorAll('.memory-card')[first].classList.remove('flipped');
                    document.querySelectorAll('.memory-card')[second].classList.remove('flipped');
                    flipped = [];
                }, 1000);
            }
        }
    }
    
    // Reset game button
    document.getElementById('resetGameBtn').addEventListener('click', () => {
        gameGrid.innerHTML = '';
        flipped = [];
        matched = [];
        cards.sort(() => Math.random() - 0.5);
        cards.forEach((icon, index) => {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">${icon}</div>
                </div>
            `;
            card.addEventListener('click', () => flipCard(card, index));
            gameGrid.appendChild(card);
        });
    });
}

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentScroll = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    document.getElementById('prevSlide').addEventListener('click', () => showSlide(currentSlide - 1));
    document.getElementById('nextSlide').addEventListener('click', () => showSlide(currentSlide + 1));
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });
    
    // Auto advance
    setInterval(() => showSlide(currentSlide + 1), 5000);
}

// Therapy Monitor functionality
function initTherapyMonitor() {
    const playButton = document.getElementById('playButton');
    const therapyModal = document.getElementById('therapyModal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    playButton.addEventListener('click', () => {
        therapyModal.classList.add('active');
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').classList.remove('active');
        });
    });
}

// Chatbot functionality
function initChatBot() {
    const chatBotButton = document.getElementById('chatBotButton');
    chatBotButton.addEventListener('click', () => {
        alert('Chatbot feature coming soon! Stay tuned for instant healthcare assistance.');
    });
}

// Contact Form functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
    });
}

// Show congratulations modal
function showCongratsModal() {
    const modal = document.getElementById('congratsModal');
    modal.classList.add('active');
    createFireworks();
    
    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', () => {
        modal.classList.remove('active');
        document.getElementById('resetGameBtn').click();
    });
}

// Fireworks animation
function createFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8
        };
        this.alpha = 1;
        
        this.update = function() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.velocity.y += 0.1;
            this.alpha -= 0.01;
        };
        
        this.draw = function() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = `hsl(${Math.random() * 360}, 50%, 50%)`;
            ctx.fillRect(this.x, this.y, 2, 2);
            ctx.restore();
        };
    }
    
    let particles = [];
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            if (particle.alpha > 0) {
                particle.update();
                particle.draw();
            } else {
                particles.splice(index, 1);
            }
        });
        
        if (Math.random() < 0.1) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y));
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}