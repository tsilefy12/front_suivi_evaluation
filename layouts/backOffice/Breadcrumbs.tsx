import React, { Fragment, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Stack, Container } from "@mui/material";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { BreadcrumbSeparator } from "../../components/shared/BreadcrumbSeparator";

const MvBreadcrumbs = () => {
  const router = useRouter();
  const routeArray = router.pathname.split("/");
  routeArray.shift();

  return (
    <Stack sx={{ px: 3.2, py: 2 }}>
      <Container maxWidth="xl">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<BreadcrumbSeparator />}
        >
          <Link underline="hover" color="inherit" href="/">
            App
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Suivis et évaluations
          </Link>
          {routeArray.map((route, index) =>
            index === routeArray.length ? (
              <span key={index}>
                <Link underline="hover" color="inherit" href={router.pathname}>
                  {route}
                </Link>
              </span>
            ) : (
              <span key={index}>
                <Typography color="text.primary">{route}</Typography>
              </span>
            )
          )}
        </Breadcrumbs>
      </Container>
    </Stack>
  );
};

export default MvBreadcrumbs;
