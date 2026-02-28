import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleNetwork() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 80 : 180;
    const SPREAD = 20;
    const CONNECT_DIST = 3.5;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD;
      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: isMobile ? 0.08 : 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const onMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    // Scroll speed
    let scrollSpeed = 0;
    const onScroll = () => {
      scrollSpeed = 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Animation loop
    let animationId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Update particle positions
      const pos = particleGeometry.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        pos[i3] += velocities[i3] + Math.sin(time * 0.3 + i) * 0.001;
        pos[i3 + 1] += velocities[i3 + 1] + scrollSpeed * 0.002;
        pos[i3 + 2] += velocities[i3 + 2];

        // Wrap around
        for (let j = 0; j < 3; j++) {
          if (pos[i3 + j] > SPREAD / 2) pos[i3 + j] = -SPREAD / 2;
          if (pos[i3 + j] < -SPREAD / 2) pos[i3 + j] = SPREAD / 2;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update connections
      const linePositions = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECT_DIST) {
            linePositions.push(
              pos[i * 3],
              pos[i * 3 + 1],
              pos[i * 3 + 2],
              pos[j * 3],
              pos[j * 3 + 1],
              pos[j * 3 + 2]
            );
          }
        }
      }
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      // Mouse parallax
      targetRotation.y = mouse.x * 0.3;
      targetRotation.x = mouse.y * 0.3;
      particles.rotation.y +=
        (targetRotation.y - particles.rotation.y) * 0.05;
      particles.rotation.x +=
        (targetRotation.x - particles.rotation.x) * 0.05;
      lines.rotation.copy(particles.rotation);

      // Auto rotation
      particles.rotation.y += 0.001;
      lines.rotation.y += 0.001;

      // Decay scroll speed
      scrollSpeed *= 0.95;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 opacity-50 pointer-events-none"
    />
  );
}
