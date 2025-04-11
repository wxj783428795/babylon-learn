import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "./ui/sidebar";

// This is sample data.
interface NavItem {
  title: string;
  url: string;
  items?: NavSubItem[];
  isActive?: boolean;
}

interface NavSubItem {
  title: string;
  url: string;
  isActive?: boolean;
  items?: NavSubItem[];
}

interface NavData {
  navMain: NavItem[];
}

const data: NavData = {
  navMain: [
    {
      title: "首页",
      url: "/",
      items: [],
    },
    {
      title: "模型构造器",
      url: "/model-builder",
    },
    {
      title: "The Very First Step",
      url: "/basic-scene",
      items: [
        {
          title: "first-creation",
          url: "/first-creation",
        },
      ],
    },
    {
      title: "Features",
      url: "",
      items: [
        {
          title: "first import",
          url: "/first-import",
        },
        {
          title: "build a village",
          url: "/build-a-village",
        },
        {
          title: "combine-meshed",
          url: "/combine-meshes",
        },
        {
          title: "village-animation",
          url: "/village-animation",
        },
        {
          title: "car-animation",
          url: "/car-animation",
        },
        {
          title: "better-environment",
          url: "/better-environment",
        },
        {
          title: "particle-fountain",
          url: "/particle-fountain",
        },
      ],
    },
    {
      title: "Deep Dive",
      url: "",
      items: [
        {
          title: "Animation",
          url: "",
          items: [
            {
              title: "Design-An-Animation",
              url: "/design-an-animation",
            },
            {
              title: "Sequencing-Animations",
              url: "/sequencing-animations",
            },
          ],
        },
      ],
    },
    {
      title: "基础动画",
      url: "/basic-animation",
    },
    {
      title: "材质与纹理",
      url: "/material-texture",
    },
    {
      title: "光照与阴影",
      url: "/light-shadow",
    },
    {
      title: "相机控制",
      url: "/camera-control",
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Babylonjs</span>
                  {/* <span className="">v1.0.0</span> */}
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                        {item.items?.length ? (
                          <SidebarMenuSub>
                            {item.items.map((item) => (
                              <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={item.isActive}
                                >
                                  <a href={item.url}>{item.title}</a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
