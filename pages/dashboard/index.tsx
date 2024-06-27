import { Stack } from "@mui/material"
import BudgetEngageChart from "../../components/dashboards/budgetEngage";
import Menu from "../../components/dashboards/Menu";
import Mission from "../../components/dashboards/Mission";
import Rapport from "../../components/dashboards/Rapport";
import Counter from "../../components/dashboards/Counter";
import Caisse from "../../components/dashboards/caisse";

export default function Dashboard() {
  return (
    <Stack
      direction={"column"}
      sx={{ background: "white" }}
      margin={1}
      padding={2}
      gap={2}
    >
      <Stack direction={"row"}>
        <Stack flex={2} direction={"column"} gap={2}>
          < BudgetEngageChart/>
        </Stack>
        <Stack flex={1}>
          <Menu />
        </Stack>
      </Stack>
      <Stack direction={"row"} gap={2} width={"100%"} flexWrap={"wrap"}>
        <Stack flex={2} sx={{ minWidth: 300 }}>
          <Mission />
        </Stack>
        <Stack flex={2} sx={{ minWidth: 300 }}>
          <Rapport />
        </Stack>
        <Stack flex={1} direction={"column"} sx={{ minWidth: 300 }}>
          <Counter />
        </Stack>
      </Stack>
      <Stack flex={2} direction={"column"} gap={2}>
        <Caisse />
      </Stack>
    </Stack>
  );
}
