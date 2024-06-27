import { Stack, styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const CardModule = ({ children, color, href }: any) => {
  return (
    <Link href={href}>
      <CardModel sx={{ boxShadow: 3 }} color={color}>
        <BtnStack>{children}</BtnStack>
      </CardModel>
    </Link>
  );
};

CardModule.defaultProps = {
  href: "",
};

export default CardModule;

const BtnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const CardModel = styled("div")<any>(({ theme, color }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minWidth: 250,
  cursor: "pointer",
  backgroundColor: theme.palette.background.paper,
  color: color ? theme.palette[color as keyof typeof theme.palette].main : theme.palette.text.primary,
  fontWeight: "bold",
  transition: "background-color 0.3s ease",
  "&:hover": {
    color: theme.palette.background.paper,
    fontWeight: "bold",
    backgroundColor: color ? theme.palette[color as keyof typeof theme.palette].main : theme.palette.action.hover,
  },
}));
