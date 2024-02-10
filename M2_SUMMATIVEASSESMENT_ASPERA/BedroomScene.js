

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xA16C35, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Create walls
const wall1 = createWall(0, 0, -5, 20, 10);
const wall2 = createWall(0, 0, 10, 20, 10);
const wall3 = createWall(-10, 0, 0, 10, 10, Math.PI / 2);
const wall4 = createWall(10, 0, 0, 10, 10, Math.PI / 2);
scene.add(wall1, wall2, wall3, wall4);

// Create a roof
const roofGeometry = new THREE.BoxGeometry(20, 0.1, 20); // Adjusted size to cover the entire scene
const roofMaterial = new THREE.MeshStandardMaterial({ color: 0xA16C35 });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.position.set(0, 5, 0); // Adjusted position to be above the walls
scene.add(roof);

// Add windows to the walls
const window1 = createWindow(-10, 3, 0, 5, 4, Math.PI / 2);
const window2 = createWindow(10, 3, 0, 5, 4, Math.PI / 2);
const window3 = createWindow(0, 3, -5, 5, 4, 0);
const window4 = createWindow(10, 3, 5, 1, 4, 0);
scene.add(window1, window2, window3, window4);

const windowHandle1 = createWindowHandle(-10, 3, 0, 0.1, 0.1, Math.PI / 2);
const windowHandle2 = createWindowHandle(10, 3, 0, 0.1, 0.1, Math.PI / 2);
const windowHandle3 = createWindowHandle(0, 3, -5, 0.1, 0.1, 0);
const windowHandle4 = createWindowHandle(20, 3, 5, 0.1, 0.1, 0);
scene.add(windowHandle1, windowHandle2, windowHandle3, windowHandle4);

// Add window frames to the windows
const windowFrame1 = createWindowFrame(-10, 3, 0, 0.1, 4, Math.PI / 2);
const windowFrame2 = createWindowFrame(10, 3, 0, 0.1, 4, Math.PI / 2);
const windowFrame3 = createWindowFrame(20, 3, -1, 1.1, 4.1, 0);
const windowFrame4 = createWindowFrame(0, 3, 2.5, 0.1, 1.9, 0);
scene.add(windowFrame1, windowFrame2, windowFrame3, windowFrame4);

// Add a bed
const bed = createBed(-7, 0.1, 0); // Adjusted position of the bed
scene.add(bed);

// Add foam layer under the pillows
const foam = createFoam(-7, 0.08, -2.5); // Adjusted position of the foam
scene.add(foam);

// Add pillows to the bed
const pillow1 = createPillow(-8.5, 0.3, -2.5); // Adjusted position of the pillows
const pillow2 = createPillow(-5.5, 0.3, -2.5); // Adjusted position of the pillows
scene.add(pillow1, pillow2);

// Add a study area with a table and chair
const studyTable = createStudyTable(7, 1.8, -3);
const chair = createChair(-7, 1, 2, Math.PI); // Adjusted rotation of the chair
scene.add(studyTable, chair);

// Add a laptop on the table
const laptop = createLaptop(7, 2, -3);
scene.add(laptop);

// Add trashcan beside the table
const trashcan = createTrashcan(3, 0.9, -3);
scene.add(trashcan);

// Position camera
camera.position.set(0, 3 , 10);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 5, 5);
scene.add(directionalLight);

// Function to create a wall
function createWall(x, y, z, width, height, rotation = 0) {
    const wallGeometry = new THREE.PlaneGeometry(width, height);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xD06868, side: THREE.DoubleSide });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.set(x, y, z);
    wall.rotation.y = rotation;
    return wall;
}

// Function to create a window
function createWindow(x, y, z, width, height, rotation = 0) {
    const windowGeometry = new THREE.PlaneGeometry(width, height);
    const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x99ccff, transparent: true, opacity: 0.5, side: THREE.DoubleSide });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(x, y, z);
    window.rotation.y = rotation;
    return window;
}

// Function to create a window handle
function createWindowHandle(x, y, z, width, height, rotation = 0) {
    const handleGeometry = new THREE.BoxGeometry(5, 0.1, 0.1);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(x, y + (height / 2), z);
    handle.rotation.y = rotation;
    return handle;
}

// Function to create a window frame
function createWindowFrame(x, y, z, width, height, rotation = 0) {
    const frameGeometry = new THREE.BoxGeometry(width, height, 0.1); // Adjusted size
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(x, y, z);
    frame.rotation.y = rotation;
    return frame;
}

// Function to create a bed
function createBed(x, y, z) {
    const bedGeometry = new THREE.BoxGeometry(8, 0.3, 7);
    const bedMaterial = new THREE.MeshStandardMaterial({ color: 0x663300 });
    const bed = new THREE.Mesh(bedGeometry, bedMaterial);
    bed.position.set(x, y, z);
    return bed;
}

// Function to create a foam layer
function createFoam(x, y, z) {
    const foamGeometry = new THREE.BoxGeometry(7, 1, 11); // Adjusted size
    const foamMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const foam = new THREE.Mesh(foamGeometry, foamMaterial);
    foam.position.set(x, y, z);
    return foam;
}

// Function to create a pillow
function createPillow(x, y, z) {
    const pillowGeometry = new THREE.BoxGeometry(2, 1.5, 2);
    const pillowMaterial = new THREE.MeshStandardMaterial({ color: 0x0EB2B2 });
    const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    pillow.position.set(x, y, z);
    return pillow;
}

// Function to create a study table
function createStudyTable(x, y, z) {
    // Table top
    const tableTopGeometry = new THREE.BoxGeometry(5, 0.2, 2);
    const tableTopMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
    tableTop.position.set(x, y, z);

    // Legs
    const legGeometry = new THREE.BoxGeometry(0.2, 2, 0.2);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    const leg3 = new THREE.Mesh(legGeometry, legMaterial);
    const leg4 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(x - 1.8, y - 1, z - 0.8);
    leg2.position.set(x - 1.8, y - 1, z + 0.8);
    leg3.position.set(x + 1.8, y - 1, z - 0.8);
    leg4.position.set(x + 1.8, y - 1, z + 0.8);

    const table = new THREE.Group();
    table.add(tableTop, leg1, leg2, leg3, leg4);

    return table;
}

// Function to create a chair
function createChair(x, y, z, rotation) {
    // Seat
    const seatGeometry = new THREE.BoxGeometry(1.5, 0.2, 1.5);
    const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(x, y, z);

    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(1.5, 1.5, 0.2);
    const backrestMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
    backrest.position.set(x, y + 0.75, z - 0.8);

    // Armrests
    const armrestGeometry = new THREE.BoxGeometry(0.2, 0.1, 2);
    const armrestMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const armrest1 = new THREE.Mesh(armrestGeometry, armrestMaterial);
    const armrest2 = new THREE.Mesh(armrestGeometry, armrestMaterial);
    armrest1.position.set(x - 0.7, y + 0.65, z - 0.12);
    armrest2.position.set(x + 0.7, y + 0.65, z - 0.12);

    // Back legs
    const legGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
    const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const leg1 = new THREE.Mesh(legGeometry, legMaterial);
    const leg2 = new THREE.Mesh(legGeometry, legMaterial);
    leg1.position.set(x - 0.7, y - 0.75, z - 0.8);
    leg2.position.set(x + 0.7, y - 0.75, z - 0.8);

    // Front legs
    const backLegGeometry = new THREE.BoxGeometry(0.2, 1.5, 0.2);
    const leg3 = new THREE.Mesh(backLegGeometry, legMaterial);
    const leg4 = new THREE.Mesh(backLegGeometry, legMaterial);
    leg3.position.set(x - 0.7, y - 0.75, z + 0.8);
    leg4.position.set(x + 0.7, y - 0.75, z + 0.8);

    const chair = new THREE.Group();
    chair.add(seat, backrest, armrest1, armrest2, leg1, leg2, leg3, leg4);
    chair.rotation.y = rotation;

    return chair;
}

// Function to create a laptop
function createLaptop(x, y, z) {
    const baseGeometry = new THREE.BoxGeometry(4, 0.2, 2);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(x, y, z);

    const screenGeometry = new THREE.BoxGeometry(3, 0.6, 0.5);
    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(x, y + 0.03, z + 0.1);

    const laptop = new THREE.Group();
    laptop.add(base, screen);

    return laptop;
}

// Function to create a trashcan
function createTrashcan(x, y, z) {
    const trashcanBaseGeometry = new THREE.CylinderGeometry(1, 0.5, 2, 5);
    const trashcanBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
    const trashcanBase = new THREE.Mesh(trashcanBaseGeometry, trashcanBaseMaterial);
    trashcanBase.position.set(x, y, z);

    const trashcanLidGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 5);
    const trashcanLid = new THREE.Mesh(trashcanLidGeometry, trashcanBaseMaterial);
    trashcanLid.position.set(x, y + 1, z);

    const trashcan = new THREE.Group();
    trashcan.add(trashcanBase, trashcanLid);

    return trashcan;
}



// Render loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
