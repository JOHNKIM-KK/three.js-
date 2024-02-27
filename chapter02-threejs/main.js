import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DoubleSide } from "three";

// antialias  Box mesh 등 끝부분이 우글거리는 현상을 완화 해준다.
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true; // 그림자를 사용하도록 설정
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 그림자의 형태를 설정
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

const floorGeometry = new THREE.PlaneGeometry(20, 20, 20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
}); // 바닥의 색상
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 바닥을 x축으로 90도 회전 ( 회전값은 라디안 값을 쓰게되는데 라디안은 PI가 180도 이므로 90도는 PI/2 이다. 180도는 PI 이다. 360도는 2PI 이다.  )
floor.receiveShadow = true; // 바닥이 그림자를 받을 수 있도록 설정
floor.castShadow = true; // 바닥이 그림자를 드리워 지도록 설정
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 }); // 박스의 색상
const box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.y = 0.5; // 박스의 y축 위치를 0.5로 설정하여 바닥과 겹치지 않도록 설정
box.castShadow = true; // 박스가 그림자를 드리워 지도록 설정
box.receiveShadow = true; // 박스가 그림자를 받을 수 있도록 설정
scene.add(box);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // 태양광 설정
directionalLight.castShadow = true; // 태양광이 그림자를 드리워 지도록 설정
directionalLight.position.set(3, 4, 5); // 태양광의 위치 설정
directionalLight.lookAt(0, 0, 0); // 태양광이 바라보는 방향 설정
directionalLight.shadow.mapSize.width = 4096; // 그림자의 해상도 설정
directionalLight.shadow.mapSize.height = 4096; // 그림자의 해상도 설정
directionalLight.shadow.camera.top = 2; // 그림자의 카메라의 near 설정
directionalLight.shadow.camera.bottom = -2; // 그림자의 카메라의 near 설정
directionalLight.shadow.camera.left = -2; // 그림자의 카메라의 near 설정
directionalLight.shadow.camera.right = 2; // 그림자의 카메라의 near 설정
directionalLight.shadow.camera.near = 0.1; // 그림자의 카메라의 near 설정
directionalLight.shadow.camera.far = 100; // 그림자의 카메라의 near 설정
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1,
); // 태양광의 위치를 보여주는 헬퍼
scene.add(directionalLightHelper);

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
