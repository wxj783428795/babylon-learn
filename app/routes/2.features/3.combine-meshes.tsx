import SceneComponent from "babylonjs-hook";
import {
  ArcRotateCamera,
  Color3,
  CreateAudioEngineAsync,
  CreateStreamingSoundAsync,
  FreeCamera,
  HemisphericLight,
  ImportMeshAsync,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Tools,
  Vector3,
  Vector4,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";

const buildGround = () => {
  const ground = MeshBuilder.CreateGround("ground", {
    width: 15,
    height: 16,
  });
  const groundMat = new StandardMaterial("groundMat");
  groundMat.diffuseColor = Color3.Green();
  ground.material = groundMat;
};
const buildBox = (width: number) => {
  const box = MeshBuilder.CreateBox("box", {
    width: width,
    height: 1,
    depth: 1,
    wrap: true,
    faceUV:
      width === 2
        ? [
            new Vector4(0, 0, 0.4, 1),
            new Vector4(0.6, 0, 1, 1),
            // 右侧,和左侧重复利用纹理
            new Vector4(0.4, 0, 0.6, 1),
            new Vector4(0.4, 0, 0.6, 1),
          ]
        : [
            new Vector4(0, 0, 0.25, 1),
            new Vector4(0.5, 0, 0.75, 1),
            new Vector4(0.25, 0, 0.5, 1),
            new Vector4(0.75, 0, 1, 1),
          ],
  });
  const boxMat = new StandardMaterial("boxMat");
  if (width == 2) {
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/semihouse.png"
    );
  } else {
    boxMat.diffuseTexture = new Texture(
      "https://assets.babylonjs.com/environments/cubehouse.png"
    );
  }
  box.material = boxMat;
  box.position.y = 0.5;
  return box;
};
const buildRoof = (width: number) => {
  const roof = MeshBuilder.CreateCylinder("roof", {
    height: 1.2,
    diameter: 1.3,
    tessellation: 3,
  });
  roof.scaling.y = width;
  roof.scaling.x = 0.75;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 1.22;
  const roofMat = new StandardMaterial("roofMat");
  roofMat.diffuseTexture = new Texture("/textures/roof.jpg");
  roof.material = roofMat;
  return roof;
};
const buildHouse = (width: number) => {
  const box = buildBox(width);
  const roof = buildRoof(width);

  return Mesh.MergeMeshes([box, roof], true, false, undefined, false, true)!;
};
/******Build Functions***********/
const buildDwellings = () => {
  const ground = buildGround();

  const detached_house = buildHouse(1);
  detached_house.rotation.y = -Math.PI / 16;
  detached_house.position.x = -6.8;
  detached_house.position.z = 2.5;

  const semi_house = buildHouse(2);
  semi_house.rotation.y = -Math.PI / 16;
  semi_house.position.x = -4.5;
  semi_house.position.z = 3;

  const places = []; //each entry is an array [house type, rotation, x, z]
  places.push([1, -Math.PI / 16, -6.8, 2.5]);
  places.push([2, -Math.PI / 16, -4.5, 3]);
  places.push([2, -Math.PI / 16, -1.5, 4]);
  places.push([2, -Math.PI / 3, 1.5, 6]);
  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
  places.push([1, (5 * Math.PI) / 4, 0, -1]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
  places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
  places.push([2, Math.PI / 1.9, 4.75, -1]);
  places.push([1, Math.PI / 1.95, 4.5, -3]);
  places.push([2, Math.PI / 1.9, 4.75, -5]);
  places.push([1, Math.PI / 1.9, 4.75, -7]);
  places.push([2, -Math.PI / 3, 5.25, 2]);
  places.push([1, -Math.PI / 3, 6, 4]);

  //Create instances from the first two that were built
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    if (places[i][0] === 1) {
      houses[i] = detached_house.createInstance("house" + i);
    } else {
      houses[i] = semi_house.createInstance("house" + i);
    }
    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};
const CombineMeshes = () => {
  const onSceneReady = (scene: Scene) => {
    var camera = new ArcRotateCamera(
      "camera",
      Tools.ToRadians(45),
      Tools.ToRadians(65),
      10,
      Vector3.Zero(),
      scene
    );
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    camera.attachControl(canvas, true);
    var light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);
    light.intensity = 1;
    buildDwellings();

    // initAudio();
  };
  return (
    <SceneComponent
      className="w-full h-full"
      antialias
      onSceneReady={onSceneReady}
      // onRender={onRender}
      id="test"
    />
  );
};

export default CombineMeshes;
