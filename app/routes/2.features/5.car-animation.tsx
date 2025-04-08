import {
    Animation,
    ArcRotateCamera,
    Axis,
    HemisphericLight,
    ImportMeshAsync,
    Scene,
    Space,
    Tools,
    Vector3
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";

class Walk {
  constructor(public turn: number, public dist: number) {}
}

const CarAnimation = () => {
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
    ImportMeshAsync("/scenes/1.village.babylon", scene).then((res) => {
      console.log("res", res);
      //2. 导入车模型
      ImportMeshAsync(
        // "https://assets.babylonjs.com/meshes/car.glb",
        "/scenes/car.glb",
        scene
      ).then((res) => {
        console.log("car", res);
        const car = scene.getMeshByName("car")!;
        car.rotation = new Vector3(-Math.PI / 2, Math.PI, Math.PI / 2);
        car.position.y = 0.16;
        car.position.x = -3;
        car.position.z = 8;
        const animCar = new Animation(
          "carAnimation",
          "position.z",
          30,
          Animation.ANIMATIONTYPE_FLOAT,
          Animation.ANIMATIONLOOPMODE_CYCLE
        );
        const carKeys = [];
        carKeys.push({
          frame: 0,
          value: 8,
        });

        carKeys.push({
          frame: 150,
          value: -7,
        });

        carKeys.push({
          frame: 200,
          value: -7,
        });

        animCar.setKeys(carKeys);

        car.animations = [];
        car.animations.push(animCar);

        scene.beginAnimation(car, 0, 210, true);

        const wheelRB = scene.getMeshByName("wheelRB");
        const wheelRF = scene.getMeshByName("wheelRF");
        const wheelLB = scene.getMeshByName("wheelLB");
        const wheelLF = scene.getMeshByName("wheelLF");

        scene.beginAnimation(wheelRB, 0, 30, true);
        scene.beginAnimation(wheelRF, 0, 30, true);
        scene.beginAnimation(wheelLB, 0, 30, true);
        scene.beginAnimation(wheelLF, 0, 30, true);

        // const wheelNames = ["wheelLB", "wheelLF", "wheelRB", "wheelRF"];
        // wheelNames.forEach((wheelName) => {
        //   const wheel = scene.getMeshByName(wheelName)!;
        // //   console.log("res.animationGroups", res.animationGroups);
        // //   const ani = res.animationGroups
        // //     .map((i) => i.targetedAnimations)
        // //     .flat()
        // //     .find((item) => item.target.id === wheelName)?.animation!;
        // //   console.log("ani", ani);
        // //   wheel.animations = [ani];
        //   scene.beginAnimation(wheel, 0, 60, true);
        // });
      });
      ImportMeshAsync("/scenes/Dude.babylon" /* model file */, scene, {
        meshNames: "him",
      }).then((result) => {
        var dude = result.meshes[0];
        dude.scaling = new Vector3(0.008, 0.008, 0.008);
        dude.rotate(Axis.Y, Tools.ToRadians(-95), Space.LOCAL);
        dude.position = new Vector3(-6, 0, 0);

        const track: Walk[] = [];
        track.push(new Walk(86, 7));
        track.push(new Walk(-85, 14.8));
        track.push(new Walk(-93, 16.5));
        track.push(new Walk(48, 25.5));
        track.push(new Walk(-112, 30.5));
        track.push(new Walk(-72, 33.2));
        track.push(new Walk(42, 37.5));
        track.push(new Walk(-98, 45.2));
        track.push(new Walk(0, 47));
        const startRotation = dude.rotationQuaternion?.clone();
        let distance = 0;
        let step = 0.005;
        let p = 0;
        //在场景中移动，渲染之前执行的代码
        scene.onBeforeRenderObservable.add(() => {
          //dude 默认面向自己的-z 轴，所以-6 就是向屁股反向移动-6 单位
          //每帧移动0.05 单位
          dude.movePOV(0, 0, step);
          distance += step;
          if (distance > track[p].dist) {
            dude.rotate(Axis.Y, Tools.ToRadians(track[p].turn), Space.LOCAL);
            p++;
            p %= track.length; //循环
            if (!p) {
              distance = 0;
              dude.position = new Vector3(-6, 0, 0);
              dude.rotationQuaternion = startRotation?.clone() ?? null;
            }
          }
        });
        scene.beginAnimation(result.skeletons[0], 0, 100, true, 1.0);
      });
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

export default CarAnimation;
