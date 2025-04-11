import {
  ArcRotateCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Tools,
  Vector3,
  Animation,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import SceneComponent from "babylonjs-hook";
const DesignAnimation = () => {
  const onSceneReady = async (scene: Scene) => {
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
    light.intensity = 0.5;

    const box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.x = 2;
    const frameRate = 60;
    const ana = (await Animation.ParseFromFileAsync(
      "ana",
      "/animations/animations.json"
    )) as Animation[];
    console.log("ana", ana);
    // const xSlide = new Animation(
    //   "xSlice",
    //   "position.x",
    //   frameRate,
    //   Animation.ANIMATIONTYPE_FLOAT,
    //   Animation.ANIMATIONLOOPMODE_CYCLE
    // );
    // const keyFrames = [];
    const startFrame = 0;
    const endFrame = 10;
    // keyFrames.push({
    //     frame: startFrame,
    //     value: 2,
    //   });

    //   keyFrames.push({
    //     frame: endFrame,
    //     value: -2,
    //   });
    // xSlide.setKeys(keyFrames);
    // box.animations.push(xSlide);
    box.animations.push(...ana);
    //交换 第二第三个参数可以让动画倒放
    //该方法返回一个 anaimatable对象，可用于停止动画，修改动画速度等
    const anaBox = scene.beginAnimation(box, startFrame, endFrame, true, 0.5);
    setTimeout(() => {
      anaBox.stop();
    }, 2000);
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

export default DesignAnimation;
