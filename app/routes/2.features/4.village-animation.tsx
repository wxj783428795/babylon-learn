import {
  ArcRotateCamera,
  AxesViewer,
  HemisphericLight,
  ImportMeshAsync,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Texture,
  Tools,
  Vector3,
  Vector4,
  Animation,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";
import earcut from "earcut";
const radius = 0.1;
const VillageAnimation = () => {
  const onSceneReady = (scene: Scene) => {
    // new AxesViewer(scene, 3);
    Inspector.Show(scene, {});
    // const localAxes = new AxesViewer(scene, 1);

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

    //base
    const outline = [
      new Vector3(-0.3, 0, -radius),
      new Vector3(0.2, 0, -radius),
    ];

    //curved front
    for (let i = 0; i < 20; i++) {
      outline.push(
        new Vector3(
          0.2 * Math.cos((i * Math.PI) / 40),
          0,
          0.2 * Math.sin((i * Math.PI) / 40) - radius
        )
      );
    }

    //top
    outline.push(new Vector3(0, 0, radius));
    outline.push(new Vector3(-0.3, 0, radius));
    const faceUV = [];
    //这里坐标设置有疑问
    faceUV[0] = new Vector4(0, 0.5, 0.38, 1);
    faceUV[1] = new Vector4(0, 0, 1, 0.5);
    faceUV[2] = new Vector4(0.38, 1, 0, 0.5);
    const car = MeshBuilder.ExtrudePolygon(
      "car",
      {
        shape: outline,
        depth: 0.2,
        faceUV,
        wrap: true,
      },
      scene,
      earcut
    );
    // localAxes.xAxis.parent = car;
    // localAxes.yAxis.parent = car;
    // localAxes.zAxis.parent = car;
    const carMat = new StandardMaterial("carMat");
    carMat.diffuseTexture = new Texture("/textures/car.png", scene);
    car.material = carMat;
    car.rotation.x = (-3 / 2) * Math.PI;
    const wheelRB = MeshBuilder.CreateCylinder("wheelRB", {
      diameter: 0.125,
      height: 0.05,
      faceUV: [
        new Vector4(0, 0, 1, 1),
        new Vector4(0, 0.5, 0, 0.5),
        new Vector4(0, 0, 1, 1),
      ],
    });
    // Animate the Wheels
    const animWheel = new Animation(
      "wheelAnimation",
      "rotation.y",
      60,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    const wheelKeys = [];

    //At the animation key 0, the value of rotation.y is 0
    wheelKeys.push({
      frame: 0,
      value: 0,
    });

    //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
    wheelKeys.push({
      frame: 60,
      value: 2 * Math.PI,
    });

    //set the keys
    animWheel.setKeys(wheelKeys);

    //Link this animation to a wheel
    wheelRB.animations = [];
    wheelRB.animations.push(animWheel);

    const wheelMat = new StandardMaterial("wheelMat");
    wheelMat.diffuseTexture = new Texture("/textures/wheel.png", scene);
    wheelRB.material = wheelMat;
    wheelRB.parent = car;
    wheelRB.position.z = -0.1;
    wheelRB.position.x = -0.2;
    wheelRB.position.y = 0.035;
    const wheelRF = wheelRB.createInstance("wheelRF");
    wheelRF.position.x = 0.1;

    const wheelLB = wheelRB.createInstance("wheelLB");
    wheelLB.position.y = -0.2 - 0.035;

    const wheelLF = wheelRB.createInstance("wheelLF");
    wheelLF.position.y = -0.2 - 0.035;
    wheelLF.position.x = 0.1;

    [wheelLB, wheelLF, wheelRB, wheelRF].forEach((wheel) => {
      scene.beginAnimation(wheel, 0, 60, true);
    });

    // ImportMeshAsync("/scenes/1.village.babylon", scene, {
    //   meshNames: "",
    // }).then((result) => {
    // //   result.meshes.forEach((mesh) => {
    // //     // mesh.position.y = 0.5;
    // //   });
    // });
    // buildDwellings();

    // initAudio();
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

export default VillageAnimation;
