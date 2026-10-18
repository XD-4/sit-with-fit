/**
 * SIT WITH FIT — COSMIC STARFIELD & COMET ENGINE
 * Inspired by KMUTT Engineering Open House cosmic deep space theme
 */

export function initStarfield() {
    const canvas = document.getElementById('cosmicCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStars();
    });

    const STAR_COUNT = Math.min(180, Math.floor((width * height) / 8000));
    const stars = [];

    function initStars() {
        stars.length = 0;
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.6 + 0.4,
                alpha: Math.random() * 0.8 + 0.2,
                twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
                color: Math.random() > 0.7 ? '#38BDF8' : (Math.random() > 0.4 ? '#93C5FD' : '#FFFFFF')
            });
        }
    }

    // Shooting comets
    const comets = [];
    function spawnComet() {
        if (comets.length < 2 && Math.random() < 0.02) {
            comets.push({
                x: Math.random() * (width * 0.8),
                y: Math.random() * (height * 0.4),
                length: Math.random() * 80 + 60,
                speed: Math.random() * 6 + 7,
                dx: 1.4,
                dy: 0.8,
                alpha: 1,
                decay: 0.012
            });
        }
    }

    initStars();

    let animId;
    function render() {
        ctx.clearRect(0, 0, width, height);

        // Draw twinkling stars
        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];
            s.alpha += s.twinkleSpeed;
            if (s.alpha > 0.95 || s.alpha < 0.15) {
                s.twinkleSpeed = -s.twinkleSpeed;
            }

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.globalAlpha = Math.max(0.1, Math.min(1, s.alpha));
            ctx.shadowBlur = s.radius > 1.2 ? 6 : 0;
            ctx.shadowColor = s.color;
            ctx.fill();
        }

        // Draw comets
        spawnComet();
        for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            const tailX = c.x - c.length * 0.8;
            const tailY = c.y - c.length * 0.45;

            const grad = ctx.createLinearGradient(tailX, tailY, c.x, c.y);
            grad.addColorStop(0, 'rgba(56, 189, 248, 0)');
            grad.addColorStop(0.7, `rgba(56, 189, 248, ${c.alpha * 0.6})`);
            grad.addColorStop(1, `rgba(255, 255, 255, ${c.alpha})`);

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2.2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#38BDF8';
            ctx.stroke();

            // Head glow
            ctx.beginPath();
            ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.globalAlpha = c.alpha;
            ctx.fill();

            c.x += c.speed * c.dx;
            c.y += c.speed * c.dy;
            c.alpha -= c.decay;

            if (c.alpha <= 0 || c.x > width + 100 || c.y > height + 100) {
                comets.splice(i, 1);
            }
        }

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        animId = requestAnimationFrame(render);
    }

    render();
}

// Global attach
if (typeof window !== 'undefined') {
    window.initStarfield = initStarfield;
}
