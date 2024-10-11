import './App.css';
import Headers from './components/Headers';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

// Create the Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', 
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className='bg-green-50/60 h-[100dvh]'>
      <Toaster />
      <Headers />
      <ApolloProvider client={client}>
        <Outlet />
      </ApolloProvider>
      <Footer />
    </div>
  );
}

export default App;
