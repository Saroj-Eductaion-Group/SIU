import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const Faculty = () => {
  return (
    <Layout >
      <Helmet>
  <title>Our Faculty | Saroj International University</title>
  <meta name="description" content="Meet the distinguished faculty members of Saroj International University who are committed to teaching, research, and student mentorship." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "MBA Faculty",
          path: "/pdfs/MBA.pdf",
        },
        {
          name: "MCA Faculty",
          path: "/pdfs/MCA.pdf",
        },
         {
          name: "Pharmacy",
          path: "/pdfs/Pharmacy.pdf",
        },
          {
          name: "Basic Science",
          path: "/pdfs/basic_science.pdf",
        },

      ]}
    />
    </Layout>
  );
};


export default Faculty;