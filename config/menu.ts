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
        color: "accent",
        items: [],
      },
    ];
    if (user) {
      if (user?.groups?.some((g) => g.service.name === "Suivi dashboard")) {
        temp.push({
          name: " Budget engagé",
          link: "/budegetEngage",
          color: "warning",
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
          color: "error",
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
            name: "Grant en cours",
            link: "/grants/grantsEnCours",
            icon: "",
          });
      }
      if (user?.groups?.some((g) => g.service.name === "Suivi grant admin")) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 22,
            name: "Grants admin",
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
            name: "Reliquat grants",
            link: "/grants/reliquatGrants",
            icon: "",
          });
      }
      // if (user?.groups?.some((g) => g.service.name === "Suivi période")) {
      //   temp
      //     .find((t) => t.id === 2)
      //     .items.push({
      //       id: 24,
      //       name: "Période et budget initial",
      //       link: "/grants/periode",
      //       icon: "",
      //     });
      // }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi plan financement")
      ) {
        temp
          .find((t) => t.id === 2)
          .items.push({
            id: 25,
            name: "Plan financement (Période et budget initial)",
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
            name: "Grant monitoring",
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
          color: "info",
          items: [],
        });
      }
      if (
        user?.groups?.some((g) => g.service.name === "Suivi configurations")
      ) {
        temp.push({
          id: 4,
          name: "Configurations",
          link: "/configurations",
          color: "success",
          icon: "settingsIcon",
          items: [
            {
              id: 42,
              name: "Grant line 1",
              link: "/configurations/type",
              icon: "",
            },
            {
              id: 43,
              name: "Grant line 2",
              link: "/configurations/lineBudget",
              icon: "",
            },
            {
              id: 44,
              name: "Organisation",
              link: "/configurations/organisation",
              icon: "",
            },
            {
              id: 45,
              name: "Statut de PTA",
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
            {
              id: 48,
              name: "Devise",
              link: "/configurations/devise",
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
