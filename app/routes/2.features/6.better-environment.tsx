import {
  Animation,
  ArcRotateCamera,
  Axis,
  HemisphericLight,
  ImportMeshAsync,
  Mesh,
  MeshBuilder,
  Scene,
  Space,
  Sprite,
  SpriteManager,
  StandardMaterial,
  Texture,
  Tools,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";
import { SkyMaterial } from "@babylonjs/materials";
import { Inspector } from "@babylonjs/inspector";

const BetterEnvironment = () => {
  const onSceneReady = (scene: Scene) => {
    Inspector.Show(scene, {});
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

    //添加大地面
    const largeGround = MeshBuilder.CreateGroundFromHeightMap(
      "largeGround",
      "/textures/villageheightmap.png",
      { width: 150, height: 150, subdivisions: 20, minHeight: 0, maxHeight: 10 }
    );
    const largeGroundMaterial = new StandardMaterial("largeGroundMaterial");
    largeGroundMaterial.diffuseTexture = new Texture(
      "/textures/valleygrass.png",
      scene
    );
    largeGround.material = largeGroundMaterial;
    largeGround.position.y = -0.01;

    //添加小地面
    const groundMat = new StandardMaterial("groundMat");
    groundMat.diffuseTexture = new Texture("/textures/villagegreen.png");
    groundMat.diffuseTexture.hasAlpha = true;

    const smallGround = MeshBuilder.CreateGround("smallGround", {
      width: 24,
      height: 24,
    });
    smallGround.material = groundMat;

    // 天空
    var skyboxMaterial = new SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.inclination = -0.35;
    //skyboxMaterial._cachedDefines.FOG = true;

    // 天空盒子
    var skybox = MeshBuilder.CreateBox(
      "skyBox",
      { width: 1000, height: 1000, depth: 1000 },
      scene
    );
    skybox.material = skyboxMaterial;

    //添加村庄
    ImportMeshAsync("/scenes/1.village.babylon", scene, {}).then(() => {
      //移除村庄原有地面
      const villageGround = scene.getMeshByName("ground");
      villageGround?.dispose();
    });
    //添加汽车
    ImportMeshAsync("/scenes/car.glb", scene, {}).then((result) => {
      const car = scene.getMeshByName("car")!;
      car.rotation = new Vector3((3 * Math.PI) / 2, 0, -Math.PI / 2);
      car.position.y = 0.16;
      car.position.x = -3;
      car.position.z = 8;

      const animCar = new Animation(
        "carAnimation",
        "position.z",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
      );

      const carKeys = [];

      carKeys.push({
        frame: 0,
        value: 10,
      });

      carKeys.push({
        frame: 200,
        value: -15,
      });

      animCar.setKeys(carKeys);

      car.animations = [];
      car.animations.push(animCar);

      scene.beginAnimation(car, 0, 200, true);

      //wheel animation
      const wheelRB = scene.getMeshByName("wheelRB");
      const wheelRF = scene.getMeshByName("wheelRF");
      const wheelLB = scene.getMeshByName("wheelLB");
      const wheelLF = scene.getMeshByName("wheelLF");

      scene.beginAnimation(wheelRB, 0, 30, true);
      scene.beginAnimation(wheelRF, 0, 30, true);
      scene.beginAnimation(wheelLB, 0, 30, true);
      scene.beginAnimation(wheelLF, 0, 30, true);
    });
    const rootMesh = MeshBuilder.CreateBox(
      "metadataMesh",
      { width: 0.01, height: 0.01, depth: 0.01 },
      scene
    );
    rootMesh.position.y = -10000;
    rootMesh.metadata = {};
    rootMesh.metadata.spriteManagers = [];
    let obj: any = {};
    obj.name = "spriteManagers";
    obj.texture = "/textures/palm.png";
    obj.max = 2000;
    obj.width = 512;
    obj.height = 1024;
    obj.name = "tree";
    obj.sprites = [];
    rootMesh.metadata.spriteManagers.push(obj);
    const spriteManagerTrees = new SpriteManager(
      "treesManager",
      "/textures/palm.png" /* url to sprite */,
      2000,
      { width: 512, height: 1024 },
      scene
    );
    for (let i = 0; i < 500; i++) {
      let sprite: any = {};
      const tree = new Sprite("tree", spriteManagerTrees);
      let x = Math.random() * -30;
      let z = Math.random() * 20 + 8;
      let y = 0.5;
      tree.position.x = x;
      tree.position.z = z;
      tree.position.y = y;
      obj.sprites.push({
        x: x,
        z: z,
        y: y,
      });
    }
    for (let i = 0; i < 500; i++) {
      const tree = new Sprite("tree", spriteManagerTrees);
      let x = Math.random() * 25 + 7;
      let z = Math.random() * -35 + 8;
      let y = 0.5;
      tree.position.x = x;
      tree.position.z = z;
      tree.position.y = y;
      obj.sprites.push({
        x: x,
        z: z,
        y: y,
      });
    }
  };
  return (
    <SceneComponent
      className="w-full h-full"
      antialias
      onSceneReady={onSceneReady}
      // onRender={onRender}
      id="scene"
    />
  );
};

export default BetterEnvironment;
