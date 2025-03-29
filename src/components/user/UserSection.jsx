import { motion } from "framer-motion";

const UserSection = ({ icon: Icon, title, children }) => {
  return (
    <motion.div
      className='bg-base-100 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-10  mb-8'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex items-center justify-end mb-4'>
        {Icon && <Icon className='text-indigo-400 mr-4' size='24' />}
        <h2 className='text-xl font-semibold text-base-content'>{title}</h2>
      </div>
      {children}
    </motion.div>
  );
};
export default UserSection;
