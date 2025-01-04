import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  // const queryClient = useQueryClient();
  // const { isLoading: isCreating, mutate } = useMutation({
  //   mutationFn: createEditCabin, // mutationFn : newCabin => createCabin(newCabin)
  //   onSuccess: () => {
  //     toast.success("New Cabin Successfully created");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //     reset();
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useUpdateCabin();

  // const { isLoading: isEditing, mutate: editCabin } = useMutation({
  //   mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // mutationFn : newCabin => createCabin(newCabin)
  //   onSuccess: () => {
  //     toast.success("Cabin Successfully edited");
  //     queryClient.invalidateQueries({
  //       queryKey: ["cabin"],
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(data.image[0]);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      // console.log({ newCabinData: { ...data, image }, editId });
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onValidationError(errors) {
    // console.log(getValues().regularPrice > getValues().discount);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onValidationError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is Required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}

      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          disabled={isWorking}
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Capacity Should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "Price should be minimum $1",
            },
          })}
        />
      </FormRow>

      <FormRow label={"Discount"} error={errors?.discount?.message}>
        <Input
          disabled={isWorking}
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is Required",
            validate: (value) => {
              console.log(typeof value);
              console.log(typeof getValues().regularPrice);
              console.log(value, getValues().regularPrice);
              console.log(value < getValues().regularPrice);
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                "Discount should be less than regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description For Website"
        error={errors?.description?.message}
      >
        <Textarea
          disabled={isWorking}
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field is Required",
          })}
        />
      </FormRow>

      <FormRow label={"Cabin Photo"}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit" : "Create New"} Cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
