// React Imports
import React, { useState } from "react";

// Material UI Imports
import {
  Card,
  Divider,
  Box,
  Typography,
} from "@mui/material";


import 'react-data-grid/lib/styles.css';
import { DataGrid, SelectColumn, TreeDataGrid } from 'react-data-grid';


const data = [
  {
    id: 12,
    fullName: "Yoimiya Naganohara",
    profileImage: "https://enjoey-public-buket-test.s3.amazonaws.com/smk-keegan-sdn-bhd/avatar/children/Yoimiya_Naganohara_avatar.jpg",
    className: "Hearth Room 1",
    programName: "Fatui Basic Survival Program",
    child_allergy: [
      {
        id: 1,
        allergyType: "Other Allergies",
        allergies: "Balethunder Shock",
        allergicPrevent: "Do not bring her near areas with balethunder",
        allergicSyndrome: "Electrostatic charges manifest around her, causing her health to deteriorate",
        allergicAction: "Bring her away from the area as soon as possible",
      }
    ]
  },
  {
    id: 15,
    fullName: "child3 demo",
    profileImage: "https://enjoey-public-buket-test.s3.amazonaws.com/abc-school/avatar/children/child3_demo_avatar.jpg",
    className: "Infant-1",
    programName: "Infant Care",
    child_allergy: [
      {
        id: 2,
        allergyType: "Food Allergies",
        allergies: "Test",
        allergicPrevent: "test",
        allergicSyndrome: "test",
        allergicAction: "test",
      }
    ]
  },
  {
    id: 19,
    fullName: "Test Children 3",
    profileImage: "https://enjoey-public-buket-test.s3.ap-southeast-1.amazonaws.com/avatar/boy.png",
    className: "Test Classroom 2",
    programName: "Test Program 2",
    child_allergy: [
      {
        id: 3,
        allergyType: "Food Allergies",
        allergies: "Banana",
        allergicPrevent: "dont eat banana",
        allergicSyndrome: "become banana",
        allergicAction: "wait",
      }
    ]
  },
  {
    id: 23,
    fullName: "Ayaka Kamisato",
    profileImage: "https://enjoey-public-buket-test.s3.amazonaws.com/smk-keegan-sdn-bhd/avatar/children/Ayaka_Kamisato_avatar.png",
    className: "Combat Room 1",
    programName: "Fatui Basic Combat Program",
    child_allergy: [
      {
        id: 4,
        allergyType: "Food Allergies",
        allergies: "dancingtomcism",
        allergicPrevent: "do not let ayaka step into water pools with her socks on",
        allergicSyndrome: "absolute cringe behaviour exhibited",
        allergicAction: "remove ayaka from water pool",
      },
      {
        id: 5,
        allergyType: "Other Allergies",
        allergies: "dancingtomcism",
        allergicPrevent: "do not let her step into water pools with socks on",
        allergicSyndrome: "absolute cringe behaviour is exhibited",
        allergicAction: "remove ayaka from water pool",
      }
    ]
  },
  {
    id: 37,
    fullName: "Magnus Chu Yin Shan",
    profileImage: "https://enjoey-public-buket-test.s3.ap-southeast-1.amazonaws.com/avatar/boy.png",
    className: "Butterfly 4",
    programName: "Preschool",
    child_allergy: [
      {
        id: 6,
        allergyType: "Food Allergies",
        allergies: "Flour & Wheat, all seafood, dairy products, egg, soy sauce",
        allergicPrevent: "Do not provide foods that contain the ingredients mentioned above. Gluten-free required.",
        allergicSyndrome: "For a mild reaction, red skin and itchy. For serious reactions, cough, swollen, and vomit.",
        allergicAction: "Call parents if the allergy reaction is not reduced after 2 hours.",
      }
    ]
  }
];

// Flattening data
const flattenData = (data) => {
  const flattened = [];
  data.forEach(child => {
    if (child.child_allergy && child.child_allergy.length > 0) {
      child.child_allergy.forEach(allergy => {
        flattened.push({
          id: child.id,
          fullName: child.fullName,
          className: child.className,
          programName: child.programName,
          allergyType: allergy.allergyType,
          allergies: allergy.allergies,
          allergicPrevent: allergy.allergicPrevent,
          allergicSyndrome: allergy.allergicSyndrome,
          allergicAction: allergy.allergicAction,
        });
      });
    } else {
      flattened.push({
        id: child.id,
        fullName: child.fullName,
        className: child.className,
        programName: child.programName,
        allergyType: "",
        allergies: "",
        allergicPrevent: "",
        allergicSyndrome: "",
        allergicAction: "",
      });
    }
  });
  return flattened;
};

const columns = [
  SelectColumn,
  { key: 'id', name: 'ID' },
  { key: 'fullName', name: 'Full Name' },
  { key: 'className', name: 'Class Name' },
  { key: 'programName', name: 'Program Name' },
  { key: 'allergyType', name: 'Allergy Type' },
  { key: 'allergies', name: 'Allergies' },
  { key: 'allergicPrevent', name: 'Allergic Prevent' },
  { key: 'allergicSyndrome', name: 'Allergic Syndrome' },
  { key: 'allergicAction', name: 'Allergic Action' },
];

const rows = flattenData(data);

function rowKeyGetter(row) {
  return row.id;
}

const options = ['fullName', 'className'];

const Page2 = () => {
  const [selectedRows, setSelectedRows] = useState(() => new Set());
  const [selectedOptions, setSelectedOptions] = useState([
    options[0],
    options[1]
  ]);

  const [expandedGroupIds, setExpandedGroupIds] = useState(
    () => new Set()
  );

  const toggleOption = (option, enabled) => {
    const index = selectedOptions.indexOf(option);
    if (enabled) {
      if (index === -1) {
        setSelectedOptions((options) => [...options, option]);
      }
    } else if (index !== -1) {
      setSelectedOptions((options) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        return newOptions;
      });
    }
    setExpandedGroupIds(new Set());
  }
  return (
    <Card>
      <Box sx={{ p: 5 }}>
        <Typography variant="h1" component="div" gutterBottom>
          Room Check Report
        </Typography>
        <Divider sx={{ my: 5 }}/>
        <div>
          <b>Group by columns:</b>
          <div>
            {options.map((option) => (
              <label key={option}>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={(event) => toggleOption(option, event.target.checked)}
                />{' '}
                {option}
              </label>
            ))}
          </div>

          <TreeDataGrid
            columns={columns}
            rows={rows}
            rowKeyGetter={rowKeyGetter}
            selectedRows={selectedRows}
            onSelectedRowsChange={setSelectedRows}
            groupBy={selectedOptions}
            rowGrouper={rowGrouper}
            expandedGroupIds={expandedGroupIds}
            onExpandedGroupIdsChange={setExpandedGroupIds}
            defaultColumnOptions={{ resizable: true }}
          />
        </div>
      </Box>
    </Card>
  );
};

const rowGrouper = (rows, columnKey) => {
  return Object.groupBy(rows, (r) => r[columnKey]);
}

export default Page2;
