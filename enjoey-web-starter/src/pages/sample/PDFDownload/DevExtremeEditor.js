import React, { useCallback, useState, useEffect } from "react";
import HtmlEditor, {
  Toolbar,
  MediaResizing,
  ImageUpload,
  Item,
} from "devextreme-react/html-editor";
import { 
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import "devextreme/dist/css/dx.light.css";
import _debounce from 'lodash/debounce';

// Global Constants
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      // eslint-disable-next-line
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = [
  'Arial',
  'Courier New',
  'Georgia',
  'Impact',
  'Lucida Console',
  'Tahoma',
  'Times New Roman',
  'Verdana',
];
const headerValues = [false, 1, 2, 3, 4, 5];
const fontSizeOptions = {
  inputAttr: {
    'aria-label': 'Font size',
  },
};
const fontFamilyOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};
const headerOptions = {
  inputAttr: {
    'aria-label': 'Font family',
  },
};
export default function App() {
  const [valueContent, setValueContent]   = useState("");
  const [popupVisible, setPopupVisible]   = useState(false);
  const [tab, setTab]                     = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [url, setUrl]                     = useState("");
  const [width, setWidth]                 = useState("");
  const [height, setHeight]               = useState("");
  const [alt, setAlt]                     = useState("");
  
  const handleAddImage = async () => {
    if (selectedImage && tab === 0) {
      // Image from local device
      const imageDataUrl = await uploadImageToS3(selectedImage);
      const updatedContent = valueContent + `<img src="${imageDataUrl}" alt="custom">`;
      setValueContent(updatedContent);
    } else if (tab === 1) {  
      if (url) {
        const imgTag = `<img src="${url}" alt="${alt}" width="${width}" height="${height}">`;
        const updatedContent = valueContent + imgTag;
        setValueContent(updatedContent);
      }
    }
  
    setPopupVisible(false);
    setSelectedImage(null);
  };
  
  const uploadImageToS3 = async (imageFile) => {
    try {
      // Implement your logic to upload the image to S3 here
      // Use AWS SDK or your preferred method to upload the image
  
      // Replace the following line with your actual S3 upload code
      const s3ImageUrl = await uploadToS3Bucket(imageFile);
  
      return s3ImageUrl;
    } catch (error) {
      console.error('Error uploading image to S3:', error);
      // Handle error, e.g., show an error message to the user
      return '';
    }
  };
  
  // Replace this function with your actual S3 upload implementation
  const uploadToS3Bucket = async (imageFile) => {
    // Implement your S3 upload logic here and return the uploaded image URL
    // Example:
    // const response = await fetch('Your S3 Upload URL', { method: 'PUT', body: imageFile });
    // const s3ImageUrl = 'URL of the uploaded image';
    // return s3ImageUrl;
  
    // For illustration purposes, returning a placeholder URL
    return 'https://your-s3-bucket.s3.amazonaws.com/placeholder.jpg';
  };

  const valueChanged = useCallback(
    (e) => {
      setValueContent(e.value);
    },
    [],
  );

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const customButtonClick = useCallback(() => {
    setPopupVisible(true);
  }, [setPopupVisible]);

  const getToolbarButtonOptions = useCallback(() => ({
    icon: "image",
    stylingMode: "text",
    onClick: customButtonClick,
  }), [customButtonClick]);

  const popupHiding = useCallback(() => {
    setPopupVisible(false);
  }, [setPopupVisible]);

  const tabs = { value: ['file', 'url'] };

  const prettierFormat = useCallback(
    (text) => (
      prettier.format(text, {
        parser: 'html',
        plugins: [parserHtml],
      })
    ),
  );
  const handleSaveHtml = () => {
    const formattedContent = prettierFormat(valueContent);

    const blob = new Blob([formattedContent], { type: 'text/html' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'savedContent.html';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleImportHtml = () => {
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
          const reader = new FileReader();
          reader.onload = (e) => {
            const importedHtml = e.target.result;

            // Set the imported HTML content into the HtmlEditor
            setValueContent(importedHtml);
          };
          reader.readAsText(selectedFile);
        }
      });
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className="widget-container">
      <HtmlEditor
        height="725px"
        value={valueContent}
        valueType="html"
        onValueChanged={valueChanged}
      >
        <MediaResizing enabled={true} />
        <ImageUpload
          fileUploadMode="base64"
          tabs={tabs.value}
        />
        <Toolbar multiline>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item
            name="size"
            acceptedValues={sizeValues}
            options={fontSizeOptions}
          />
          <Item
            name="font"
            acceptedValues={fontValues}
            options={fontFamilyOptions}
          />
          <Item name="separator" />
          <Item name="bold" />
          <Item name="italic" />
          <Item name="strike" />
          <Item name="underline" />
          <Item name="separator" />
          <Item name="alignLeft" />
          <Item name="alignCenter" />
          <Item name="alignRight" />
          <Item name="alignJustify" />
          <Item name="separator" />
          <Item name="orderedList" />
          <Item name="bulletList" />
          <Item name="separator" />
          <Item
            name="header"
            acceptedValues={headerValues}
            options={headerOptions}
          />
          <Item name="separator" />
          <Item name="color" />
          <Item name="background" />
          <Item name="separator" />
          <Item name="link" />
          <Item widget="dxButton" options={getToolbarButtonOptions()} />
          <Item name="separator" />
          <Item name="clear" />
          <Item name="codeBlock" />
          <Item name="blockquote" />
          <Item name="separator" />
          <Item name="insertTable" />
          <Item name="deleteTable" />
          <Item name="insertRowAbove" />
          <Item name="insertRowBelow" />
          <Item name="deleteRow" />
          <Item name="insertColumnLeft" />
          <Item name="insertColumnRight" />
          <Item name="deleteColumn" />
        </Toolbar>
      </HtmlEditor>
      <div
        className="value-content"
      >
        {prettierFormat(valueContent)}
      </div>
      <Button onClick={handleSaveHtml}>
        Save HTML
      </Button>
      <Button onClick={handleImportHtml}>
        Import HTML
      </Button>
      <Dialog
        fullWidth
        maxWidth          ="sm"
        open              ={popupVisible}
        onClose           ={popupHiding}
        aria-labelledby   ="alert-dialog-title"
        aria-describedby  ="alert-dialog-description"
      >
        <DialogTitle>
          <Typography variant="h2">Add Image</Typography>
        </DialogTitle>
        <DialogContent dividers sx={{ height: '325px' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChangeTab} aria-label="appointment-form-tab-panel">
              <Tab label="From This Device" {...a11yProps(0)} />
              <Tab label="From the Web" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
              <TextField
                margin="dense"
                id="image-input"
                type="file"
                fullWidth
                variant="outlined"
                inputProps={{ accept: 'image/*' }}
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  value    ={url}
                  margin   ="dense"
                  label    ="URL"
                  type     ="text"
                  fullWidth
                  variant  ="outlined"
                  onChange ={(e) => setUrl(e.target.value)}
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  value    ={width}
                  onChange ={(e) => setWidth(e.target.value)}
                  margin          ="dense"
                  label           ="Width"
                  type            ="text"
                  fullWidth
                  variant         ="outlined"
                />
              </Grid>
              <Grid item xs={6} md={6}>
                <TextField
                  value    ={height}
                  onChange ={(e) => setHeight(e.target.value)}
                  margin   ="dense"
                  label    ="Height"
                  type     ="text"
                  fullWidth
                  variant  ="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  value    ={alt}
                  onChange ={(e) => setAlt(e.target.value)}
                  margin   ="dense"
                  label    ="Alt"
                  type     ="text"
                  fullWidth
                  variant  ="outlined"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleAddImage}>Add</Button>
          <Button variant="outlined" onClick={popupHiding}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
