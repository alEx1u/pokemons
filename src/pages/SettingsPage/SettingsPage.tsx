import { useAuthState } from "../../utils/firebase/hooks/useAuthState";
import { useState } from "react";
import { Setting } from "./Settings/Setting";
import { SettingChangeModal } from "../../common/modals/SettingChangeModal/SettingChangeModal";
import { SettingModalItem } from "../../common/modals/SettingChangeModal/SettingChangeModalContent/SettingChangeModalContent";
import userNoImg from "../../assets/userNoImg.jpg";
import { IconButton } from "../../common/buttons/IconButton/IconButton";
import { PenIcon } from "../../common/icons/PenIcon";
import { UploadPhotoModal } from "../../common/modals/UploadPhotoModal/UploadPhotoModal";
export const SettingsPage = () => {
  const [selectedSetting, setSelectedSetting] =
    useState<SettingModalItem | null>(null);
  const [isShownPhotoModal, setIsShownPhotoModal] = useState<boolean>(false);

  const authState = useAuthState();

  if (!authState.data) return null;

  const user = authState.data;

  return (
    <div className="page flex flex-col items-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <img
          src={!user.photoUrl ? userNoImg : user.photoUrl}
          alt="user photo"
          className="h-full w-full rounded-full object-cover"
        />
        <div className="absolute bottom-[-15px]">
          <IconButton
            icon={<PenIcon />}
            onClick={() => setIsShownPhotoModal(true)}
          />
        </div>
      </div>
      <div className="card w-full">
        <ul>
          <li>
            <Setting label="id" value={user.uid!} />
          </li>
          <li>
            <Setting
              label="Email"
              value={user.email !== "" && user.email ? user.email : "none"}
              onClick={() =>
                setSelectedSetting({
                  type: "email",
                  value: user.email,
                })
              }
            />
          </li>
          <li>
            <Setting
              label="Your name"
              value={
                user.displayName !== "" && user.displayName
                  ? user.displayName
                  : "none"
              }
              onClick={() =>
                setSelectedSetting({
                  type: "displayName",
                  value: user.displayName,
                })
              }
            />
          </li>
          <li>
            <Setting
              label="City"
              value={user.city !== "" && user.city ? user.city : "none"}
              onClick={() =>
                setSelectedSetting({
                  type: "city",
                  value: user.city,
                })
              }
            />
          </li>
        </ul>
      </div>
      <UploadPhotoModal
        isShowing={isShownPhotoModal}
        uid={user.uid}
        onClose={() => setIsShownPhotoModal(false)}
      />
      <SettingChangeModal
        setting={selectedSetting}
        onClose={() => setSelectedSetting(null)}
      />
    </div>
  );
};
