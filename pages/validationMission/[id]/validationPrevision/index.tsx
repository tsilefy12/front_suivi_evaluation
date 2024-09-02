import ValidationPrevision from "../../../../components/validationMission/[id]/validationPrevision/ValidationPrevision";
import BackOfficeLayout from "../../../../layouts/backOffice";

const ValidationPrevisioPages = () => {
  return (
    <BackOfficeLayout>
      <div style={{ paddingLeft: 2, paddingRight: 2 }}>
        <ValidationPrevision />
      </div>
    </BackOfficeLayout>
  );
};
export default ValidationPrevisioPages;
