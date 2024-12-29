export const validateFileType = (file: File): boolean => {
  const allowedTypes = ['application/pdf'];
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
};

// Mock file upload - replace with actual API call
export const uploadFile = async (file: File): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real implementation, this would upload to your server/cloud storage
  // and return the URL. For now, we'll create a fake URL
  return `https://storage.example.com/documents/${file.name}`;
}; 