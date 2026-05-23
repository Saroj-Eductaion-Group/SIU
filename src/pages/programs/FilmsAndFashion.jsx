import Layout from '../../components/Layout';
import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json';
import { Helmet } from 'react-helmet';

const FilmsAndFashion = () => {
  const filteredData = {
    ...universityData,
    institutes: universityData.institutes.filter(i =>
      i.name === 'Saroj Institute of Film & Fashion'
    )
  };
  return (
    <Layout>
      <Helmet>
        <title>Film & Fashion Programs | Saroj International University</title>
        <meta name="description" content="B.Sc, BA, M.Sc, MA, B.Design and Diploma programs in Film Making, Fashion Design at Saroj International University." />
      </Helmet>
      <CoursePage universityData={filteredData} />
    </Layout>
  );
};
export default FilmsAndFashion;
