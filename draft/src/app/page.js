import { GraphQLClient, gql } from "graphql-request";

let API =
  "https://api-ap-south-1.hygraph.com/v2/clua7yuzz03vg07w5ein1azig/master";
const gcms = new GraphQLClient(API);
const QUERY_POSTS = gql`
  {
    posts {
      id
      slug
      coverPhoto {
        url
      }
      title
      content {
        html
      }
      published
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`;

export default function Home({ posts }) {
  return (
    <main className="min-h-screen p-24">
      hello :
      {posts?.map((itm, index) => {
        return <div key={index}> {itm} </div>;
      })}
    </main>
  );
}

Home.getStaticProps = async () => {
  const { posts } = await gcms.request(QUERY_POSTS);
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};
