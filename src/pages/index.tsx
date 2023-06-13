import fs from "fs";

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
    console.log("slug:", slug);
  });
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
