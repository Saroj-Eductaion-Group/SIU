import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const InternalComplaint = () => {
  return (
    <Layout >
      <Helmet>
  <title>Internal Complaint Committee | Saroj International University</title>
  <meta name="description" content="Learn about the Internal Complaint Committee at Saroj International University, ensuring a safe and respectful environment for all." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Internal Complaint",
          path: "/pdfs/InternalComplaint.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default InternalComplaint;