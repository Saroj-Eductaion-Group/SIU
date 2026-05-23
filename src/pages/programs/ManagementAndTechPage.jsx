import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const ManagementAndTechPage = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Management & Technology'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Management & Technology Programs | Saroj International University</title>
        <meta name="description" content="B.Tech, M.Tech, BCA, MCA and Diploma programs in engineering and technology at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default ManagementAndTechPage;
