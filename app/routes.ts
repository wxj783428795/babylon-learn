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
