"use client"

import { ApolloProvider } from "@apollo/client";
import client from '../../apollo-client';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ApolloProvider client={client} >
            <main className="flex bg-green-400 ">
                <div className="flex-1 bg-blue-500 h-full ">{children}</div>
            </main>
        </ApolloProvider>
    )
};