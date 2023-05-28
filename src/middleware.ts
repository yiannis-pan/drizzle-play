import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const test = () => {
  return console.log("middleware");
};

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
