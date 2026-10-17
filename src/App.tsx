import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, Line, Scroll, ScrollControls, Sparkles, Stars, Text } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import { Activity, ArrowUpRight, Download, Github, Linkedin, Mail, Shield, Wifi } from 'lucide-react';
import { certifications, profile, projects, skills } from './data';

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

function App() {
  return (
    <div className="full3d-shell">
      <div className="hud-bar top-bar">
        <div className="hud-brand"><span>◈</span> ALUR.PRAVEEN</div>
        <div className="hud-actions">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={resumeUrl} download>Resume</a>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 48 }} gl={{ antialias: true }} dpr={[1, 1.5]}>
        <color attach="background" args={['#050816']} />
        <fog attach="fog" args={['#050816', 10, 34]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[4, 3, 4]} intensity={20} color="#00e5ff" />
        <pointLight position={[-5, -4, 1]} intensity={12} color="#7b8cff" />
        <ScrollControls pages={5.2} damping={0.16}>
          <ThreeDPortfolioWorld />
        </ScrollControls>
      </Canvas>

      <div className="hud-bar bottom-bar">
        <div><Activity size={14} /> FULL 3D CYBERSECURITY PORTFOLIO</div>
        <div><Wifi size={14} /> SCROLL TO MOVE THROUGH THE 3D SOC SPACE</div>
      </div>
    </div>
  );
}

function ThreeDPortfolioWorld() {
  const viewport = useThree((state) => state.viewport);
  const pageGap = viewport.height * 1.06;

  return (
    <>
      <GlobalBackground />
      <Scroll>
        <group position={[0, 0, 0]}>
          <HeroSection />
        </group>
        <group position={[0, -pageGap, 0]}>
          <AboutSection />
        </group>
        <group position={[0, -pageGap * 2, 0]}>
          <ProjectsSection />
        </group>
        <group position={[0, -pageGap * 3, 0]}>
          <ExperienceSection />
        </group>
        <group position={[0, -pageGap * 4, 0]}>
          <ContactSection />
        </group>
      </Scroll>
    </>
  );
}

function GlobalBackground() {
  const gridLines = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = -14; i <= 14; i += 2) {
      lines.push([new THREE.Vector3(i, -12, -5), new THREE.Vector3(i, 8, -5)]);
      lines.push([new THREE.Vector3(-14, i - 2, -5), new THREE.Vector3(14, i - 2, -5)]);
    }
    return lines;
  }, []);

  return (
    <>
      <Sparkles count={180} scale={[28, 36, 16]} size={2} speed={0.25} color="#00dfff" />
      <Stars radius={60} depth={20} count={450} factor={2} fade speed={0.35} />
      {gridLines.map((line, idx) => (
        <Line key={idx} points={line} color="#103049" transparent opacity={0.22} lineWidth={1} />
      ))}
    </>
  );
}

function SectionTitle({ title, subtitle, width = 420 }: { title: string; subtitle: string; width?: number }) {
  return (
    <Html transform position={[0, 2.4, 0]} distanceFactor={1.35}>
      <div className="title-card" style={{ width }}>
        <span>{subtitle}</span>
        <h2>{title}</h2>
      </div>
    </Html>
  );
}

function Screen({ position, children, width = 360 }: { position: [number, number, number]; children: ReactNode; width?: number }) {
  return (
    <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.12}>
      <group position={position}>
        <mesh>
          <boxGeometry args={[3.1, 2, 0.08]} />
          <meshStandardMaterial color="#09121f" emissive="#0b2032" emissiveIntensity={0.35} metalness={0.3} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[3.3, 2.2, 0.04]} />
          <meshStandardMaterial color="#06101b" metalness={0.3} roughness={0.7} />
        </mesh>
        <Html transform position={[0, 0, 0.07]} distanceFactor={1.2}>
          <div className="screen-ui" style={{ width }}>{children}</div>
        </Html>
      </group>
    </Float>
  );
}

function PacketNetwork({ center = [0, 0, 0] as [number, number, number], scale = 1 }: { center?: [number, number, number]; scale?: number }) {
  const root = useRef<THREE.Group>(null);
  const movers = useRef<THREE.Mesh[]>([]);
  const nodes = useMemo<[number, number, number][]>(() => [
    [0, 0, 0],
    [-2.2, 1.25, 0],
    [2.25, 1.35, -0.2],
    [-2.5, -1.4, 0.25],
    [2.45, -1.2, 0.15],
    [0, 2.2, -0.6],
    [0, -2.35, 0.45]
  ], []);
  const edges = useMemo(
    () => [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 3], [2, 4], [5, 1], [5, 2], [6, 3], [6, 4]
    ].map(([a, b], i) => ({
      a: new THREE.Vector3(...nodes[a]),
      b: new THREE.Vector3(...nodes[b]),
      phase: i * 0.08,
      alert: i % 5 === 0
    })),
    [nodes]
  );

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += dt * 0.12;
      root.current.rotation.x = Math.sin(t * 0.25) * 0.06;
    }
    movers.current.forEach((mesh, i) => {
      const edge = edges[i % edges.length];
      const progress = (t * 0.15 + edge.phase) % 1;
      mesh.position.copy(edge.a).lerp(edge.b, progress);
    });
  });

  return (
    <group ref={root} position={center} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[0.48, 1]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00bcd4" emissiveIntensity={0.9} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.26, 18, 18]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {[1.45, 2.1, 2.75].map((r, idx) => (
        <mesh key={r} rotation={[Math.PI / 2, idx * 0.38, idx * 0.4]}>
          <torusGeometry args={[r, 0.02, 8, 180]} />
          <meshBasicMaterial color={idx === 1 ? '#7b8cff' : '#00e5ff'} transparent opacity={0.33 - idx * 0.05} />
        </mesh>
      ))}
      {nodes.map((p, idx) => (
        <group key={idx} position={p}>
          <mesh>
            <octahedronGeometry args={[idx === 0 ? 0.34 : 0.16, 0]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#00e5ff' : '#63ffc8'} emissive={idx % 2 === 0 ? '#0099aa' : '#20bb8b'} emissiveIntensity={0.75} wireframe />
          </mesh>
        </group>
      ))}
      {edges.map((edge, idx) => (
        <Line key={idx} points={[edge.a, edge.b]} color={edge.alert ? '#ff6b86' : '#00dfff'} transparent opacity={0.6} lineWidth={1} />
      ))}
      {Array.from({ length: 18 }).map((_, idx) => (
        <mesh key={idx} ref={(el) => { if (el) movers.current[idx] = el; }}>
          <sphereGeometry args={[idx % 5 === 0 ? 0.07 : 0.05, 10, 10]} />
          <meshBasicMaterial color={idx % 5 === 0 ? '#ff8ca2' : idx % 2 === 0 ? '#ffffff' : '#7ef7d4'} />
        </mesh>
      ))}
    </group>
  );
}

function ServerStack({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {[0, 0.66, 1.32].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh>
            <boxGeometry args={[0.8, 0.48, 0.8]} />
            <meshStandardMaterial color="#0c1725" emissive="#0a2031" emissiveIntensity={0.25} metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, 0.41]}>
            <planeGeometry args={[0.64, 0.18]} />
            <meshBasicMaterial color={idx % 2 === 0 ? '#00e5ff' : '#7b8cff'} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HeroSection() {
  return (
    <group>
      <PacketNetwork center={[0, 0.15, 0]} scale={1.1} />
      <Text position={[0, 3.4, 0]} fontSize={0.34} color="#7fdfff" anchorX="center">FULL 3D CYBERSECURITY PORTFOLIO</Text>
      <Screen position={[-3.8, 0.7, 0]} width={300}>
        <div className="screen-kicker">ALUR PRAVEEN</div>
        <h3>Investigating networks.<br />Building defensive projects.</h3>
        <p>Information Science & Engineering student focused on traffic analysis, SOC learning, VAPT, and cybersecurity fundamentals.</p>
        <div className="chip-row">
          <span>Network Security</span>
          <span>SOC</span>
          <span>VAPT</span>
        </div>
      </Screen>
      <Screen position={[3.9, -0.35, 0]} width={300}>
        <div className="screen-kicker">LIVE MODULES</div>
        <ul className="bullet-list">
          <li>Animated packet-flow environment</li>
          <li>Floating 3D monitor-style content</li>
          <li>Project nodes in a cyber scene</li>
          <li>Updated resume included</li>
        </ul>
        <div className="action-row">
          <a href={resumeUrl} download className="mini-btn"><Download size={14} /> Resume</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mini-btn ghost"><Github size={14} /> GitHub</a>
        </div>
      </Screen>
      <Html transform position={[0, -2.95, 0]} distanceFactor={1.3}>
        <div className="floating-note">SCROLL DOWN TO TRAVEL THROUGH THE 3D SOC / TRAFFIC INVESTIGATION SPACE</div>
      </Html>
    </group>
  );
}

function AboutSection() {
  return (
    <group>
      <SectionTitle title="About + Skills" subtitle="01 / ANALYST PROFILE" />
      <ServerStack position={[-4.3, -1.4, -0.5]} />
      <ServerStack position={[-3.15, -1.8, 0.2]} />
      <PacketNetwork center={[2.7, 0.2, -0.7]} scale={0.62} />
      <Screen position={[0.1, 0, 0]} width={420}>
        <div className="screen-kicker">PROFILE</div>
        <h3>Cybersecurity enthusiast with a network-first mindset.</h3>
        <p>I’m based in {profile.location} and I’m developing practical skills in packet investigation, vulnerability assessment, security tooling, and defensive analysis.</p>
        <div className="meta-lines">
          <div><span>Education</span><strong>B.E. Information Science & Engineering</strong></div>
          <div><span>Focus</span><strong>SOC Analysis · Traffic Triage · VAPT</strong></div>
        </div>
      </Screen>
      <Screen position={[4.4, -0.45, 0.1]} width={300}>
        <div className="screen-kicker">SKILL MATRIX</div>
        {skills.map((skill) => (
          <div key={skill.title} className="skill-block">
            <strong>{skill.title}</strong>
            <div className="chip-row compact">
              {skill.items.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </Screen>
    </group>
  );
}

function ProjectsSection() {
  const positions: [number, number, number][] = [
    [-4.2, 0.6, 0],
    [0, 0.95, 0.2],
    [4.2, 0.55, 0],
    [0, -1.4, 0]
  ];

  return (
    <group>
      <SectionTitle title="Projects" subtitle="02 / FLOATING CYBER MODULES" />
      <PacketNetwork center={[0, -0.1, -1.2]} scale={0.82} />
      {projects.map((project, idx) => (
        <Screen key={project.id} position={positions[idx]} width={280}>
          <div className="screen-kicker">PROJECT / {project.index}</div>
          <h3>{project.name}</h3>
          <p>{project.subtitle}</p>
          <div className="chip-row compact">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <p className="small-copy">{project.description}</p>
          <div className="action-row">
            <a className="mini-btn" href={project.demo} target="_blank" rel="noreferrer">Live <ArrowUpRight size={14} /></a>
            <a className="mini-btn ghost" href={project.repo} target="_blank" rel="noreferrer">Code <Github size={14} /></a>
          </div>
        </Screen>
      ))}
    </group>
  );
}

function ExperienceSection() {
  return (
    <group>
      <SectionTitle title="Experience + Achievements" subtitle="03 / TIMELINE IN SPACE" width={460} />
      <Screen position={[-4.25, 0.4, 0]} width={300}>
        <div className="screen-kicker">INTERNSHIP / 2026</div>
        <h3>Movidu Technologies Pvt. Ltd.</h3>
        <p>Exposure to vulnerability assessment, network security, incident-response concepts, and practical tools like Kali Linux, Nmap, Burp Suite, and Wireshark.</p>
      </Screen>
      <Screen position={[0, 0.4, 0]} width={300}>
        <div className="screen-kicker">INTERNSHIP / 2025</div>
        <h3>InternPe</h3>
        <p>Strengthened frontend development fundamentals through practical assignments and web projects.</p>
      </Screen>
      <Screen position={[4.25, 0.4, 0]} width={300}>
        <div className="screen-kicker">RECOGNITION</div>
        <h3>Outstanding Student 2025</h3>
        <p>IEEE AESS Bangalore Chapter</p>
        <p className="small-copy">Leadership: Operating Committee Chairperson, BEC IEEE Student Branch · Secretary, IEEE AESS Chapter</p>
      </Screen>
      <Screen position={[0, -1.7, 0]} width={430}>
        <div className="screen-kicker">CERTIFICATIONS</div>
        <ul className="bullet-list two-col">
          {certifications.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Screen>
    </group>
  );
}

function ContactSection() {
  return (
    <group>
      <SectionTitle title="Contact" subtitle="04 / OPEN CHANNELS" width={360} />
      <PacketNetwork center={[0, 0.15, -0.8]} scale={0.72} />
      <Screen position={[0, 0, 0]} width={420}>
        <div className="screen-kicker">LET'S CONNECT</div>
        <h3>Ready for internships and entry-level opportunities.</h3>
        <p>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        <p>Phone: {profile.phone}</p>
        <p>Location: {profile.location}</p>
        <div className="action-grid">
          <a className="mini-btn" href={`mailto:${profile.email}`}><Mail size={14} /> Email</a>
          <a className="mini-btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={14} /> LinkedIn</a>
          <a className="mini-btn ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a>
          <a className="mini-btn" href={resumeUrl} download><Download size={14} /> Resume</a>
        </div>
      </Screen>
      <Html transform position={[0, -2.55, 0]} distanceFactor={1.2}>
        <div className="footer-note"><Shield size={14} /> Built as a full 3D cybersecurity portfolio experience.</div>
      </Html>
    </group>
  );
}

export default App;
