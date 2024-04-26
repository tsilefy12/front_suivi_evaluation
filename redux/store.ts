import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { missionSlice } from "./features/mission/missionSlice";
import { authSlice } from "./features/auth";
import { notificationSlice } from "./features/notification/notificationSlice";
import { customizationSlice } from "./features/customization/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { missionGoalSlice } from "./features/missionGoal/missionGoalSlice";
import { exceptedResultSlice } from "./features/exceptedResult/exceptedResultSlice";
import { plannedActivitySlice } from "./features/plannedActivity/plannedActivitySlice";
import { deliverableSlice } from "./features/deliverable/deliverableSlice";
import { missionLocationSlice } from "./features/missionLocation/missionLocationSlice";
import { vehicleSlice } from "./features/vehicle/vehicleSlice";
import { contactSlice } from "./features/contact/contactSlice";
import { missionarySlice } from "./features/missionary/missionarySlice";
import { employeSlice } from "./features/employe";
import { grantEncoursSlice } from "./features/grantEncours/grantEncoursSlice";
import { previsionDepenseSlice } from "./features/PrevisionDepense/previsionDepenseSlice";
import { programmePrevisionSlice } from "./features/programmePrevision/programmePrevisionSlice";
import { autrInfoPrevisionSlice } from "./features/autreInfoPrevision/autreInfoPrevisionSlice";
import { resumeDepenseSlice } from "./features/resumeDepense/resumeDepenseSlice";
import { calculPileSlice } from "./features/calculPile/calculPileSlice";
import { besoinVehiculeSlice } from "./features/besoinVehicule/besoinVehiculeSlice";
import { calculCarburantSlice } from "./features/calculCarburant/calculCarburantSlice";
import { bankSlice } from "./features/bank/bankSlice";
import { postAnalytiqueSlice } from "./features/postAnalytique/postAnalytiqueSlice";
import { projectSlice } from "./features/project/projectSlice";
import { budgetLineSlice } from "./features/budgetLine/budgetLineSlice";
import { budgetInitialSlice } from "./features/budgetInitial/budgetInitialSlice";
import { periodeSlice } from "./features/periode/periodeSlice";
import { grantAdminSlice } from "./features/grantAdmin/periodeSlice";
import { tacheEtObjectifsSlice } from "./features/tachesEtObjectifs/tacheEtObjectifsSlice";
import { objectifAnnuelsSlice } from "./features/objectifAnnuels/objectifGeneralSlice";
import { planTravailSlice } from "./features/planTravail/planTravailSlice";
import { reliquatGrantSlice } from "./features/reliquatGrants/reliquatGrantSlice";
import { budgetEngagedSlice } from "./features/budgetEngaged/budgetEngagedSlice";
import { typeSlice } from "./features/type/typeSlice";
import { organisationSlice } from "./features/organisation/organisationSlice";
import { currencySlice } from "./features/currency/currencySlice";
import { lineBudgetSlice } from "./features/lineBudget/lineBudgetSlice";


export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    mission: missionSlice.reducer,
    missionGoal: missionGoalSlice.reducer,
    exceptedResult: exceptedResultSlice.reducer,
    plannedActivity: plannedActivitySlice.reducer,
    deliverable: deliverableSlice.reducer,
    missionLocation: missionLocationSlice.reducer,
    vehicle: vehicleSlice.reducer,
    contact: contactSlice.reducer,
    missionary: missionarySlice.reducer,
    employe: employeSlice.reducer,
    grantEncours: grantEncoursSlice.reducer,
    previsonDepense: previsionDepenseSlice.reducer,
    programmePrevision: programmePrevisionSlice.reducer,
    autreInfoPrevision: autrInfoPrevisionSlice.reducer,
    resumeDepense: resumeDepenseSlice.reducer,
    calculPile: calculPileSlice.reducer,
    besoinVehicule: besoinVehiculeSlice.reducer,
    calculCarburant: calculCarburantSlice.reducer,
    bank: bankSlice.reducer,
    postAnalytique: postAnalytiqueSlice.reducer,
    project: projectSlice.reducer,
    budgetLine: budgetLineSlice.reducer,
    budgetInitial: budgetInitialSlice.reducer,
    periode: periodeSlice.reducer,
    grantAdmin: grantAdminSlice.reducer,
    tacheEtObjectifs: tacheEtObjectifsSlice.reducer,
    objectifsAnnuels: objectifAnnuelsSlice.reducer,
    planTravail: planTravailSlice.reducer,
    reliquatGrant: reliquatGrantSlice.reducer,
    budgetsEngaged: budgetEngagedSlice.reducer,
    types: typeSlice.reducer,
    organisations : organisationSlice.reducer,
    lineBudget : lineBudgetSlice.reducer,
    currency: currencySlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
