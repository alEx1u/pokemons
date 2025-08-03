import { IconButton } from "../../../common/buttons/IconButton/IconButton";
import { ArrowRigthIcon } from "../../../common/icons/ArrowRight";
import { Typography } from "../../../common/typography/Typography";

interface SettingProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export const Setting = ({ label, value, onClick }: SettingProps) => (
  <div className="flex justify-between">
    <div>
      <Typography variant="sub-body">{label}</Typography>
      <Typography variant="title-body">{value}</Typography>
    </div>
    {onClick && (
      <IconButton variant="icon" icon={<ArrowRigthIcon />} onClick={onClick} />
    )}
  </div>
);
