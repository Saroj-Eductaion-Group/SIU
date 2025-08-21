import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const PharmacyCouncil = () => {
  return (
    <Layout >
      <Helmet>
  <title>PCI Approval | Saroj International University</title>
  <meta name="description" content="Read about the Pharmacy Council of India (PCI) approval for the university’s pharmacy programs at Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Pharmacy Council",
          path: "/pdfs/lip_pharmacy_council.pdf",
        },
        
      ]}
    />
    </Layout>
  );
};


export default PharmacyCouncil;