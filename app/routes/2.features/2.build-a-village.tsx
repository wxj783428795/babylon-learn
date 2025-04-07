import React from "react";
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
const BuildAVillage = () => {
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

    //1. 添加地面
    const ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });
    const box = MeshBuilder.CreateBox("box", {
      width: 1,
      height: 1,
      depth: 1,
      //5.3 使用 faceUV 来指定每个面的纹理坐标
      faceUV: [
        new Vector4(0.5, 0, 0.75, 1), //后
        new Vector4(0, 0, 0.25, 1), //前
        new Vector4(0.25, 0, 0.5, 1), //右
        new Vector4(0.75, 0, 1, 1), //左
      ],
      //wrap:false时，背后的纹理会上下颠倒，左右纹理会变成横向
      wrap: true,
    });
    //2. 调整box的 y 坐标，否则 box有一半在地下
    box.position.y = 0.5;
    //4. 添加屋顶 diameter 直径，height 高度，tessellation 面数量，3 为三棱柱，4 为立方柱
    const roof = MeshBuilder.CreateCylinder("roof", {
      diameter: 1.3,
      height: 1.2,
      tessellation: 3,
    });
    roof.scaling.x = 0.75;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    // 5.添加房屋材质和纹理
    // 5.1 屋顶材质
    const roofMaterial = new StandardMaterial("roofMaterial");
    // roofMaterial.diffuseColor = Color3.Red();
    roofMaterial.diffuseTexture = new Texture("/textures/roof.jpg", scene);
    roof.material = roofMaterial;
    // 5.2 墙壁材质
    const boxMat = new StandardMaterial("boxMat");
    boxMat.diffuseTexture = new Texture(
      //   "/textures/floor.png"
      "/textures/cubehouse.png"
    );
    // boxMat.diffuseColor = Color3.Green();
    box.material = boxMat;

    //6.0 添加长的房子
    const boxSemi = MeshBuilder.CreateBox("box2", {
      width: 2,
      height: 1,
      wrap: true,
      faceUV: [
        new Vector4(0, 0, 0.4, 1),
        new Vector4(0.6, 0, 1, 1),
        // 右侧,和左侧重复利用纹理
        new Vector4(0.4, 0, 0.6, 1),
        new Vector4(0.4, 0, 0.6, 1),
      ],
    });
    boxSemi.position.y = 0.5;
    boxSemi.position.x = 3;
    const boxSemiMat = new StandardMaterial("boxSemiMat");
    boxSemiMat.diffuseTexture = new Texture("/textures/semihouse.png");
    boxSemi.material = boxSemiMat;

    const roofSemi = MeshBuilder.CreateCylinder("roofSemi", {
      diameter: 1.3,
      height: 2.4,
      tessellation: 3,
    });
    roofSemi.scaling.x = 0.75;
    roofSemi.rotation.z = Math.PI / 2;
    roofSemi.position.y = 1.22;
    roofSemi.position.x = 3;
    const roofSemiMaterial = new StandardMaterial("roofSemiMaterial");
    roofSemiMaterial.diffuseTexture = new Texture("/textures/roof.jpg");
    roofSemi.material = roofSemiMaterial;

    //3. 添加声音
    async function initAudio() {
      const audioEngine = await CreateAudioEngineAsync();
      await audioEngine.unlockAsync();

      // Audio engine is ready to play sounds ...

      // Track: "No" by Soulsonic
      // License: CC BY-ND 3.0
      CreateStreamingSoundAsync(
        "backgroundMusic",
        "https://amf-ms.github.io/AudioAssets/cc-music/electronic/Soulsonic--No.mp3",
        { autoplay: true, loop: true },
        audioEngine
      );
    }
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

export default BuildAVillage;
