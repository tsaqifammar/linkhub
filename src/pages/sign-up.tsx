import Head from "next/head";
import NextLink from "next/link";
import { Box, Flex, Heading, Link, Text, useToast } from "@chakra-ui/react";
import { SignUpProps, SignUpSchema } from "@/modules/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "react-query";
import Button from "@/components/ui/button";
import Input from "@/components/ui/forms/input";
import { useRouter } from "next/router";
import { checkAvailability, signUp } from "@/modules/auth/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function SignUp() {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const signUpMutation = useMutation(signUp, {
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: (error as any).response.data.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<SignUpProps>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: router.query.username as string,
    },
  });

  const onUsernameChange = useDebouncedCallback(async (username: string) => {
    const { data } = await checkAvailability("username", username);
    if (!data.ok) {
      data.errors.forEach((value) =>
        setError(value.field, {
          type: "custom",
          message: value.message,
        })
      );
    } else {
      clearErrors("username");
    }
  }, 1000);

  const onEmailChange = useDebouncedCallback(async (email: string) => {
    const { data } = await checkAvailability("email", email);
    if (!data.ok) {
      data.errors.forEach((value) =>
        setError(value.field, {
          type: "custom",
          message: value.message,
        })
      );
    } else {
      clearErrors("email");
    }
  }, 1000);


  const onSubmit = handleSubmit((values) => {
    setIsLoading(true);
    signUpMutation.mutate(values);
  });

  return (
    <>
      <Head>
        <title>Sign Up - Linkhub</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        backgroundColor="gray.50"
        minW="100vw"
        minH="100vh"
        py="8"
        overflowX="clip"
      >
        <Flex
          w={["90%", "80%"]}
          mx="auto"
          mt={{ base: "6", lg: "20" }}
          direction="column"
          alignItems="center"
        >
          <Heading size="2xl" textAlign="center">
            Create your account
          </Heading>
          <Text textAlign="center" color="gray.500" fontSize="sm" my="4">
            Choose your Linkhub username. You can always change it later.
          </Text>
          <form
            onSubmit={onSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              minWidth: "35ch",
            }}
          >
            <Input
              label="Username"
              name="username"
              placeholder="yourname"
              register={register}
              error={errors.username}
              size="sm"
              variant="outline"
              leftAddon="link.hub/"
              onChange={(e) => onUsernameChange(e.target.value)}
              required
            />
            <Input
              label="Email"
              name="email"
              placeholder="ex: james@mail.com"
              register={register}
              error={errors.email}
              onChange={(e) => onEmailChange(e.target.value)}
              size="sm"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="6+ characters"
              register={register}
              error={errors.password}
              size="sm"
              required
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="6+ characters"
              register={register}
              error={errors.confirmPassword}
              size="sm"
              required
            />
            <Button type="submit" mt="4" isLoading={isLoading}>
              Submit
            </Button>
          </form>
          <Text fontSize="sm" pt="6" color="gray.500">
            Already have an account?{" "}
            <Link as={NextLink} href="/login" color="cyan.600">
              Log in
            </Link>
          </Text>
          <Link
            as={NextLink}
            href="/"
            fontWeight="bold"
            color="gray.500"
            pt="4"
          >
            Linkhub
          </Link>
        </Flex>
      </Box>
    </>
  );
}
