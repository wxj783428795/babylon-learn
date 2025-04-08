import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout(
    "components/Layout.tsx",
    [
      route("/", "routes/home.tsx"),
      route("basic-scene", "routes/basic-scene.tsx"),
      route(
        "first-creation",
        "routes/1.the-very-first-step/1.first-creation.tsx"
      ),
      route(
        "first-import",
        "routes/2.features/1.first-import-of-model.tsx"
      ),
      route(
        "build-a-village",
        "routes/2.features/2.build-a-village.tsx"
      ),
      route(
        "combine-meshes",
        "routes/2.features/3.combine-meshes.tsx"
      ),
      route(
        "village-animation",
        "routes/2.features/4.village-animation.tsx"
      ),
      route(
        "car-animation",
        "routes/2.features/5.car-animation.tsx"
      ),
      route(
        "better-environment",
        "routes/2.features/6.better-environment.tsx"
      ),
      route(
        "particle-fountain",
        "routes/2.features/7.particle-fountain.tsx"
      ),
      route("basic-animation", "routes/basic-animation.tsx"),
      route("material-texture", "routes/material-texture.tsx"),
      route("light-shadow", "routes/light-shadow.tsx"),
      route("camera-control", "routes/camera-control.tsx"),
    ]
    //     {
    //     children: [
    //       index("routes/home.tsx"),
    //       route("routes/basic-scene.tsx"),
    //       route("routes/basic-animation.tsx"),
    //       route("routes/material-texture.tsx"),
    //       route("routes/light-shadow.tsx"),
    //       route("routes/camera-control.tsx"),
    //     ],
    //   }
  ),
] satisfies RouteConfig;
