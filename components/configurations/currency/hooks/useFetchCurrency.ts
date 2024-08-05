import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getCurrencyListe } from "../../../../redux/features/currency";



const useFetchCurrencyListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            symbol: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "ISO":
          args.orderBy = {
            iso: router.query.order,
          };
          break;

        case "Symbole":
          args.orderBy = {
            symbol: router.query.order,
          };
          break;

        case "Nom":
          args.orderBy = {
            name: router.query.order,
          };
          break;

        case "Nombre de chiffre aprés virgule":
          args.orderBy = {
            decimalPlaces: router.query.order,
          };
          break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    dispatch(getCurrencyListe({ args }));
  };
};

export default useFetchCurrencyListe;
