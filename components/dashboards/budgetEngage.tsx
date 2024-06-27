import { Stack, Typography } from "@mui/material";
import { useEffect, useState ,useMemo} from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useBasePath from "../../hooks/useBasePath";
import { useAppSelector } from "../../hooks/reduxHooks";
import useFetchBudgetEngaged from "../budgetEngage/hooks/useFetchBudgetEngaged";
import useFetchGrants from "../GrantsEnCours/hooks/getGrants";
import useFetchReliquatGrant from "../reliquetGrant/hooks/useFetchEliquatGrant";
import useFetchBudgetInitial from "../budgetInitial/hooks/useFetchBudgetInitial";
import useFetchBudgetLine from "../previsionMissions/organism/Finances/tablePrevision/hooks/useFetchbudgetLine";
import useFetchCaisee from "../reliquetGrant/hooks/useFetchCaisse";
import useFetchPeriode from "../periode/hooks/useFetchPeriode";

export default function BudgetChart() {
  const [filter, setFilter] = useState<number | null>(null);

  // Static data for the chart
  const [ data , setData] = useState<any[]>([]);
  const colors = [
    '#8884d8', // purple
    '#82ca9d', // green
    '#ffc658', // yellow
    '#ff7300', // orange
    '#387908', // dark green
    '#ff6347', // tomato
    '#20b2aa', // light sea green
    '#ff1493'  // deep pink
  ];

  const basePath = useBasePath();
  const dispatch = useDispatch();
  const router = useRouter();
  const fetchGrants = useFetchGrants();
  const { grantEncoursList } = useAppSelector((state) => state.grantEncours);
  const fetchBudgetLine = useFetchBudgetLine();
  const { budgetLineList } = useAppSelector((state) => state.budgetLine);
  const fetchBudgetEngagedList = useFetchBudgetEngaged();
  const { budgetEngagedList } = useAppSelector((state) => state.budgetsEngaged);
  const fetchReliquatGrant = useFetchReliquatGrant();
  const fetchBudgetInitial = useFetchBudgetInitial();
  const { budgetInitialList } = useAppSelector((state) => state.budgetInitial);
  const fetchCaisse = useFetchCaisee();
  const { caisselist } = useAppSelector((state) => state.reliquatGrant);
  const fetchPeriode = useFetchPeriode();
  const { periodelist } = useAppSelector((state) => state.periode);
  const soldeByGrant = useMemo(() => {
    if (!grantEncoursList) return 0;

    return grantEncoursList
      .filter((g) => g.id)
      .flatMap((m) => m.journalBanks)
      .reduce(
        (acc, curr) => acc + ((curr?.debit || 0) - (curr?.credit || 0)),
        0
      );
  }, [grantEncoursList]);

  const budgetEngaged = useMemo(() => {
    if (!caisselist) return soldeByGrant;

    const caisseSolde = caisselist
      .filter((f: any) => f.grantId)
      .reduce((sum: any, m: any) => sum + (m.debit! - m.credit!), 0);
    return soldeByGrant + caisseSolde;
  }, [caisselist, soldeByGrant]);

  useEffect(() => {
    fetchBudgetEngagedList();
    fetchGrants();
    fetchReliquatGrant();
    fetchBudgetInitial();
    fetchBudgetLine();
    fetchCaisse();
    fetchPeriode();
  }, [router.query]);

  useEffect(() => {
    if (grantEncoursList.length === 0) return;

    const newData = grantEncoursList
      .filter(
        (g) =>
          budgetLineList.some((bl) => bl.grantId === g.id) &&
          budgetInitialList.some((bi) => bi.grant === g.id) &&
          budgetEngagedList.some((be) => be.grantsId === g.id) &&
          periodelist.some((p) => p.grant === g.id)
      )
      .map((row) => ({
        grant: row.code,
        budget: Number(budgetEngaged),
      }));
    setData((prev: any[]) =>{
      prev = newData
      return prev
    })
  }, [grantEncoursList]);

  return (
    <Stack
      width={"100%"}
      padding={1}
      sx={{ border: "1px solid #efefef", borderRadius: 1 }}
    >
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <img src="/images/icons/chronometre.png" alt="chronometre" />
        <Typography variant="h5">Budget engagé par grants</Typography>
      </Stack>
      <Stack width={"100%"} height={300} paddingTop={2}>
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray={"3 3"} vertical={false} />
            <XAxis dataKey="grant" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} dataKey="budget" interval={2} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload || payload.length === 0) return null;
                return (
                  <Stack
                    direction={"column"}
                    padding={1}
                    sx={{
                      background: "rgba(255,255,255,0.5)",
                      backdropFilter: "blur(3px)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="GrayText"
                      fontWeight={"bolder"}
                    >
                      {payload[0].payload.grant}: &nbsp;
                    </Typography>
                    <Typography variant="caption" fontWeight={"bolder"}>
                      {payload[0].payload.budget.toFixed(2)} Ar
                    </Typography>
                  </Stack>
                );
              }}
            />
            <Bar dataKey="budget" barSize={30}>
              {data.map((entry : any, index :number) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Stack>
  );
}
