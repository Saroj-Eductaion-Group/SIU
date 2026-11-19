import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Two-tone background */}
      <div className="absolute inset-0 z-0">
        <div className="h-1/2 bg-blue-50"></div>
        <div className="h-1/2 bg-secondary"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Section heading */}
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-black font-funneldisplay"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Learn Today. Lead Tomorrow.
        </motion.h2>

        {/* Stats grid */}
        <div className="grid font-funneldisplay grid-cols-2 md:grid-cols-5 max-w-6xl mx-auto">
          
          {/* Programs count */}
          <motion.div 
            className="bg-primary  p-6 text-center shadow-lg border-r-2 border-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-5xl font-bold text-white">45+</div>
              <div className="text-white">Academic Programs</div>
            </div>
          </motion.div>

          {/* International package */}
          <motion.div 
            className="bg-primary  p-6 text-center shadow-lg border-r-2 border-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-5xl font-bold text-white">54.75</div>
              <div className="text-white">LPA International Package Offer</div>
            </div>
          </motion.div>

          {/* National package */}
          <motion.div 
            className="bg-primary  p-6 text-center shadow-lg border-r-2 border-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-5xl font-bold text-white">40 LPA</div>
              <div className="text-white">Highest National Package Offer</div>
            </div>
          </motion.div>

          {/* Placements */}
          <motion.div 
            className="bg-primary  p-6 text-center shadow-lg border-r-2 border-secondary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-5xl font-bold text-white">200+</div>
              <div className="text-white">Recruiting Partners</div>
            </div>
          </motion.div>

          {/* Alumni */}
          <motion.div 
            className="bg-primary  p-6 text-center shadow-lg col-span-2 md:col-span-1 "
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center gap-y-2">
              <div className="text-5xl font-bold text-white">35K+</div>
              <div className="text-white">Alumni Network</div>
            </div>
          </motion.div>
          
        </div>       
      </div>
    </div>
  );
};

export default StatsSection;
