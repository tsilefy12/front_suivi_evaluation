import { useMemo } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

function allMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const menus = useMemo(() => {
    let temp: any[] = [
      {
        id: 2,
        name: "GRANTS",
        link: "/grants",
        icon: "run_circle",
        items: [],
      },
    ];
    if (user) {
      if (user?.groups?.some((g) => g.service.name === "Suivi dashboard")) {
        temp.push({
          name: " Budget engagé",
          link: "/",
          icon: "dashboardIcon",
          items: [],
        });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi dashboard mission")
      ) {
        temp.push({
          id: 1,
          name: "Missions",
          link: "/missions",
          icon: "descriptionIcon",
          items: [],
        });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi grant en cours")
      ) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 21,
            name: "Grants en Cours",
            link: "/grants/grantsEnCours",
            icon: "",
          });
      }
      if (user?.groups?.some((g) => g.service.name === "Suivi grant admin")) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 22,
            name: "Grants Admin",
            link: "/grants/grantsAdmin",
            icon: "",
          });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi reliquat grant")
      ) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 23,
            name: "Reliquat GRANTS",
            link: "/grants/reliquatGrants",
            icon: "",
          });
      }
      if (user?.groups?.some((g) => g.service.name === "Suivi période")) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 24,
            name: "Période et budget initial",
            link: "/grants/periode",
            icon: "",
          });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi plan financement")
      ) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 25,
            name: "Plan financement",
            link: "/grants/planFinancement",
            icon: "",
          });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi grant monitoring")
      ) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 26,
            name: "Grant Monitoring",
            link: "/grants/grantMonitoring",
            icon: "",
          });
      }
      if (user?.groups?.some((g) => g.service.name === "Suivi pta")) {
        temp.push({
          id: 3,
          name: "PTA",
          link: "/plan_travail",
          icon: "display_settings",
          items: [],
        });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi configurations")
      ) {
        temp
          .find((t) => t.id === 3)
          .items.push({
            id: 4,
            name: "Configurations",
            link: "/configurations",
            icon: "settingsIcon",
            items: [
              {
                id: 42,
                name: "Type",
                link: "/configurations/type",
                icon: "",
              },
              {
                id: 43,
                name: "Organisation",
                link: "/configurations/organisation",
                icon: "",
              },
              {
                id: 44,
                name: "Ligne de Budget",
                link: "/configurations/lineBudget",
                icon: "",
              },
              {
                id: 45,
                name: "Status",
                link: "/configurations/status",
                icon: "",
              },
              {
                id: 46,
                name: "Projet",
                link: "/configurations/project",
                icon: "",
              },
              {
                id: 47,
                name: "Site",
                link: "/configurations/site",
                icon: "",
              },
            ],
          });
      }
    }
    return temp;
  }, [user]);
  return menus;
}

export default allMenu;
