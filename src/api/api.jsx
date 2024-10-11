const serverDomain = 'http://localhost:3500';

const graphqlAPI = {
    request: async (query, variables) => {
        const response = await fetch(`${serverDomain}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.errors ? result.errors[0].message : 'An error occurred');
        }
        return result.data;
    },
};

// Example of using the graphqlAPI
const summaryAPI = {
    add: (data) => {
        const query = `
            mutation AddSummary($input: SummaryInput!) {
                addSummary(input: $input) {
                    id
                    // Add the fields you want to return
                }
            }
        `;
        return graphqlAPI.request(query, { input: data });
    },
    get: () => {
        const query = `
            query {
                summaries {
                    id
                    // Add the fields you want to retrieve
                }
            }
        `;
        return graphqlAPI.request(query);
    },
    delete: (id) => {
        const query = `
            mutation DeleteSummary($id: ID!) {
                deleteSummary(id: $id) {
                    success
                    message
                }
            }
        `;
        return graphqlAPI.request(query, { id });
    },
    update: (id, data) => {
        const query = `
            mutation UpdateSummary($id: ID!, $input: SummaryInput!) {
                updateSummary(id: $id, input: $input) {
                    id
                    // Add the fields you want to return
                }
            }
        `;
        return graphqlAPI.request(query, { id, input: data });
    },
};

export default summaryAPI;
