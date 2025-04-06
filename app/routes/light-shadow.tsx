import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef } from "react";

export default function LightShadow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 创建引擎
    const engine = new BABYLON.Engine(canvasRef.current, true);

    // 创建场景
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0.2, 0.2, 0.2, 1);

    // 创建相机
    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 3,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // 创建地面
    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 10, height: 10 },
      scene
    );
    const groundMaterial = new BABYLON.StandardMaterial(
      "groundMaterial",
      scene
    );
    groundMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    ground.material = groundMaterial;
    ground.receiveShadows = true;

    // 创建一个立方体
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);
    box.position.y = 1;
    const boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.8);
    box.material = boxMaterial;

    // 创建方向光源
    const light = new BABYLON.DirectionalLight(
      "light",
      new BABYLON.Vector3(-1, -2, -1),
      scene
    );
    light.position = new BABYLON.Vector3(5, 10, 5);
    light.intensity = 0.7;

    // 创建点光源
    const pointLight = new BABYLON.PointLight(
      "pointLight",
      new BABYLON.Vector3(0, 3, 0),
      scene
    );
    pointLight.diffuse = new BABYLON.Color3(1, 0.5, 0.5);
    pointLight.intensity = 0.5;

    // 设置阴影生成器
    const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.addShadowCaster(box);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 32;

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
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">光照与阴影</h1>
      <div className="flex-1 bg-black rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full">
          您的浏览器不支持 canvas 元素
        </canvas>
      </div>
    </div>
  );
}
