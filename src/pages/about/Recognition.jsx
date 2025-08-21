import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const Recognition = () => {
  return (
    <Layout >
      <Helmet>
  <title>UGC Recognition | Saroj International University</title>
  <meta name="description" content="View the national and international recognitions, accreditations, and affiliations of Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Recognition",
          path: "/pdfs/UGC_Letter_Recognition.pdf",
        },
        
      ]}
    />
    </Layout>
  );
};


export default Recognition;