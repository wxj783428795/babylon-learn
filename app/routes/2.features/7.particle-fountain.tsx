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

const ParticleFountain = () => {
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

    ImportMeshAsync("/scenes/2.better-village.babylon", scene).then((res) => {
      console.log("res", res);
    });
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

export default ParticleFountain;
