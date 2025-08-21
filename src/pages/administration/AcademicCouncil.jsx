import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const AcademicCouncil = () => {
  return (
    <Layout >
      <Helmet>
  <title>Academic Council | Saroj International University</title>
  <meta name="description" content="Learn about the role and members of the Academic Council, the highest academic authority at Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Academic Council",
          path: "/pdfs/academic_council.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default AcademicCouncil;