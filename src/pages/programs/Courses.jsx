import CoursePage from '../../components/ShowPrograms';
import universityData from '../../assets/json/universityData.json'; 
import Layout from '../../components/Layout';
import { Helmet } from 'react-helmet';

const Courses = () => {
 

  return (
    <Layout>
      <Helmet>
  <title>Courses Offered | Saroj International University</title>
  <meta name="description" content="Browse all academic programs offered by Saroj International University, including undergraduate, postgraduate, diploma, and doctoral courses." />
</Helmet>

    <CoursePage universityData={universityData} />
    </Layout>
  );
};

export default Courses;