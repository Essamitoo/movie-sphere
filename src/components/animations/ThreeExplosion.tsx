"use client";
import { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import * as THREE from "three";

interface TripleExplosionProps {
  message?: string;
  user: string;
}

export default function TripleExplosion({
  message = "¡Feliz Celebración!",
  user,
}: TripleExplosionProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(true);
  const [count, setCount] = useState(3);
  const [showCanvas, setShowCanvas] = useState(true);

  const playRocketSound = () => {
    const audio = new Audio("/sounds/whistlingrocket_3-90478.mp3");
    audio.volume = 1;
    audio.play().catch((e) => console.error("Error reproduciendo audio:", e));
  };

  useEffect(() => {
    if (!started || count <= 0) return;
    const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, started]);

  useEffect(() => {
    if (started && count === 0) {
      playRocketSound();
      initFireworks();
    }
  }, [count, started]);

  const initFireworks = () => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const rocketColor = new THREE.Color(1, 1, 1);
    const particleCount = 300;

    const explosions = [
      {
        innerColor: new THREE.Color(1, 1, 0.6), // naranja amarillento
        outerColor: new THREE.Color(1, 0.4, 0), // naranja fuerte
        position: new THREE.Vector3(-3, 2, 0),
      },
      {
        innerColor: new THREE.Color(1, 1, 0), // amarillo
        outerColor: new THREE.Color(0, 1, 0.4), // verde
        position: new THREE.Vector3(0, 3.5, 0),
      },
      {
        innerColor: new THREE.Color(0.2, 0.6, 1), // azul
        outerColor: new THREE.Color(1, 0.2, 0.2), // rojo
        position: new THREE.Vector3(3, 1.5, 0),
      },
    ];

    let explosionIndex = 0;

    const animateRocketAndExplode = () => {
      const explosion = explosions[explosionIndex];

      const rocketGeometry = new THREE.SphereGeometry(0.15, 12, 12);
      const rocketMaterial = new THREE.MeshBasicMaterial({ color: rocketColor });
      const rocket = new THREE.Mesh(rocketGeometry, rocketMaterial);
      rocket.position.set(explosion.position.x, -4, explosion.position.z);
      scene.add(rocket);

      playRocketSound();

      const rocketSpeed = 3;
      const targetY = explosion.position.y;

      const flyUp = () => {
        rocket.position.y += 0.1 * rocketSpeed;
        renderer.render(scene, camera);
        if (rocket.position.y < targetY) {
          requestAnimationFrame(flyUp);
        } else {
          scene.remove(rocket);
          createExplosion(
            explosion.innerColor,
            explosion.outerColor,
            explosion.position
          );
        }
      };

      flyUp();
    };

    const createExplosion = (
      innerColor: THREE.Color,
      outerColor: THREE.Color,
      position: THREE.Vector3
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        positions[i3] = position.x;
        positions[i3 + 1] = position.y;
        positions[i3 + 2] = position.z;

        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);

        const t = Math.random(); // 0 = centro, 1 = borde
        const speed = 0.5 + 1.5 * t;

        velocities[i3] = speed * Math.sin(phi) * Math.cos(theta);
        velocities[i3 + 1] = speed * Math.sin(phi) * Math.sin(theta);
        velocities[i3 + 2] = speed * Math.cos(phi);

        // Mezclamos los colores
        colors[i3] = innerColor.r * (1 - t) + outerColor.r * t;
        colors[i3 + 1] = innerColor.g * (1 - t) + outerColor.g * t;
        colors[i3 + 2] = innerColor.b * (1 - t) + outerColor.b * t;

        sizes[i] = 0.1 + 0.3 * (1 - t); // más grandes en el centro
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      const clock = new THREE.Clock();
      let frame = 0;
      const maxFrames = 100;

      const animateExplosion = () => {
        const delta = clock.getDelta();
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          positions[i3] += velocities[i3] * delta;
          positions[i3 + 1] += velocities[i3 + 1] * delta;
          positions[i3 + 2] += velocities[i3 + 2] * delta;
          velocities[i3 + 1] -= 1.5 * delta; // gravedad
        }

        geometry.attributes.position.needsUpdate = true;
        material.opacity *= 0.96;

        renderer.render(scene, camera);

        frame++;
        if (frame < maxFrames) {
          requestAnimationFrame(animateExplosion);
        } else {
          scene.remove(points);
          explosionIndex++;
          if (explosionIndex < explosions.length) {
            setTimeout(animateRocketAndExplode, 600);
          } else {
            setTimeout(() => {
              mount.removeChild(renderer.domElement);
              setShowCanvas(false);
            }, 1000);
          }
        }
      };

      animateExplosion();
    };

    animateRocketAndExplode();
  };

  if (!showCanvas) return <></>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-500 text-center relative">
      {started && (
        <div className="relative w-full overflow-hidden h-[60px] bg-white/70 text-black text-2xl flex items-center">
          <div className="whitespace-nowrap animate-marquee">
            <span className="text-yellow-500 bg-black font-black px-2">
              ⭐Premium⭐
            </span>
            <span className="bg-green-700 text-white px-2">{user}⭐VIP⭐</span>
            <span className="px-2">{message}</span>
          </div>
        </div>
      )}
      {started && count > 0 && (
        <div className="text-6xl font-bold  text-green-700">{count}</div>
      )}
      <div ref={mountRef} className="w-full h-[30vh]"></div>
    </div>
  );
}
