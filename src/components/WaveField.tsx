import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { reducedMotion } from '../lib/scroll'

// Partikel-Welle als Echo des „Vital Trust“-Motivs aus dem MHP Brand Board.
const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aScale;
  varying float vAlpha;
  varying float vHeight;
  void main() {
    vec3 p = position;
    float t = uTime * 0.35;
    float w = sin(p.x * 0.35 + t) * 0.9 + sin(p.z * 0.5 + t * 1.3) * 0.6 + sin((p.x + p.z) * 0.18 - t * 0.7) * 1.2;
    float d = distance(p.xz, uMouse * vec2(14.0, 8.0));
    w += exp(-d * d * 0.04) * 1.6;
    p.y += w;
    vHeight = w;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * (90.0 / -mv.z);
    vAlpha = smoothstep(34.0, 4.0, -mv.z) * smoothstep(1.5, 7.0, -mv.z);
  }
`
const fragment = /* glsl */ `
  varying float vAlpha;
  varying float vHeight;
  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, r);
    vec3 vital = vec3(0.086, 0.07, 1.0);
    vec3 zircon = vec3(0.80, 0.84, 1.0);
    vec3 kiwi = vec3(0.866, 0.937, 0.012);
    vec3 col = mix(vital, zircon, clamp(vHeight * 0.35 + 0.35, 0.0, 1.0));
    col = mix(col, kiwi, smoothstep(2.2, 3.2, vHeight));
    gl_FragColor = vec4(col * 1.4, glow * glow * vAlpha);
  }
`

function Points() {
  const ref = useRef<THREE.ShaderMaterial>(null)
  const mouse = useRef(new THREE.Vector2())
  const { pointer } = useThree()
  const { positions, scales } = useMemo(() => {
    const cols = 220
    const rows = 90
    const positions = new Float32Array(cols * rows * 3)
    const scales = new Float32Array(cols * rows)
    let i = 0
    for (let x = 0; x < cols; x++)
      for (let z = 0; z < rows; z++) {
        positions[i * 3] = (x - cols / 2) * 0.22
        positions[i * 3 + 1] = 0
        positions[i * 3 + 2] = (z - rows / 2) * 0.28
        scales[i] = 0.6 + Math.random() * 1.6
        i++
      }
    return { positions, scales }
  }, [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } }), [])

  useFrame((_, dt) => {
    if (!ref.current) return
    if (!reducedMotion) ref.current.uniforms.uTime.value += dt
    mouse.current.lerp(new THREE.Vector2(pointer.x, -pointer.y), 0.05)
    ref.current.uniforms.uMouse.value.copy(mouse.current)
  })

  return (
    <points position={[0, -2.2, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={ref}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function WaveField() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.2, 11], fov: 60 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <Points />
    </Canvas>
  )
}
