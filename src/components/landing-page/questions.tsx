import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

const questionsData: { question: string; answer: string }[] = [
  {
    question: "What is Linkhub?",
    answer:
      "Linkthub allows you to share all of your content and links in one place by using a single URL. This personalized link can be added to your social media bio, email signature, business cards and other places where your audience may discover or interact with you.",
  },
  {
    question: "How do I create a Linkhub?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim iure nobis temporibus natus quod magni commodi adipisci, velit molestias unde aliquid vero minus placeat quisquam nam culpa? Beatae, blanditiis veniam.",
  },
  {
    question: "Why do I need a Linkhub",
    answer:
      "Enim iure nobis temporibus natus quod magni commodi adipisci, velit molestias unde aliquid vero minus placeat quisquam nam culpa? Beatae, blanditiis veniam.",
  },
  {
    question: "Is Linkhub the original link in bio tool?",
    answer:
      "The short answer is, no. This is a linktree clone afterall.",
  },
  {
    question: "Is Linkhub free to use?",
    answer: "Yes!",
  },
  {
    question: "Is there an app version of Linkhub",
    answer:
      "There is only the web version for now. Facilis, animi possimus error quia reiciendis voluptas. Nostrum accusamus reprehenderit dolorem totam blanditiis est, modi iusto vitae optio magnam inventore, enim magni!",
  },
];

export default function Questions() {
  return (
    <Box backgroundColor="gray.50" minW="100vw" py="20" overflowX="clip">
      <Box w={{ base: "80%", lg: "60%" }} mx="auto" id="questions" textAlign="center">
        <Heading>Got questions?</Heading>
        <Box
          bgColor="white"
          mt="12"
          p={{ base: "8", lg: "12" }}
          border="1px"
          borderColor="gray.300"
          rounded="2xl"
        >
          <Accordion>
            {questionsData.map((item, idx) => (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton>
                    <Text as="b" flex="1" textAlign="left">
                      {item.question}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign="left">
                  {item.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}
