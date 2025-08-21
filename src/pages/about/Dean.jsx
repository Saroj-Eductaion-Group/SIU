import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const Deans = () => {
  return (
    <Layout >
      <Helmet>
  <title>Dean | Saroj International University</title>
  <meta name="description" content="Meet the Deans of Saroj International University who lead our diverse faculties and ensure academic leadership across disciplines." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Deans",
          path: "/pdfs/deans.pdf",
        },
        
      ]}
    />
    </Layout>
  );
};


export default Deans;