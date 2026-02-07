document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZE 3D BACKGROUND (THE "WOW" FACTOR)
    // This creates the connecting nodes effect
    try {
        VANTA.NET({
            el: "#canvas-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f260,       // The Green Dots
            backgroundColor: 0x050505, // The Black Background
            points: 12.00,
            maxDistance: 22.00,
            spacing: 18.00,
            showDots: true
        })
    } catch (e) {
        console.log("3D Engine failed to load - falling back to CSS");
    }

    // 2. TYPEWRITER EFFECT
    const textElement = document.getElementById('typewriter');
    const texts = ["AWS Certified", "Kubernetes Expert", "Python Scripter", "CI/CD Architect"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";

    (function type() {
        if (count === texts.length) { count = 0; }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        textElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // Wait 2s before deleting
        } else {
            setTimeout(type, 100);
        }
    })();

    // 3. SCROLL ANIMATIONS (FADE IN UP)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

    // 4. FOOTER YEAR
    document.getElementById('year').textContent = new Date().getFullYear();

    // 5. MOBILE MENU
    const menuBtn = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
            if(navList.style.display === 'flex') {
                navList.style.flexDirection = 'column';
                navList.style.position = 'absolute';
                navList.style.top = '60px';
                navList.style.left = '0';
                navList.style.width = '100%';
                navList.style.background = 'rgba(5,5,5,0.95)';
                navList.style.padding = '20px';
            }
        });
    }
});