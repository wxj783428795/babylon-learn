import React from "react";
import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Tools,
  Vector3,
  Animation,
  DirectionalLight,
  UniversalCamera,
  StandardMaterial,
  Color3,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import SceneComponent from "babylonjs-hook";
const SequencingAnimations = () => {
  const buildHouse = () => {
    /**************Peripherals of Scene***************/
    var ground = MeshBuilder.CreateGround("ground", { width: 50, height: 50 });

    var wall1 = MeshBuilder.CreateBox("door", {
      width: 8,
      height: 6,
      depth: 0.1,
    });
    wall1.position.x = -6;
    wall1.position.y = 3;

    var wall2 = MeshBuilder.CreateBox("door", {
      width: 4,
      height: 6,
      depth: 0.1,
    });
    wall2.position.x = 2;
    wall2.position.y = 3;

    var wall3 = MeshBuilder.CreateBox("door", {
      width: 2,
      height: 2,
      depth: 0.1,
    });
    wall3.position.x = -1;
    wall3.position.y = 5;

    var wall4 = MeshBuilder.CreateBox("door", {
      width: 14,
      height: 6,
      depth: 0.1,
    });
    wall4.position.x = -3;
    wall4.position.y = 3;
    wall4.position.z = 7;

    var wall5 = MeshBuilder.CreateBox("door", {
      width: 7,
      height: 6,
      depth: 0.1,
    });
    wall5.rotation.y = Math.PI / 2;
    wall5.position.x = -10;
    wall5.position.y = 3;
    wall5.position.z = 3.5;

    var wall6 = MeshBuilder.CreateBox("door", {
      width: 7,
      height: 6,
      depth: 0.1,
    });
    wall6.rotation.y = Math.PI / 2;
    wall6.position.x = 4;
    wall6.position.y = 3;
    wall6.position.z = 3.5;

    var roof = MeshBuilder.CreateBox("door", {
      width: 14,
      height: 7,
      depth: 0.1,
    });
    roof.rotation.x = Math.PI / 2;
    roof.position.x = -3;
    roof.position.y = 6;
    roof.position.z = 3.5;
  };
  const onSceneReady = async (scene: Scene) => {
    // Inspector.Show(scene, {});
    //camera
    var camera = new UniversalCamera(
      "UniversalCamera",
      new Vector3(0, 3, -30),
      scene
    );
    camera.setTarget(Vector3.Zero());
    buildHouse();
    const canvas = scene.getEngine().getRenderingCanvas();
    // camera.attachControl(canvas, true);
    //灯光
    var light1 = new DirectionalLight(
      "DirectionalLight",
      new Vector3(0, -1, 0),
      scene
    );
    var light2 = new HemisphericLight(
      "HemiLight",
      new Vector3(0, 1, -1),
      scene
    );
    light1.intensity = 0.25;
    light2.intensity = 0.5;
    
    //door
    var door = MeshBuilder.CreateBox(
      "door",
      { width: 2, height: 4, depth: 0.1 },
      scene
    );
    const doorMaterial = new StandardMaterial("doorMaterial", scene);
    doorMaterial.diffuseColor = Color3.Red();
    door.material = doorMaterial;
    var hinge = MeshBuilder.CreateBox("hinge", {}, scene);
    hinge.isVisible = false;
    door.parent = hinge;
    hinge.position.y = 2;
    door.position.x = -1;
    var frameRate = 20;

    //摄像头移入动画
    const movein = new Animation(
      "movein",
      "position",
      frameRate,
      Animation.ANIMATIONTYPE_VECTOR3,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const moveinKeys = [];
    moveinKeys.push({
      frame: 0,
      value: camera.position,
    });
    moveinKeys.push({
      frame: frameRate * 3,
      value: new Vector3(0, 2, -10),
    });
    moveinKeys.push({
      frame: frameRate * 5,
      value: new Vector3(0, 2, -10),
    });
    moveinKeys.push({
      frame: frameRate * 8,
      value: new Vector3(-2, 2, 3),
    });
    movein.setKeys(moveinKeys);
    //摄像头旋转动画
    const rotate = new Animation(
      "rotate",
      "rotation.y",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const rotateKeys = [
      {
        frame: 0,
        value: camera.rotation.y,
      },
      {
        frame: frameRate * 9,
        value: camera.rotation.y,
      },
      {
        frame: frameRate * 14,
        value: Tools.ToRadians(180),
      },
    ];
    rotate.setKeys(rotateKeys);
    //门打开动画
    const open = new Animation(
      "open",
      "rotation.y",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CONSTANT
    );
    const openKeys = [
      {
        frame: 0,
        value: door.rotation.y,
      },
      {
        frame: frameRate * 3,
        value: door.rotation.y,
      },
      {
        frame: frameRate * 5,
        value: Tools.ToRadians(75),
      },
      //关门
      {
        frame: frameRate * 13,
        value: Tools.ToRadians(75),
      },
      {
        frame: frameRate * 15,
        value: Tools.ToRadians(0),
      },
    ];
    open.setKeys(openKeys);

    //摄像头开始动画
    scene.beginDirectAnimation(
      camera,
      [movein, rotate],
      0,
      25 * frameRate,
      false
    );
    //门开始动画
    scene.beginDirectAnimation(hinge, [open], 0, 25 * frameRate, false);
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

export default SequencingAnimations;
