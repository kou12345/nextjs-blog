import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import { GetStaticProps } from "next";

const folderPath = "public/posts";

export const getStaticProps: GetStaticProps = async (context) => {
  const file = fs.readFileSync(
    `${folderPath}/${context.params?.slug}.md`,
    "utf-8"
  );
  const { data, content } = matter(file);
  return { props: { frontMatter: data, content } };
};

export async function getStaticPaths() {
  // index.tsxのgetStaticPropsとほぼ一緒。DRY原則
  const files = fs.readdirSync(folderPath);
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false, // 存在しないページへのアクセスがあった場合に404 Not Foundを表示
  };
}

type PostProps = {
  frontMatter: {
    title: string;
  };
  content: string;
};

const Post: React.FC<PostProps> = ({ frontMatter, content }) => {
  return (
    <div>
      <h1>{frontMatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
    </div>
  );
};

export default Post;
