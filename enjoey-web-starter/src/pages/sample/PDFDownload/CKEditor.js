import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Button,
  Box,
} from "@mui/material";

const CKEditorComponent = () => {
  let editorInstance;

  // Function to handle CKEditor ready event
  const handleEditorReady = (editor) => {
      console.log('Editor is ready to use!', editor);
      editorInstance = editor;
  };

  useEffect(() => {
      const cleanup = () => {
          if (editorInstance) {
              editorInstance.destroy().then(() => {
                  console.log('Editor instance destroyed.');
              });
          }
      };
      return cleanup;
  }, []);

  const handleChange = (event, editor) => {
      console.log('Content changed:', editor.getData());
  };

  const handleBlur = (event, editor) => {
      console.log('Blur.', editor);
  };

  const handleFocus = (event, editor) => {
      console.log('Focus.', editor);
  };

  const handleSaveHTML = () => {
    if (editorInstance) {
        const editorData = editorInstance.getData();
        const blob = new Blob([editorData], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'editor_content.html';
        a.click();

        URL.revokeObjectURL(url);
    }
  };

  const handleImportHTML = () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'text/html'; // Set the accepted file type to HTML
  
      // Trigger file selection dialog
      input.click();
  
      // Listen for file selection
      input.addEventListener('change', (event) => {
        const selectedFile = event.target.files[0];
  
        if (selectedFile) {
          // Handle the selected HTML file as needed
          // For example, you might want to read its content using FileReader
          const reader = new FileReader();
          reader.onload = (e) => {
            const importedHTML = e.target.result;
  
            // Set the imported HTML content into the CKEditor
            if (editorInstance) {
              editorInstance.setData(importedHTML);
            }
          };
          reader.readAsText(selectedFile);
        }
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };  

  return (
    <Box>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => handleEditorReady(editor)}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <Button onClick={handleSaveHTML}>
        Save HTML
      </Button>
      <Button onClick={handleImportHTML}>
        Import HTML
      </Button>
    </Box>
  );
};

export default CKEditorComponent;
