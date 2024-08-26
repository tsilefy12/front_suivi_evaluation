import ValidationRapport from "../../../components/validationMission/validationRapport/ValidationRapport";
import BackOfficeLayout from "../../../layouts/backOffice";

const ValidationRapportPage = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ValidationRapport />
      </div>
    </BackOfficeLayout>
  );
};
export default ValidationRapportPage;
