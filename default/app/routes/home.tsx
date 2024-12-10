import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Bridging App" },
    { name: "description", content: "Welcome to React Bridging!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
