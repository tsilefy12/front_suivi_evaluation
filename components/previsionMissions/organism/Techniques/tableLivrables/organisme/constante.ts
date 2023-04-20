function createData(id: string, livrable: string) {
  return { id, livrable };
}

export const rows = [
  createData("1", "Livrable 1"),
  createData("2", "Livrable 2"),
];
