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
  createData("", "HAVANA", "Oui", "Non", "Oui"),
  createData("", "ARO", "Oui", "Oui", "Non"),
];
