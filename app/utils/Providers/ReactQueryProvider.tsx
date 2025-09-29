'use client';

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, 
            // refetchOnMount: true,
            // refetchOnReconnect: true,
            retry: 2, // retry failed requests once
            staleTime: 1000 * 60 * 2, // data stays "fresh" for 5 minutes
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;