import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaCodeBranch, FaBug, FaExternalLinkAlt } from "react-icons/fa";

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
}

interface Props {
  repo: Repository;
}

const RepositoryCard: React.FC<Props> = ({ repo }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative bg-white/10 backdrop-blur-lg border border-gray-700 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between"
    >
      {/* 🔹 Título del Repositorio */}
      <h2 className="text-lg font-semibold text-white mb-2 flex justify-between items-center">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:underline"
        >
          {repo.name}
          <FaExternalLinkAlt className="text-sm" />
        </a>
      </h2>

      {/* 🔹 Descripción del Repositorio */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {repo.description || "No description available"}
      </p>

      {/* 🔹 Estadísticas con diseño mejorado */}
      <div className="flex justify-between items-center text-gray-400 text-sm py-2">
        <span className="flex items-center gap-1">
          <FaStar className="text-yellow-400" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <FaCodeBranch className="text-green-400" /> {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <FaBug className="text-red-400" /> {repo.open_issues_count}
        </span>
      </div>

      {/* 🔹 Botón "Ver en GitHub" con estilo mejorado */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium py-2 px-4 rounded-full shadow-md transition-all hover:brightness-125"
      >
        Ver en GitHub
      </a>

      {/* 🔹 Efecto Glow en Hover */}
      <div className="absolute inset-0 bg-blue-400 opacity-0 hover:opacity-20 transition-all rounded-xl pointer-events-none"></div>
    </motion.div>
  );
};

export default RepositoryCard;
