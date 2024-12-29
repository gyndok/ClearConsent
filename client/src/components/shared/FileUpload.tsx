import React, { useRef, useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
  CircularProgress,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { validateFileType, validateFileSize, uploadFile } from '../../utils/fileUtils';
import { PdfViewer } from './PdfViewer';

interface FileUploadProps {
  value: string;
  onChange: (url: string) => void;
  onError?: (message: string) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ value, onChange, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!validateFileType(file)) {
      onError?.('Please upload a PDF file');
      return;
    }

    // Validate file size
    if (!validateFileSize(file)) {
      onError?.('File size must be less than 10MB');
      return;
    }

    setSelectedFileName(file.name);
    setIsUploading(true);

    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch (error) {
      console.error('Error uploading file:', error);
      onError?.('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Document URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleUploadClick}
                disabled={isUploading}
                aria-label="Upload PDF"
              >
                {isUploading ? (
                  <CircularProgress size={24} />
                ) : (
                  <CloudUploadIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        helperText={
          selectedFileName
            ? `Selected file: ${selectedFileName}`
            : "Enter a URL or upload a PDF document"
        }
      />
      <input
        type="file"
        ref={fileInputRef}
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        aria-label="Upload PDF file"
      />
      <PdfViewer url={value} />
    </Box>
  );
}; 