import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getBudgetEngagedList } from "../../../redux/features/budgetEngaged/budgetEngagedSlice";
/**
 * @description Hook to fetch bon commande fournisseur
 */
const useFetchBudgetEngaged = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        // if (router.query.search) {
        //     args.where = {
        //         OR:[
        //             {
        //                 paymentMethod:{
        //                     contains:router.query.search,
        //                     mode: "insensitive"
        //                 }
        //             },
        //             {
        //                 deliveryCondition:{
        //                     contains:router.query.search,
        //                     mode: "insensitive"
        //                 }
        //             },
        //             {
        //                 deliveryDate:{
        //                     contains:router.query.search,
        //                     mode: "insensitive"
        //                 }
        //             },
        //             {
        //                 establishmentDate:{
        //                     contains:router.query.search,
        //                     mode: "insensitive"
        //                 }
        //             }
        //         ]
        //     };
        // }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getBudgetEngagedList({ args }));
    };
};

export default useFetchBudgetEngaged;
