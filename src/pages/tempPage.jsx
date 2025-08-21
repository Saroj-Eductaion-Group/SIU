import Layout from "../components/Layout";

const ComingSoonPage = ({ heading }) => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-6">
            Coming Soon
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            {heading || "We're working on something exciting! Please check back later."}
          </p>

          
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoonPage;