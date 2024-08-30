import ValidationRapport from "../../../components/validationMission/validationRapport/ValidationRapport";
import BackOfficeLayout from "../../../layouts/backOffice";

const ValidationRapportPage = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>
        <ValidationRapport />
      </div>
    </BackOfficeLayout>
  );
};
export default ValidationRapportPage;
