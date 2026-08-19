import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMousePosition } from '../hooks/useMousePosition';

export default function RootSystem() {
  const mountRef = useRef(null);
  const mouse = useMousePosition();

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    // Lights — minimal set
    scene.add(new THREE.AmbientLight(0x1a2a1a, 0.5));
    const keyLight = new THREE.DirectionalLight(0x4ade80, 0.7);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xf59e0b, 0.25);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const branches = [];
    const tipMeshes = [];
    const rootColor = new THREE.Color(0x2d4a1e);
    const tipColor = new THREE.Color(0x4ade80);

    // Shared sphere geo for all tip glows
    const tipGlowGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const tipGlowMat = new THREE.MeshBasicMaterial({ color: 0x4ade80, transparent: true, opacity: 0.8 });

    function createBranch(start, direction, depth, thickness) {
      if (depth === 0) return;
      const length = 1.2 * Math.pow(0.75, 6 - depth) + 0.3;
      const deviation = 0.3;
      const dir = direction.clone();
      dir.x += (Math.random() - 0.5) * deviation;
      dir.y += (Math.random() - 0.5) * deviation * 0.3;
      dir.z += (Math.random() - 0.5) * deviation;
      dir.normalize();

      const end = start.clone().add(dir.clone().multiplyScalar(length));
      const mid = start.clone().lerp(end, 0.5);
      mid.x += (Math.random() - 0.5) * 0.2;

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const t = Math.max(0.01, thickness);
      const geo = new THREE.TubeGeometry(curve, 6, t, 5, false);

      const depthRatio = (6 - depth) / 6;
      const color = rootColor.clone().lerp(tipColor, depthRatio);
      // Use MeshLambertMaterial — much cheaper than StandardMaterial, no PBR calc
      const mat = new THREE.MeshLambertMaterial({
        color,
        emissive: tipColor,
        emissiveIntensity: depthRatio * 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.scale.y = 0;
      mesh.userData.delay = (6 - depth) * 0.3 + Math.random() * 0.2;
      mesh.userData.grown = false;
      branches.push(mesh);
      rootGroup.add(mesh);

      if (depth === 1) {
        // Use a small emissive sphere instead of a PointLight (way cheaper)
        const tipMesh = new THREE.Mesh(tipGlowGeo, tipGlowMat);
        tipMesh.position.copy(end);
        tipMesh.userData.phase = Math.random() * Math.PI * 2;
        tipMeshes.push(tipMesh);
        rootGroup.add(tipMesh);
      }

      const leftDir = dir.clone();
      leftDir.applyAxisAngle(new THREE.Vector3(0, 0, 1), 0.5 + Math.random() * 0.2);
      const rightDir = dir.clone();
      rightDir.applyAxisAngle(new THREE.Vector3(0, 0, 1), -0.5 - Math.random() * 0.2);

      createBranch(end, leftDir, depth - 1, thickness * 0.65);
      createBranch(end, rightDir, depth - 1, thickness * 0.65);
    }

    const seeds = [-3, -1.5, 0, 1.5, 3];
    seeds.forEach((x) => {
      createBranch(new THREE.Vector3(x, -4, 0), new THREE.Vector3(0, 1, 0), 6, 0.08);
    });

    // Central orb
    const orbGeo = new THREE.SphereGeometry(1.2, 48, 48);
    const orbMat = new THREE.MeshLambertMaterial({
      color: 0x0f2010,
      emissive: 0x4ade80,
      emissiveIntensity: 0.2,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    rootGroup.add(orb);

    const wireGeo = new THREE.SphereGeometry(1.22, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    rootGroup.add(wire);

    // Single orb point light instead of many
    const orbLight = new THREE.PointLight(0x4ade80, 1.5, 5);
    orbLight.position.set(0, 0, 0);
    rootGroup.add(orbLight);

    const growStart = performance.now();

    let raf;
    let visible = true;
    const clock = new THREE.Clock();

    // Pause rendering when hero is scrolled away
    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(mount);

    const animate = () => {
      if (visible) {
        const time = clock.getElapsedTime();
        const elapsed = (performance.now() - growStart) / 1000;

        // Grow branches — skip once all grown
        let allGrown = true;
        for (let i = 0; i < branches.length; i++) {
          const b = branches[i];
          if (!b.userData.grown) {
            if (elapsed > b.userData.delay) {
              const t = Math.min(1, (elapsed - b.userData.delay) / 0.5);
              b.scale.y = t;
              if (t >= 1) b.userData.grown = true;
              else allGrown = false;
            } else {
              allGrown = false;
            }
          }
        }

        // Slow continuous drift
        rootGroup.rotation.y += 0.001;

        // Mouse parallax — smoothed
        const targetX = mouse.current.ny * 0.08;
        const targetY = mouse.current.nx * 0.05;
        rootGroup.rotation.x += (targetX - rootGroup.rotation.x) * 0.03;

        // Breathing orb
        const breath = 1 + Math.sin(time * 0.8) * 0.03;
        orb.scale.setScalar(breath);
        wire.scale.setScalar(breath);
        orbLight.intensity = 1.5 + Math.sin(time * 0.8) * 0.5;

        // Tip glow pulse via scale (no light recalulation)
        for (let i = 0; i < tipMeshes.length; i++) {
          const tm = tipMeshes[i];
          const s = 0.6 + (Math.sin(time + tm.userData.phase) * 0.5 + 0.5) * 0.8;
          tm.scale.setScalar(s);
        }

        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      renderer.dispose();
      branches.forEach((b) => {
        b.geometry.dispose();
        b.material.dispose();
      });
      tipGlowGeo.dispose();
      tipGlowMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" style={{ zIndex: 1 }} />;
}
