import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { updateSetting } from "../../services/apiSettings";
import { useEditSettings } from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minimumBookingLength,
      maxBookingLength,
      maxGuestPerCabin,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isEditing, editSettings } = useEditSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    editSettings({
      [field]: value,
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isEditing}
          defaultValue={minimumBookingLength}
          onBlur={(e) => handleUpdate(e, "minimumBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isEditing}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          disabled={isEditing}
          id="max-guests"
          defaultValue={maxGuestPerCabin}
          onBlur={(e) => handleUpdate(e, "maxGuestPerCabin")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          disabled={isEditing}
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
