import Link from "next/link";

type PostCardProps = {
  post: {
    frontMatter: {
      title: string;
      date: string;
    };
    slug: string;
  };
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return <Link href={`/post/${post.slug}`}>{post.frontMatter.title}</Link>;
};

export default PostCard;
