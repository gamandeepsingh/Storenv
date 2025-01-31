"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../loading";
import copy from "clipboard-copy";
import {
  Copy,
  Check,
  Plus,
  X,
  Loader,
  Edit,
  Eye,
  EyeOff,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Storenv | Environment Variables",
//   description: "Storenv is a platform for managing your environment variables",
// };

// Define types for our data structures
interface EnvVariable {
  name: string;
  value: string;
}

interface EnvProject {
  _id: string;
  projectName: string;
  envlist: EnvVariable[];
}

const EnvPage: React.FC = () => {
  const [envs, setEnvs] = useState<EnvProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editedEnv, setEditedEnv] = useState<EnvProject | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleValues, setVisibleValues] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchEnvs();
  }, []);

  const fetchEnvs = async () => {
    try {
      const response = await fetch("/api/envs");
      if (!response.ok) {
        throw new Error("Failed to fetch environment variables");
      }
      const data: EnvProject[] = await response.json();
      setEnvs(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredEnvs = envs.filter((env) =>
    env.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleValueVisibility = (envId: string, index: number) => {
    setVisibleValues((prev) => ({
      ...prev,
      [`${envId}-${index}`]: !prev[`${envId}-${index}`],
    }));
  };

  const handleCopy = async (text: string, id: string) => {
    try {
      await copy(text);
      setCopiedStates({ ...copiedStates, [id]: true });
      setTimeout(() => {
        setCopiedStates({ ...copiedStates, [id]: false });
      }, 1000);
      toast.success("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDelete = async (envId: string) => {
    if (window.confirm("Are you sure you want to delete this environment?")) {
      toast.promise(
        fetch(`/api/upload/${envId}`, {
          method: "DELETE",
        }).then((response) => {
          if (!response.ok) {
            return toast.error("Failed to delete environment");
          }
          return response;
        }),
        {
          loading: "Deleting environment...",
          success: "Environment deleted successfully",
          error: "Failed to delete environment",
        }
      );

      try {
        await fetchEnvs(); // Refresh the list
      } catch (error) {
        console.error("Error refreshing environments:", error);
      }
    }
  };

  const copyEntireProject = (env: EnvProject) => {
    const text = env.envlist
      .map((item) => `${item.name}=${item.value}`)
      .join("\n");
    handleCopy(text, env._id);
  };

  const startEditing = (env: EnvProject) => {
    setEditingProject(env._id);
    setEditedEnv({ ...env });
  };

  const cancelEditing = () => {
    setEditingProject(null);
    setEditedEnv(null);
  };

  const updateEnvVariable = (
    index: number,
    field: keyof EnvVariable,
    value: string
  ) => {
    if (editedEnv) {
      const updatedEnvlist = [...editedEnv.envlist];
      updatedEnvlist[index] = { ...updatedEnvlist[index], [field]: value };
      setEditedEnv({ ...editedEnv, envlist: updatedEnvlist });
    }
  };

  const addEnvVariable = () => {
    if (editedEnv) {
      setEditedEnv({
        ...editedEnv,
        envlist: [...editedEnv.envlist, { name: "", value: "" }],
      });
    }
  };

  const removeEnvVariable = (index: number) => {
    if (editedEnv) {
      const updatedEnvlist = editedEnv.envlist.filter((_, i) => i !== index);
      setEditedEnv({ ...editedEnv, envlist: updatedEnvlist });
    }
  };

  const handleUpdate = async () => {
    if (!editedEnv) return;

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/upload/${editedEnv._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEnv),
      });

      if (!response.ok) {
        throw new Error("Failed to update environment variables");
      }

      toast.success("Environment variables updated successfully");
      setEditingProject(null);
      setEditedEnv(null);
      fetchEnvs(); // Refresh the list
    } catch (error) {
      console.error("Error updating environment variables:", error);
      toast.error("Failed to update environment variables");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading />;
  if (error)
    return <div className="mt-20 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <div className="mt-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[500px]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-black dark:text-white">
            Your Environment Variables
          </h1>
          <button
            onClick={() => redirect("/add-env")}
            className="py-2 px-4 rounded-md flex items-center space-x-1 text-sm bg-indigo-500 hover:bg-indigo-600 dark:bg-white/20 dark:hover:bg-indigo-100 text-white dark:hover:text-gray-500 transition-all duration-200 ease-in"
          >
            <Plus size={16} />
            <span className="hidden sm:flex">Add New Project</span>
            <span className="flex sm:hidden">New</span>
          </button>
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 bg-white dark:bg-gray-400/20 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-col gap-4 pb-10">
          {filteredEnvs.length === 0 ? (
            <p className="text-gray-600 dark:text-white/60">No environment variables found.</p>
          ) : (
            filteredEnvs.map((env) => (
              <motion.div
                key={env._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-400/20 shadow-md rounded-lg p-2 py-6 sm:p-6"
              >
                {editingProject === env._id && editedEnv ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate();
                    }}
                    className="space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
                      <input
                        type="text"
                        value={editedEnv.projectName}
                        onChange={(e) =>
                          setEditedEnv({
                            ...editedEnv,
                            projectName: e.target.value,
                          })
                        }
                        className="text-xl font-semibold text-black dark:text-white bg-gray-100 dark:bg-gray-400/20 px-4 py-2 rounded border focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-white dark:focus:border-white outline-none w-full sm:w-auto"
                      />
                      <button
                        type="button"
                        onClick={addEnvVariable}
                        className="py-2 px-3 rounded-md flex items-center space-x-1 text-sm bg-lime-400 text-white dark:text-black hover:bg-lime-500 w-full sm:w-auto justify-center sm:justify-start"
                      >
                        <Plus size={16} />
                        <span>Add Variable</span>
                      </button>
                    </div>
                    <AnimatePresence>
                      {editedEnv.envlist.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center"
                        >
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) =>
                              updateEnvVariable(index, "name", e.target.value)
                            }
                            className="flex-1 px-3 py-2 border rounded w-full text-black dark:text-white bg-gray-100 dark:bg-gray-400/20"
                            placeholder="Variable name"
                          />
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) =>
                              updateEnvVariable(index, "value", e.target.value)
                            }
                            className="flex-1 px-3 py-2 border rounded w-full text-black dark:text-white bg-gray-100 dark:bg-gray-400/20"
                            placeholder="Variable value"
                          />
                          <button
                            type="button"
                            onClick={() => removeEnvVariable(index)}
                            className="p-2 text-gray-600 dark:text-white/50 hover:text-white sm:self-stretch flex items-center justify-center w-full bg-red-500/50 hover:bg-red-500 rounded-md sm:w-fit"
                          >
                            <X size={16} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 w-full sm:w-auto transition-all duration-200 ease-in"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="px-4 py-2 bg-indigo-500 dark:bg-white/20 text-white rounded hover:bg-indigo-600 dark:hover:bg-indigo-100 dark:hover:text-gray-600 disabled:opacity-50 w-full sm:w-auto transition-all duration-200 ease-in"
                      >
                        {isUpdating ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4 bg-transparent">
                      <h2 className="text-xl font-semibold text-black dark:text-white">
                        {env.projectName}
                      </h2>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(env)}
                          className="text-blue-500 dark:text-white/60 hover:text-blue-700 dark:hover:text-white transition-all duration-200 ease-in"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => copyEntireProject(env)}
                          className="text-blue-500 dark:text-white/60 hover:text-blue-700 dark:hover:text-white transition-all duration-200 ease-in"
                        >
                          {copiedStates[env._id] ? (
                            <Check size={20} />
                          ) : (
                            <Copy size={20} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(env._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    <ul className="space-y-4 rounded-lg py-4 px-2 bg-white dark:bg-black/20 md:px-4">
                      {env.envlist.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                        >
                          <span className="text-xs sm:text-base font-semibold text-gray-700 dark:text-gray-400 px-1">
                            {item.name}:
                          </span>
                          <div className="flex items-center">
                            <span className="block md:hidden text-xs sm:text-base text-gray-600 dark:text-white/50 mr-4 font-mono bg-gray-100 dark:bg-white/20 px-3 py-2 rounded-md">
                              {visibleValues[`${env._id}-${index}`]
                                ? item.value.length>10 ? item.value.slice(0, 10) + "..." : item.value
                                : "••••••••"}
                            </span>
                            <span className="hidden md:block text-xs sm:text-base text-gray-600 dark:text-white/50 mr-4 font-mono bg-gray-100 dark:bg-white/20 px-3 py-2 rounded-md">
                              {visibleValues[`${env._id}-${index}`]
                                ? item.value.length>30 ? item.value.slice(0, 30) + "..." : item.value
                                : "••••••••"}
                            </span>
                            <button
                              onClick={() =>
                                toggleValueVisibility(env._id, index)
                              }
                              className="text-blue-500 dark:text-white/60 hover:text-blue-700 dark:hover:text-white transition-all duration-200 ease-in mr-2"
                            >
                              {visibleValues[`${env._id}-${index}`] ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </button>
                            <button
                              onClick={() =>
                                handleCopy(
                                  `${item.name}=${item.value}`,
                                  `${env._id}-${index}`
                                )
                              }
                              className="text-blue-500 dark:text-white/60 hover:text-blue-700 dark:hover:text-white transition-all duration-200 ease-in flex items-center space-x-1"
                            >
                              {copiedStates[`${env._id}-${index}`] ? (
                                <>
                                  <Check size={16} />
                                  <span className="text-xs hidden sm:flex">
                                    Copied
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy size={16} />
                                  <span className="text-xs hidden sm:flex">
                                    Copy
                                  </span>
                                </>
                              )}
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvPage;
