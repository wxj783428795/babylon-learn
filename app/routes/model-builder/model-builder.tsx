import {
  ArcRotateCamera,
  HemisphericLight,
  ImportMeshAsync,
  Scene,
  Sprite,
  SpriteManager,
  Tools,
  Vector3,
  MeshBuilder,
  Mesh,
  ParticleSystem,
  Texture,
  Color4,
  PointerEventTypes,
  type Nullable,
  AbstractMesh,
  SpotLight,
  Color3,
  StandardMaterial,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";
const ModelBuilder = () => {
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

    buildLamp();
  };
  const buildLamp = () => {
    const lampShape: Vector3[] = [];
    const lampShapeLength = 200;

    // 构建一个包含200个点的圆形
    const radius = 1; // 圆的半径
    for (let i = 0; i < lampShapeLength; i++) {
      const angle = (i * 2 * Math.PI) / lampShapeLength;
      lampShape.push(
        new Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
      );
    }

    // 闭合路径（添加第一个点作为最后一个点）
    lampShape.push(lampShape[0]);

    const lampPath: Vector3[] = [];
    lampPath.push(new Vector3(0, 0, 0));
    lampPath.push(new Vector3(0, 10, 0));
    //90度直角
    for (let i = 0; i < 20; i++) {
      lampPath.push(
        new Vector3(
          1 + Math.cos(Math.PI - (i * Math.PI) / 40),
          10 + Math.sin(Math.PI - (i * Math.PI) / 40),
          0
        )
      );
    }
    // 闭合
    lampPath.push(new Vector3(3, 11, 0));
    //ExtrudeShape
    const lamp = MeshBuilder.ExtrudeShape("lamp", {
      shape: lampShape,
      path: lampPath,
      cap: Mesh.CAP_ALL,
      scale: 0.5,
    });
    //add a spotlight and later after a mesh lamp post and a bulb have been created
    //then will make the post a parent to the bulb and
    //the bulb to the parent
    const lampLight = new SpotLight(
      "lampLight",
      Vector3.Zero(),
      new Vector3(0, -1, 0),
      Math.PI,
      1
    );
    //灯光颜色
    lampLight.diffuse = Color3.Yellow();
    lampLight.position.y = 10.5;
    lampLight.position.x = 2;
    //灯泡
    const bulb = MeshBuilder.CreateSphere("bulb", {
      diameterX: 1.5,
      diameterZ: 0.8,
    });
    const yellowMat = new StandardMaterial("yellowMat");
    lampLight.parent = lamp;
    yellowMat.emissiveColor = Color3.Yellow();
    bulb.material = yellowMat;
    bulb.parent = lamp;
    bulb.position.x = 2;
    bulb.position.y = 10.5;
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

export default ModelBuilder;
