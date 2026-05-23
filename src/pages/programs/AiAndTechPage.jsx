import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const AiAndTechPage = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Artificial Intelligence'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Artificial Intelligence & Technology Programs | Saroj International University</title>
        <meta name="description" content="Explore cutting-edge programs in AI, ML, Data Science, and Robotics at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default AiAndTechPage;
