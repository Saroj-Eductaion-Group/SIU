import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const Committees = () => {
  return (
    <Layout >
      <Helmet>
  <title>Committees | Saroj International University</title>
  <meta name="description" content="Learn about the various statutory and functional committees at Saroj International University that uphold academic and operational excellence." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Finance Commitee",
          path: "/pdfs/finance_commitee.pdf",
        },
        {
          name: "Internal Complaint Commitee",
          path: "/pdfs/InternalComplaint.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default Committees;