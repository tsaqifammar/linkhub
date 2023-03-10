import Head from "next/head";
import Link from "next/link";
import Button from "@/components/ui/button";
import Features from "@/components/landing-page/features";
import Navbar from "@/components/ui/navbar";
import Hero from "@/components/landing-page/hero";
import Questions from "@/components/landing-page/questions";
import Footer from "@/components/landing-page/footer";
import { Box, Flex } from "@chakra-ui/react";

export default function LandingPage() {
  const navLinks = [
    { text: "Features", href: "#features" },
    { text: "Got Questions?", href: "#questions" },
  ];

  const rightComponents = [
    <Link key={0} href="/login">
      <Button variant="outline" size={{ base: "sm", lg: "md" }}>
        Log In
      </Button>
    </Link>,
    <Link key={1} href="/sign-up">
      <Button variant="solid" size={{ base: "sm", lg: "md" }}>
        Sign Up
      </Button>
    </Link>,
  ];

  return (
    <>
      <Head>
        <title>Linkhub: link in bio tool</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        w="100vw"
        backgroundColor="red"
      >
      <Flex
        w={["90%", "80%"]}
        mx="auto"
        direction="column"
        alignItems="center"
      >
        <Navbar
          links={navLinks}
          rightNodes={rightComponents}
          positionType="fixed"
        />
      </Flex>
      </Box>
      <Hero />
      <Features />
      <Questions />
      <Footer />
    </>
  );
}
