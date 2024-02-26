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

camera.position.y = 5;
camera.position.z = 5;
camera.position.x = 5;

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

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
});
const frontSide = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSide.position.z = 4;
frontSide.position.y = 0.5;
frontSide.castShadow = true; // 그림자를 드리워 지도록 설정
frontSide.receiveShadow = true; // 그림자를 받을 수 있도록 설정
scene.add(frontSide);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSide = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSide.position.set(2, 0.5, 3);
backSide.position.y = 0.51;
// backSide.castShadow = true; // 그림자를 드리워 지도록 설정
backSide.receiveShadow = true; // 그림자를 받을 수 있도록 설정
scene.add(backSide);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const doubleSide = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSide.position.set(4, 0.5, 4);
doubleSide.position.y = 0.51;
doubleSide.receiveShadow = true; // 그림자를 받을 수 있도록 설정
// doubleSide.castShadow = true; // 그림자를 드리워 지도록 설정
scene.add(doubleSide);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
torusKnotStandMaterial.roughness = 0.5; // 표면의 거칠기
torusKnotStandMaterial.metalness = 1; // 금속성
const torusKnotStandMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotStandMaterial,
);
torusKnotStandMesh.castShadow = true; // 그림자를 드리워 지도록 설정
torusKnotStandMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
torusKnotStandMesh.position.set(-4, 1, 0);
scene.add(torusKnotStandMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
torusKnotLambertMaterial.emissive = new THREE.Color(0x00ff00); // 발광색
torusKnotLambertMaterial.emissiveIntensity = 0.2; // 발광 강도
const torusKnotLambertMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial,
);
torusKnotLambertMesh.castShadow = true; // 그림자를 드리워 지도록 설정
torusKnotLambertMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00); // 발광색
torusKnotPhongMaterial.emissiveIntensity = 0.2; // 발광 강도
torusKnotPhongMaterial.specular = new THREE.Color(0xf0ff0f); // 반사색
torusKnotPhongMaterial.shininess = 100; // 광택
const torusKnotPhongMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotPhongMaterial,
);
torusKnotPhongMesh.castShadow = true; // 그림자를 드리워 지도록 설정
torusKnotPhongMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const torusKnotBasicMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotBasicMaterial,
);

torusKnotBasicMesh.castShadow = true; // 그림자를 드리워 지도록 설정
torusKnotBasicMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff });
torusKnotDepthMaterial.opacity = 0.5; // 투명도
const torusKnotDepthMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotDepthMaterial,
);

torusKnotDepthMesh.castShadow = true; // 그림자를 드리워 지도록 설정
torusKnotDepthMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp", (texture) => {
//   const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//   textureMesh.castShadow = true; // 그림자를 드리워 지도록 설정
//   textureMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
//   textureMesh.position.set(0, 0.5, 2);
//   scene.add(textureMesh);
// });

// 비동기 방식
const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({ map: texture });
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.castShadow = true; // 그림자를 드리워 지도록 설정
textureMesh.receiveShadow = true; // 그림자를 받을 수 있도록 설정
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

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
  textureMesh.rotation.y += 0.01;
};

render();
