import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const Statutes = () => {
  return (
    <Layout >
      <Helmet>
  <title>University Statutes | Saroj International University</title>
  <meta name="description" content="Explore the statutes and governing regulations that form the legal framework of Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Statutes Of University",
          path: "/pdfs/statutesofuniversity.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default Statutes;