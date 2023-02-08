import { Box, Flex, Heading, Icon, useDisclosure } from "@chakra-ui/react";
import {
  useFieldArray,
  useForm,
  Control,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LinkProps, LinksFormProps, LinksFormSchema } from "@/modules/admin";
import Select from "@/components/ui/forms/select";
import Input from "@/components/ui/forms/input";
import Editable from "@/components/ui/forms/editable";
import Switch from "@/components/ui/forms/switch";
import Button from "@/components/ui/button";
import AlertDialog from "@/components/ui/alert-dialog";
import { HiOutlineEye, HiOutlineTrash, HiPlus } from "react-icons/hi";
import StatInfo from "../ui/stat-info";
import { UseFieldArrayRemove } from "react-hook-form/dist/types";

const colorModeOptions = [
  { label: "Solid", value: "solid" },
  { label: "Gradient", value: "gradient" },
];

const emptyLink: LinkProps = {
  enabled: true,
  title: "",
  url: "",
};

export default function LinksForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LinksFormProps>({
    resolver: zodResolver(LinksFormSchema),
  });

  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = handleSubmit((value) => {
    console.log("value?", value);
  });

  const appearanceSection = (
    <Flex
      w="full"
      backgroundColor="whiteAlpha.900"
      direction="column"
      gap="2"
      px="5"
      py="3"
      rounded="2xl"
      border="1px"
      borderColor="gray.300"
    >
      <Heading size={{ base: "sm", lg: "md" }} mb="3">
        Appearance
      </Heading>
      <Select
        register={register}
        name="appearance.colorMode"
        label="Color mode"
        options={colorModeOptions}
        placeholder="Select option"
        required
        size="sm"
      />
      <Flex w="full" gap="4" justifyContent="flex-start">
        <Input
          register={register}
          error={errors.appearance?.linkhubBackgroundColor1}
          size="sm"
          label="Color"
          name="appearance.linkhubBackgroundColor1"
          type="color"
          labelPlacement="left"
          required
        />
        {watch("appearance.colorMode") === "gradient" && (
          <Input
            register={register}
            error={errors.appearance?.linkhubBackgroundColor2}
            size="sm"
            label="Color 2"
            name="appearance.linkhubBackgroundColor2"
            type="color"
            labelPlacement="left"
            required
          />
        )}
      </Flex>
      <Input
        register={register}
        error={errors.appearance?.linkhubTextColor}
        size="sm"
        label="Text color"
        name="appearance.linkhubTextColor"
        type="color"
        labelPlacement="left"
        required
      />
    </Flex>
  );

  const linksSection = (
    <Flex w="full" direction="column" gap="4">
      <Button w="full" leftIcon={<HiPlus />} onClick={() => prepend(emptyLink)}>
        Add link
      </Button>
      {fields.map((field, index) => (
        <LinkCard
          key={field.id}
          control={control}
          register={register}
          index={index}
          remove={remove}
        />
      ))}
    </Flex>
  );

  return (
    <form onSubmit={onSubmit}>
      <Flex direction={{ base: "column", lg: "row-reverse" }} gap="6" mt="4">
        <Box flexGrow="1" flexBasis="0">
          {appearanceSection}
          <pre>data{JSON.stringify(watch(), null, 2)}</pre>
        </Box>
        <Box flexGrow="2" flexBasis="0">
          {linksSection}
        </Box>
      </Flex>
    </form>
  );
}

interface LinkCardProps {
  control: Control<LinksFormProps>;
  register: UseFormRegister<LinksFormProps>;
  index: number;
  remove: UseFieldArrayRemove;
}

function LinkCard({ control, register, index, remove }: LinkCardProps) {
  const deleteDialog = useDisclosure();

  return (
    <>
      <Flex
        w="full"
        backgroundColor="whiteAlpha.900"
        px="5"
        py="3"
        rounded="2xl"
        border="1px"
        borderColor="gray.300"
        justifyContent="space-between"
      >
        <Flex direction="column">
          <Editable
            control={control}
            name={`links.${index}.title`}
            placeholder="Title"
            fontWeight="bold"
          />
          <Editable
            control={control}
            name={`links.${index}.url`}
            placeholder="https://example.com"
          />
        </Flex>
        <Flex direction="column" alignItems="flex-end" w="40">
          <Switch register={register} name={`links.${index}.enabled`} />
          <Flex justifyContent="flex-end" alignItems="center" mt="2" gap="4">
            <StatInfo icon={HiOutlineEye} />
            <Icon
              as={HiOutlineTrash}
              color="gray.600"
              cursor="pointer"
              _hover={{ color: "gray.700" }}
              onClick={deleteDialog.onOpen}
            />
          </Flex>
        </Flex>
      </Flex>
      <AlertDialog
        title="Delete Link?"
        body="Are you sure you want to delete this link?"
        onConfirm={() => remove(index)}
        isOpen={deleteDialog.isOpen}
        onOpen={deleteDialog.onOpen}
        onClose={deleteDialog.onClose}
      />
    </>
  );
}
