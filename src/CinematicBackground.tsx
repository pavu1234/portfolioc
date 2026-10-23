import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const CYAN = '#14e8ff';
function Racks() {
  const rows = useMemo(() => Array.from({ length: 10 }, (_, i) => i), []);
  const blink = useRef<THREE.Group>(null);
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.set(Math.sin(t * .13) * .45, 1.05 + Math.sin(t * .23) * .12, 7.8 + Math.sin(t * .1) * .55);
    camera.lookAt(Math.sin(t * .13) * .4, .15, -7.5);
    if (blink.current) blink.current.children.forEach((o, i) => {
      const m = o as THREE.Mesh;
      m.scale.y = .48 + Math.abs(Math.sin(t * (1.2 + i % 3 * .25) + i)) * .52;
    });
  });
  return <group>
    {[-1, 1].map(side => rows.map((i) => <group key={`${side}-${i}`} position={[side * 3.8, -.25, 2 - i * 2.8]}>
      <mesh><boxGeometry args={[1.55, 3.65, 1.85]}/><meshStandardMaterial color="#07182b" roughness={.36} metalness={.62}/></mesh>
      <mesh position={[-side*.785,0,0]}><planeGeometry args={[1.45,3.4]}/><meshStandardMaterial color="#0c2639" emissive="#0c2639" emissiveIntensity={.18} side={THREE.DoubleSide}/></mesh>
      {Array.from({ length: 9 }, (_, n) => <group key={n} position={[-side * .793,1.38-n*.33,0]} rotation={[0,side*Math.PI/2,0]}>
        <mesh><planeGeometry args={[1.4,.24]}/><meshBasicMaterial color="#06121f"/></mesh>
        <mesh position={[.41,.02,.008]}><planeGeometry args={[.22,.025]}/><meshBasicMaterial color={n%3===0?'#be82ff':CYAN}/></mesh>
        <mesh position={[-.52,.02,.008]}><circleGeometry args={[.029,8]}/><meshBasicMaterial color="#60ffc7"/></mesh>
      </group>)}
      <pointLight position={[-side * .8,0,0]} color={i%3===0?'#8045ff':CYAN} intensity={1.6} distance={2}/>
    </group>))}
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-2.16,-11]}><planeGeometry args={[14,40]}/><meshStandardMaterial color="#04111e" roughness={.25} metalness={.55}/></mesh>
    {[-2.2,0,2.2].map(x=><mesh key={x} position={[x,-2.139,-11]} rotation={[-Math.PI/2,0,0]}><planeGeometry args={[.024,38]}/><meshBasicMaterial color="#08a5d1" transparent opacity={.55}/></mesh>)}
    <group ref={blink}>{rows.map((i)=><mesh key={i} position={[0,2.8,1-i*2.8]}><boxGeometry args={[5.4,.018,.075]}/><meshBasicMaterial color="#00bceb" transparent opacity={.25}/></mesh>)}</group>
    <Line points={[[-2.8,-1.9,7],[-2.8,-1.9,-28]]} color="#00c9fd" transparent opacity={.6}/>
    <Line points={[[2.8,-1.9,7],[2.8,-1.9,-28]]} color="#00c9fd" transparent opacity={.6}/>
  </group>
}
function DataFlows(){const refs=useRef<THREE.Mesh[]>([]);const paths=useMemo(()=>Array.from({length:28},(_,i)=>({x:(i%7-3)*.37,y:(Math.floor(i/7)-1.5)*.31,z:((i*1.73)%30)-22,speed:.85+i%4*.3})),[]);
 useFrame(({clock})=>{const t=clock.elapsedTime;refs.current.forEach((mesh,i)=>{if(!mesh)return;const p=paths[i];mesh.position.set(p.x+Math.sin(t*.7+i)*.17,p.y+Math.cos(t*.4+i)*.08,((p.z+t*p.speed+35)%35)-28);mesh.scale.z=.8+(i%3)*.5;})});
 return <>{paths.map((p,i)=><mesh key={i} ref={e=>{if(e)refs.current[i]=e}} position={[p.x,p.y,p.z]}><boxGeometry args={[.025,.025,.5]}/><meshBasicMaterial color={i%6===0?'#b17cff':i%7===0?'#ff7c94':CYAN} transparent opacity={.72}/></mesh>)}</>}
function Scene(){return <><ambientLight intensity={.53}/><pointLight position={[0,3,2]} color="#00d9ff" intensity={16} distance={14}/><pointLight position={[2,1,-8]} color="#8c62ff" intensity={22} distance={14}/><Racks/><DataFlows/><Sparkles count={68} scale={[7,5,26]} size={1.8} color="#8beeff" speed={.32}/></>}
export default function CinematicBackground(){return <div className="cinematic-global" aria-hidden="true"><Canvas camera={{position:[0,1,8],fov:64}} dpr={[1,1.35]} gl={{alpha:false,antialias:false,powerPreference:'high-performance'}}><color attach="background" args={['#040b16']}/><fog attach="fog" args={['#040b16',7,26]}/><Scene/></Canvas></div>}
