import { type NextPage } from "next";
import { api } from "~/utils/api";

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

  if (!posts.data) return <h1>No data</h1>;

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
    </div>
  );
};

export default Home;
