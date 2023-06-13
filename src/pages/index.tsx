import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

// makrdownのファイル名はURLの一部として利用する

// ビルド時にデータを取得して事前にHTMLファイルのレンダリングを行うことでSSGとも呼ばれてる。
export const getStaticProps = () => {
  const folderPath = "public/posts";
  // public/postsにあるfilePathを取得
  const files = fs.readdirSync(folderPath);
  const posts = files.map((fileName) => {
    // ファイル名から.mdを削除
    const slug = fileName.replace(/\.md$/, "");
    // ファイルの中身を取得
    const fileContent = fs.readFileSync(`${folderPath}/${fileName}`, "utf-8");
    // front-matterが入ったdataとfront-matter以外のcontentを取り出す
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  return {
    props: {
      posts,
    },
  };
};

type HomeProps = {
  // anyではなくちゃんと型書いて
  posts: {
    frontMatter: {
      // front-matterのプロパティの型情報を記述
      // 例えば、titleやdateなどのプロパティがある場合は適宜追加してください
      title: string;
      date: string;
    };
    slug: string;
  }[];
};

const Home: React.FC<HomeProps> = ({ posts }) => {
  console.log(posts);
  return (
    <div className="my-8">
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/post/${post.slug}`}>{post.frontMatter.title}</Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
