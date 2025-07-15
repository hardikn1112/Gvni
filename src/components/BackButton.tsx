import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BackButtonProps {
  to?: string;
  className?: string;
}

const BackButton = ({ to, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleBack}
      className={`h-10 w-10 ${className}`}
      aria-label={t("common.back")}
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  );
};

export default BackButton;