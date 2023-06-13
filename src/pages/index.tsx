import fs from "fs";

// ビルド時にデータを取得して事前にHTMLファイルのレンダリングを行うことでSSGとも呼ばれてる。
export const getStaticProps = () => {
  const posts = fs.readdirSync("public/posts");
  console.log("files:", posts);
  return {
    props: {
      posts: [],
    },
  };
};

const Home: React.FC = () => {
  return <div className="my-8">コンテンツ</div>;
};

export default Home;
