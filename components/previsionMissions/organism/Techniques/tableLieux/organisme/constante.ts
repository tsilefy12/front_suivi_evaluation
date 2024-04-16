function createData(
  id: string,
  lieux: string,
  commune: string,
  district: string
) {
  return { id, lieux, commune, district };
}

export const rows = [
  createData("1", "Andraisoro", "Antananarivo", "Antananarivo"),
  createData("2", "Ampasapito", "Antananarivo", "Antananarivo"),
];
