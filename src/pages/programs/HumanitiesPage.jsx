import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const HumanitiesPage = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Humanities & Education'
    )
  };

  return (
    <Layout>
      <Helmet>
        <title>Humanities & Education Programs | Saroj International University</title>
        <meta name="description" content="Study BA, MA, B.Com, M.Com, B.Ed, M.Ed and more through our diverse humanities & education programs at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};

export default HumanitiesPage;
