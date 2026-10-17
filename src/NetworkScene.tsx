import {Canvas,useFrame} from '@react-three/fiber';
import {Line,OrbitControls,Text,Float,Sparkles} from '@react-three/drei';
import {useMemo,useRef} from 'react';
import * as THREE from 'three';

const labels=['ANALYST','SENSOR','FIREWALL','DNS','WEB','SOC LAB','ENDPOINT','STEGO'];
const positions:[number,number,number][]=[
  [0,0,0],
  [-3.1,1.55,0.2],
  [3.25,1.4,-0.3],
  [-2.2,-1.8,-0.6],
  [2.6,-1.7,0.35],
  [0,2.55,-0.8],
  [-.25,-2.6,.45],
  [4.05,-.1,-1.2],
];

function TrafficMesh(){
  const group=useRef<THREE.Group>(null);
  const movers=useRef<THREE.Mesh[]>([]);
  const edges=useMemo(()=>[
    [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[2,7],[1,5],[3,6],[4,7],[1,3],[2,4]
  ].map(([a,b],i)=>({a:new THREE.Vector3(...positions[a]),b:new THREE.Vector3(...positions[b]),phase:i*.09,severity:i%5===0?'high':i%3===0?'medium':'normal'})),[]);

  useFrame(({clock,pointer},dt)=>{
    const t=clock.elapsedTime;
    if(group.current){
      group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,pointer.x*0.24+Math.sin(t*.22)*0.1,2,dt);
      group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,-pointer.y*0.18,2,dt);
      group.current.position.y=Math.sin(t*.55)*0.06;
    }
    movers.current.forEach((obj,i)=>{
      if(obj){
        const e=edges[i];
        const progress=(t*0.16+e.phase)%1;
        obj.position.copy(e.a).lerp(e.b,progress);
      }
    });
  });

  return <group ref={group}>
    <Float speed={1.2} floatIntensity={.12} rotationIntensity={.08}>
      {positions.map((p,i)=><group key={labels[i]} position={p as [number,number,number]}>
        <mesh>
          <icosahedronGeometry args={[i===0?.48:.22,1]}/>
          <meshStandardMaterial color={i===0?'#00e5ff':i%2===0?'#5a8fff':'#00b8b2'} emissive={i===0?'#00e5ff':i%2===0?'#5a8fff':'#00b8b2'} emissiveIntensity={.9} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[i===0?.28:.11,14,14]}/>
          <meshBasicMaterial color={i===0?'#ffffff':'#d7f8ff'} />
        </mesh>
        <Text fontSize={i===0?.24:.15} position={[0,-(i===0?.75:.44),0]} color="#c9ebf7" anchorX="center">{labels[i]}</Text>
      </group>)}
      {edges.map((e,i)=><group key={i}>
        <Line points={[e.a,e.b]} color={e.severity==='high'?'#ff5f7a':e.severity==='medium'?'#8ab3ff':'#0fd4ff'} transparent opacity={.65} lineWidth={1} />
        <mesh ref={el=>{if(el)movers.current[i]=el}}>
          <sphereGeometry args={[e.severity==='high'?.08:.06,10,10]}/>
          <meshBasicMaterial color={e.severity==='high'?'#ff9fb0':e.severity==='medium'?'#fff59d':'#ffffff'} />
        </mesh>
      </group>)}
      <mesh rotation={[Math.PI/2,0,0]}>
        <torusGeometry args={[3.15,.01,8,180]}/>
        <meshBasicMaterial color="#00e5ff" transparent opacity={.18} />
      </mesh>
      <mesh rotation={[0,0,Math.PI/2.6]}>
        <torusGeometry args={[2.45,.01,8,180]}/>
        <meshBasicMaterial color="#5a8fff" transparent opacity={.14} />
      </mesh>
    </Float>
  </group>
}

export default function NetworkScene(){
  return <Canvas camera={{position:[0,0,9],fov:42}} dpr={[1,1.6]} gl={{alpha:true,antialias:true}}>
    <ambientLight intensity={.82}/>
    <pointLight position={[4,5,5]} color="#00e5ff" intensity={40}/>
    <pointLight position={[-3,-2,2]} color="#5a8fff" intensity={24}/>
    <TrafficMesh/>
    <Sparkles count={45} scale={[9,6,4]} size={2.2} speed={0.35} color="#00e5ff"/>
    <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI/3} maxPolarAngle={2*Math.PI/3}/>
  </Canvas>}
