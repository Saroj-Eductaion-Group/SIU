import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const HealthSciencesPage = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Basic & Health Sciences with AI Integration (SIBHS)'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Health Sciences Programs | Saroj International University</title>
        <meta name="description" content="B.Sc, BS, M.Sc, MS, Diploma and Ph.D programs in Health Sciences at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default HealthSciencesPage;
