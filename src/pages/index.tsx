import { type NextPage } from "next";
// import { appRouter } from "~/server/api/root";
// import { createInnerTRPCContext } from "~/server/api/trpc";
import { api } from "~/utils/api";
import { UserButton } from "@clerk/nextjs";
// import { createServerSideHelpers } from "@trpc/react-query/server";
// import superjson from "superjson";
// export const runtime = "experimental-edge";
// export const regions = ["lhr1"];

// export const getServerSideProps = async () => {
//   const ssg = createServerSideHelpers({
//     ctx: createInnerTRPCContext(),
//     router: appRouter,
//     transformer: superjson,
//   });

//   await ssg.posts.getPosts.prefetch();

//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//     },
//   };
// };

const Home: NextPage = () => {
  const context = api.useContext();
  const posts = api.posts.getPosts.useQuery();
  const addPost = api.posts.addPost.useMutation({
    async onSuccess() {
      await context.posts.getPosts.invalidate();
    },
  });

  const handleAddPost = () => {
    addPost.mutate({ title: "Some Post" });
  };

  if (!posts.data) return <div className="h-screen w-full bg-red-300"></div>;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-5 bg-gray-800/90">
      <button
        className="rounded-3xl  bg-indigo-500 px-3 py-2 text-gray-100"
        onClick={() => void handleAddPost()}
      >
        Add post
      </button>
      <h1>Posts from drizzle</h1>
      {posts.data.map((post) => (
        <h1 key={post.id}>{post.title}</h1>
      ))}
      <UserButton />
    </div>
  );
};

export default Home;
