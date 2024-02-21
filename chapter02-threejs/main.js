import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// antialias  Box mesh 등 끝부분이 우글거리는 현상을 완화 해준다.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자를 사용하도록 설정
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);

camera.position.z = 5;
camera.position.y = 1;

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true; // 빛이 그림자를 드리워 지도록 설정
directionalLight.position.set(3, 4, 5); // 빛의 위치
directionalLight.lookAt(0, 0, 0); // 빛이 바라보는 방향
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb }); // 바닥의 색상
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥을 x축으로 90도 회전 ( 회전값은 라디안 값을 쓰게되는데 라디안은 PI가 180도 이므로 90도는 PI/2 이다. 180도는 PI 이다. 360도는 2PI 이다.  )
floor.receiveShadow = true; // 바닥이 그림자를 받을 수 있도록 설정
floor.castShadow = true; // 바닥이 그림자를 드리워 지도록 설정
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1);
// MeshBasicMaterial 가 아닌 Material 은 조명 없이는 보이지 않는다.
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5; // 박스의 중심이 0,0,0 이므로 바닥에 위치시키기 위해 y축으로 0.5만큼 이동시킨다.
mesh.castShadow = true; // 박스가 그림자를 드리워 지도록 설정
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 1.75, 0);
capsuleMesh.castShadow = true;
capsuleMesh.receiveShadow = true;
scene.add(capsuleMesh);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.castShadow = true;
cylinderMesh.receiveShadow = true;
scene.add(cylinderMesh);

const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, Math.PI * 2);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(0, 0.5, 1);
torusMesh.castShadow = true;
torusMesh.receiveShadow = true;
scene.add(torusMesh);

const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.4, -0.1);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.5);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.4, -0.1);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);

const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(0, 1, 2);
shapeMesh.castShadow = true;
shapeMesh.receiveShadow = true;
scene.add(shapeMesh);

const extrudeSettings = {
  steps: 1, // 스텝의 수
  depth: 0.1, // 깊이
  bevelEnabled: true, // 모서리 부분을 둥글게 할지 말지
  bevelThickness: 0.1, // 둥글게 할때 두께
  bevelSize: 0.3, // 둥글게 할때 크기
  bevelSegments: 100, // 둥글게 할때 세그먼트
};

const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(2, 1.3, 2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 1, -3);
// sphereMesh.castShadow = true;
// sphereMesh.receiveShadow = true;
scene.add(sphereMesh);

const numPoints = 1000; // 점의 개수

// Float32Array는 포인트에 좌표를 저장하기위한 32비트 부동소수점을 사용하는 배열이다.
const positions = new Float32Array(numPoints * 3); // 3개의 숫자(x,y,z)가 필요하므로 3을 곱해준다.

for (let i = 0; i < numPoints; i++) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;

  positions[i * 3] = x;
  positions[i * 3 + 1] = y;
  positions[i * 3 + 2] = z;
}

const bufferGeometry = new THREE.BufferGeometry(); // 버터 지오메트리는 일반 지오메트리와 달리 GPU를 사용하여 렌더링을 좀 더 효율적으로 한다.
bufferGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3), // 3개의 숫자(x,y,z)가 필요하므로 3을 넣어준다.
);

const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.05,
});
const points = new THREE.Points(bufferGeometry, pointsMaterial);
points.position.set(0, 0, -5);
scene.add(points);

const orbitControls = new OrbitControls(camera, renderer.domElement); // 카메라와 렌더러를 넣어준다.
orbitControls.update(); // 컨트롤을 업데이트 해준다.

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera); // 렌더링을 수행한다.
  requestAnimationFrame(render); // 내부에서 자신을 호출하여 애니메이션을 수행한다.
};

render();
