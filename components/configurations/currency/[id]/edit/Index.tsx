import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editCurrency, getCurrency } from "../../../../../redux/features/currency";
import CurrencyForm from "../../add/CurrencyForm";

const IndexCurrency = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      getCurrency(router.query.id);
    }
  }, [router.query.id]);
  const getCurrency = async (id: any) => {
    await dispatch(editCurrency({ id }));
  };
  return <CurrencyForm></CurrencyForm>
};

export default IndexCurrency;