import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Mail, Loader2 } from 'lucide-react';

interface AuthButtonProps {
  provider: string;
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const getProviderIcon = (provider: string) => {
  switch (provider.toLowerCase()) {
    case 'github':
      return <Github size={20} />;
    case 'twitter':
      return <Twitter size={20} />;
    default:
      return <Mail size={20} />;
  }
};

const getProviderColor = (provider: string): string => {
  switch (provider.toLowerCase()) {
    case 'github':
      return 'bg-gray-900 hover:bg-gray-800 text-white';
    case 'twitter':
      return 'bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white';
    case 'google':
      return 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300';
    default:
      return 'bg-indigo-600 hover:bg-indigo-500 text-white';
  }
};

export const AuthButton: React.FC<AuthButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  className = '',
}) => {
  const baseClasses = 'flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm';
  const providerColor = getProviderColor(provider);
  const icon = getProviderIcon(provider);

  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${providerColor} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Connecting...</span>
        </>
      ) : (
        <>
          {icon}
          <span>Continue with {provider}</span>
        </>
      )}
    </motion.button>
  );
};

export const AuthButtonGroup: React.FC<{
  providers: Record<string, any>;
  onProviderClick: (providerId: string) => void;
  isLoading?: boolean;
  className?: string;
}> = ({ providers, onProviderClick, isLoading, className = '' }) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {Object.values(providers).map((provider) => (
        <AuthButton
          key={provider.id}
          provider={provider.name}
          onClick={() => onProviderClick(provider.id)}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
};