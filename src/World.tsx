import {Canvas,useFrame} from '@react-three/fiber';
import {Grid,Text,Float,Sparkles,Stars,Line} from '@react-three/drei';
import {useEffect,useMemo,useRef} from 'react';
import * as THREE from 'three';
import {stations} from './data';

const CYAN='#42ebff',MINT='#8cffe1';
function Room({x,z}:{x:number,z:number}){return <group position={[x,0,z]}><mesh position={[0,-.12,0]}><cylinderGeometry args={[5.3,5.7,.25,64]}/><meshStandardMaterial color="#102534" metalness={.7} roughness={.3}/></mesh><mesh rotation={[-Math.PI/2,0,0]} position={[0,.035,0]}><ringGeometry args={[3.9,4.4,64]}/><meshBasicMaterial color={CYAN} transparent opacity={.38} side={THREE.DoubleSide}/></mesh>{Array.from({length:10},(_,i)=>{const a=i*Math.PI/5;return <group key={i} position={[Math.sin(a)*4.7,0,Math.cos(a)*4.7]}><mesh position={[0,1.2,0]}><boxGeometry args={[.55,2.4,.62]}/><meshStandardMaterial color="#091724" metalness={.7} roughness={.36}/></mesh>{[.4,1,1.6,2.15].map((h,j)=><mesh key={j} position={[0,h,.32]}><boxGeometry args={[.35,.07,.025]}/><meshBasicMaterial color={j%2?CYAN:MINT}/></mesh>)}</group>})}</group>}
function DataTunnel(){const packets=useRef<THREE.Group>(null);useFrame(({clock})=>{if(packets.current)packets.current.children.forEach((c,i)=>{const p=(clock.elapsedTime*.25+i/28)%1;c.position.z=9-p*47;c.position.y=.7+Math.sin(p*14+i)*.16})});return <group>{Array.from({length:13},(_,i)=><group key={i} position={[0,0,7-i*3.5]}><mesh rotation={[Math.PI/2,0,0]} position={[0,2,0]}><torusGeometry args={[6.3,.035,6,80]}/><meshBasicMaterial color={i%3?CYAN:'#8b85ff'} transparent opacity={.23}/></mesh></group>)}<group ref={packets}>{Array.from({length:28},(_,i)=><mesh key={i} position={[Math.sin(i*2.3)*4,.9,0]}><sphereGeometry args={[.055,8,8]}/><meshBasicMaterial color={i%5?'#56eafb':'#ff9b65'}/></mesh>)}</group></group>}
function Network(){const nodes=useMemo(()=>[[0,2,0],[-2,3,-1],[2.2,3,-2],[-3,1.4,-3],[3.2,1.8,-4],[0,3.7,-5]] as [number,number,number][],[]);const dots=useRef<THREE.Group>(null);useFrame(({clock})=>{if(dots.current)dots.current.children.forEach((d,i)=>{const start=new THREE.Vector3(...nodes[0]),end=new THREE.Vector3(...nodes[i+1]);d.position.copy(start.lerp(end,(clock.elapsedTime*.34+i*.17)%1))})});return <group position={[-10,0,-3]}>{nodes.map((p,i)=><Float key={i} speed={1+i*.1} floatIntensity={.23}><mesh position={p}><icosahedronGeometry args={[i? .3:.52,1]}/><meshStandardMaterial color={i%2?MINT:CYAN} emissive={CYAN} emissiveIntensity={.5} wireframe/></mesh></Float>)}{nodes.slice(1).map((p,i)=><Line key={i} points={[nodes[0],p]} color={i===2?'#ff9a68':CYAN} transparent opacity={.6} lineWidth={1.5}/>)}<group ref={dots}>{nodes.slice(1).map((_,i)=><mesh key={i}><sphereGeometry args={[.085,8,8]}/><meshBasicMaterial color="#ffffff"/></mesh>)}</group></group>}
function HoloPanels(){return <group>{stations.map((s,i)=><group key={s.id} position={[s.x,3,s.z-1]}><mesh><boxGeometry args={[4.7,1.6,.12]}/><meshStandardMaterial color="#082637" emissive="#0e5367" emissiveIntensity={.3} transparent opacity={.78} metalness={.5}/></mesh><Text position={[0,.17,.1]} fontSize={.3} color="#e2fcff" anchorX="center" maxWidth={4.2}>{s.name}</Text><Text position={[0,-.33,.1]} fontSize={.17} color={CYAN} anchorX="center">{s.caption.toUpperCase()}</Text></group>)}</group>}
function Drone({x,z,delay}:{x:number,z:number,delay:number}){const mesh=useRef<THREE.Group>(null);useFrame(({clock})=>{if(mesh.current){const t=clock.elapsedTime*.35+delay;mesh.current.position.set(x+Math.sin(t)*1.5,3.5+Math.sin(t*2)*.25,z+Math.cos(t)*1.2);mesh.current.rotation.y=t}});return <group ref={mesh}><mesh><octahedronGeometry args={[.35]}/><meshStandardMaterial color="#75eaff" emissive="#30bdda" emissiveIntensity={1}/></mesh><pointLight color="#2de5ff" intensity={4} distance={4}/></group>}
function CameraTravel({station,active,onArrival}:{station:number,active:boolean,onArrival:(station:number)=>void}){
 const reported=useRef(-1);
 useEffect(()=>{reported.current=-1},[station,active]);
 useFrame(({camera,pointer},dt)=>{
  const target=stations[station];
  const destination=new THREE.Vector3(target.x,active?2.65:4.8,target.z+(active?9.1:18));
  const desired=destination.clone().add(new THREE.Vector3(pointer.x*.14,0,0));
  camera.position.lerp(desired,1-Math.exp(-dt*2.3));
  camera.lookAt(target.x,target.id==='network'?2.6:2,target.z-2);
  // Only unlock the View button after the camera has physically arrived.
  if(active&&camera.position.distanceTo(destination)<0.38&&reported.current!==station){
   reported.current=station;
   onArrival(station);
  }
 });
 return null;
}
export default function World({station,active,onArrival}:{station:number,active:boolean,onArrival:(station:number)=>void}){return <Canvas dpr={[1,1.6]} camera={{position:[0,5,24],fov:56}} gl={{antialias:true,powerPreference:'high-performance'}}><color attach="background" args={['#030a12']}/><fog attach="fog" args={['#030a12',24,64]}/><ambientLight intensity={.48}/><hemisphereLight args={['#4de9ff','#07121a',.7]}/><pointLight position={[0,7,-12]} intensity={38} color={CYAN} distance={34}/><pointLight position={[10,4,-8]} intensity={16} color="#a47dff" distance={25}/><Grid position={[0,-.3,-11]} args={[90,90]} cellSize={1} cellThickness={.35} cellColor="#19586a" sectionSize={5} sectionColor="#2188a2" fadeDistance={70} infiniteGrid/><Stars radius={70} count={340} factor={3} fade speed={.45}/><Sparkles count={95} scale={[35,15,60]} speed={.25} size={1.7} color={CYAN}/><DataTunnel/>{stations.map(s=><Room key={s.id} x={s.x} z={s.z}/>)}<HoloPanels/><Network/><Drone x={5} z={0} delay={0}/><Drone x={-6} z={-10} delay={2}/><CameraTravel station={station} active={active} onArrival={onArrival}/></Canvas>}
