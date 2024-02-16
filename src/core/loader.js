import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadModel(scene, materials) {
    const loader = new GLTFLoader(); // Use GLTFLoader from 'three/examples/jsm/loaders/GLTFLoader.js'
    loader.load('/models/room.glb', function (gltf) {
        const model = gltf.scene;
        
        model.traverse(function (child) {
            if (child.name === 'Chessboard') {
                child.material = new THREE.MeshStandardMaterial({ map: materials.chessboardTexture });
            }
        });

        scene.add(model);
    }, undefined, function (error) {
        console.error(error);
    });
}
