import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import {  useAppSelector } from "../../hooks/reduxHooks";
import formatMontant from "../../hooks/format";
import { useRouter } from "next/router";
import useFetchCaiseeDas from "../reliquetGrant/hooks/useFetchCaisseAnnexe";

const groupAndSumCaisse = (data: any[]) => {
  const groupedData = data.reduce((acc, item) => {
    const { caisseId, debit, credit } = item;
    if (!acc[caisseId]) {
      acc[caisseId] = { caisseId, totalDebit: 0, totalCredit: 0, caisse: item.caisse };
    }
    acc[caisseId].totalDebit += debit;
    acc[caisseId].totalCredit += credit;
    return acc;
  }, {});
  return Object.values(groupedData); // Convertir l'objet en array
};

export default function Caisse() {
  const router = useRouter();
  const { caisselist } = useAppSelector((state) => state.reliquatGrant);
  const fetchCaisse = useFetchCaiseeDas();
  useEffect(() => {
    fetchCaisse();
  }, [router.query]);

  const groupedData = Object.values(groupAndSumCaisse(caisselist));

  return (
    <Stack width={"100%"} padding={1}>
      <Stack
        flex={2}
        direction={"row"}
        gap={2}
        justifyContent={"flex-start"}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          padding={2}
          sx={{
            border: "1px solid #00C49F",
            borderRadius: 1,
            whiteSpace: "nowrap",
            minWidth: 180,
          }}
        >
            <Typography variant={"caption"} fontWeight={"bolder"}>
                Total caisse principal
            </Typography>
            <Typography sx={{ color: "#00C49F" }} variant={"h4"}>
              {formatMontant(Number(caisselist.reduce((sum: any, m: any) => sum + (m.debit! - m.credit!), 0)))} Ar
            </Typography>
        </Stack>
       {groupedData.length !== 0 && groupedData.map((item: any) => (
          <Stack
            key={item.caisseId}
            direction={"column"}
            alignItems={"center"}
            padding={2}
            sx={{
              border: "1px solid #0088FE",
              borderRadius: 1,
              whiteSpace: "nowrap",
              minWidth: 180,
            }}
          >
            <Typography variant={"caption"} fontWeight={"bolder"}>
              {item.caisse?.name}
            </Typography>
            <Typography variant={"caption"} fontWeight={"bolder"}>
              {item.caisse?.workplace.name}
            </Typography>
            <Typography sx={{ color: "#0088FE" }} variant={"h4"}>
              {formatMontant(item.totalDebit - item.totalCredit)}  Ar
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
