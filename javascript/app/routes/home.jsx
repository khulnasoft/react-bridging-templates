import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "New React Bridging App" },
    { name: "description", content: "Welcome to React Bridging!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
