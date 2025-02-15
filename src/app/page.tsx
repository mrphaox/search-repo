"use client";
import useSWR from "swr";
import { useState } from "react";
import LanguageSelector from "@/components/LanguageSelector";
import RepositoryCard from "@/components/RepositoryCard";
import Skeleton from "@/components/Skeleton";
import ErrorMessage from "@/components/ErrorMessage";
import { motion } from "framer-motion";

const API_URL = "https://api.github.com/search/repositories";

// ✅ Nuevo fetcher mejorado con manejo de errores
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GitHub API Error: ${res.status} - ${res.statusText}`);
  }
  return res.json();
};

// ✅ Definir la interfaz para los repositorios de GitHub
interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  html_url: string;
}

export default function Home() {
  const [language, setLanguage] = useState("");

  // ✅ Se indica explícitamente que `data` es un objeto con un array de `Repository`
  const { data, error, isLoading } = useSWR<{ items: Repository[] }>(
    language
      ? `${API_URL}?q=language:${language}&sort=stars&order=desc&per_page=10`
      : null,
    fetcher
  );

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto p-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", type: "spring" }}
          className="relative text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg mt-8"
        >
          🕵🏻 GitHub Repository Finder
          {/* 🔹 Efecto Glow */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-40 h-12 bg-gradient-to-r from-blue-500 to-pink-500 opacity-30 group-hover:opacity-100 blur-2xl transition-all duration-500"></div>
          </div>
        </motion.h1>
        
        <hr className="border-t border-gray-700 opacity-40 my-6 w-3/4 mx-auto" />
        {/* ✅ Se asegura que el selector de lenguaje siempre quede arriba con z-50 */}
        <div className="relative z-50">
          <LanguageSelector onChange={setLanguage} />
        </div>

        {/* ✅ Mensaje de bienvenida si no hay búsqueda */}
        {!language && !isLoading && !error && (
          <p className="text-center text-gray-400 mt-6">
            🔍 Start by selecting a programming language...
          </p>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        {/* ✅ Manejo mejorado de errores con mensaje específico */}
        {error && (
          <ErrorMessage
            message={
              error.message.includes("403")
                ? "⚠️ GitHub API rate limit exceeded. Try again later."
                : "❌ Error fetching repositories. Please try again."
            }
          />
        )}

        {/* ✅ Se agrega z-10 para evitar que las tarjetas suban sobre el selector */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
          }}
        >
          {!isLoading &&
            !error &&
            data?.items?.map((repo: Repository) => (
              <motion.div
                key={repo.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
              >
                <RepositoryCard repo={repo} />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
