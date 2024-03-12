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

const TopFloorTexture = textureLoader.load('/textures/topfloor.jpg')
TopFloorTexture.flipY = false
TopFloorTexture.colorSpace = THREE.SRGBColorSpace

const BottomFloorTexture = textureLoader.load('/textures/bottomfloor.jpg')
BottomFloorTexture.flipY = false
BottomFloorTexture.colorSpace = THREE.SRGBColorSpace

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

const GithubTexture = textureLoader.load('/textures/github.jpg')
GithubTexture.flipY = false
GithubTexture.colorSpace = THREE.SRGBColorSpace

const LinkedinTexture = textureLoader.load('/textures/linkedin.jpg')
LinkedinTexture.flipY = false
LinkedinTexture.colorSpace = THREE.SRGBColorSpace

const KeyboardTexture = textureLoader.load('/textures/keyboard.jpg')
KeyboardTexture.flipY = false
KeyboardTexture.colorSpace = THREE.SRGBColorSpace

const WindowTexture = textureLoader.load('/textures/window.jpg')
WindowTexture.flipY = false
WindowTexture.colorSpace = THREE.SRGBColorSpace

const DiceTexture = textureLoader.load('/textures/dice.jpg')
DiceTexture.flipY = false
DiceTexture.colorSpace = THREE.SRGBColorSpace

const CubeTexture = textureLoader.load('/textures/cube.jpg')
CubeTexture.flipY = false
CubeTexture.colorSpace = THREE.SRGBColorSpace

const Book1Texture = textureLoader.load('/textures/book1.jpg')
Book1Texture.flipY = false
Book1Texture.colorSpace = THREE.SRGBColorSpace

const Book2Texture = textureLoader.load('/textures/book2.jpg')
Book2Texture.flipY = false
Book2Texture.colorSpace = THREE.SRGBColorSpace

const Book3Texture = textureLoader.load('/textures/book3.jpg')
Book3Texture.flipY = false
Book3Texture.colorSpace = THREE.SRGBColorSpace

const PlantTexture = textureLoader.load('/textures/plant.jpg')
PlantTexture.flipY = false
PlantTexture.colorSpace = THREE.SRGBColorSpace

const CVTexture  = textureLoader.load('/textures/CV.jpg')
CVTexture.flipY = false
CVTexture.colorSpace = THREE.SRGBColorSpace

const ChairTexture  = textureLoader.load('/textures/chair.jpg')
ChairTexture.flipY = false
ChairTexture.colorSpace = THREE.SRGBColorSpace


const DeskOjectsTexture  = textureLoader.load('/textures/deskobjects.jpg')
DeskOjectsTexture.flipY = false
DeskOjectsTexture.colorSpace = THREE.SRGBColorSpace

/**
 * Materials
 */
// Baked material
const BlackPiecesMaterial = new THREE.MeshLambertMaterial({ map: BlackPiecesTexture })
const ChessboardMaterial = new THREE.MeshLambertMaterial({ map: Chessboard })
const WhitePiecesMaterial = new THREE.MeshLambertMaterial({ map: WhitePiecesTexture })
const MonitorMaterial = new THREE.MeshLambertMaterial({ map: MonitorTexture })
const TopFloorMaterial = new THREE.MeshLambertMaterial({ map: TopFloorTexture })
const WallMaterial = new THREE.MeshLambertMaterial({ map: WallTexture })
const PosterMaterial = new THREE.MeshLambertMaterial({ map: PosterTexture })
const DeskMaterial = new THREE.MeshLambertMaterial({ map: DeskTexture })
const EtagereMaterial = new THREE.MeshLambertMaterial({ map: EtagereTexture })
const GithubMaterial = new THREE.MeshLambertMaterial({ map: GithubTexture })
const KeyboardMaterial = new THREE.MeshLambertMaterial({ map: KeyboardTexture })
const WindowMaterial = new THREE.MeshLambertMaterial({ map: WindowTexture })
const DiceMaterial = new THREE.MeshLambertMaterial({ map: DiceTexture })
const CubeMaterial = new THREE.MeshLambertMaterial({ map: CubeTexture })
const Book1Material = new THREE.MeshLambertMaterial({ map: Book1Texture })
const Book2Material = new THREE.MeshLambertMaterial({ map: Book2Texture })
const PlantMaterial = new THREE.MeshLambertMaterial({ map: PlantTexture })
const Book3Material = new THREE.MeshLambertMaterial({ map: Book3Texture })
const LinkedinMaterial = new THREE.MeshLambertMaterial({ map: LinkedinTexture })
const CVMaterial = new THREE.MeshLambertMaterial({ map: CVTexture })
const ChairMaterial = new THREE.MeshLambertMaterial({ map: ChairTexture })
const BottomFloorMaterial = new THREE.MeshLambertMaterial({ map: BottomFloorTexture })
const DeskOjectsMaterial = new THREE.MeshLambertMaterial({ map: DeskOjectsTexture })




 
/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster()
let currentIntersect = null
const rayOrigin = new THREE.Vector3(- 3, 0, 0)
const rayDirection = new THREE.Vector3(10, 0, 0)
rayDirection.normalize()
let clickedCV = null;
let _wrapper = null;

const _CVLastTransform = {
    position: new THREE.Vector3(),
    rotation: new THREE.Quaternion()
};

const moveCVToFront = (_wrapper) => {
    // Calculate the new position for the CV object
    const direction = new THREE.Vector3();
    let _CVLastPosition = new THREE.Vector3(); 
    
    _CVLastPosition.copy(_wrapper.position);
    const globalPosition = _wrapper.getWorldPosition(new THREE.Vector3());
    _CVLastTransform.position.copy(globalPosition);
    _CVLastTransform.rotation.copy(_wrapper.rotation);

};

/**
 * Model
 */
gltfLoader.load(
    '/models/portal.glb',
    (gltf) => {

        const bakedWalls = gltf.scene.children.find(child => child.name.startsWith('Wall'))
        bakedWalls.material = WallMaterial

        const bakedbook1 = gltf.scene.children.find(child => child.name.startsWith('book1'))
        bakedbook1.material = Book1Material

        const bakedbook2 = gltf.scene.children.find(child => child.name.startsWith('book2'))
        bakedbook2.material = Book2Material

        const bakedbook3 = gltf.scene.children.find(child => child.name.startsWith('book3'))
        bakedbook3.material = Book3Material

        const bakedChessboard = gltf.scene.children.find(child => child.name.startsWith('Chessboard'))
        bakedChessboard.material = ChessboardMaterial

        const bakedBChessboard = gltf.scene.children.find(child => child.name.startsWith('BChessboard'))
        bakedBChessboard.material = BlackPiecesMaterial

        const bakedWChessboard = gltf.scene.children.find(child => child.name.startsWith('WChessboard'))
        bakedWChessboard.material = WhitePiecesMaterial

        const bakedTopFloor = gltf.scene.children.find(child => child.name.startsWith('TopFloor'))
        bakedTopFloor.material = TopFloorMaterial

        const bakedPoster = gltf.scene.children.find(child => child.name.startsWith('poster'))
        bakedPoster.material = PosterMaterial

        const bakedDesk = gltf.scene.children.find(child => child.name.startsWith('desk-merged'))
        bakedDesk.material = DeskMaterial

        const bakedEtagere = gltf.scene.children.find(child => child.name.startsWith('Etagere'))
        bakedEtagere.material = EtagereMaterial

        const bakedGithub = gltf.scene.children.find(child => child.name.startsWith('Github'))
        bakedGithub.material = GithubMaterial

        const bakedLinkedin = gltf.scene.children.find(child => child.name.startsWith('linkedin'))
        bakedLinkedin.material = LinkedinMaterial

        const CV = gltf.scene.children.find(child => child.name.startsWith('CV'))
        CV.material = CVMaterial

        const bakeddeskObjects = gltf.scene.children.find(child => child.name.startsWith('deskobj'))
        bakeddeskObjects.material = DeskOjectsMaterial

        const bakedWindow = gltf.scene.children.find(child => child.name.startsWith('Window'))
        bakedWindow.material = WindowMaterial

        const bakedDice = gltf.scene.children.find(child => child.name.startsWith('Dice'))
        bakedDice.material = DiceMaterial

        const bakedCube = gltf.scene.children.find(child => child.name.startsWith('Cube'))
        bakedCube.material = CubeMaterial

        const bakedPlant = gltf.scene.children.find(child => child.name.startsWith('plant'))
        bakedPlant.material = PlantMaterial

        const bakedChair = gltf.scene.children.find(child => child.name.startsWith('chair'))
        bakedChair.material = ChairMaterial
        
        const bakedBottomFloor = gltf.scene.children.find(child => child.name.startsWith('BottomFloor'))
        bakedBottomFloor.material = BottomFloorMaterial

        const bakedKeyBoard = gltf.scene.children.find(child => child.name.startsWith('Keyboard'))
        bakedKeyBoard.material = KeyboardMaterial
              

        scene.add(gltf.scene);
    }
);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
canvas.addEventListener('click', (event) => {
    event.preventDefault();

    // Calculate mouse coordinates in normalized device coordinates (NDC)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;

    // Raycasting from camera to mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        const intersect = intersects[0];

        // Check if the intersected object is the CV
        if (intersect.object.name === "CV") {
            // Set clickedCV to the intersected object
            clickedCV = intersect.object;

            // Pass the intersected object to moveCVToFront function
            moveCVToFront(clickedCV);
            console.log("XD")
        }
    }
});



// const axesHelper = new THREE.AxesHelper( 5 );
// axesHelper.position.y = 1
// scene.add( axesHelper );
/**
 * Camera
 */
// Base camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000 );
    camera.position.set(7.63, 6.88, 8.3); 
    scene.add(camera)
    


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio * 2)

debugObject.clearColor = '#201919'
renderer.setClearColor(debugObject.clearColor)
gui.addColor(debugObject, 'clearColor')
gui.onChange(()=>
{
    renderer.setClearColor(debugObject.clearColor)
})
// Render Target
const renderTarget = new THREE.WebGLRenderTarget(
    800, 
    600,
    {
        samples: 5
    }
    )
//Effect composer
const composer = new EffectComposer(renderer, renderTarget);
composer.setSize(sizes.width, sizes.height)
composer.setPixelRatio(2)


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
// Window resize event listener
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update composer
    composer.setSize(sizes.width, sizes.height);
});
// light 
scene.add(new THREE.AmbientLight(0xffffff, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
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