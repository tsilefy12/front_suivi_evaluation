const menu = [
  {
    id: 1,
    name: "Missions",
    link: "/",
    icon: "descriptionIcon",
    items: [
      // {
      //   id: 11,
      //   name: "Rapport de mission",
      //   link: "/missions/validation/validationRapportMission",
      //   icon: "",
      // },
      // {
      //   id: 12,
      //   name: "Prevision de mission",
      //   link: "/missions/validation/validationPrevisionMission",
      //   icon: "",
      // },
    ],
  },
  {
    id: 2,
    name: "GRANTS",
    link: "/grants",
    icon: "run_circle",
    items: [
      {
        id: 21,
        name: "Grants en Cours",
        link: "/grants/grantsEnCours",
        icon: "",
      },
      {
        id: 22,
        name: "Grants Admin",
        link: "/grants/grantsAdmin",
        icon: "",
      },
      {
        id: 23,
        name: " Reliquat GRANTS",
        link: "/grants/reliquatGrants",
        icon: "",
      },
      {
        id: 24,
        name: "Période",
        link: "/grants/periode",
        icon: "",
      },
      {
        id: 25,
        name: "Budget initial",
        link: "/grants/budgetInitial",
        icon: "",
      },
      {
        id: 26,
        name: "Budget engagé",
        link: "/grants/budgetEngage",
        icon: "",
      },
      {
        id: 27,
        name: "Ligne budgetaire",
        link: "/grants/ligneBudgetaire",
        icon: "",
      },
    ],
  },
  {
    id: 3,
    name: "Plan Travail Global",
    link: "/plan_travail",
    icon: "display_settings",
    items: [],
  },
  {
    id: 4,
    name: "Configurations",
    link: "/configurations",
    icon: "settingsIcon",
    items: [
      {
        id: 41,
        name: "Devise",
        link: "/configurations/devise",
        icon: "",
      },
      {
        id:42,
        name: "Poste Analytique",
        link: "/configurations/postAnalytic",
        icon: "",
      },
      {
        id:43,
        name: "Type",
        link: "/configurations/type",
        icon: "",
      },
      {
        id:44,
        name: "Organisation",
        link: "/configurations/organisation",
        icon: "",
      },
      {
        id:45,
        name: "Ligne de Budget",
        link: "/configurations/lineBudget",
        icon: "",
      }
    ],
  },
  
];

export default menu;
