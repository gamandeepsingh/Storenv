"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, RefreshCw, Database, Cloud } from 'lucide-react';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Storenv | About",
//   description: "Learn more about Storenv and how it can help you manage your environment variables securely.",
// };

const features = [
  {
    icon: <Shield className="text-indigo-500" size={24} />,
    title: 'Secure Storage',
    description: 'Your environment variables are encrypted using industry-standard algorithms before storage.',
  },
  {
    icon: <Lock className="text-indigo-500" size={24} />,
    title: 'Access Control',
    description: 'Fine-grained permissions ensure only authorized team members can access specific environment variables.',
  },
  {
    icon: <Key className="text-indigo-500" size={24} />,
    title: 'Key Management',
    description: 'Robust key rotation and management system to maintain the highest security standards.',
  },
  {
    icon: <RefreshCw className="text-indigo-500" size={24} />,
    title: 'Version Control',
    description: 'Track changes and maintain a history of your environment configurations.',
  },
  {
    icon: <Database className="text-indigo-500" size={24} />,
    title: 'Multiple Environments',
    description: 'Easily manage different configurations for development, staging, and production environments.',
  },
  {
    icon: <Cloud className="text-indigo-500" size={24} />,
    title: 'Cloud Integration',
    description: 'Seamlessly integrate with popular cloud platforms and CI/CD pipelines.',
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Storenv
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your secure solution for managing environment variables across projects.
            We make it easy to store, manage, and protect your sensitive configuration data.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg p-8 shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Storenv?
          </h2>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600 mb-4">
              Storenv was built with security and ease of use in mind. We understand
              the challenges of managing environment variables across different
              projects and environments. Our platform provides a secure, centralized
              solution for storing and managing sensitive configuration data.
            </p>
            <p className="text-gray-600 mb-4">
              With Storenv, you can:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Securely store and manage environment variables</li>
              <li>Control access with fine-grained permissions</li>
              <li>Track changes with version history</li>
              <li>Integrate with your existing workflow</li>
              <li>Manage multiple environments with ease</li>
              <li>Ensure compliance with security standards</li>
            </ul>
            <p className="text-gray-600">
              Whether you're a solo developer or part of a large team, Storenv
              provides the tools you need to manage your environment variables
              securely and efficiently.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;