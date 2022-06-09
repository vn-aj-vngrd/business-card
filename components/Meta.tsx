import Head from "next/head";

type Props = {
  title?: string;
  keywords?: string;
  description?: string;
};

const Meta: React.FC<Props> = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: "Tasks",
  keywords: "web development, programming",
  description: "Manage your tasks with Next Tasks",
};

export default Meta;
