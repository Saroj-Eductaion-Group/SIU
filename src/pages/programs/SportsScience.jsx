import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const SportsScience = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Sports Science & Research'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Sports Science Programs | Saroj International University</title>
        <meta name="description" content="BS and MS programs in Sports Science at Saroj Institute of Sports Science & Research." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default SportsScience;
