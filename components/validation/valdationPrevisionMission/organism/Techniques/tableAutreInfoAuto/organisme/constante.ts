function createData(
  id: string,
  assurance: string,
  visite: string,
  voiture: string,
  ceinture: string
) {
  return { id, assurance, visite, voiture, ceinture };
}

export const rows = [
  createData("1", "HAVANA", "Oui", "Non", "Oui"),
  createData("2", "ARO", "Oui", "Oui", "Non"),
];
