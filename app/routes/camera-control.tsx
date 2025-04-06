import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";

export default function CameraControl() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraType, setCameraType] = useState<string>("ArcRotate");

  useEffect(() => {
    if (!canvasRef.current) return;

    // 创建引擎
    const engine = new BABYLON.Engine(canvasRef.current, true);

    // 创建场景
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.2, 0.2, 0.2, 1);

    // 创建相机
    let camera: BABYLON.Camera;

    if (cameraType === "ArcRotate") {
      camera = new BABYLON.ArcRotateCamera(
        "arcCamera",
        -Math.PI / 2,
        Math.PI / 3,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );
      (camera as BABYLON.ArcRotateCamera).lowerRadiusLimit = 5;
      (camera as BABYLON.ArcRotateCamera).upperRadiusLimit = 20;
    } else if (cameraType === "Free") {
      camera = new BABYLON.FreeCamera(
        "freeCamera",
        new BABYLON.Vector3(0, 5, -10),
        scene
      );
      (camera as BABYLON.FreeCamera).keysUp.push(87); // W
      (camera as BABYLON.FreeCamera).keysDown.push(83); // S
      (camera as BABYLON.FreeCamera).keysLeft.push(65); // A
      (camera as BABYLON.FreeCamera).keysRight.push(68); // D
    } else {
      camera = new BABYLON.FollowCamera(
        "followCamera",
        new BABYLON.Vector3(0, 5, -10),
        scene
      );
      (camera as BABYLON.FollowCamera).radius = 10;
      (camera as BABYLON.FollowCamera).heightOffset = 4;
      (camera as BABYLON.FollowCamera).rotationOffset = 0;
    }

    camera.attachControl(canvasRef.current, true);

    // 创建光源
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // 创建地面
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 20, height: 20 },
      scene
    );
    // const groundMaterial = new BABYLON.GridMaterial("groundMaterial", scene);
    // groundMaterial.majorUnitFrequency = 5;
    // groundMaterial.minorUnitVisibility = 0.45;
    // groundMaterial.gridRatio = 1;
    // groundMaterial.mainColor = new BABYLON.Color3(0.2, 0.2, 0.3);
    // groundMaterial.lineColor = new BABYLON.Color3(0.0, 0.5, 0.7);
    // ground.material = groundMaterial;

    // 创建一些物体
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 1;
    box.position.x = -3;

    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 2 },
      scene
    );
    sphere.position.y = 1;
    sphere.position.x = 3;

    // 如果是跟随相机，设置跟随目标
    if (cameraType === "Follow") {
      (camera as BABYLON.FollowCamera).lockedTarget = box;
    }

    // 渲染循环
    engine.runRenderLoop(() => {
      scene.render();
    });

    // 处理窗口大小变化
    window.addEventListener("resize", () => {
      engine.resize();
    });

    return () => {
      scene.dispose();
      engine.dispose();
    };
  }, [cameraType]);

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">相机控制</h1>
      <div className="mb-4">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${
              cameraType === "ArcRotate"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCameraType("ArcRotate")}
          >
            环绕相机
          </button>
          <button
            className={`px-4 py-2 rounded ${
              cameraType === "Free" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCameraType("Free")}
          >
            自由相机 (WASD移动)
          </button>
          <button
            className={`px-4 py-2 rounded ${
              cameraType === "Follow" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCameraType("Follow")}
          >
            跟随相机
          </button>
        </div>
      </div>
      <div className="flex-1 bg-black rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full">
          您的浏览器不支持 canvas 元素
        </canvas>
      </div>
    </div>
  );
}
