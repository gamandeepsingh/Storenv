"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Save, Loader } from "lucide-react";
import toast from "react-hot-toast";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Storenv | Add Environment Variables",
//   description: "Add environment variables to your project securely.",
// };

interface EnvVariable {
  name: string;
  value: string;
}

interface ProjectEnv {
  projectName: string;
  envlist: EnvVariable[];
}

const AddEnv: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectEnv, setProjectEnv] = useState<ProjectEnv>({
    projectName: "",
    envlist: [{ name: "", value: "" }],
  });

  const addEnvVariable = () => {
    setProjectEnv((prev) => ({
      ...prev,
      envlist: [...prev.envlist, { name: "", value: "" }],
    }));
  };

  const removeEnvVariable = (index: number) => {
    setProjectEnv((prev) => ({
      ...prev,
      envlist: prev.envlist.filter((_, i) => i !== index),
    }));
  };

  const updateEnvVariable = (
    index: number,
    field: keyof EnvVariable,
    value: string
  ) => {
    setProjectEnv((prev) => ({
      ...prev,
      envlist: prev.envlist.map((env, i) =>
        i === index ? { ...env, [field]: value } : env
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!projectEnv.projectName.trim()) {
      toast.error("Please enter a project name");
      return;
    }

    const invalidEnv = projectEnv.envlist.find(
      (env) => !env.name.trim() || !env.value.trim()
    );
    if (invalidEnv) {
      toast.error("Please fill in all environment variables");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectEnv),
      });

      if (!response.ok) {
        throw new Error("Failed to save environment variables");
      }

      // Reset form after successful submission
      setProjectEnv({
        projectName: "",
        envlist: [{ name: "", value: "" }],
      });

      toast.success("Environment variables saved successfully");
    } catch (error) {
      console.error("Error saving environment variables:", error);
      toast.error("Failed to save environment variables");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Add Environment Variables
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name Input */}
            <div>
              <label
                htmlFor="projectName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={projectEnv.projectName}
                onChange={(e) =>
                  setProjectEnv((prev) => ({
                    ...prev,
                    projectName: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                placeholder="Enter project name"
                required
              />
            </div>

            {/* Environment Variables */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Environment Variables
                </h3>
                <button
                  type="button"
                  onClick={addEnvVariable}
                  className="py-2 px-2 sm:px-4 rounded-md flex items-center space-x-1 text-sm bg-indigo-500/20 text-indigo-600 hover:text-indigo-500"
                >
                  <Plus size={16} />
                  <span className="hidden sm:flex">Add Variable</span>
                </button>
              </div>

              <AnimatePresence>
                {projectEnv.envlist.map((env, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-1">
                      <input
                        type="text"
                        value={env.name}
                        onChange={(e) =>
                          updateEnvVariable(index, "name", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        placeholder="Variable name"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={env.value}
                        onChange={(e) =>
                          updateEnvVariable(index, "value", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        placeholder="Variable value"
                        required
                      />
                    </div>
                    {projectEnv.envlist.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEnvVariable(index)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Save Variables</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddEnv;
