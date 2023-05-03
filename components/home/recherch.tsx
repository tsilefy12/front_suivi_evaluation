import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { debounce } from "lodash";

const Recherche = () => {
  const [key, setKey] = React.useState<any>("");

  const router = useRouter();

  // initialisation du champ de recherche
  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const debouncedSearch = React.useCallback(debounce(search, 300), [
    router.query,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextField
            variant="outlined"
            id="search"
            name="search"
            placeholder="Recherche"
            size="small"
            value={key}
            onChange={handleChange}
          />
        </Stack>
      </Toolbar>
    </>
  );
};

export default Recherche;
