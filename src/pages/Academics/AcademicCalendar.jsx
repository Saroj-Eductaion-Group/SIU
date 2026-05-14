import { Helmet } from "react-helmet";
import Layout from "../../components/Layout";
import PdfViewer from "../../components/PdfPageView";

const AcademicCalendar = () => {
  return (
    <Layout >
      <Helmet>
  <title>Academic Calendar | Saroj International University</title>
  <meta name="description" content="Stay informed about the academic schedule, important dates, and events for the current session at Saroj International University." />
</Helmet>

    <PdfViewer
      pdfFiles={[
        {
          name: "Academic Calendar",
          path: "/pdfs/academic_calendar.pdf",
        },
      ]}
    />
    </Layout>
  );
};


export default AcademicCalendar;