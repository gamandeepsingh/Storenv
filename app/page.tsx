"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowRight, Terminal, Code, GitBranch } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="sm:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full sm:max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Environment Variable Management
          </h1>
          <p className="text-sm md:text-xl text-gray-600 mb-8">
            Store, manage, and protect your environment variables with military-grade encryption.
            Built for developers who take security seriously.
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
            <p className="text-gray-600">Your environment variables are encrypted before they leave your browser.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Access Control</h3>
            <p className="text-gray-600">Fine-grained permissions ensure your team members access only what they need.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="text-indigo-600" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Version Control</h3>
            <p className="text-gray-600">Track changes and maintain a complete history of your configurations.</p>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple, secure, and straightforward</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Terminal className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Connect Your Project</h3>
              <p className="text-gray-600">Link your repository and select the environments you want to manage.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <Code className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Add Your Variables</h3>
              <p className="text-gray-600">Securely store your environment variables with our encrypted storage.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Deploy with Confidence</h3>
              <p className="text-gray-600">Your variables are automatically synced with your deployment pipeline.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Environment Variables?</h2>
            <p className="text-xl mb-8 text-indigo-100">
              Join thousands of developers who trust Storenv with their sensitive configuration data.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;