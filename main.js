// First, include the Three.js library
import * as THREE from "three";
import "./style.css";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// Then, import OrbitControls
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add background
const background = new THREE.TextureLoader().load("./assets/bg1.png");
scene.background = background;

/**
 *  ************************************************ START - MODELS *********************************************************************
 */
// MITO
const scaleSize = 1;
const loader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
let model;
const mixers = [];
loader.load("./assets/mito_idle_color.gltf", (gltf) => {
  model = gltf.scene;
  scene.add(model);
  // Access animations
  gltf.animations.forEach((animation) => {
    const mixer = new THREE.AnimationMixer(model);
    mixers.push(mixer);
    const action = mixer.clipAction(animation);
    // Play the animation
    action.play();
  });

  // Set initial position
  model.position.setX(3);
  model.scale.set(scaleSize, scaleSize, scaleSize);
  // Set initial rotation
  model.rotateX(0.2);
  model.rotateY(-0.9);
  model.rotateZ(0);
});

let model2;
const mixers2 = [];
loader.load("./assets/Mito_anim_one.gltf", (gltf) => {
  model2 = gltf.scene;
  scene.add(model2);
  // Access animations
  gltf.animations.forEach((animation) => {
    const mixer = new THREE.AnimationMixer(model2);
    mixers2.push(mixer);
    const action = mixer.clipAction(animation);
    // Play the animation
    action.play();
  });
  // Set initial position
  model2.position.setX(3);
  model2.position.setZ(10);
  model2.scale.set(scaleSize, scaleSize, scaleSize);
  // Set initial rotation
  model2.rotateX(0.2);
  model2.rotateY(-0.9);
  model2.rotateZ(0);
});

/**
 *  MODEL 3
 */

let model3;
const mixers3 = [];
loader.load("./assets/Glucose_puruvate.gltf", (gltf) => {
  model3 = gltf.scene;
  scene.add(model3);
  // Access animations
  gltf.animations.forEach((animation) => {
    const mixer = new THREE.AnimationMixer(model3);
    mixers3.push(mixer);
    const action = mixer.clipAction(animation);
    // Play the animation
    action.play();
  });

  // Set initial position
  model3.position.setX(25);
  model3.position.setZ(0);
  const scale = 0.3;
  model3.scale.set(scale, scale, scale);
  // Set initial rotation
  model3.rotateX(0);
  model3.rotateY(0);
  model3.rotateZ(0);
});

/**
 * MODEL 4
 */

const mixers4 = [];
let model4;
loader.load("./assets/End_of_process.gltf", (gltf) => {
  model4 = gltf.scene;
  scene.add(model4);
  // Access animations
  gltf.animations.forEach((animation) => {
    const mixer = new THREE.AnimationMixer(model4);
    mixers4.push(mixer);
    const action = mixer.clipAction(animation);
    // Play the animation
    action.play();
  });

  // Set initial position
  model4.position.setX(3);
  model4.position.setZ(0);
  model4.scale.set(scaleSize, scaleSize, scaleSize);
  // Set initial rotation
  model4.rotateX(0.2);
  model4.rotateY(-0.9);
  model4.rotateZ(0);
  model4.visible = false;
});

/**
 * MODEL 5
 */

const mixers5 = [];
let model5;
loader.load("./assets/Formula.gltf", (gltf) => {
  model5 = gltf.scene;
  scene.add(model5);
  // Access animations
  gltf.animations.forEach((animation) => {
    const mixer = new THREE.AnimationMixer(model5);
    mixers5.push(mixer);
    const action = mixer.clipAction(animation);
    // Play the animation
    action.play();
  });

  // Set initial position
  model5.position.setX(2);
  model5.position.setZ(0);
  model5.position.setY(-1);
  model5.scale.set(scaleSize, scaleSize, scaleSize);
  // Set initial rotation
  model5.rotateX(0.2);
  model5.rotateY(-0.3);
  model5.rotateZ(0);
  model5.visible = false;
});

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: "pink" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

/**
 *  ************************************************ END - MODELS *********************************************************************
 */

// Position the camera
camera.position.z = 5;

// Add ambient light to the scene
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Add point light to the scene
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(3, 3, 1.5);
scene.add(pointLight);

// Helpers
const lightHelper = new THREE.PointLightHelper(pointLight, 1);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

let rotateFlip = true;

const pages = [
  {
    header: "Cellular Respiration",
    subtitle: "Chemical Exchange",
    p1: "Breathing is the process of moving air into and out of the lungs to facilitate gas exchange with the environment. This brings oxygen from the air, and flushes out carbon dioxide, making it a physical process.",
    p2: "Internal respiration is the exchange of substances between blood and cells, making it a chemical process.",
    p3: "Cellular respiration is the release of energy from food substances in living cells.",
    xPosition: 0,
  },
  {
    header: "The Mitochondria",
    subtitle: "The powerhouse of the cells",
    p1: "There are two types of cellular respiration, Aerobic Respiration and Anaerobic Respiration.",
    p2: "Aerobic respiration is the process by which oxygen breathing creatures turn fuel like fats and sugars into energy also known as ATP (adenosine triphosphate) with the help of oxygen.",
    p3: "The key organelle inside the cells of aerobic respiration is the mitochondria.",
    xPosition: 16,
  },
  {
    header: "The Mitochondria",
    subtitle: "The powerhouse of the cells",
    p1: "Sugars and fats or to be more accurate, Glucose molecules from food go through a multi step process such as:",
    p2: "Glycolysis , The Krebs cycle and the Electron transport chain.",
    p3: "Described as happening one after the other but in reality they are happening all at the same time.",
    xPosition: 32,
  },
  {
    header: "Glycolysis",
    subtitle: "Food to molecules",
    p1: "Glycolysis is a fundamental metabolic pathway that breaks down glucose into pyruvate, generating ATP and NADH as energy carriers, and occurs in the cytoplasm of cells under both aerobic and anaerobic conditions.",
    p2: "It consists of a series of enzymatic reactions that sequentially convert glucose into two molecules of pyruvate.",
    p3: "",
    xPosition: 20,
  },
  {
    header: "The Krebs cycle",
    subtitle: "Citric acid cycle",
    p1: "The Krebs cycle, also known as the citric acid cycle, is a key metabolic pathway that oxidizes acetyl-CoA derived from carbohydrates, fats, and proteins, producing ATP, NADH, FADH2, and carbon dioxide as byproducts.",
    p2: "It occurs in the mitochondrial matrix and involves a series of enzyme-catalyzed reactions that regenerate oxaloacetate to sustain the cycle.",
    p3: "",
    xPosition: 4,
  },
  {
    header: "Electron Transport chain",
    subtitle: "Atp powerhouse",
    p1: "The electron transport chain is a crucial metabolic pathway in cellular respiration that utilizes electron carriers like NADH and FADH2 to transfer electrons through a series of protein complexes embedded in the inner mitochondrial membrane.",
    p2: "As electrons move through the chain, energy is released and used to pump protons across the membrane, creating a proton gradient that drives ATP synthesis via ATP synthase.",
    p3: "",
    xPosition: 4,
  },
  {
    header: "Cellular Respiration",
    subtitle: "End of the process",
    p1: "At the end of this multistep process one molecule of glucose with the help of six molecules of oxygen can produce 36 ATP (adenosine triphosphate).",
    p2: "Exerting 6 carbon dioxide and 6 water molecules as a byproduct. This makes Aerobic respiration a very efficient process",
    p3: "",
    xPosition: 4,
  },
  {
    header: "Formula",
    subtitle: "This is the way scientist illustrate cellular respiration",
    p1: "C6H12O6 + 6O2 = 6CO2 + 6H2O + ATP",
    p2: "",
    p3: "",
    xPosition: 4,
  },
];
let currentPage = 0;

function nextPage() {
  currentPage++;
  var header = document.getElementById("header");
  var subtitle = document.getElementById("subtitle");
  var p1 = document.getElementById("p1");
  var p2 = document.getElementById("p2");
  var p3 = document.getElementById("p3");

  const page = pages[currentPage];
  header.textContent = pages[currentPage].header;
  subtitle.textContent = pages[currentPage].subtitle;
  p1.textContent = pages[currentPage].p1;
  p2.textContent = pages[currentPage].p2;
  p3.textContent = pages[currentPage].p3;

  if (currentPage === 1) {
    const interval = setInterval(() => {
      if (model2.position.z < 0) {
        clearInterval(interval);
      } else {
        model2.position.setZ(model2.position.z - 0.1);
      }
    }, 5);
  } else if (currentPage === 2) {
  } else if (currentPage === 4) {
    model2.visible = false;
    const interval = setInterval(() => {
      if (camera.position.x < page.xPosition) {
        clearInterval(interval);
        const interval2 = setInterval(() => {
          if (camera.position.z < 1) {
            clearInterval(interval2);
          } else {
            camera.position.setZ(camera.position.z - 0.1);
          }
        }, 5);
      } else {
        camera.position.setX(camera.position.x - 0.1);
      }
    }, 5);
  } else if (currentPage === 5) {
    model2.visible = false;
    const interval2 = setInterval(() => {
      if (camera.position.z < 0.5) {
        clearInterval(interval2);
      } else {
        camera.position.setZ(camera.position.z - 0.1);
      }
    }, 5);
  } else if (currentPage === 6) {
    model4.visible = true;
    const interval2 = setInterval(() => {
      if (camera.position.z > 5 && camera.position.x < 0) {
        clearInterval(interval2);
      } else {
        if (camera.position.z <= 5) {
          camera.position.setZ(camera.position.z + 0.1);
        }
        if (camera.position.x >= 0) {
          camera.position.setX(camera.position.x - 0.1);
        }
      }
    }, 5);
  } else if (currentPage === 7) {
    model4.visible = false;
    model5.visible = true;
    model.visible = false;
  } else {
    const interval = setInterval(() => {
      if (camera.position.x > page.xPosition) {
        clearInterval(interval);
      } else {
        camera.position.setX(camera.position.x + 0.1);
      }
    }, 5);
  }
  // camera.position.setX(page.x);
}

function previousPage() {
  currentPage--;
  var header = document.getElementById("header");
  var subtitle = document.getElementById("subtitle");
  var p1 = document.getElementById("p1");
  var p2 = document.getElementById("p2");
  var p3 = document.getElementById("p3");

  const page = pages[currentPage];
  header.textContent = pages[currentPage].header;
  subtitle.textContent = pages[currentPage].subtitle;
  p1.textContent = pages[currentPage].p1;
  p2.textContent = pages[currentPage].p2;
  p3.textContent = pages[currentPage].p3;
  const interval = setInterval(() => {
    if (camera.position.x < page.xPosition) {
      clearInterval(interval);
    } else {
      camera.position.setX(camera.position.x - 0.1);
    }
  }, 5);
  // camera.position.setX(page.x);
}

// Interaction Button
let interaciton1On = false;
let interaciton2On = false;
let interaciton3On = false;
let interaciton4On = false;
let interaciton5On = false;

function interaciton1() {
  switch (currentPage) {
    case 0: {
      interaciton1On = !interaciton1On;
      interaciton2On = false;
      interaciton3On = false;
      break;
    }
    case 1: {
      interaciton1On = false;
      interaciton2On = !interaciton2On;
      interaciton3On = false;
      break;
    }
    case 3: {
      interaciton1On = false;
      interaciton2On = false;
      interaciton3On = !interaciton2On;
    }
    case 6: {
      interaciton4On = !interaciton4On;
    }
    case 7: {
      interaciton5On = !interaciton5On;
    }
  }
}

const toggleButton1 = document.getElementById("interaction1");
if (toggleButton1) {
  toggleButton1.addEventListener("click", interaciton1);
}

const nextButton = document.getElementById("next");
nextButton.addEventListener("click", nextPage);
// const previousButton = document.getElementById("previous");
// previousButton.addEventListener("click", previousPage);

// function onScroll() {
//   // Calculate camera position based on scroll position
//   const targetPositionSection1 = document
//     .getElementById("section_1")
//     .getBoundingClientRect().top;
//   const targetPositionSection2 = document
//     .getElementById("section_2")
//     .getBoundingClientRect().top;
//   const targetPositionSection3 = document
//     .getElementById("section_3")
//     .getBoundingClientRect().top;

//   let newPositionZ;
//   let newPositionX;
//   let newPositionY;
//   if (
//     !(targetPositionSection1 < 0) &&
//     targetPositionSection1 < targetPositionSection2
//   ) {
//     const distance = Math.max(
//       0,
//       Math.min(
//         1,
//         (window.innerHeight - targetPositionSection1) / window.innerHeight
//       )
//     );
//     newPositionX = 0 + distance * 10; // Adjust according to your scene's requirements
//   } else if (
//     !(targetPositionSection2 < 0) &&
//     targetPositionSection2 < targetPositionSection3
//   ) {
//     const distance = Math.max(
//       0,
//       Math.min(
//         1,
//         (window.innerHeight - targetPositionSection2) / window.innerHeight
//       )
//     );
//     newPositionX = 5 + distance * 5; // Adjust according to your scene's requirements
//   } else {
//     const distance = Math.max(
//       0,
//       Math.min(
//         1,
//         (window.innerHeight - targetPositionSection3) / window.innerHeight
//       )
//     );
//     // newPositionY = 0 + distance * 8; // Adjust according to your scene's requirements
//     newPositionX = 10 + distance * 5; // Adjust according to your scene's requirements
//     // newPositionZ = -2 + distance * 8;
//   }
//   // Update camera position
//   if (newPositionZ) {
//     camera.position.z = newPositionZ;
//   }
//   if (newPositionX) {
//     camera.position.x = newPositionX;
//   }
//   if (newPositionY) {
//     camera.position.y = newPositionY;
//   }
// }

// Listen for scroll events
// window.addEventListener("scroll", onScroll);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  let rotateSpeed = 0.0002;
  if (rotateFlip) {
    model.rotation.z -= rotateSpeed;
  } else {
    model.rotation.z += rotateSpeed;
  }
  if (model.rotation.z > 0.6) {
    rotateFlip = !rotateFlip;
  }
  if (model.rotation.z < 0) {
    rotateFlip = !rotateFlip;
  }

  // if (mixers.length > 0 && interaciton1On) {
  mixers.forEach((mixer, idx) => {
    if (idx === 0) {
      mixer.update(0.01);
    } else if (mixers[idx - 1].time > idx * 0.5) {
      mixer.update(0.01);
    }
  });
  // }
  if (mixers2.length > 0 && interaciton2On) {
    mixers2.forEach((mixer, idx) => {
      mixer.update(0.01);
    });
  }
  if (mixers3.length > 0 && interaciton3On) {
    mixers3.forEach((mixer, idx) => {
      mixer.update(0.01);
    });
  }
  if (mixers4.length > 0 && interaciton4On) {
    mixers4.forEach((mixer, idx) => {
      mixer.update(0.01);
    });
  }
  if (mixers5.length > 0 && interaciton5On) {
    mixers5.forEach((mixer, idx) => {
      mixer.update(0.01);
    });
  }
  renderer.render(scene, camera);
}
animate();
