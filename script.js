// THREE.JS DEVOPS STREAM SCENE
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// DEVOPS KEYWORDS
const words = [
    "AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD", 
    "Python", "Linux", "Git", "Lambda", "ECS", "EKS", "Ansible", "Bash"
];

// Helper to create text sprites
function createTextSprite(text) {
    const fontface = "JetBrains Mono";
    const fontsize = 40;
    const borderThickness = 2;
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    
    // Calculate width
    const metrics = context.measureText(text);
    const textWidth = metrics.width;
    
    canvas.width = textWidth + 20;
    canvas.height = fontsize + 20;
    
    // Draw text
    context.font = "Bold " + fontsize + "px " + fontface;
    context.fillStyle = "rgba(100, 255, 218, 0.2)"; // Ghostly green color
    context.fillText(text, 0, fontsize);
    
    const texture = new THREE.Texture(canvas); 
    texture.needsUpdate = true;
    
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    
    // Scale sprite to match text size
    sprite.scale.set(10 * (textWidth / fontsize), 5, 1);
    return sprite;
}

// Generate the Field of Words
const group = new THREE.Group();
const particleCount = 60;

for (let i = 0; i < particleCount; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    const sprite = createTextSprite(word);
    
    // Random position
    sprite.position.x = (Math.random() - 0.5) * 100; // Spread wide
    sprite.position.y = (Math.random() - 0.5) * 100; // Spread tall
    sprite.position.z = (Math.random() - 0.5) * 80;  // Spread deep
    
    // Add random speed property to the object
    sprite.userData = {
        velocity: (Math.random() * 0.05) + 0.02
    };
    
    group.add(sprite);
}

scene.add(group);
camera.position.z = 50;

// SCROLL INTERACTION
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// ANIMATION LOOP
const clock = new THREE.Clock();

function animate() {
    const time = clock.getElapsedTime();
    
    // Rotate the whole group gently
    group.rotation.y = time * 0.05;
    
    // Move individual words upwards
    group.children.forEach(sprite => {
        // Base movement + Scroll acceleration
        // The more you scroll, the faster they move
        let moveSpeed = sprite.userData.velocity + (scrollY * 0.00005);
        
        sprite.position.y += moveSpeed;
        
        // Reset if it goes too high
        if(sprite.position.y > 50) {
            sprite.position.y = -50;
            sprite.position.x = (Math.random() - 0.5) * 100; 
        }
    });

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();

// RESIZE HANDLER
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});