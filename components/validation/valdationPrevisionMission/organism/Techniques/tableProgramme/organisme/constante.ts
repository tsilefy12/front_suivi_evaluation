function createData(
  id: string,
  dateDebut: string,
  dateFin: string,
  activites: string,
  livrable: string,
  responsable: string
) {
  return { id, dateDebut, dateFin, activites, livrable, responsable };
}

export const rows = [
  createData(
    "",
    "08/10/2021",
    "08/11/2022  ",
    "Recensement ",
    "Livrable 1",
    "Gladis"
  ),
  createData(
    "",
    "08/10/2021",
    "08/11/2022  ",
    "Descente  ",
    "Livrable 2",
    "Gladis"
  ),
];
