import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const PharmacyPage = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Lucknow Institute of Pharmacy'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Pharmacy Programs | Saroj International University</title>
        <meta name="description" content="B.Pharm, D.Pharm, M.Pharm and Ph.D programs at Lucknow Institute of Pharmacy, Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default PharmacyPage;
