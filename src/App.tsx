import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box, Line, RoundedBox, Sparkles, Stars, Text } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import * as THREE from 'three';
import { achievements, certifications, experience, profile, projects, skills, stations } from './data';
import { ArrowRight, Command, Download, ExternalLink, Github, Linkedin, Mail, MapPin, Shield, X } from 'lucide-react';

const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
const stationZ = [0, -18, -36, -54, -72, -90, -108];

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [arrived, setArrived] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    setPanelOpen(false);
    setArrived(false);
  }, [current]);

  return (
    <div className="app-shell">
      {!started && <IntroOverlay onStart={() => setStarted(true)} />}

      <header className="top-ui">
        <div className="brand-chip">CYBERVERSE X9 / ALUR PRAVEEN</div>
        <div className="top-actions">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={resumeUrl} download>Resume</a>
        </div>
      </header>

      <Canvas camera={{ position: [0, 2.1, 12], fov: 52 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <color attach="background" args={['#040814']} />
        <fog attach="fog" args={['#040814', 10, 160]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[0, 6, 10]} intensity={14} color="#00e5ff" />
        <pointLight position={[0, 2, -120]} intensity={12} color="#64ffb7" />
        <pointLight position={[-6, 2, -10]} intensity={10} color="#7b73ff" />
        <World current={current} started={started} onArrive={() => setArrived(true)} />
      </Canvas>

      {started && (
        <>
          <div className="sequence-ui">
            <div className="sequence-label">FORWARD MISSION SEQUENCE</div>
            <div className="sequence-track">
              {stations.map((s, index) => (
                <div key={s.id} className={`seq-node ${index < current ? 'done' : ''} ${index === current ? 'active' : ''}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{s.short}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="bottom-ui">
            <div className="station-chip">
              <span>{String(current + 1).padStart(2, '0')} / {stations.length}</span>
              <strong>{stations[current].title}</strong>
              <small>{stations[current].theme}</small>
            </div>
            <div className="nav-cluster">
              <button className="ghost-btn" onClick={() => { if (current < stations.length - 1) setCurrent(current + 1); }}>
                NEXT DESTINATION <ArrowRight size={16} />
              </button>
              {arrived && !panelOpen && (
                <button className="primary-btn" onClick={() => setPanelOpen(true)}>
                  VIEW FULL CONTENT
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {panelOpen && (
        <Panel stationIndex={current} onClose={() => setPanelOpen(false)} />
      )}
    </div>
  );
}

function IntroOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro-overlay">
      <div className="intro-box">
        <div className="boot-line">INITIALIZING CYBERVERSE X9 ...</div>
        <h1>COMPLETE 9D-STYLE<br />CYBERSECURITY PORTFOLIO</h1>
        <p>
          A cinematic introduction followed by a fully interactive cyber command-center walkthrough.
          Travel through the sequence, arrive at each destination, then click <strong>View Full Content</strong>
          to open its information.
        </p>
        <div className="intro-tags">
          <span>FORWARD-ONLY JOURNEY</span>
          <span>RESPONSIVE INTERFACE</span>
          <span>TERMINAL INCLUDED</span>
        </div>
        <button className="primary-btn large" onClick={onStart}>ENTER CYBERVERSE</button>
      </div>
    </div>
  );
}

function World({ current, started, onArrive }: { current: number; started: boolean; onArrive: () => void }) {
  return (
    <>
      <Background />
      <CameraTravel current={current} started={started} onArrive={onArrive} />
      <Corridor />
      {stations.map((station, index) => (
        <StationRoom key={station.id} index={index} z={stationZ[index]} title={station.title} short={station.short} />
      ))}
    </>
  );
}

function Background() {
  const lines = useMemo(() => {
    const items: [THREE.Vector3, THREE.Vector3][] = [];
    for (let z = 12; z >= -120; z -= 4) {
      items.push([new THREE.Vector3(-8, -0.6, z), new THREE.Vector3(8, -0.6, z)]);
    }
    for (let x = -8; x <= 8; x += 2) {
      items.push([new THREE.Vector3(x, -0.6, 12), new THREE.Vector3(x, -0.6, -120)]);
    }
    return items;
  }, []);
  return (
    <>
      <Stars radius={90} depth={40} count={700} factor={3} fade speed={0.45} />
      <Sparkles count={140} scale={[18, 9, 140]} size={2} speed={0.24} color="#00e5ff" />
      {lines.map((pts, i) => <Line key={i} points={pts} color="#0b3350" transparent opacity={0.18} lineWidth={1} />)}
    </>
  );
}

function CameraTravel({ current, started, onArrive }: { current: number; started: boolean; onArrive: () => void }) {
  const camera = useThree((s) => s.camera);
  const notified = useRef(-1);

  useEffect(() => {
    notified.current = -1;
  }, [current]);

  useFrame((state, dt) => {
    const target = new THREE.Vector3(0, 2.15, stationZ[current] + 7.5);
    const look = new THREE.Vector3(0, 1.4, stationZ[current]);
    if (!started) {
      camera.position.lerp(new THREE.Vector3(0, 2.2, 12), 0.05);
      camera.lookAt(0, 1.6, 0);
      return;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.x + state.pointer.x * 0.12, 2.1, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.y + state.pointer.y * 0.08, 2.1, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.z, 2.3, dt);
    const lx = THREE.MathUtils.damp(look.x, state.pointer.x * 0.25, 2.1, dt);
    camera.lookAt(lx, look.y, look.z);

    if (camera.position.distanceTo(target) < 0.35 && notified.current !== current) {
      notified.current = current;
      onArrive();
    }
  });

  return null;
}

function Corridor() {
  const rackZ = useMemo(() => Array.from({ length: 40 }, (_, i) => 8 - i * 3), []);
  return (
    <group>
      <mesh position={[0, -0.7, -50]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 140]} />
        <meshStandardMaterial color="#06101b" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh position={[0, 6.5, -50]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 140]} />
        <meshStandardMaterial color="#040b15" metalness={0.1} roughness={0.95} />
      </mesh>
      <mesh position={[-9, 2.8, -50]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[140, 7]} />
        <meshStandardMaterial color="#050d18" />
      </mesh>
      <mesh position={[9, 2.8, -50]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[140, 7]} />
        <meshStandardMaterial color="#050d18" />
      </mesh>

      {rackZ.map((z, i) => (
        <group key={i}>
          <ServerRack x={-6.6} z={z} accent={i % 3 === 0 ? '#64ffb7' : '#00e5ff'} />
          <ServerRack x={6.6} z={z} accent={i % 4 === 0 ? '#7b73ff' : '#00e5ff'} />
          <mesh position={[0, 6.1, z]}>
            <boxGeometry args={[4.8, 0.08, 0.22]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#00e5ff' : '#64ffb7'} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function ServerRack({ x, z, accent }: { x: number; z: number; accent: string }) {
  return (
    <group position={[x, 1.5, z]}>
      <Box args={[1.4, 3.4, 1.1]}>
        <meshStandardMaterial color="#09131f" emissive="#06111c" emissiveIntensity={0.3} metalness={0.45} roughness={0.65} />
      </Box>
      {[1.1, 0.45, -0.2, -0.85].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0.56]}>
          <planeGeometry args={[0.9, 0.12]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
    </group>
  );
}

function StationRoom({ index, z, title, short }: { index: number; z: number; title: string; short: string }) {
  return (
    <group position={[0, 0, z]}>
      <mesh position={[0, -0.69, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[4.6, 48]} />
        <meshBasicMaterial color="#0d2030" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.9, 4.4, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 3.1, 0]}>
        <torusGeometry args={[2.6, 0.03, 8, 160]} />
        <meshBasicMaterial color={index % 2 === 0 ? '#00e5ff' : '#64ffb7'} transparent opacity={0.32} />
      </mesh>

      <Text position={[0, 4.6, 0]} fontSize={0.38} color="#dcf7ff" anchorX="center">{title}</Text>
      <Text position={[0, 4.05, 0]} fontSize={0.18} color="#7ddfff" anchorX="center">{short}</Text>

      <StationCore type={index} />
    </group>
  );
}

function StationCore({ type }: { type: number }) {
  const group = useRef<THREE.Group>(null);
  const particles = useRef<THREE.Mesh[]>([]);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
    particles.current.forEach((p, i) => {
      p.position.y = 0.6 + Math.sin(state.clock.elapsedTime * 1.6 + i) * 0.35;
    });
  });

  if (type === 0) {
    return (
      <group ref={group}>
        <mesh position={[0, 1.35, 0]}>
          <octahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial color="#00e5ff" wireframe emissive="#00b3d4" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <sphereGeometry args={[0.42, 18, 18]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    );
  }
  if (type === 1) {
    return (
      <group ref={group}>
        {[0, 0.4, 0.8].map((r) => (
          <mesh key={r} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.5 + r * 0.4, 0]}>
            <ringGeometry args={[1 + r, 1.04 + r, 64]} />
            <meshBasicMaterial color="#64ffb7" />
          </mesh>
        ))}
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.8, 18, 18]} />
          <meshStandardMaterial color="#081822" wireframe emissive="#64ffb7" emissiveIntensity={0.7} />
        </mesh>
      </group>
    );
  }
  if (type === 2) {
    return (
      <group ref={group}>
        <mesh position={[0, 1.45, 0]}>
          <boxGeometry args={[1.9, 2, 1.9]} />
          <meshStandardMaterial color="#0b1522" emissive="#0a1f31" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 2.05, 0.96]}>
          <planeGeometry args={[1.25, 0.26]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
        <mesh position={[0, 1.45, 0.96]}>
          <planeGeometry args={[1.25, 0.26]} />
          <meshBasicMaterial color="#64ffb7" />
        </mesh>
      </group>
    );
  }
  if (type === 3) {
    return (
      <group ref={group}>
        {[ -1.2, 0, 1.2 ].map((x, i) => (
          <RoundedBox key={i} args={[0.9, 1.2, 0.9]} radius={0.08} smoothness={4} position={[x, 1.0 + i * 0.18, 0]}>
            <meshStandardMaterial color="#09131e" emissive="#091c2d" emissiveIntensity={0.35} />
          </RoundedBox>
        ))}
        {[ -1.2, 0, 1.2 ].map((x, i) => (
          <mesh key={x} position={[x, 1.25 + i * 0.18, 0.47]}>
            <planeGeometry args={[0.54, 0.22]} />
            <meshBasicMaterial color={i === 1 ? '#64ffb7' : '#00e5ff'} />
          </mesh>
        ))}
      </group>
    );
  }
  if (type === 4) {
    return (
      <group ref={group}>
        <mesh position={[0, 1.65, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 2.2, 24]} />
          <meshStandardMaterial color="#09131e" emissive="#0a1d2d" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 2.85, 0]}>
          <torusGeometry args={[1.15, 0.07, 8, 120]} />
          <meshBasicMaterial color="#7b73ff" />
        </mesh>
        <mesh position={[0, 2.15, 0]}>
          <boxGeometry args={[1.8, 0.9, 0.08]} />
          <meshBasicMaterial color="#64ffb7" />
        </mesh>
      </group>
    );
  }
  if (type === 5) {
    return (
      <group ref={group}>
        <mesh position={[0, 1.25, 0]}>
          <boxGeometry args={[2.2, 1.4, 0.9]} />
          <meshStandardMaterial color="#08121c" emissive="#0a1d2e" emissiveIntensity={0.35} />
        </mesh>
        <mesh position={[0, 1.45, 0.46]}>
          <planeGeometry args={[1.65, 0.75]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={group}>
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 2.2, 12]} />
        <meshStandardMaterial color="#0c1420" emissive="#0e2538" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#64ffb7" />
      </mesh>
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={i} ref={(el) => { if (el) particles.current[i] = el; }} position={[x, 1.4, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color={i === 1 ? '#ffffff' : '#00e5ff'} />
        </mesh>
      ))}
    </group>
  );
}

function Panel({ stationIndex, onClose }: { stationIndex: number; onClose: () => void }) {
  const station = stations[stationIndex];
  return (
    <div className="panel-overlay" onClick={onClose}>
      <div className="content-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-top">
          <div>
            <span className="panel-kicker">{String(stationIndex + 1).padStart(2, '0')} / {station.title}</span>
            <h2>{station.heading}</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        <p className="lead-copy">{station.description}</p>
        {stationIndex === 0 && <WelcomeContent />}
        {stationIndex === 1 && <ThreatContent />}
        {stationIndex === 2 && <SocContent />}
        {stationIndex === 3 && <ProjectContent />}
        {stationIndex === 4 && <CareerContent />}
        {stationIndex === 5 && <TerminalContent />}
        {stationIndex === 6 && <ContactContent />}
      </div>
    </div>
  );
}

function SectionGrid({ children }: { children: ReactNode }) {
  return <div className="section-grid">{children}</div>;
}

function DataCard({ title, children }: { title: string; children: ReactNode }) {
  return <div className="data-card"><h3>{title}</h3>{children}</div>;
}

function WelcomeContent() {
  return (
    <SectionGrid>
      <DataCard title="Identity">
        <p><strong>{profile.name}</strong></p>
        <p>{profile.role}</p>
        <p>{profile.degree}</p>
        <p>{profile.college}</p>
      </DataCard>
      <DataCard title="Experience Model">
        <ul>
          <li>Travel forward through each cyber destination</li>
          <li>Arrive first, then choose whether to open content</li>
          <li>Explore a portfolio designed as a cyber command-center journey</li>
        </ul>
      </DataCard>
    </SectionGrid>
  );
}

function ThreatContent() {
  return (
    <SectionGrid>
      <DataCard title="Profile Summary">
        <p>
          I enjoy learning cybersecurity through structured analysis, network-focused projects, and practical tools.
          My goal is to grow into SOC, blue-team, and investigation-oriented roles.
        </p>
      </DataCard>
      <DataCard title="Analyst Mindset">
        <ul>
          <li>Observe systems and traffic carefully</li>
          <li>Document findings clearly</li>
          <li>Build practical tools to strengthen understanding</li>
        </ul>
      </DataCard>
    </SectionGrid>
  );
}

function SocContent() {
  return (
    <div className="stack-wrap">
      <SectionGrid>
        {Object.entries(skills).map(([title, list]) => (
          <DataCard key={title} title={title}>
            <div className="tag-wrap">{list.map((item) => <span key={item}>{item}</span>)}</div>
          </DataCard>
        ))}
      </SectionGrid>
    </div>
  );
}

function ProjectContent() {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <DataCard key={project.name} title={project.name}>
          <p className="subtext">{project.subtitle}</p>
          <p>{project.desc}</p>
          <div className="inline-links">
            <a href={project.demo} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14} /></a>
            <a href={project.repo} target="_blank" rel="noreferrer">Source <Github size={14} /></a>
          </div>
        </DataCard>
      ))}
    </div>
  );
}

function CareerContent() {
  return (
    <div className="stack-wrap">
      <SectionGrid>
        <DataCard title="Experience">
          {experience.map((item) => (
            <div key={item.title} className="entry-block">
              <strong>{item.title}</strong>
              <p className="subtext">{item.org} · {item.year}</p>
              <p>{item.desc}</p>
            </div>
          ))}
        </DataCard>
        <DataCard title="Achievements">
          <ul>{achievements.map((a) => <li key={a}>{a}</li>)}</ul>
        </DataCard>
      </SectionGrid>
      <DataCard title="Certifications">
        <div className="tag-wrap">{certifications.map((c) => <span key={c}>{c}</span>)}</div>
      </DataCard>
    </div>
  );
}

function TerminalContent() {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<string[]>([
    'CYBERVERSE OS v9.0 — terminal ready.',
    'Type help to see commands.'
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  function run(cmdRaw = input) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h]);
    setHistoryIndex(-1);
    setInput('');

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    const responses: Record<string, string> = {
      help: 'help, about, skills, projects, experience, contact, resume, clear',
      about: `${profile.name} — ${profile.role}`,
      skills: Object.entries(skills).flatMap(([k, v]) => [k + ': ' + v.join(', ')]).join(' | '),
      projects: projects.map((p) => p.name).join(' / '),
      experience: experience.map((e) => `${e.title} at ${e.org}`).join(' | '),
      contact: `${profile.email} | ${profile.github} | ${profile.linkedin}`,
      resume: 'Opening updated resume ...'
    };

    setLines((prev) => [...prev, `analyst@cyberverse:~$ ${cmd}`, responses[cmd] ?? `Unknown command: ${cmd}`]);
    if (cmd === 'resume') window.open(resumeUrl, '_blank');
  }

  return (
    <div className="terminal-card">
      <div className="terminal-top"><Command size={16} /> PORTFOLIO CONSOLE</div>
      <div className="terminal-body">
        {lines.map((line, idx) => <div key={idx} className={line.startsWith('analyst@') ? 'cmd-line' : ''}>{line}</div>)}
      </div>
      <form className="terminal-form" onSubmit={(e) => { e.preventDefault(); run(); }}>
        <span>$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="help"
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              const next = Math.min(historyIndex + 1, history.length - 1);
              if (next >= 0) {
                setHistoryIndex(next);
                setInput(history[next]);
              }
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              const next = historyIndex - 1;
              setHistoryIndex(next);
              setInput(next >= 0 ? history[next] : '');
            }
          }}
        />
        <button type="submit">Run</button>
      </form>
      <div className="terminal-shortcuts">
        {['help', 'projects', 'contact', 'resume'].map((x) => <button key={x} onClick={() => run(x)}>{x}</button>)}
      </div>
    </div>
  );
}

function ContactContent() {
  return (
    <SectionGrid>
      <DataCard title="Direct Contact">
        <div className="contact-list">
          <a href={`mailto:${profile.email}`}><Mail size={16} /> {profile.email}</a>
          <p><MapPin size={16} /> {profile.location}</p>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
          <a href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
        </div>
      </DataCard>
      <DataCard title="Resume & Action">
        <p>Download the latest resume without a photo, or reach out for internship and entry-level opportunities.</p>
        <div className="inline-links vertical">
          <a href={resumeUrl} download><Download size={14} /> Download Resume</a>
          <a href={`mailto:${profile.email}`}><Shield size={14} /> Email Me</a>
        </div>
      </DataCard>
    </SectionGrid>
  );
}
