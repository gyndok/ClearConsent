import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setPageNumber(1);
  }, [url]);

  if (!url) {
    return null;
  }

  // Check if it's a PDF URL (basic check)
  const isPdf = url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('pdf');
  if (!isPdf) {
    return (
      <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography color="text.secondary">
          Document preview is only available for PDF files.
        </Typography>
      </Box>
    );
  }

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF:', error);
    setError(error);
    setIsLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const nextPage = prevPageNumber + offset;
      return Math.min(Math.max(1, nextPage), numPages);
    });
  };

  return (
    <Paper 
      elevation={1} 
      sx={{ 
        mt: 2, 
        overflow: 'hidden', 
        borderRadius: 1,
        bgcolor: 'grey.100',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2
      }}
    >
      {error ? (
        <Typography color="error" sx={{ p: 2 }}>
          Error loading PDF. Please check the URL and try again.
        </Typography>
      ) : (
        <>
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            }
          >
            <Box 
              sx={{ 
                width: '100%', 
                maxWidth: '800px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Page
                pageNumber={pageNumber}
                width={800}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                loading={
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                }
              />
            </Box>
          </Document>

          {!isLoading && numPages > 0 && (
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              bgcolor: 'background.paper',
              p: 1,
              borderRadius: 1,
            }}>
              <Button
                onClick={() => changePage(-1)}
                disabled={pageNumber <= 1}
                startIcon={<NavigateBefore />}
              >
                Previous
              </Button>
              <Typography>
                Page {pageNumber} of {numPages}
              </Typography>
              <Button
                onClick={() => changePage(1)}
                disabled={pageNumber >= numPages}
                endIcon={<NavigateNext />}
              >
                Next
              </Button>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}; 