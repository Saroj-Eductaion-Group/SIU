import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const AICTEApproval = () => {
  return (
    <Layout >
      <Helmet>
  <title>AICTE Approval | Saroj International University</title>
  <meta name="description" content="View the official AICTE approval and accreditation status of Saroj International University for its technical and professional programs." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "AICTE Approval",
          path: "/pdfs/aicte_approval.pdf",
        },
        
      ]}
    />
    </Layout>
  );
};


export default AICTEApproval;