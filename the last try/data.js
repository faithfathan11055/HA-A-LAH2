// ============================================
// EFEK 1: Hati / bunga beterbangan di background
// ============================================
(function () {
    const heartContainer = document.createElement('div');
    heartContainer.id = 'heart-container';
    heartContainer.style.position = 'fixed';
    heartContainer.style.top = '0';
    heartContainer.style.left = '0';
    heartContainer.style.width = '100%';
    heartContainer.style.height = '100%';
    heartContainer.style.pointerEvents = 'none';
    heartContainer.style.overflow = 'hidden';
    heartContainer.style.zIndex = '1';
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(heartContainer);
    });

    const emojis = ['💗', '💖', '💕', '🌸', '✨'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.className = 'falling-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (16 + Math.random() * 18) + 'px';
        heart.style.animationDuration = (5 + Math.random() * 4) + 's';
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createHeart, 800);
})();

// ============================================
// EFEK 2: Partikel lucu saat kartu/gambar diklik
// ============================================
(function () {
    const reactions = ['😳', '🥰', '😍', '💘', '😚', '🐱'];

    function burstAt(x, y) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('span');
            particle.className = 'click-particle';
            particle.textContent = reactions[Math.floor(Math.random() * reactions.length)];
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            const angle = Math.random() * 2 * Math.PI;
            const distance = 40 + Math.random() * 50;
            particle.style.setProperty('--dx', Math.cos(angle) * distance + 'px');
            particle.style.setProperty('--dy', Math.sin(angle) * distance + 'px');

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const cards = document.querySelectorAll('.a-content, .a1-content');
        cards.forEach((card) => {
            card.addEventListener('click', function (e) {
                e.preventDefault();
                burstAt(e.clientX, e.clientY);
                const targetHref = this.getAttribute('href');
                setTimeout(() => {
                    window.location.href = targetHref;
                }, 500);
            });
        });
    });
})();

// ============================================
// EFEK 3: Highlight menu navbar sesuai halaman aktif
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.a-navbar').forEach((link) => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.parentElement.classList.add('active');
        }
    });
});

// ============================================
// EFEK 4: Kartu muncul animasi saat discroll ke layar
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.a-content, .a1-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card, i) => {
        card.style.transitionDelay = (i * 0.15) + 's';
        observer.observe(card);
    });
});

// ============================================
// EFEK 5: Tilt 3D lembut saat gambar di-hover (desktop)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-content');
    images.forEach((img) => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 15;
            const rotateY = (x / rect.width) * 15;
            img.style.transform = `scale(1.08) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) rotateX(0) rotateY(0)';
        });
    });
});

// ============================================
// EFEK 6: Efek ketik otomatis pada teks footer
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const footerH1 = document.querySelector('.h1-footer');
    if (!footerH1) return;
    const fullText = footerH1.textContent.trim();
    footerH1.textContent = '';
    let i = 0;
    function typeNext() {
        if (i <= fullText.length) {
            footerH1.textContent = fullText.slice(0, i);
            i++;
            setTimeout(typeNext, 60);
        }
    }
    typeNext();
});

// ============================================
// EFEK 7: Kilau kecil mengikuti kursor mouse (desktop)
// ============================================
(function () {
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip di HP/touch
    const sparkles = ['✨', '💫', '⭐'];
    let lastSpawn = 0;

    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSpawn < 60) return;
        lastSpawn = now;

        const sparkle = document.createElement('span');
        sparkle.className = 'cursor-sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 700);
    });
})();