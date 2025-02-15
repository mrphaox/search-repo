import { motion } from "framer-motion";

const Loading = () => (
  <motion.div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
    className="text-center text-gray-500 text-lg"
  >
    Loading...
  </motion.div>
);

export default Loading;
