import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const AnnualReport = () => {
  return (
    <Layout >
      <Helmet>
  <title>Annual Report | Saroj International University</title>
  <meta name="description" content="Read the comprehensive annual reports detailing academic achievements, financials, and institutional developments at Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Annual Report 2024-25",
          path: "/pdfs/annual_report_2024-25.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default AnnualReport;