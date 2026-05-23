import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const EntrepreneurshipAndBusiness = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Entrepreneurship and Business'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Entrepreneurship & Business Programs | Saroj International University</title>
        <meta name="description" content="Develop business acumen and leadership with BBA and MBA programs at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default EntrepreneurshipAndBusiness;
