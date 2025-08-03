import { useForm } from "react-hook-form";
import { useAuthState } from "../../../../utils/firebase/hooks/useAuthState";
import { useUpdateDocumentMutation } from "../../../../utils/firebase/hooks/useUpdateDocumentMutation";
import { ModalProps } from "../../Modal/Modal";
import { Typography } from "../../../typography/Typography";
import { Input } from "../../../input/Input";
import { z } from "zod";
import Button from "../../../buttons/Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";

const settingSchemas = {
  displayName: z.string().min(3, "Name should be at least 3 characters"),
  email: z.string().email("Inalid Email"),
  city: z.string().min(2, "Real city")
};

export type SettingModalItem = {
  type: keyof typeof settingSchemas;
  value: string;
};

interface SettingChangeModalContentProps extends Pick<ModalProps, "onClose"> {
  setting: SettingModalItem;
}

export const SettingChangeModalContent = ({
  setting,
  onClose,
}: SettingChangeModalContentProps) => {
  const authState = useAuthState();
  const updateDocumentMutation = useUpdateDocumentMutation({
    onSuccess: () => {
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    defaultValues: { [setting.type]: setting.value },
    resolver: zodResolver(
      z.object({
        [setting.type]: settingSchemas[setting.type],
      })
    ),
    mode: "onBlur",
  });

  const isLoading = isSubmitting || updateDocumentMutation.isPending;
  const currentValue = watch(setting.type);

  if (!authState.data) return null;

  const user = authState.data;

  return (
    <form
      onSubmit={handleSubmit(async () => {
        if (currentValue === setting.value) {
          onClose();
          return;
        }
        updateDocumentMutation.mutate({
          collection: "users",
          data: { [setting.type]: currentValue },
          id: user.uid!,
        });
      })}
    >
      <Typography variant="sub-title">Change your {setting.type}</Typography>
      <Input
        {...register(setting.type)}
        disabled={isLoading}
        error={errors[setting.type]?.message}
        defaultValue={setting.value}
      />
      <div className="mt-1.5 flex gap-2 justify-end">
        <Button
          theme="blue"
          type="submit"
          disabled={isLoading || currentValue === setting.value}
        >
          CHANGE
        </Button>
        <Button theme="red" onClick={onClose} disabled={isLoading}>
          CANCEL
        </Button>
      </div>
    </form>
  );
};
