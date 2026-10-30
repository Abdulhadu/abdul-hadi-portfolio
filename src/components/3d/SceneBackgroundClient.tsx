"use client";
import dynamic from "next/dynamic";

const SceneBackground = dynamic(() => import("./SceneBackground"), {
  ssr: false,
  loading: () => null,
});

export default function SceneBackgroundClient() {
  return <SceneBackground />;
}
