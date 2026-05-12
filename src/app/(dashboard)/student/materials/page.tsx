"use client";

import { useState, useEffect } from "react";
import { isMockMode } from "@/lib/mockMode";
import { Loader2, File as FileIcon, Search } from "lucide-react";

interface Material {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileName: string;
  subject: string;
  teacherId: string;
}

const mockMaterials: Material[] = [
  {
    id: "mock-1",
    title: "Introduction to Algebra",
    description: "Covers basic algebraic expressions, equations, and inequalities for beginners.",
    fileUrl: "#",
    fileName: "algebra-intro.pdf",
    subject: "Mathematics",
    teacherId: "teacher-1",
  },
  {
    id: "mock-2",
    title: "Photosynthesis Notes",
    description: "Detailed notes on the process of photosynthesis, including light and dark reactions.",
    fileUrl: "#",
    fileName: "photosynthesis.pdf",
    subject: "Biology",
    teacherId: "teacher-1",
  },
  {
    id: "mock-3",
    title: "World War II Summary",
    description: "Key events, dates, and figures of World War II.",
    fileUrl: "#",
    fileName: "wwii-summary.docx",
    subject: "History",
    teacherId: "teacher-2",
  },
];

export default function StudentMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      if (isMockMode()) {
        setMaterials(mockMaterials);
      } else {
        const { db } = await import("@/lib/firebase");
        const { collection, query, getDocs } = await import("firebase/firestore");
        const q = query(collection(db, "materials"));
        const querySnapshot = await getDocs(q);
        const fetched: Material[] = [];
        querySnapshot.forEach((doc) => {
          fetched.push({ id: doc.id, ...doc.data() } as Material);
        });
        setMaterials(fetched);
      }
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Access resources uploaded by your teachers.</p>
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
      ) : filteredMaterials.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
          <FileIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No materials found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {searchTerm ? "Try adjusting your search terms." : "No study materials are available yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <FileIcon className="h-6 w-6" />
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {material.subject}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">{material.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 line-clamp-3">
                {material.description || "No description provided."}
              </p>
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <a
                  href={material.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-medium py-2 rounded-lg transition-colors"
                >
                  Download Material
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
