import { IconButton } from "../../../common/buttons/IconButton/IconButton";
import { ArrowRigthIcon } from "../../../common/icons/ArrowRight";
import { Typography } from "../../../common/typography/Typography";
import styles from '../SettingsPage.module.scss';

interface SettingProps {
  label: string;
  value: string;
  onClick?: () => void;
}

export const Setting = ({ label, value, onClick }: SettingProps) => (
  <div className={styles.setting}>
    <div>
      <Typography variant="sub-body">{label}</Typography>
      <Typography variant="title-body">{value}</Typography>
    </div>
    {onClick && (
      <IconButton variant="icon" icon={<ArrowRigthIcon />} onClick={onClick} />
    )}
  </div>
);
