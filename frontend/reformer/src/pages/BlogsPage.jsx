import Blogs from "../components/Blogs/Blogs";
import { useSeo } from "../seo/Seo";


const BlogsPage = () => {
  useSeo({
    title: "Blog",
    description: "Pilates, reformer ve eğitmenlik üzerine güncel yazılar.",
    canonical: "/blogs",
  });

  return <Blogs />;
};

export default BlogsPage;
