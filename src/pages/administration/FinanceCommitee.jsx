import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const FinanceCommitee = () => {
  return (
    <Layout >
      <Helmet>
  <title>Finance Committee | Saroj International University</title>
  <meta name="description" content="Explore the role of the Finance Committee in managing and planning the financial resources of Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Finance Officer",
          path: "/pdfs/finance_commitee.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default FinanceCommitee;