import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "react-query";
import type { AppProps } from "next/app";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
