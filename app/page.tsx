"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  ArrowRight,
  Terminal,
  Code,
  GitBranch,
} from "lucide-react";
import { redirect } from "next/navigation";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 dark:from-gray-900 dark:to-gray-800">
      <Head>
        <title>Storenv | Homepage</title>
        <meta
          name="description"
          content="Store, manage, and protect your environment variables with military-grade encryption. Built for developers who take security seriously."
        />
        <meta
          name="keywords"
          content="env, store env, secrets, security, environment variable,"
        />
        <meta property="og:title" content="Storenv | store env securily" />
        <meta
          property="og:description"
          content="Store, manage, and protect your environment variables with military-grade encryption. Built for developers who take security seriously."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://storenv.vercel.app" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dib0peewu/image/upload/v1738348919/logo_lg5hvq.webp"
        />
        <meta property="og:site_name" content="Storenv" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@storenv" />
        <meta name="twitter:creator" content="@storenv" />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dib0peewu/image/upload/v1738348919/logo_lg5hvq.webp"
        />
        <meta
          name="twitter:description"
          content="Store, manage, and protect your environment variables with military-grade encryption. Built for developers who take security seriously."
        />
        <meta name="twitter:title" content="Storenv | store env securily" />
      </Head>
      {/* Hero Section */}
      <section className="sm:max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full sm:max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl text-black dark:text-white md:text-6xl font-extrabold mb-6 pt-20">
            Secure Your Secrets with{" "}
            <span className="text-indigo-500">Storenv</span>
          </h1>
          <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            Store, manage, and protect your environment variables with
            military-grade encryption. Built for developers who take security
            seriously.
          </p>
          <motion.button
            className={`w-fit flex items-center px-4 py-2 rounded-md text-base sm:text-xl font-medium transition-colors bg-indigo-600 dark:bg-white/20 text-white mx-auto`}
            onClick={() => {
              redirect("/env");
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          >
            <span className="text-center w-full">Store your secrets now!</span>
          </motion.button>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10"
        >
          {[
            {
              icon: Shield,
              title: "End-to-End Encryption",
              desc: "Your environment variables are encrypted before they leave your browser.",
            },
            {
              icon: Lock,
              title: "Access Control",
              desc: "Fine-grained permissions ensure team members access only what they need.",
            },
            {
              icon: GitBranch,
              title: "Version Control",
              desc: "Track changes and maintain a complete history of your configurations.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-700 rounded-full flex items-center justify-center mb-4">
                <feature.icon
                  className="text-indigo-600 dark:text-yellow-400"
                  size={28}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Simple, secure, and straightforward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Terminal,
                title: "1. Connect Your Project",
                desc: "Link your repository and select the environments you want to manage.",
              },
              {
                icon: Code,
                title: "2. Add Your Variables",
                desc: "Securely store your environment variables with our encrypted storage.",
              },
              {
                icon: ArrowRight,
                title: "3. Deploy with Confidence",
                desc: "Your variables are automatically synced with your deployment pipeline.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <step.icon
                    className="text-indigo-600 dark:text-yellow-400"
                    size={32}
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-indigo-600 dark:bg-gray-800 rounded-2xl p-4 sm:p-10 md:p-14 text-center text-white shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Secure Your Environment Variables?
            </h2>
            <p className="text-lg text-indigo-100 mb-6">
              Join thousands of developers who trust Storenv with their
              sensitive configuration data.
            </p>
            <motion.button
              className="px-6 py-3 bg-indigo-500 text-indigo-900 font-semibold text-lg rounded-lg shadow-md transition-all hover:bg-indigo-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => redirect("/env")}
            >
              Get Started Now!
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
