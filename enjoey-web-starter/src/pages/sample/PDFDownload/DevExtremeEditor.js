import React, { useCallback, useState, useEffect } from "react";
import HtmlEditor, {
  Toolbar,
  MediaResizing,
  ImageUpload,
  Item,
} from "devextreme-react/html-editor";
import { Button } from "@mui/material";
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import "devextreme/dist/css/dx.light.css";

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
  const [valueContent, setValueContent] = useState("");
  const valueChanged = useCallback(
    (e) => {
      setValueContent(e.value);
      console.log("valueContent", e.value);
    },
    [setValueContent],
  );

  const prettierFormat = useCallback(
    (text) => (
      prettier.format(text, {
        parser: 'html',
        plugins: [parserHtml],
      })
    ),
    [],
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
        valueType="html"
        value={valueContent}
        onValueChanged={valueChanged}
      >
        <MediaResizing enabled={true} />
        <ImageUpload
          fileUploadMode="base64"
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
          <Item name="image" />
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
    </div>
  );
}
