import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Text, Sparkles } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const positions: [number,number,number][] = [[0,0,0],[-2.1,1.55,0],[2.2,1.55,-.4],[-2.45,-1.1,.2],[2.35,-1.2,.3],[-.15,2.55,-1.2],[0,-2.45,.4]];
const names = ['SOC','IDS','FIREWALL','DNS','WEB','CLOUD','ENDPOINT'];
const links = [[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,3],[2,4],[5,2],[6,3]];
function Network() {
  const root=useRef<THREE.Group>(null);
  const marker=useRef<THREE.Mesh[]>([]);
  const edges=useMemo(()=>links.map(([a,b],i)=>({from:new THREE.Vector3(...positions[a]),to:new THREE.Vector3(...positions[b]),alert:i===3||i===8})),[]);
  useFrame(({clock,pointer},dt)=>{
    const t=clock.elapsedTime;
    if(root.current){root.current.rotation.y=THREE.MathUtils.damp(root.current.rotation.y,pointer.x*.28+Math.sin(t*.13)*.1,1.8,dt);root.current.rotation.x=THREE.MathUtils.damp(root.current.rotation.x,-pointer.y*.17,1.8,dt);root.current.position.y=Math.sin(t*.7)*.07;}
    marker.current.forEach((mesh,i)=>{
      const e=edges[i%edges.length];if(mesh)mesh.position.copy(e.from).lerp(e.to,(t*(e.alert?.22:.17)+i*.13)%1)
    });
  });
  return <group ref={root} scale={.82}>
    {positions.map((p,i)=><group key={names[i]} position={p}>
      <mesh><boxGeometry args={i===0?[.84,.64,.58]:[.55,.44,.47]}/><meshStandardMaterial color={i===0?'#c7ff79':'#102a1a'} metalness={.72} roughness={.22} emissive={i===0?'#337e3f':'#224f36'} emissiveIntensity={i===0?.85:.36}/></mesh>
      <mesh position={[0,.02,.247]}><planeGeometry args={[i===0?.55:.34,.1]}/><meshBasicMaterial color={i===3?'#fca76e':'#bafc85'}/></mesh>
      <Text fontSize={.16} color="#d6f7ff" position={[0,-.47,.05]} anchorX="center">{names[i]}</Text>
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[i===0?.82:.53,.008,5,85]}/><meshBasicMaterial color="#b9fa85" transparent opacity={.32}/></mesh>
    </group>)}
    {edges.map((e,i)=><group key={i}>
      <Line points={[e.from,e.to]} color={e.alert?'#ff7c83':'#96e6b3'} lineWidth={1.3} transparent opacity={.69}/>
      <mesh ref={el=>{if(el)marker.current[i]=el}}><sphereGeometry args={[e.alert?.10:.065,8,8]}/><meshBasicMaterial color={e.alert?'#ff6c79':'#dbffbd'}/></mesh>
    </group>)}
    <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[3.13,.014,8,150]}/><meshBasicMaterial color="#c7ff79" transparent opacity={.22}/></mesh>
  </group>
}
export default function CoreScene(){return <Canvas camera={{position:[0,0,7.6],fov:45}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}><ambientLight intensity={1.1}/><pointLight position={[3,4,4]} color="#c7ff79" intensity={35}/><pointLight position={[-3,-2,1]} color="#7db64e" intensity={18}/><Network/><Sparkles count={48} scale={[8,7,4]} color="#8fce76" size={1.6} speed={.4}/></Canvas>}
