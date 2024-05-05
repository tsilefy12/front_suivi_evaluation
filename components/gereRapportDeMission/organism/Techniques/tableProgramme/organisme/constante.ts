function createData(
  id: string,
  dateDebut: string,
  dateFin: string,
  activites: string,
  activitesRealise: string,
  livrable: string,
  responsable: string
) {
  return { id, dateDebut, dateFin, activites,activitesRealise, livrable, responsable };
}

export const rows = [
  createData(
    "1",
    "08/10/2021",
    "08/11/2022  ",
    "Recensement ",
    "Livrable 1",
    "Livrable 1",
    "Gladis"
  ),
];
