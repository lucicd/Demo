import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

export default function MainNavigation() {
  const navigate = useNavigate();

  const items = [
    { label: "Home", icon: "pi pi-fw pi-home", command: () => navigate("/") },
    {
      label: "Countries",
      command: () => navigate("/countries"),
    },
    {
      label: "Cities",
      command: () => navigate("/cities"),
    },
    {
      label: "Markets",
      command: () => navigate("/markets"),
    },
    {
      label: "Login",
      command: () => navigate("/auth"),
    },
    {
      label: "Logout",
      command: () => navigate("/logout"),
    },
  ];
  return <Menubar model={items} />;
}
