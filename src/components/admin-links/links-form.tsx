import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  useFieldArray,
  useForm,
  Control,
  UseFormRegister,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getLinks,
  LinkProps,
  LinksFormProps,
  LinksFormSchema,
  updateLinks,
} from "@/modules/admin";
import Select from "@/components/ui/forms/select";
import Input from "@/components/ui/forms/input";
import Editable from "@/components/ui/forms/editable";
import Switch from "@/components/ui/forms/switch";
import Button from "@/components/ui/button";
import AlertDialog from "@/components/ui/alert-dialog";
import { HiOutlineEye, HiOutlineTrash, HiPlus } from "react-icons/hi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import StatInfo from "../ui/stat-info";
import {
  UseFieldArrayRemove,
  UseFieldArraySwap,
} from "react-hook-form/dist/types";
import SaveResetButton from "../ui/save-reset-button";
import { useMutation } from "react-query";
import { Session } from "next-auth";
import { PreviewButton } from "./preview-button";

const colorModeOptions = [
  { label: "Solid", value: "solid" },
  { label: "Gradient", value: "gradient" },
];

const emptyLink: LinkProps = {
  enabled: true,
  title: "",
  url: "",
  viewCount: 0,
};

export default function LinksForm({ session }: { session: Session }) {
  const toast = useToast();
  const updateLinksMutation = useMutation(updateLinks, {
    onSuccess: () => {
      toast({
        title: "Links succesfully updated.",
        status: "success",
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: (error as any).response.data.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm<LinksFormProps>({
    resolver: zodResolver(LinksFormSchema),
    defaultValues: async () => getLinks(session?.user.username),
  });

  const { fields, prepend, remove, swap } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = handleSubmit((value) => {
    updateLinksMutation.mutate(value);
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
        error={errors.appearance?.colorMode}
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
          swap={swap}
          error={errors.links?.[index]}
          viewCount={getValues(`links.${index}.viewCount`) as number}
          isLast={index === fields.length - 1}
        />
      ))}
    </Flex>
  );

  return (
    <form onSubmit={onSubmit} style={{ position: "relative" }}>
      <Flex
        direction={{ base: "column", lg: "row-reverse" }}
        gap="6"
        mt="4"
        mb="24"
      >
        <Flex
          flexGrow="1"
          flexBasis="0"
          direction="column"
          alignItems="flex-end"
          gap="4"
        >
          {appearanceSection}
          <SaveResetButton
            isLoading={updateLinksMutation.isLoading}
            isDirty={isDirty}
            onReset={() => {
              reset();
            }}
          />
        </Flex>
        <Box flexGrow="2" flexBasis="0">
          {linksSection}
          <PreviewButton username={session.user.username} links={watch()} />
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
  swap: UseFieldArraySwap;
  error?: Merge<FieldError, FieldErrorsImpl<LinkProps>> | undefined;
  viewCount: number;
  isLast: boolean;
}

function LinkCard({
  control,
  register,
  index,
  remove,
  error,
  swap,
  viewCount,
  isLast,
}: LinkCardProps) {
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
        gap={4}
      >
        <Flex direction="column" gap={1} justifyContent="space-between" flexGrow="0">
          <IconButton
            aria-label="Move up"
            icon={<FaChevronUp />}
            onClick={() => swap(index, index - 1)}
            isDisabled={index === 0}
            size="xs"
          />
          <IconButton
            aria-label="Move down"
            icon={<FaChevronDown />}
            onClick={() => swap(index, index + 1)}
            isDisabled={isLast}
            size="xs"
          />
        </Flex>
        <Flex direction="column" alignItems="flex-start" flexGrow="1">
          <Editable
            control={control}
            name={`links.${index}.title`}
            placeholder="Title"
            fontWeight="bold"
            error={error?.title}
          />
          <Editable
            control={control}
            name={`links.${index}.url`}
            placeholder="https://example.com"
            error={error?.url}
          />
        </Flex>
        <Flex direction="column" alignItems="flex-end">
          <Switch register={register} name={`links.${index}.enabled`} />
          <Flex justifyContent="flex-end" alignItems="center" mt="2" gap="4">
            <StatInfo icon={HiOutlineEye} value={viewCount} />
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
