import React from "react";
import SceneComponent from "babylonjs-hook";
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
const FirstImportOfModel = () => {
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

    ImportMeshAsync(
      //   window.Assets.meshes.Yeti.rootUrl + window.Assets.meshes.Yeti.filename,
      "https://assets.babylonjs.com/meshes/both_houses_scene.babylon",
      scene,
      { meshNames: "" }
    ).then(function (result) {
      console.log("result", result);
      const house1 = scene.getMeshByName("detached_house")!;
      house1.position.y = 2;
      const house2 = result.meshes[2];
      house2.position.y = 1;
    //   result.meshes[0].scaling = new Vector3(0.1, 0.1, 0.1);
    });
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

export default FirstImportOfModel;
