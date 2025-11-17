import { useState } from "react";

import Step1Id from "./step1-id/step1-id";
import Step2Password from "./step2-password/step2-password";
import Step3Info from "./step3-info/step3-info";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  return (
    <>
      {step === 1 && (
        <Step1Id
          onNext={(username) => {
            setFormData((prev) => ({ ...prev, username }));
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Step2Password
          onNext={(password) => {
            setFormData((prev) => ({ ...prev, password }));
            setStep(3);
          }}
          onPrev={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3Info onPrev={() => setStep(2)} formData={formData} />
      )}
    </>
  );
};

export default Signup;
