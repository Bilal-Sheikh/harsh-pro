import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
// import { FontLoader } from "three/addons/loaders/FontLoader.js";
import typefaceFont from "../static/helvetiker_regular.typeface.json";

window.onload = async () => {
    const canvas = document.querySelector(".webgl");

    // Scene

    const scene = new THREE.Scene();

    // Geometry

    const loader = new FontLoader();

    loader.load(
        "fonts/helvetiker_regular.typeface.json",
        // "../static/helvetiker_regular.typeface.json",
        // typefaceFont,
        function (font) {
            const geometry = new TextGeometry("Hello three.js!", {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4,
            });

            geometry.center();

            const material = new THREE.MeshNormalMaterial();

            const text = new THREE.Mesh(geometry, material);
            scene.add(text);
        }
    );

    // Material

    // const cubeMaterial = new THREE.MeshBasicMaterial({ color: 'green' })

    // Mesh

    // const mesh = new THREE.Mesh(cube, cubeMaterial)
    // scene.add(mesh)

    // Camera

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight
    );
    camera.position.z = 3;
    scene.add(camera);

    // Renderer

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // Controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    function animate() {
        requestAnimationFrame(animate);

        controls.update();
        renderer.render(scene, camera);
    }

    animate();
};
