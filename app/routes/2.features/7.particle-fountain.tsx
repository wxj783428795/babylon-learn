import {
  ArcRotateCamera,
  HemisphericLight,
  ImportMeshAsync,
  Scene,
  Sprite,
  SpriteManager,
  Tools,
  Vector3,
  MeshBuilder,
  Mesh,
  ParticleSystem,
  Texture,
  Color4,
  PointerEventTypes,
  type Nullable,
  AbstractMesh,
  Space,
  Axis,
  ShadowGenerator,
  SpotLight,
  DirectionalLight,
} from "@babylonjs/core";
import { Inspector } from "@babylonjs/inspector";
import "@babylonjs/loaders/glTF/2.0";
import SceneComponent from "babylonjs-hook";
class Walk {
  constructor(public turn: number, public dist: number) {}
}
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
    light.intensity = 0.5;

    ImportMeshAsync("/scenes/2.better-village.babylon", scene).then((res) => {
      const metadataMesh = scene.getMeshByName("metadataMesh");
      const treeSprite = metadataMesh?.metadata.spriteManagers[0];
      //从 metadata 中还原 sprites
      const spriteManagerTrees = new SpriteManager(
        "treesManager",
        treeSprite.texture /* url to sprite */,
        treeSprite.max,
        { width: treeSprite.width, height: treeSprite.height },
        scene
      );
      for (let i = 0; i < treeSprite.sprites.length; i++) {
        const tree = new Sprite(treeSprite.name, spriteManagerTrees);
        tree.position.x = treeSprite.sprites[i].x;
        tree.position.y = treeSprite.sprites[i].y;
        tree.position.z = treeSprite.sprites[i].z;
      }

      //定义喷泉轮廓
      const fountainProfile = [
        new Vector3(0, 0, 0),
        new Vector3(10, 0, 0),
        new Vector3(10, 4, 0),
        new Vector3(8, 4, 0),
        new Vector3(8, 1, 0),
        new Vector3(1, 2, 0),
        new Vector3(1, 15, 0),
        new Vector3(3, 17, 0),
      ];
      // 使用 CreateLathe 创建喷泉
      const fountain = MeshBuilder.CreateLathe(
        "fountain",
        { shape: fountainProfile, sideOrientation: Mesh.DOUBLESIDE },
        scene
      );
      fountain.scaling = new Vector3(0.05, 0.05, 0.05);
      fountain.position.x = -4;
      fountain.position.z = -6;
      // 定义粒子系统
      const particleSystem = new ParticleSystem("particles", 50000, scene);
      particleSystem.particleTexture = new Texture("textures/flare.png");
      particleSystem.emitter = new Vector3(-4, 0.8, -6); // the point at the top of the fountain
      particleSystem.minEmitBox = new Vector3(-0.01, 0, -0.01); // Starting all from
      particleSystem.maxEmitBox = new Vector3(0.01, 0, 0.01); // To...
      //混合模式
      particleSystem.color1 = new Color4(0.7, 0.8, 1.0, 1.0);
      particleSystem.color2 = new Color4(0.2, 0.5, 1.0, 1.0);
      // particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

      // Size of each particle (random between...
      particleSystem.minSize = 0.01;
      particleSystem.maxSize = 0.05;

      // Life time of each particle (random between...
      particleSystem.minLifeTime = 0.3;
      particleSystem.maxLifeTime = 1.5;

      // Emission rate
      particleSystem.emitRate = 1500;

      // Direction of each particle after it has been emitted
      particleSystem.direction1 = new Vector3(-1, 8, 1);
      particleSystem.direction2 = new Vector3(1, 8, -1);

      // Power and speed
      particleSystem.minEmitPower = 0.2;
      particleSystem.maxEmitPower = 0.6;
      particleSystem.updateSpeed = 0.01;

      //重力
      particleSystem.gravity = new Vector3(0, -9.81, 0);

      // 开始粒子系统
      particleSystem.start();

      let switched = false; //on off flag

      // 监听鼠标点击事件
      scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
          case PointerEventTypes.POINTERDOWN:
            if (pointerInfo.pickInfo?.hit) {
              pointerDown(pointerInfo.pickInfo.pickedMesh);
            }
            break;
        }
      });
      // 监听鼠标点击事件
      const pointerDown = (mesh: Nullable<AbstractMesh>) => {
        if (mesh === fountain) {
          //check that the picked mesh is the fountain
          switched = !switched; //toggle switch
          if (switched) {
            particleSystem.start();
          } else {
            particleSystem.stop();
          }
        }
      };
    });
    //带光源的灯
    ImportMeshAsync("/scenes/lamp-light2.glb", scene).then((res) => {
      console.log("res", res);
      const lamp = scene.getMeshByName("lamp")!;
      lamp.position = new Vector3(5, 0, 2);
      lamp.rotation = Vector3.Zero();
      lamp.rotation.y = -Math.PI / 4;
      lamp.scaling = new Vector3(0.08, 0.08, 0.08);
      const lamp2 = lamp.clone("lamp2", lamp.parent)!;
      lamp2.position = new Vector3(5, 0, 0);
      lamp2.rotation = Vector3.Zero();
      lamp2.rotation.y = Tools.ToRadians(105);
    });
    ImportMeshAsync("/scenes/Dude.babylon", scene).then((result) => {
      var dude = result.meshes[0];
      dude.scaling = new Vector3(0.008, 0.008, 0.008);
      dude.rotate(Axis.Y, Tools.ToRadians(-95), Space.LOCAL);
      dude.position = new Vector3(-6, 0, 0.5);

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

      const ground = scene.getMeshByName("smallGround")!;
      const lampLight = scene.getLightByName(
        "lamp2.lampLight.lampLight"
      ) as SpotLight;
      console.log("ground", ground);
      console.log("lampLight", lampLight);
      console.log("dude", dude);

      const light = new DirectionalLight("dir01", new Vector3(0, -1, 1), scene);
      light.position = new Vector3(0, 50, -100);

      const shadowGenerator = new ShadowGenerator(1024, lampLight);
      shadowGenerator.addShadowCaster(dude, true);
      ground.receiveShadows = true;
      // 创建一个物体来投射阴影
      const box = MeshBuilder.CreateBox("box", {
        size: 0.1,
      });
      box.position = new Vector3(5, 0, 2);
      shadowGenerator.addShadowCaster(box);

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
    // ImportMeshAsync("/scenes/xiaogu.glb", scene).then((res) => {
    //   console.log("res", res);
    // });
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
