import { Data } from "./techniques.interface";

export function createData(
  technique: string,
): Data {
  return { technique };
}
