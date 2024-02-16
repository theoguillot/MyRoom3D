import * as THREE from 'three';

export function createMaterials() {
    const materials = {};

    materials.chessboardTexture = new THREE.TextureLoader().load('/textures/chessboard.jpg');
    console.log(materials)
    return materials;
}
