import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clvilbfkl0lvr07wcro6vwv5k/master"
);

const QUERYCNN = gql`
  {
    reuters {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

const QUERYREUTERS = gql`
  {
    reuters {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

const QUERYPAIS = gql`
  {
    reuters {
      active
      createdAt
      id
      name
      order
      image {
        url
      }
      publishedAt
      updatedAt
    }
  }
`;

export const getData = async () => {
  try {
    console.log("Realizando solicitud GraphQL...");
    const { reuters } = await graphcms.request(QUERY);
    //console.log("Datos recibidos:", reuters);
    return reuters;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
