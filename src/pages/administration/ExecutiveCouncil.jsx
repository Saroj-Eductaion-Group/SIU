import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const ExecutiveCouncil = () => {
  return (
    <Layout >
      <Helmet>
  <title>Executive Council | Saroj International University</title>
  <meta name="description" content="View the structure and responsibilities of the Executive Council, overseeing governance and decision-making at Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Executive Council",
          path: "/pdfs/EC.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default ExecutiveCouncil;