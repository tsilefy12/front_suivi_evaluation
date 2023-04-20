function createData(id: string, activite: string) {
  return { id, activite };
}

export const rows = [
  createData("1", "Activité numéro 1"),
  createData("2", "Activité numéro 2"),
];
