import {
  ArcRotateCamera,
  Color3,
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
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";

const FirstCreation = () => {
  const onSceneReady = (scene: Scene) => {
    // This creates and positions a free camera (non-mesh)
    // var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    //alpha 水平角度，beta仰角
    var camera = new ArcRotateCamera(
      "camera",
      Tools.ToRadians(45),
      Tools.ToRadians(65),
      10,
      Vector3.Zero(),
      scene
    );

    // // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    const canvas = scene.getEngine().getRenderingCanvas();

    // // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 10, 0), scene);

    // // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    // // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround(
      "ground",
      { width: 6, height: 6 },
      scene
    );
    // 添加材质
    const groundMaterial = new StandardMaterial("Ground Material", scene);
    groundMaterial.diffuseColor = Color3.Red();
    let groundTexture = new Texture(
      //@ts-ignore
      window.Assets.textures.checkerboard_basecolor_png.path,
      scene
    );
    groundMaterial.diffuseTexture = groundTexture;
    ground.material = groundMaterial;

    ImportMeshAsync(
      //@ts-ignore
      window.Assets.meshes.Yeti.rootUrl + window.Assets.meshes.Yeti.filename,
      // "https://assets.babylonjs.com/meshes/both_houses_scene.babylon",
      scene,
      { meshNames: "" }
    ).then(function (result) {
      console.log("result", result);
      result.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
    });
  };

  /**
   * Will run on every frame render.  We are spinning the box on y-axis.
   */
  // const onRender = (scene: Scene) => {
  //   if (box !== undefined) {
  //     var deltaTimeInMillis = scene.getEngine().getDeltaTime();

  //     const rpm = 10;
  //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  //   }
  // };
  return (
    <SceneComponent
      className="w-full h-full"
      antialias
      onSceneReady={onSceneReady}
      // onRender={onRender}
      id="my-canvas"
    />
  );
};

export default FirstCreation;
