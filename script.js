document.documentElement.classList.toggle(
            "dark",
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        );

        document.addEventListener("DOMContentLoaded", function () {
            const sunIcon = document.getElementById('sun-icon');
            const moonIcon = document.getElementById('moon-icon');

            // Initial Setup of Icons
            if (document.documentElement.classList.contains('dark')) {
                if (sunIcon) sunIcon.classList.add('hidden');
                if (moonIcon) moonIcon.classList.remove('hidden');
            } else {
                if (sunIcon) sunIcon.classList.remove('hidden');
                if (moonIcon) moonIcon.classList.add('hidden');
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = 1;
                            entry.target.style.transform = "none";
                            entry.target.style.filter = "none";
                        }
                    });
                },
                { threshold: 0.1 },
            );
            document
                .querySelectorAll("[style*='opacity:0']")
                .forEach((el) => observer.observe(el));

            const themeToggleBtn = document.querySelector("button");
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener("click", () => {
                    const root = document.documentElement;
                    if (root.classList.contains("dark")) {
                        root.classList.remove("dark");
                        localStorage.setItem("theme", "light");
                        if (sunIcon) sunIcon.classList.remove('hidden');
                        if (moonIcon) moonIcon.classList.add('hidden');
                    } else {
                        root.classList.add("dark");
                        localStorage.setItem("theme", "dark");
                        if (sunIcon) sunIcon.classList.add('hidden');
                        if (moonIcon) moonIcon.classList.remove('hidden');
                    }
                });
            }
        });
    

        // Neural Network Background Animation
        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.createElement('canvas');
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.width = '100vw';
            canvas.style.height = '100vh';
            canvas.style.zIndex = '-1';
            canvas.style.pointerEvents = 'none';
            document.body.prepend(canvas);

            const ctx = canvas.getContext('2d');
            let width, height;
            let particles = [];

            function resize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            }

            window.addEventListener('resize', resize);
            resize();

            class Particle {
                constructor() {
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.vx = (Math.random() - 0.5) * 1;
                    this.vy = (Math.random() - 0.5) * 1;
                    this.radius = Math.random() * 2 + 1;
                }

                update() {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > width) this.vx = -this.vx;
                    if (this.y < 0 || this.y > height) this.vy = -this.vy;
                }

                draw(color) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            }

            function initParticles() {
                particles = [];
                const numParticles = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 80);
                for (let i = 0; i < numParticles; i++) {
                    particles.push(new Particle());
                }
            }
            initParticles();
            window.addEventListener('resize', initParticles);

            let mouse = { x: -1000, y: -1000 };
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });
            window.addEventListener('mouseout', () => {
                mouse.x = -1000;
                mouse.y = -1000;
            });

            function animate() {
                ctx.clearRect(0, 0, width, height);

                const isDark = document.documentElement.classList.contains('dark');
                const r = isDark ? 255 : 0;
                const g = isDark ? 255 : 0;
                const b = isDark ? 255 : 0;

                particles.forEach(p => {
                    p.update();
                    p.draw(`rgba(${r}, ${g}, ${b}, ${isDark ? 0.8 : 0.5})`);

                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 200) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(isDark ? 0.6 : 0.3) * (1 - dist / 200)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const dx = particles[i].x - particles[j].x;
                        const dy = particles[i].y - particles[j].y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.moveTo(particles[i].x, particles[i].y);
                            ctx.lineTo(particles[j].x, particles[j].y);
                            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(isDark ? 0.4 : 0.2) * (1 - dist / 150)})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                }

                requestAnimationFrame(animate);
            }

            animate();
        });
    

        // Typewriter Animation
        document.addEventListener('DOMContentLoaded', () => {
            const words1 = ['Artificial Intelligence', 'Deep Learning', 'Machine Learning'];
            const words2 = ['Coding', 'Travelling', 'Problem Solving'];
            let i1 = 0, j1 = 0, isDeleting1 = false;
            let i2 = 0, j2 = 0, isDeleting2 = false;
            const el1 = document.getElementById('typewriter-1');
            const el2 = document.getElementById('typewriter-2');
            function type1() {
                const currentWord = words1[i1 % words1.length];
                if (isDeleting1) {
                    el1.innerText = currentWord.substring(0, j1 - 1);
                    j1--;
                } else {
                    el1.innerText = currentWord.substring(0, j1 + 1);
                    j1++;
                }
                let speed = 80;
                if (isDeleting1) speed /= 2;
                if (!isDeleting1 && j1 === currentWord.length) {
                    speed = 2000;
                    isDeleting1 = true;
                } else if (isDeleting1 && j1 === 0) {
                    isDeleting1 = false;
                    i1++;
                    speed = 500;
                }
                setTimeout(type1, speed);
            }
            function type2() {
                const currentWord = words2[i2 % words2.length];
                if (isDeleting2) {
                    el2.innerText = currentWord.substring(0, j2 - 1);
                    j2--;
                } else {
                    el2.innerText = currentWord.substring(0, j2 + 1);
                    j2++;
                }
                let speed = 90;
                if (isDeleting2) speed /= 2;
                if (!isDeleting2 && j2 === currentWord.length) {
                    speed = 2000;
                    isDeleting2 = true;
                } else if (isDeleting2 && j2 === 0) {
                    isDeleting2 = false;
                    i2++;
                    speed = 500;
                }
                setTimeout(type2, speed);
            }
            setTimeout(type1, 500);
            setTimeout(type2, 1000);
        });
