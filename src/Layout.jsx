import { Children } from "react";
import SideBar from "./components/SideBar";

export default function Layout({children}) {
  return (
    <div>
      <SideBar />
      {children}
    </div>
  )
}