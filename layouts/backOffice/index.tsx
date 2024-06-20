import { useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import MvBreadcrumbs from "./Breadcrumbs";
import FooterBackOffice from "./FooterBackOffice";
import NavbarBackOffice from "./navbar/NavbarBackOffice";
import NavbarMobile from "./navbar/NavbarMobile";

const BackOfficeLayout = ({ children }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  function verifyPermission(path: string, service: string) {
    if (router.pathname.includes(path)) {
      if (!user!.groups?.some((g) => g.service.name === service)) {
        router.push("/");
      }
    }
  }

  useEffect(() => {
    if (user) {
      if (!user.groups?.some((g) => g.service.name === "Suivi")) {
        window.location.href = "/";
      }
      verifyPermission("/", "Suivi dashboard");
      verifyPermission("/missions", "Suivi dashboard mission");
      verifyPermission("/grants/grantsEnCours", "Suivi grant en cours");
      verifyPermission("/grants/grantsAdmin", "Suivi grant admin");
      verifyPermission("/grants/reliquatGrants", "Suivi reliquat grant");
      verifyPermission("/grants/periode", "Suivi période");
      verifyPermission("/grants/planFinancement", "Suivi plan financement");
      verifyPermission("/grants/grantMonitoring", "Suivi grant monitoring");
      verifyPermission("/plan_travail", "Suivi pta");
      verifyPermission("/configurations", "Suivi configurations");
    }
  }, [user]);

  return (
    <>
      {matches ? (
        <NavbarMobile matches={matches} />
      ) : (
        <NavbarBackOffice matches={matches} />
      )}
      <MvBreadcrumbs />
      {children}
      <FooterBackOffice />
    </>
  );
};

export default BackOfficeLayout;
