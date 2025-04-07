import {
  ArcRotateCamera,
  HemisphericLight,
  ImportMeshAsync,
  Scene,
  Tools,
  Vector3,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";
const VillageAnimation = () => {
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

    ImportMeshAsync("/scenes/1.village.babylon", scene, {
      meshNames: "",
    }).then((result) => {
      result.meshes.forEach((mesh) => {
        // mesh.position.y = 0.5;
      });
    });
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
