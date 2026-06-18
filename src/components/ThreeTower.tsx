import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

export default function ThreeTower() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03111f, 0.025);

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 2, 14);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 2. Lighting System
    // Ambient Light (0.8 intensity)
    const ambientLight = new THREE.AmbientLight(0x1a2e3d, 0.8);
    scene.add(ambientLight);

    // Directional Light (2.0 intensity)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Rim Light (color #D4AF37, intensity 1.2)
    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.2);
    rimLight.position.set(-6, 4, -6);
    scene.add(rimLight);

    // 4 Architectural Spotlights
    const spotlights: THREE.SpotLight[] = [];
    const spotlightColors = [0xd4af37, 0xfff2d6, 0xd4af37, 0xfff2d6];
    const spotlightPositions = [
      [-4, -1, 4],
      [4, -1, 4],
      [-4, -1, -4],
      [4, -1, -4]
    ];

    for (let i = 0; i < 4; i++) {
      const spot = new THREE.SpotLight(spotlightColors[i], 8, 15, Math.PI / 6, 0.5, 1);
      spot.position.set(spotlightPositions[i][0], spotlightPositions[i][1], spotlightPositions[i][2]);
      scene.add(spot);
      spotlights.push(spot);
    }

    // 3. Materials System
    const baseGoldHex = 0xd4af37;
    const glowGoldHex = 0xfff2d6;

    // Dominant Gold Tower Materials
    const goldGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: baseGoldHex,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
      transmission: 0.2,
      reflectivity: 1.0,
      thickness: 1.5,
    });

    const goldMetalMaterial = new THREE.MeshStandardMaterial({
      color: baseGoldHex,
      roughness: 0.15,
      metalness: 0.95,
      emissive: baseGoldHex,
      emissiveIntensity: 0.2, // gold_accents emissive strength 0.2
    });

    const windowGlowMaterial = new THREE.MeshBasicMaterial({
      color: glowGoldHex,
      transparent: true,
      opacity: 0.9,
    });

    const goldWireframeMaterial = new THREE.MeshBasicMaterial({
      color: baseGoldHex,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });

    // Muted Dark/White Tower Materials
    const darkGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0c1e2e,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.5,
      transmission: 0.2,
      reflectivity: 1.0,
    });

    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x09141b,
      roughness: 0.35,
      metalness: 0.8,
    });

    const whiteWireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });

    const whiteWindowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
    });

    // 4. Skyline Group
    const skylineGroup = new THREE.Group();
    // Position it down to center properly and prevent spire clipping
    skylineGroup.position.y = -3.6;
    skylineGroup.scale.set(1.15, 1.15, 1.15);
    scene.add(skylineGroup);

    // Ground Grid Helper
    const gridHelper = new THREE.GridHelper(30, 30, baseGoldHex, 0x1a2e3d);
    gridHelper.position.y = -0.05;
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.03;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.03;
    }
    skylineGroup.add(gridHelper);

    // Spire tip reference
    let spireTipPosition = new THREE.Vector3(0, 0, 0);

    // Helper to build towers
    const createSkylineBuilding = (
      x: number,
      z: number,
      width: number,
      depth: number,
      buildingHeight: number,
      floorsCount: number,
      type: "cylindrical" | "rectangular" = "rectangular",
      isCentral = false
    ) => {
      const bGroup = new THREE.Group();
      bGroup.position.set(x, 0, z);

      const facadeMat = isCentral ? goldGlassMaterial : darkGlassMaterial;
      const wireMat = isCentral ? goldWireframeMaterial : whiteWireframeMaterial;
      const coreMat = isCentral ? goldMetalMaterial : darkMetalMaterial;
      const winMat = isCentral ? windowGlowMaterial : whiteWindowMaterial;

      const floorHeight = buildingHeight / floorsCount;

      // Vertical Columns/Fins
      if (type === "rectangular") {
        const pillarW = 0.04;
        const pillarGeo = new THREE.BoxGeometry(pillarW, buildingHeight, pillarW);
        const offsets = [
          { px: -width / 2, pz: -depth / 2 },
          { px: width / 2, pz: -depth / 2 },
          { px: -width / 2, pz: depth / 2 },
          { px: width / 2, pz: depth / 2 },
        ];
        offsets.forEach((offset) => {
          const pillar = new THREE.Mesh(pillarGeo, coreMat);
          pillar.position.set(offset.px, buildingHeight / 2, offset.pz);
          bGroup.add(pillar);
        });
      } else {
        const numCols = 6;
        const pRadius = 0.025;
        const pillarGeo = new THREE.CylinderGeometry(pRadius, pRadius, buildingHeight, 8);
        for (let c = 0; c < numCols; c++) {
          const angle = (c / numCols) * Math.PI * 2;
          const pillar = new THREE.Mesh(pillarGeo, coreMat);
          pillar.position.set(
            Math.cos(angle) * (width / 2),
            buildingHeight / 2,
            Math.sin(angle) * (width / 2)
          );
          bGroup.add(pillar);
        }
      }

      // Build Floor slabs and glass facade panels
      for (let i = 0; i < floorsCount; i++) {
        const taper = 1.0 - (i / floorsCount) * 0.12;
        const currW = width * taper;
        const currD = depth * taper;
        const currY = i * floorHeight + floorHeight / 2;

        // Concrete Floor Slab
        const slabHeight = 0.03;
        let slabGeo: THREE.BufferGeometry;
        if (type === "cylindrical") {
          slabGeo = new THREE.CylinderGeometry(currW / 2 + 0.015, currW / 2 + 0.015, slabHeight, 16);
        } else {
          slabGeo = new THREE.BoxGeometry(currW + 0.03, slabHeight, currD + 0.03);
        }
        const slab = new THREE.Mesh(slabGeo, coreMat);
        slab.position.y = currY - floorHeight / 2;
        bGroup.add(slab);

        // Glass Facade Panel
        let floorGeo: THREE.BufferGeometry;
        if (type === "cylindrical") {
          floorGeo = new THREE.CylinderGeometry(currW / 2, currW / 2, floorHeight * 0.96, 16);
        } else {
          floorGeo = new THREE.BoxGeometry(currW, floorHeight * 0.96, currD);
        }
        const facade = new THREE.Mesh(floorGeo, facadeMat);
        facade.position.y = currY;
        bGroup.add(facade);

        // Inner Core Column
        let coreGeo: THREE.BufferGeometry;
        if (type === "cylindrical") {
          coreGeo = new THREE.CylinderGeometry(currW * 0.18, currW * 0.18, floorHeight * 1.0, 8);
        } else {
          coreGeo = new THREE.BoxGeometry(currW * 0.35, floorHeight * 1.0, currD * 0.35);
        }
        const core = new THREE.Mesh(coreGeo, coreMat);
        core.position.y = currY;
        bGroup.add(core);

        // Wireframe Overlay
        let wireGeo: THREE.BufferGeometry;
        if (type === "cylindrical") {
          wireGeo = new THREE.CylinderGeometry(currW * 0.502, currW * 0.502, floorHeight * 0.98, 16);
        } else {
          wireGeo = new THREE.BoxGeometry(currW * 1.005, floorHeight * 0.98, currD * 1.005);
        }
        const wire = new THREE.Mesh(wireGeo, wireMat);
        wire.position.y = currY;
        bGroup.add(wire);

        // Lobby / Windows
        if (i === 0) {
          const lobbyDoorW = currW * 0.4;
          const lobbyDoorH = floorHeight * 0.75;
          const portalGeo = new THREE.BoxGeometry(lobbyDoorW + 0.05, lobbyDoorH + 0.04, 0.03);
          const portal = new THREE.Mesh(portalGeo, coreMat);
          portal.position.set(0, lobbyDoorH / 2, currD / 2 + 0.015);
          bGroup.add(portal);
        } else {
          // Standard Windows
          const winW = 0.12;
          const winH = floorHeight * 0.55;
          const winFrameGeo = new THREE.BoxGeometry(winW + 0.02, winH + 0.02, 0.015);
          const winGeo = new THREE.BoxGeometry(winW, winH, 0.02);

          if (type === "rectangular") {
            const faces = [
              { z: currD / 2, ry: 0 },
              { z: -currD / 2, ry: Math.PI }
            ];
            faces.forEach((face) => {
              const columns = 3;
              for (let c = 0; c < columns; c++) {
                const offsetX = ((c - (columns - 1) / 2) / columns) * currW * 0.75;

                const frame = new THREE.Mesh(winFrameGeo, coreMat);
                frame.position.set(offsetX, currY, face.z + 0.005);
                frame.rotation.y = face.ry;
                bGroup.add(frame);

                if (Math.random() > 0.45) {
                  const pane = new THREE.Mesh(winGeo, winMat);
                  pane.position.set(offsetX, currY, face.z + 0.012);
                  pane.rotation.y = face.ry;
                  bGroup.add(pane);
                }
              }
            });
          } else {
            const numWindows = 6;
            const radius = currW / 2;
            for (let w = 0; w < numWindows; w++) {
              const angle = (w / numWindows) * Math.PI * 2;
              const cosA = Math.cos(angle);
              const sinA = Math.sin(angle);

              const frame = new THREE.Mesh(winFrameGeo, coreMat);
              frame.position.set(cosA * (radius + 0.005), currY, sinA * (radius + 0.005));
              frame.rotation.y = -angle;
              bGroup.add(frame);

              if (Math.random() > 0.45) {
                const pane = new THREE.Mesh(winGeo, winMat);
                pane.position.set(cosA * (radius + 0.012), currY, sinA * (radius + 0.012));
                pane.rotation.y = -angle;
                bGroup.add(pane);
              }
            }
          }
        }
      }

      // Roof Details & Spire
      if (isCentral) {
        const crownBaseGeo = new THREE.CylinderGeometry(width * 0.45, width * 0.5, 0.3, 16);
        const crownBase = new THREE.Mesh(crownBaseGeo, goldMetalMaterial);
        crownBase.position.y = buildingHeight + 0.15;
        bGroup.add(crownBase);

        const crownGeo = new THREE.CylinderGeometry(width * 0.28, width * 0.4, 0.4, 16);
        const crown = new THREE.Mesh(crownGeo, goldMetalMaterial);
        crown.position.y = buildingHeight + 0.45;
        bGroup.add(crown);

        const spireGeo = new THREE.CylinderGeometry(0.015, 0.035, 1.4, 8);
        const spire = new THREE.Mesh(spireGeo, goldMetalMaterial);
        spire.position.y = buildingHeight + 1.25;
        bGroup.add(spire);

        spireTipPosition.set(x, buildingHeight + 1.95, z);
      } else {
        const railHeight = 0.08;
        let railGeo: THREE.BufferGeometry;
        if (type === "cylindrical") {
          railGeo = new THREE.CylinderGeometry(width / 2 + 0.01, width / 2 + 0.01, railHeight, 16, 1, true);
        } else {
          railGeo = new THREE.BoxGeometry(width + 0.01, railHeight, depth + 0.01);
        }
        const railing = new THREE.Mesh(railGeo, wireMat);
        railing.position.y = buildingHeight + railHeight / 2;
        bGroup.add(railing);
      }

      skylineGroup.add(bGroup);
      return bGroup;
    };

    // --- Generate Tower System layout ---
    // Dominant Hero Tower: 100% height, Center Right (x: 1.0)
    // Secondary Towers: 80% (4.8), 70% (4.2), 60% (3.6)
    // Support Towers: 45% (2.7), 35% (2.1)
    const buildings: THREE.Group[] = [];

    // 1. Dominant Hero Tower (Golden, 100% / 6.0 height)
    buildings.push(createSkylineBuilding(1.0, 0.0, 1.6, 1.6, 6.0, 22, "cylindrical", true));
    // 2. Secondary Towers
    buildings.push(createSkylineBuilding(-1.3, 0.6, 1.2, 1.2, 4.8, 18, "rectangular", false)); // 80%
    buildings.push(createSkylineBuilding(-0.2, -1.0, 1.1, 1.1, 4.2, 15, "rectangular", false)); // 70%
    buildings.push(createSkylineBuilding(2.3, -0.7, 1.0, 1.0, 3.6, 13, "cylindrical", false));  // 60%
    // 3. Support Towers
    buildings.push(createSkylineBuilding(-2.2, -0.4, 0.9, 0.9, 2.7, 10, "rectangular", false)); // 45%
    buildings.push(createSkylineBuilding(0.3, 1.2, 0.8, 0.8, 2.1, 8, "rectangular", false));    // 35%

    // Initialize all tower scales (except central hero tower which animates in smoothly)
    const surroundingBuildings = buildings.slice(1);
    surroundingBuildings.forEach((b) => {
      b.scale.y = 0.001;
    });

    // Animate construction of buildings once
    gsap.to(surroundingBuildings.map((b) => b.scale), {
      y: 1.0,
      duration: 2.0,
      stagger: 0.15,
      ease: "power2.out",
    });

    // 5. Gold Particle Field (8% opacity)
    const particleCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;       // x
      positions[i + 1] = Math.random() * 8 - 1.5;      // y
      positions[i + 2] = (Math.random() - 0.5) * 16;   // z
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: 0.06,
      transparent: true,
      opacity: 0.08, // 8% opacity
      sizeAttenuation: true,
    });
    const particleField = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleField);

    // (Gold energy rings removed per request)

    // 7. Parallax & Motion Configuration
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let scrollYOffset = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollYOffset = window.scrollY;
    };

    // Check device performance parameters
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("scroll", handleScroll);

    skylineGroup.rotation.y = 0.45;

    // Clock for particle and light animations (Floating animation removed per request)
    const clock = new THREE.Clock();
    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Light Sweep slow animation
      for (let i = 0; i < spotlights.length; i++) {
        const spot = spotlights[i];
        const offset = i * (Math.PI / 2);
        spot.position.x = spotlightPositions[i][0] + Math.sin(elapsedTime * 0.4 + offset) * 1.5;
        spot.position.z = spotlightPositions[i][2] + Math.cos(elapsedTime * 0.4 + offset) * 1.5;
      }

      // (Concentric rings rotation removed)

      // Particle Field slow rotation/drift
      particleField.rotation.y = elapsedTime * 0.015;
      particleField.position.y = Math.sin(elapsedTime * 0.2) * 0.1;

      // Cinematic Drift camera motion (x [-0.2, 0.2], duration 20s)
      const cinematicDriftX = Math.sin(elapsedTime * (Math.PI * 2 / 20)) * 0.2;

      // Mouse Parallax Response
      if (!isMobile) {
        mouse.x += (mouse.targetX - mouse.x) * 0.035;
        mouse.y += (mouse.targetY - mouse.y) * 0.035;
      }

      camera.position.x = cinematicDriftX + mouse.x * 0.6;
      camera.position.y = 1.8 + mouse.y * 0.35;

      // Scroll-driven depth shift
      camera.position.z = 14.0 + Math.min((scrollYOffset / window.innerHeight) * 3.5, 5.0);
      camera.lookAt(0, 0.2 + mouse.y * 0.15, 0);

      // Flashing window occupancy animations
      windowGlowMaterial.opacity = 0.65 + Math.sin(elapsedTime * 2.2) * 0.25;
      if (!isTablet && !isMobile) {
        whiteWindowMaterial.opacity = 0.3 + Math.cos(elapsedTime * 1.8) * 0.12;
      }

      renderer.render(scene, camera);
    };

    // Execute standard loop on all viewports to ensure clean scroll updates
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      // Static render update on resize for mobile
      if (window.innerWidth < 768) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
      container.removeChild(renderer.domElement);

      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material.dispose();
        }
      });
      gridHelper.geometry.dispose();
      if (Array.isArray(gridHelper.material)) {
        gridHelper.material.forEach((mat) => mat.dispose());
      } else {
        gridHelper.material.dispose();
      }
      particlesGeo.dispose();
      particlesMat.dispose();
      // (Rings geometries and materials cleanup removed)

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[500px] md:min-h-[600px] relative pointer-events-none select-none"
    />
  );
}
