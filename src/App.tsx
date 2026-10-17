import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Html, Line, Scroll, ScrollControls, Sparkles, Stars, Text, Torus, Box, RoundedBox } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import { Activity, ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Shield, Wifi } from 'lucide-react';
import { achievements, certifications, experience, profile, projects, skills } from './data';

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

function App() {
  return (
    <div className="app-shell">
      <TopHud />
      <Canvas camera={{ position: [0, 0, 9], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <color attach="background" args={['#040816']} />
        <fog attach="fog" args={['#040816', 10, 45]} />
        <ambientLight intensity={0.75} />
        <pointLight position={[6, 4, 4]} intensity={18} color="#00e5ff" />
        <pointLight position={[-6, -3, 3]} intensity={11} color="#835bff" />
        <ScrollControls pages={5.7} damping={0.18}>
          <CameraRig />
          <World />
        </ScrollControls>
      </Canvas>
      <BottomHud />
    </div>
  );
}

function TopHud() {
  return (
    <div className="hud top-hud">
      <div className="hud-pill brand-pill"><span>◈</span> ALUR.PRAVEEN / CYBERSPACE</div>
      <div className="hud-links">
        <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={resumeUrl} download>Resume</a>
      </div>
    </div>
  );
}

function BottomHud() {
  return (
    <div className="hud bottom-hud">
      <div className="hud-pill"><Activity size={14} /> IMMERSIVE 3D CYBERSECURITY PORTFOLIO</div>
      <div className="hud-pill"><Wifi size={14} /> SCROLL TO TRAVEL THROUGH THE ANIMATED 3D WORLD</div>
    </div>
  );
}

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useFrame((state, dt) => {
    const px = state.pointer.x * 0.2;
    const py = state.pointer.y * 0.14;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, px, 2.3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, py, 2.3, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function World() {
  const viewport = useThree((s) => s.viewport);
  const gap = viewport.height * 1.1;

  return (
    <>
      <BackgroundField />
      <Scroll>
        <group position={[0, 0, 0]}>
          <HeroZone />
        </group>
        <group position={[0, -gap, 0]}>
          <AboutSkillsZone />
        </group>
        <group position={[0, -gap * 2, 0]}>
          <ProjectsZone />
        </group>
        <group position={[0, -gap * 3, 0]}>
          <ExperienceZone />
        </group>
        <group position={[0, -gap * 4, 0]}>
          <ContactZone />
        </group>
      </Scroll>
    </>
  );
}

function BackgroundField() {
  const lines = useMemo(() => {
    const out: [THREE.Vector3, THREE.Vector3][] = [];
    for (let x = -16; x <= 16; x += 2) {
      out.push([new THREE.Vector3(x, -20, -7), new THREE.Vector3(x, 10, -7)]);
    }
    for (let y = -20; y <= 10; y += 2) {
      out.push([new THREE.Vector3(-16, y, -7), new THREE.Vector3(16, y, -7)]);
    }
    return out;
  }, []);

  return (
    <>
      <Sparkles count={220} scale={[34, 38, 18]} size={2} speed={0.35} color="#00e5ff" />
      <Stars radius={75} depth={30} count={500} factor={2.2} fade speed={0.4} />
      {lines.map((p, i) => (
        <Line key={i} points={p} color="#10304d" transparent opacity={0.18} lineWidth={1} />
      ))}
      <mesh position={[0, -4.5, -4]} rotation={[-Math.PI / 2.2, 0, 0]}>
        <planeGeometry args={[60, 60, 30, 30]} />
        <meshBasicMaterial color="#06111d" wireframe transparent opacity={0.16} />
      </mesh>
    </>
  );
}

function FloatingPanel({ position, width = 330, children }: { position: [number, number, number]; width?: number; children: ReactNode }) {
  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.16}>
      <group position={position}>
        <RoundedBox args={[3.2, 2.05, 0.1]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#091423" metalness={0.4} roughness={0.55} emissive="#07111f" emissiveIntensity={0.45} />
        </RoundedBox>
        <RoundedBox args={[3.34, 2.18, 0.03]} radius={0.05} smoothness={4} position={[0, 0, -0.05]}>
          <meshStandardMaterial color="#050a15" metalness={0.2} roughness={0.7} />
        </RoundedBox>
        <Html transform position={[0, 0, 0.08]} distanceFactor={1.2}>
          <div className="panel-ui" style={{ width }}>{children}</div>
        </Html>
      </group>
    </Float>
  );
}

function SectionBanner({ label, title, width = 420 }: { label: string; title: string; width?: number }) {
  return (
    <Html transform position={[0, 2.75, 0]} distanceFactor={1.28}>
      <div className="section-banner" style={{ width }}>
        <span>{label}</span>
        <h2>{title}</h2>
      </div>
    </Html>
  );
}

function PacketTunnel({ position = [0, 0, 0] as [number, number, number], scale = 1 }: { position?: [number, number, number]; scale?: number }) {
  const root = useRef<THREE.Group>(null);
  const movers = useRef<THREE.Mesh[]>([]);
  const points = useMemo<[THREE.Vector3, THREE.Vector3][]>(() => [
    [new THREE.Vector3(-3.5, 1.3, 0), new THREE.Vector3(3.5, 1.3, 0)],
    [new THREE.Vector3(-3.8, 0.1, -0.3), new THREE.Vector3(3.8, 0.1, 0.3)],
    [new THREE.Vector3(-3.4, -1.2, 0.2), new THREE.Vector3(3.4, -1.2, -0.2)],
    [new THREE.Vector3(0, -2.2, -1.2), new THREE.Vector3(0, 2.2, 1.2)]
  ], []);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y += dt * 0.16;
      root.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
    movers.current.forEach((m, i) => {
      const [a, b] = points[i % points.length];
      const p = (t * 0.18 + i * 0.11) % 1;
      m.position.copy(a).lerp(b, p);
    });
  });

  return (
    <group ref={root} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[0.64, 2]} />
        <meshStandardMaterial color="#00e5ff" emissive="#00b4cc" emissiveIntensity={0.95} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {[1.6, 2.25, 3].map((r, idx) => (
        <Torus key={idx} args={[r, 0.03, 10, 150]} rotation={[Math.PI / 2, idx * 0.36, idx * 0.45]}>
          <meshBasicMaterial color={idx % 2 === 0 ? '#00e5ff' : '#835bff'} transparent opacity={0.33 - idx * 0.05} />
        </Torus>
      ))}
      {points.map((pair, i) => (
        <Line key={i} points={pair} color={i === 3 ? '#6f7cff' : '#00dfff'} transparent opacity={0.6} lineWidth={1.1} />
      ))}
      {Array.from({ length: 18 }).map((_, i) => (
        <mesh key={i} ref={(el) => { if (el) movers.current[i] = el; }}>
          <sphereGeometry args={[i % 4 === 0 ? 0.07 : 0.05, 10, 10]} />
          <meshBasicMaterial color={i % 5 === 0 ? '#ff7f98' : i % 2 === 0 ? '#ffffff' : '#80ffd9'} />
        </mesh>
      ))}
    </group>
  );
}

function ServerRack({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8 + position[0]) * 0.05;
  });
  return (
    <group ref={group} position={position}>
      {[0, 0.78, 1.56].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          <Box args={[0.9, 0.52, 0.88]}>
            <meshStandardMaterial color="#0a1523" emissive="#071524" emissiveIntensity={0.3} metalness={0.45} roughness={0.65} />
          </Box>
          <mesh position={[0, 0, 0.46]}>
            <planeGeometry args={[0.66, 0.18]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00e5ff' : '#835bff'} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function HeroZone() {
  return (
    <group>
      <PacketTunnel position={[0, 0.1, 0]} scale={1.05} />
      <mesh position={[0, 0, -0.4]}>
        <torusGeometry args={[4.25, 0.04, 8, 220]} />
        <meshBasicMaterial color="#00b9d9" transparent opacity={0.18} />
      </mesh>
      <Text position={[0, 3.72, 0]} fontSize={0.33} color="#7fdfff" anchorX="center">IMMERSIVE 3D CYBERSECURITY EXPERIENCE</Text>
      <FloatingPanel position={[-4.35, 0.8, 0]} width={330}>
        <div className="kicker">ALUR PRAVEEN</div>
        <h3>Building a more interesting cyber portfolio — fully animated, fully 3D.</h3>
        <p>I’m an Information Science & Engineering student focused on traffic analysis, SOC workflows, vulnerability assessment, and practical defensive security learning.</p>
        <div className="chip-row">
          <span>Network Security</span>
          <span>SOC Analyst Aspirant</span>
          <span>VAPT</span>
        </div>
        <div className="button-row">
          <a href={resumeUrl} download className="cyber-btn"><Download size={14} /> Resume</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="cyber-btn secondary"><Github size={14} /> GitHub</a>
        </div>
      </FloatingPanel>
      <FloatingPanel position={[4.35, -0.2, 0]} width={320}>
        <div className="kicker">LIVE CYBERSPACE</div>
        <h3>A hero section that feels alive.</h3>
        <ul className="list">
          <li>Rotating cyber core and orbital rings</li>
          <li>Animated packet streams and data lanes</li>
          <li>Floating glass-screen interfaces</li>
          <li>3D sections placed inside one continuous world</li>
        </ul>
        <div className="stat-grid">
          <div><span>FOCUS</span><strong>Traffic + Defense</strong></div>
          <div><span>STYLE</span><strong>Futuristic SOC</strong></div>
          <div><span>MODE</span><strong>Full 3D Website</strong></div>
        </div>
      </FloatingPanel>
      <Html transform position={[0, -3.15, 0]} distanceFactor={1.2}>
        <div className="scroll-note">SCROLL DOWN TO MOVE THROUGH THE 3D CYBER COMMAND SPACE</div>
      </Html>
    </group>
  );
}

function AboutSkillsZone() {
  return (
    <group>
      <SectionBanner label="01 / PROFILE + SKILLS" title="Cybersecurity with a network-first mindset" width={520} />
      <ServerRack position={[-4.7, -1.9, -0.4]} />
      <ServerRack position={[-3.45, -2.2, 0.15]} />
      <PacketTunnel position={[3.25, 0.15, -0.6]} scale={0.62} />
      <FloatingPanel position={[0, 0.2, 0]} width={420}>
        <div className="kicker">PROFILE</div>
        <h3>Always investigating. Always learning.</h3>
        <p>I’m based in {profile.location} and I enjoy exploring how networks behave, how threats can be observed, and how defensive tools help analysts understand suspicious activity.</p>
        <div className="info-lines">
          <div><span>Education</span><strong>B.E. Information Science & Engineering</strong></div>
          <div><span>Core Interest</span><strong>SOC Analysis · Traffic Investigation · VAPT</strong></div>
        </div>
      </FloatingPanel>
      <FloatingPanel position={[4.35, -0.32, 0.08]} width={320}>
        <div className="kicker">SKILLS MATRIX</div>
        {skills.map((block) => (
          <div key={block.title} className="skill-block">
            <strong>{block.title}</strong>
            <div className="chip-row compact">
              {block.items.slice(0, 5).map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        ))}
      </FloatingPanel>
    </group>
  );
}

function ProjectsZone() {
  const positions: [number, number, number][] = [
    [-4.4, 0.9, 0],
    [0, 1.1, 0.1],
    [4.4, 0.85, 0],
    [0, -1.45, 0]
  ];

  return (
    <group>
      <SectionBanner label="02 / PROJECTS" title="Floating project modules inside the 3D world" width={500} />
      <PacketTunnel position={[0, -0.05, -1.1]} scale={0.82} />
      {projects.map((project, index) => (
        <FloatingPanel key={project.id} position={positions[index]} width={285}>
          <div className="kicker">PROJECT / {project.id}</div>
          <h3>{project.name}</h3>
          <p className="subline">{project.category} · {project.subtitle}</p>
          <p>{project.summary}</p>
          <div className="chip-row compact">
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="button-row">
            <a href={project.demo} target="_blank" rel="noreferrer" className="cyber-btn">Live <ArrowUpRight size={14} /></a>
            <a href={project.repo} target="_blank" rel="noreferrer" className="cyber-btn secondary">Code <Github size={14} /></a>
          </div>
        </FloatingPanel>
      ))}
    </group>
  );
}

function ExperienceZone() {
  return (
    <group>
      <SectionBanner label="03 / EXPERIENCE + RECOGNITION" title="Internships, learning, and leadership" width={520} />
      <FloatingPanel position={[-4.35, 0.5, 0]} width={300}>
        <div className="kicker">EXPERIENCE</div>
        <h3>{experience[0].role}</h3>
        <p className="subline">{experience[0].company} · {experience[0].year}</p>
        <p>{experience[0].desc}</p>
      </FloatingPanel>
      <FloatingPanel position={[0, 0.5, 0]} width={300}>
        <div className="kicker">EXPERIENCE</div>
        <h3>{experience[1].role}</h3>
        <p className="subline">{experience[1].company} · {experience[1].year}</p>
        <p>{experience[1].desc}</p>
      </FloatingPanel>
      <FloatingPanel position={[4.35, 0.5, 0]} width={300}>
        <div className="kicker">ACHIEVEMENTS</div>
        <h3>Leadership & Recognition</h3>
        <ul className="list small-list">
          {achievements.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </FloatingPanel>
      <FloatingPanel position={[0, -1.75, 0]} width={450}>
        <div className="kicker">CERTIFICATIONS</div>
        <ul className="list two-columns">
          {certifications.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </FloatingPanel>
    </group>
  );
}

function ContactZone() {
  return (
    <group>
      <SectionBanner label="04 / CONTACT" title="Open to internships and entry-level opportunities" width={560} />
      <PacketTunnel position={[0, 0.12, -0.8]} scale={0.7} />
      <FloatingPanel position={[0, 0.05, 0]} width={440}>
        <div className="kicker">CONNECT</div>
        <h3>Let’s build something secure.</h3>
        <div className="contact-line"><Mail size={16} /> <a href={`mailto:${profile.email}`}>{profile.email}</a></div>
        <div className="contact-line"><MapPin size={16} /> {profile.location}</div>
        <div className="contact-line"><Shield size={16} /> Interested in SOC, network security, VAPT, and cybersecurity roles</div>
        <div className="button-grid">
          <a href={`mailto:${profile.email}`} className="cyber-btn"><Mail size={14} /> Email</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="cyber-btn secondary"><Linkedin size={14} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="cyber-btn secondary"><Github size={14} /> GitHub</a>
          <a href={resumeUrl} download className="cyber-btn"><Download size={14} /> Resume</a>
        </div>
      </FloatingPanel>
      <Html transform position={[0, -2.75, 0]} distanceFactor={1.22}>
        <div className="footer-chip">FULLY REIMAGINED AS AN INTERESTING IMMERSIVE 3D CYBER WEBSITE</div>
      </Html>
    </group>
  );
}

export default App;
