function createData(
  id: string,
  name: string,
  lieu: string,
  numero: string,
  remarques: string
) {
  return { id, name, lieu, numero, remarques };
}

export const rows = [
  createData("", "Andraisoro", "Antananarivo", "0342899982", "Remarque 1"),
  createData("", "Ampasapito", "Antananarivo", "0342899981", "Remarque 2"),
];
