'use client'

import { useRef, useEffect } from 'react'
import * as THREE from 'three'

/* ── Per-section visual targets ─────────────────────────────────────────── */

const SECTION_IDS = [
  'home', 'services', 'about', 'technologies',
  'portfolio', 'process', 'why-us', 'testimonials', 'contact',
]

const CAM = [
  new THREE.Vector3( 0,    0,    6  ),   // home
  new THREE.Vector3( 2,   -0.8,  7.5),  // services
  new THREE.Vector3(-2.5,  1,    9  ),  // about
  new THREE.Vector3( 1,   -2,    8  ),  // technologies
  new THREE.Vector3(-2,    2,    9  ),  // portfolio
  new THREE.Vector3( 3,    0,   10  ),  // process
  new THREE.Vector3(-3,   -1,   10  ),  // why-us
  new THREE.Vector3( 0,    1,   11  ),  // testimonials
  new THREE.Vector3( 0,   -1,    7  ),  // contact
]

/* primary / secondary light colors per section */
const LIGHTS = [
  ['#3B82F6', '#8B5CF6'],  // home        — blue / purple
  ['#8B5CF6', '#06B6D4'],  // services    — purple / cyan
  ['#06B6D4', '#3B82F6'],  // about       — cyan / blue
  ['#3B82F6', '#06B6D4'],  // tech        — blue / cyan
  ['#06B6D4', '#8B5CF6'],  // portfolio   — cyan / purple
  ['#8B5CF6', '#3B82F6'],  // process     — purple / blue
  ['#10B981', '#3B82F6'],  // why-us      — green / blue
  ['#8B5CF6', '#06B6D4'],  // testimonial — purple / cyan
  ['#3B82F6', '#8B5CF6'],  // contact     — blue / purple
]

const PARTICLE_OPACITY = [0.60, 0.50, 0.40, 0.55, 0.45, 0.40, 0.35, 0.25, 0.60]
const ROT_MULT         = [1.0,  1.5,  0.8,  1.8,  1.2,  1.1,  0.9,  0.5,  1.4]
const SPREAD           = [1.0,  1.4,  1.8,  1.6,  2.0,  2.2,  2.5,  3.0,  1.2]
const WAVE_AMP         = [0.0,  0.3,  0.5,  0.8,  0.4,  0.6,  0.3,  0.2,  0.3]

/* ── Helpers ─────────────────────────────────────────────────────────────── */

function lerp3(a: THREE.Vector3, b: THREE.Vector3, t: number): THREE.Vector3 {
  return new THREE.Vector3().lerpVectors(a, b, t)
}

function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return new THREE.Color().lerpColors(a, b, t)
}

function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function GlobalBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    /* ── Renderer ─────────────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    /* ── Scene / Camera ───────────────────────────────────────────── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.copy(CAM[0])

    /* ── Lights ───────────────────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.25))
    const lightA = new THREE.PointLight(0x3B82F6, 2.5, 25); lightA.position.set( 5,  5,  5); scene.add(lightA)
    const lightB = new THREE.PointLight(0x8B5CF6, 1.5, 20); lightB.position.set(-5, -5, -3); scene.add(lightB)
    const lightC = new THREE.PointLight(0x06B6D4, 1.2, 18); lightC.position.set( 0,  0,  5); scene.add(lightC)

    /* ── Wireframe geometries ─────────────────────────────────────── */
    const GEO_DEFS = [
      { geo: new THREE.IcosahedronGeometry(1.5, 1), color: 0x3B82F6, pos: [0,    0,    0  ] as [number,number,number] },
      { geo: new THREE.TorusGeometry(0.8, 0.2, 16, 60), color: 0x8B5CF6, pos: [3,    1,   -1  ] as [number,number,number] },
      { geo: new THREE.OctahedronGeometry(0.9),          color: 0x06B6D4, pos: [-3.5, -1,  -0.5] as [number,number,number] },
      { geo: new THREE.TetrahedronGeometry(0.6),         color: 0x3B82F6, pos: [2.5,  -2,   1  ] as [number,number,number] },
      { geo: new THREE.DodecahedronGeometry(0.7),        color: 0x8B5CF6, pos: [-2,    2,   0.5] as [number,number,number] },
      { geo: new THREE.TorusKnotGeometry(0.6, 0.15, 80, 12), color: 0x06B6D4, pos: [4, 2, -2] as [number,number,number] },
      { geo: new THREE.IcosahedronGeometry(0.5, 0),      color: 0x8B5CF6, pos: [-4,  -2,  -1  ] as [number,number,number] },
    ]

    type MeshWithBase = THREE.Mesh & { basePos: THREE.Vector3 }
    const meshes: MeshWithBase[] = GEO_DEFS.map(({ geo, color, pos }) => {
      const mat  = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.55 })
      const mesh = new THREE.Mesh(geo, mat) as unknown as MeshWithBase
      mesh.basePos = new THREE.Vector3(pos[0], pos[1], pos[2])
      mesh.position.copy(mesh.basePos)
      scene.add(mesh)
      return mesh
    })

    /* ── Main particles ───────────────────────────────────────────── */
    const P_COUNT = 3000
    const pBase   = new Float32Array(P_COUNT * 3)
    for (let i = 0; i < P_COUNT; i++) {
      pBase[i * 3]     = (Math.random() - 0.5) * 22
      pBase[i * 3 + 1] = (Math.random() - 0.5) * 22
      pBase[i * 3 + 2] = (Math.random() - 0.5) * 22
    }
    const pPos  = new Float32Array(pBase)
    const pGeo  = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ color: 0x3B82F6, size: 0.022, transparent: true, opacity: 0.6, sizeAttenuation: true })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    /* ── Stars ────────────────────────────────────────────────────── */
    const sPos = new Float32Array(4000 * 3)
    for (let i = 0; i < 4000; i++) {
      const r = 55 + Math.random() * 45
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      sPos[i*3]   = r * Math.sin(p) * Math.cos(t)
      sPos[i*3+1] = r * Math.sin(p) * Math.sin(t)
      sPos[i*3+2] = r * Math.cos(p)
    }
    const sGeo = new THREE.BufferGeometry()
    sGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3))
    const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.06, transparent: true, opacity: 0.45 }))
    scene.add(stars)

    /* ── Section boundary cache ───────────────────────────────────── */
    let sectionTops: number[] = Array(SECTION_IDS.length).fill(0)
    const cacheSections = () => {
      sectionTops = SECTION_IDS.map(id => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY : 0
      })
    }
    cacheSections()

    /* ── Scroll state ─────────────────────────────────────────────── */
    let targetSection = 0
    let localT        = 0

    const onScroll = () => {
      const sy = window.scrollY
      let si = 0
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        if (sy >= sectionTops[i] - window.innerHeight * 0.35) { si = i; break }
      }
      const sTop = sectionTops[si]
      const sBot = si < SECTION_IDS.length - 1
        ? sectionTops[si + 1]
        : document.documentElement.scrollHeight
      localT        = Math.max(0, Math.min(1, (sy - sTop) / Math.max(1, sBot - sTop)))
      targetSection = si
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      cacheSections()
    })

    /* ── Mouse ────────────────────────────────────────────────────── */
    const mouse = { x: 0, y: 0 }
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouse)

    /* ── Current interpolated values ──────────────────────────────── */
    const cur = {
      camPos:  new THREE.Vector3().copy(CAM[0]),
      colA:    new THREE.Color(LIGHTS[0][0]),
      colB:    new THREE.Color(LIGHTS[0][1]),
      pOpacity: PARTICLE_OPACITY[0],
      rotMult:  ROT_MULT[0],
      spread:   SPREAD[0],
      waveAmp:  WAVE_AMP[0],
    }

    /* ── Animation loop ───────────────────────────────────────────── */
    let animId: number
    const clock = new THREE.Clock()
    const floatOffsets = meshes.map(() => Math.random() * Math.PI * 2)
    const rotSpeeds    = meshes.map(() => (Math.random() - 0.5) * 0.6)

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      /* ── Target values for current section ─────────────────────── */
      const si  = targetSection
      const si2 = Math.min(si + 1, SECTION_IDS.length - 1)
      const et  = ease(localT)

      const targetCam     = lerp3(CAM[si], CAM[si2], et)
      const targetColA    = lerpColor(new THREE.Color(LIGHTS[si][0]),  new THREE.Color(LIGHTS[si2][0]),  et)
      const targetColB    = lerpColor(new THREE.Color(LIGHTS[si][1]),  new THREE.Color(LIGHTS[si2][1]),  et)
      const targetOpacity = THREE.MathUtils.lerp(PARTICLE_OPACITY[si], PARTICLE_OPACITY[si2], et)
      const targetRot     = THREE.MathUtils.lerp(ROT_MULT[si],         ROT_MULT[si2],         et)
      const targetSpread  = THREE.MathUtils.lerp(SPREAD[si],           SPREAD[si2],           et)
      const targetWave    = THREE.MathUtils.lerp(WAVE_AMP[si],         WAVE_AMP[si2],         et)

      /* ── Smooth current toward target ───────────────────────────── */
      const s = 0.025
      cur.camPos.lerp(targetCam, s)
      cur.colA.lerp(targetColA, s * 2)
      cur.colB.lerp(targetColB, s * 2)
      cur.pOpacity = THREE.MathUtils.lerp(cur.pOpacity, targetOpacity, s * 2)
      cur.rotMult  = THREE.MathUtils.lerp(cur.rotMult,  targetRot,     s * 2)
      cur.spread   = THREE.MathUtils.lerp(cur.spread,   targetSpread,  s * 1.5)
      cur.waveAmp  = THREE.MathUtils.lerp(cur.waveAmp,  targetWave,    s * 2)

      /* ── Apply to camera (+ mouse offset) ──────────────────────── */
      camera.position.lerp(
        new THREE.Vector3(
          cur.camPos.x + mouse.x * 0.4,
          cur.camPos.y - mouse.y * 0.4,
          cur.camPos.z
        ),
        0.04
      )
      camera.lookAt(new THREE.Vector3(mouse.x * 0.5, -mouse.y * 0.5, 0))

      /* ── Apply lights ───────────────────────────────────────────── */
      lightA.color.copy(cur.colA)
      lightB.color.copy(cur.colB)
      lightC.color.lerpColors(cur.colA, cur.colB, 0.5)

      /* ── Animate particle positions (wave + spread) ─────────────── */
      const pos = pGeo.attributes.position as THREE.BufferAttribute
      for (let i = 0; i < P_COUNT; i++) {
        const bx = pBase[i * 3]
        const by = pBase[i * 3 + 1]
        const bz = pBase[i * 3 + 2]
        const wave = Math.sin(t * 0.4 + bx * 0.2 + by * 0.15) * cur.waveAmp
        pos.setXYZ(
          i,
          bx * cur.spread,
          by * cur.spread + wave,
          bz * cur.spread
        )
      }
      pos.needsUpdate = true

      /* ── Particle material ──────────────────────────────────────── */
      pMat.color.copy(cur.colA)
      pMat.opacity = cur.pOpacity

      /* ── Rotate particle system ─────────────────────────────────── */
      particles.rotation.y = t * 0.018 * cur.rotMult
      particles.rotation.x = t * 0.009 * cur.rotMult

      /* ── Stars ──────────────────────────────────────────────────── */
      stars.rotation.y = t * 0.0015

      /* ── Float meshes ────────────────────────────────────────────── */
      meshes.forEach((mesh, i) => {
        mesh.rotation.x += rotSpeeds[i] * 0.008 * cur.rotMult
        mesh.rotation.y += Math.abs(rotSpeeds[i]) * 0.012 * cur.rotMult

        const floatY = Math.sin(t * (0.3 + i * 0.1) + floatOffsets[i]) * 0.35
        const spread  = cur.spread
        mesh.position.set(
          mesh.basePos.x * spread * 0.7,
          mesh.basePos.y * spread * 0.7 + floatY,
          mesh.basePos.z * spread * 0.5,
        )

        /* Shift wireframe color toward active section color */
        ;(mesh.material as THREE.MeshBasicMaterial).color.lerp(
          i % 2 === 0 ? cur.colA : cur.colB, 0.03
        )
      })

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll',    onScroll)
      window.removeEventListener('mousemove', onMouse)
      renderer.dispose()
      GEO_DEFS.forEach(d => d.geo.dispose())
      pGeo.dispose(); pMat.dispose()
      sGeo.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
