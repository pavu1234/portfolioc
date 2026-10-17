import {Canvas,useFrame} from '@react-three/fiber';
import {Line,OrbitControls,Sparkles,Text} from '@react-three/drei';
import {useMemo,useRef} from 'react';
import * as THREE from 'three';

const CYAN='#00e5ff';
const BLUE='#2a8fff';
const GREEN='#28ffc9';
const RED='#ff5f7a';

function PacketField(){
  const group=useRef<THREE.Group>(null);
  const packets=useRef<THREE.Mesh[]>([]);
  const orbiters=useRef<THREE.Group[]>([]);
  const lanes=useMemo(()=>([
    [new THREE.Vector3(-4,1.8,0),new THREE.Vector3(4,1.8,0)],
    [new THREE.Vector3(-4,.2,-.4),new THREE.Vector3(4,.2,.4)],
    [new THREE.Vector3(-4,-1.4,.5),new THREE.Vector3(4,-1.4,-.3)],
    [new THREE.Vector3(0,-2.3,-1.5),new THREE.Vector3(0,2.3,1.5)]
  ]),[]);

  useFrame(({clock,pointer},dt)=>{
    const t=clock.elapsedTime;
    if(group.current){
      group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,pointer.x*0.18,2.2,dt);
      group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,-pointer.y*0.12,2.2,dt);
    }
    packets.current.forEach((mesh,i)=>{
      const [a,b]=lanes[i%lanes.length];
      const progress=(t*0.18 + (i*0.14))%1;
      mesh.position.copy(a.clone().lerp(b,progress));
    });
    orbiters.current.forEach((orb,i)=>{
      orb.rotation.z=t*(0.15+i*0.04);
      orb.rotation.x=t*(0.07+i*0.03);
    });
  });

  return <group ref={group}>
    <mesh>
      <cylinderGeometry args={[.14,.14,4.8,20,1,true]}/>
      <meshBasicMaterial color={CYAN} transparent opacity={.2} />
    </mesh>
    <mesh rotation={[0,0,Math.PI/2]}>
      <cylinderGeometry args={[.14,.14,7.8,20,1,true]}/>
      <meshBasicMaterial color={BLUE} transparent opacity={.18} />
    </mesh>
    {[1.45,2.1,2.75].map((r,i)=><group key={r} ref={el=>{if(el)orbiters.current[i]=el}}>
      <mesh rotation={[Math.PI/2,0,i*.35]}>
        <torusGeometry args={[r,.026,10,160]}/>
        <meshBasicMaterial color={i===2?BLUE:CYAN} transparent opacity={.38-(i*.06)} />
      </mesh>
    </group>)}
    {lanes.map((lane,i)=><Line key={i} points={lane} color={i===2?GREEN:i===3?BLUE:CYAN} lineWidth={1.2} transparent opacity={.65} />)}
    {Array.from({length:16},(_,i)=><mesh key={i} ref={el=>{if(el)packets.current[i]=el}}>
      <sphereGeometry args={[i%6===0?0.075:0.05,10,10]}/>
      <meshBasicMaterial color={i%8===0?RED:i%3===0?GREEN:'#ffffff'} />
    </mesh>)}
    {[[0,0,0],[3.7,1.8,0],[-3.7,1.8,0],[3.7,.2,.4],[-3.7,.2,-.4],[3.7,-1.4,-.3],[-3.7,-1.4,.5],[0,2.35,1.55],[0,-2.35,-1.55]].map((p,i)=><group key={i} position={p as [number,number,number]}>
      <mesh><octahedronGeometry args={[i===0?.35:.18,0]}/><meshStandardMaterial color={i===0?CYAN:i%4===0?GREEN:BLUE} emissive={i===0?CYAN:i%4===0?GREEN:BLUE} emissiveIntensity={0.45} wireframe /></mesh>
      {i===0 && <Text position={[0,-.55,0]} fontSize={.18} color="#d3f6ff" anchorX="center">ANALYST CORE</Text>}
    </group>)}
  </group>
}

export default function CoreScene(){
  return <Canvas camera={{position:[0,0,8],fov:42}} dpr={[1,1.5]} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}>
    <ambientLight intensity={.9}/>
    <pointLight position={[4,4,4]} color={CYAN} intensity={35}/>
    <pointLight position={[-4,-2,2]} color={BLUE} intensity={25}/>
    <PacketField/>
    <Sparkles count={70} scale={[8,6,4]} size={2} speed={.35} color={CYAN}/>
    <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.35} maxPolarAngle={Math.PI*.68} minPolarAngle={Math.PI*.32}/>
  </Canvas>
}
