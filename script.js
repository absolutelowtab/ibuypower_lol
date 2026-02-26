document.addEventListener("DOMContentLoaded", () => {
    // Анимация Hero
    anime.timeline({ easing: "easeOutExpo", duration: 1000 })
        .add({ targets: ".hero-title", translateY: [40, 0], opacity: [0, 1] })
        .add({ targets: ".hero-subtitle", translateY: [20, 0], opacity: [0, 1] }, "-=600")
        .add({ targets: ".hero-btn", scale: [0.9, 1], opacity: [0, 1] }, "-=600");

    // Анимация появления карточек игроков
    const cards = document.querySelectorAll(".player-card");
    anime({
        targets: cards,
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: "easeOutCubic",
        duration: 800
    });

    // Заполнение прогресс-баров при появлении
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll(".stat-progress");
                bars.forEach(bar => {
                    const value = bar.getAttribute("data-value");
                    if (value) {
                        anime({ targets: bar, width: value + "%", easing: "easeOutQuart", duration: 1400 });
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));

    // 3D-эффект на карточках (десктоп)
    if (window.innerWidth > 992) {
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;
                card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "rotateX(0) rotateY(0) scale(1)";
            });
        });
    }

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
            }
        });
    });

    // Анимация счётчиков в статистике (без hover)
    const statValues = document.querySelectorAll('.team-stat-value');
    statValues.forEach(el => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (!isNaN(target)) {
            anime({
                targets: el,
                innerHTML: [0, target],
                easing: 'easeOutQuad',
                round: 1,
                duration: 2000,
                update: function () {
                    if (el.parentElement.querySelector('.team-stat-label').innerText.includes('K/D')) {
                        el.innerHTML = (parseInt(el.innerHTML) / 100).toFixed(2);
                    }
                }
            });
        }
    });
});