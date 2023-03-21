function createData(
  id: string,
  lieux: string,
  commune: string,
  district: string
) {
  return { id, lieux, commune, district };
}

export const rows = [
  createData("", "Andraisoro", "Antananarivo", "Antananarivo"),
  createData("", "Ampasapito", "Antananarivo", "Antananarivo"),
];
