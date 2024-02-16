import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)



/*
 * Textures
 */
const BlackPiecesTexture = textureLoader.load('/textures/Bchessboard.jpg')
BlackPiecesTexture.flipY = false
BlackPiecesTexture.colorSpace = THREE.SRGBColorSpace

const Chessboard = textureLoader.load('/textures/chessboard.jpg')
Chessboard.flipY = false
Chessboard.colorSpace = THREE.SRGBColorSpace

const WhitePiecesTexture = textureLoader.load('/textures/Wchessboard.jpg')
WhitePiecesTexture.flipY = false
WhitePiecesTexture.colorSpace = THREE.SRGBColorSpace

const MonitorTexture = textureLoader.load('/textures/monitor.jpg')
MonitorTexture.flipY = false
MonitorTexture.colorSpace = THREE.SRGBColorSpace

const FloorTexture = textureLoader.load('/textures/floor.jpg')
FloorTexture.flipY = false
FloorTexture.colorSpace = THREE.SRGBColorSpace

const WallTexture = textureLoader.load('/textures/walls.jpg')
WallTexture.flipY = false
WallTexture.colorSpace = THREE.SRGBColorSpace

const PosterTexture = textureLoader.load('/textures/poster.jpg')
PosterTexture.flipY = false
PosterTexture.colorSpace = THREE.SRGBColorSpace

const DeskTexture = textureLoader.load('/textures/desk.jpg')
DeskTexture.flipY = false
DeskTexture.colorSpace = THREE.SRGBColorSpace

const EtagereTexture = textureLoader.load('/textures/etagere.jpg')
EtagereTexture.flipY = false
EtagereTexture.colorSpace = THREE.SRGBColorSpace

const LogoTexture = textureLoader.load('/textures/github.jpg')
LogoTexture.flipY = false
LogoTexture.colorSpace = THREE.SRGBColorSpace

const KeyboardTexture = textureLoader.load('/textures/keyboard.jpg')
KeyboardTexture.flipY = false
KeyboardTexture.colorSpace = THREE.SRGBColorSpace

const WindowTexture = textureLoader.load('/textures/window.jpg')
WindowTexture.flipY = false
WindowTexture.colorSpace = THREE.SRGBColorSpace

const DiceTexture = textureLoader.load('/textures/dice.jpg')
DiceTexture.flipY = false
DiceTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const BlackPiecesMaterial = new THREE.MeshBasicMaterial({ map: BlackPiecesTexture })
const ChessboardMaterial = new THREE.MeshBasicMaterial({ map: Chessboard })
const WhitePiecesMaterial = new THREE.MeshBasicMaterial({ map: WhitePiecesTexture })
const MonitorMaterial = new THREE.MeshBasicMaterial({ map: MonitorTexture })
const FloorMaterial = new THREE.MeshBasicMaterial({ map: FloorTexture })
const WallMaterial = new THREE.MeshBasicMaterial({ map: WallTexture })
const PosterMaterial = new THREE.MeshBasicMaterial({ map: PosterTexture })
const DeskMaterial = new THREE.MeshBasicMaterial({ map: DeskTexture })
const EtagereMaterial = new THREE.MeshBasicMaterial({ map: EtagereTexture })
const LogoMaterial = new THREE.MeshBasicMaterial({ map: LogoTexture })
const KeyboardMaterial = new THREE.MeshBasicMaterial({ map: KeyboardTexture })
const WindowMaterial = new THREE.MeshBasicMaterial({ map: WindowTexture })
const DiceMaterial = new THREE.MeshBasicMaterial({ map: DiceTexture })



// Pole light material

// Portal light material

 
/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()

/**
 * Model
 */
gltfLoader.load(
    '/models/portal.glb',
    (gltf) => {
        // Material for outlining the object
        //const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

        // Iterate through the children of the loaded GLTF scene to find and apply the texture to chessboard meshes
        gltf.scene.traverse((child) => {
            if (child.isMesh && child.name.startsWith("BChessboard")) {
                child.material = BlackPiecesMaterial;
            }
            if (child.isMesh && child.name.startsWith("Chessboard")) {
                child.material = ChessboardMaterial;
            }
            if (child.isMesh && child.name.startsWith("WChessboard")) {
                child.material = WhitePiecesMaterial;
            }
            if (child.isMesh && child.name.startsWith("Monitor")) {
                child.material = MonitorMaterial;
            }
            if (child.isMesh && child.name.startsWith("Floor")) {
                child.material = FloorMaterial;
            }
            if (child.isMesh && child.name.startsWith("Wall")) {
                child.material = WallMaterial;
            }
            if (child.isMesh && child.name.startsWith("poster")) {
                child.material = PosterMaterial;
            }
            if (child.isMesh && child.name.startsWith("desk")) {
                child.material = DeskMaterial;
            }
            if (child.isMesh && child.name.startsWith("Etagere")) {
                child.material = EtagereMaterial;
            }
            if (child.isMesh && child.name.startsWith("logo")) {
                child.material = LogoMaterial;
            }
            if (child.isMesh && child.name.startsWith("Keyboard")) {
                child.material = KeyboardMaterial;
            }
            if (child.isMesh && child.name.startsWith("Window")) {
                child.material = WindowMaterial;
            }
            if (child.isMesh && child.name.startsWith("Dice")) {
                child.material = DiceMaterial;
            }
            //console.log(child.name)
        });

        scene.add(gltf.scene);

        // Add outline pass to the composer
    }
);


/**
 * Fireflies
 */
//Geometry


//Material

//POints
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //Update fireflies
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

debugObject.clearColor = '#201919'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor')
gui.onChange(()=>
{
    renderer.setClearColor(debugObject.clearColor)
})

const composer = new EffectComposer(renderer);

const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.visibleEdgeColor.set(0xffffff); // Set the color of the outline
outlinePass.hiddenEdgeColor.set(0xffffff); // Set the color of hidden edges
outlinePass.edgeThickness = 2; // Adjust the thickness of the outline
outlinePass.edgeStrength = 10; // Adjust the strength of the outline

composer.addPass(outlinePass);
const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);  
composer.addPass(gammaCorrectionPass);
/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    //update fireflies

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    // Update composer
    composer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()