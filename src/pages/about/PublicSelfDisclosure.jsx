import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const PublicSelfDisclosure = () => {
  return (
    <Layout >
      <Helmet>
  <title>Public Self-Disclosure | Saroj International University</title>
  <meta name="description" content="Access mandatory public disclosures including institutional data, affiliations, and compliance information of Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Public Self Disclosure",
          path: "/pdfs/public_self_disclosure.pdf" ,
        },
        {
          name: "Statutes of University",
          path: "/pdfs/SIU S.pdf" ,
        },
        {
          name: "Ordinance of the University",
          path: "/pdfs/ordinancesofSIU.pdf" ,
        },
        {
          name: "UGC 2 (f) Letter of Recognition",
          path: "/pdfs/UGC_Letter_Recognition.pdf" ,
        },
        {
          name: "UP Government Act",
          path: "/pdfs/university_act.pdf" ,
        },
        
      ]}
    />
    </Layout>
  );
};


export default PublicSelfDisclosure;