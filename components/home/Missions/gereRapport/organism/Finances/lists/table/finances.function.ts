import { Data } from "./finances.interface";

export function createData(
  finance: string,
): Data {
  return { finance };
}
