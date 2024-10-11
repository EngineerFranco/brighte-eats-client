// src/ApolloProvider.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderReact } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

const ApolloProvider = ({ children }) => {
    return <ApolloProviderReact client={client}>{children}</ApolloProviderReact>;
};

export default ApolloProvider;
