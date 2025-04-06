import * as BABYLON from "@babylonjs/core";
import { useEffect, useRef } from "react";

export default function BasicScene() {
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
      0,
      Math.PI / 3,
      10,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.attachControl(canvasRef.current, true);

    // 创建光源
    const light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );

    // 创建一个立方体
    const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

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
      <h1 className="text-2xl font-bold mb-4">基础场景</h1>
      <div className="flex-1 bg-black rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full">
          您的浏览器不支持 canvas 元素
        </canvas>
      </div>
    </div>
  );
}
