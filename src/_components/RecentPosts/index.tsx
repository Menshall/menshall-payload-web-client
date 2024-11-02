import React from "react";
import { getPosts } from "@/lib/enpoints";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("./Slider"), {
  ssr: false,
});

const RecentPosts = async () => {
  const posts = await getPosts();
  return (
    <Slider title={"Поради з чоловічого догляду та стилю"} posts={posts} />
  );
};

export default RecentPosts;
