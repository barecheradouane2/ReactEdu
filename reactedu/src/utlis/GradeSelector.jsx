import React, { useState } from "react";
import { TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";



import { useTranslation } from "react-i18next";

const GradeSelector = ({selectedGrade,setSelectedGrade}) => {
 
  const { t } = useTranslation();
  const grades = [
    "1st grade",
    "2nd grade",
    "3rd grade",
    "4th grade",
    "5th grade",
    "6th grade",
    "7th grade",
    "8th grade",
    "9th grade",
    "10th grade",
    "11th grade",
    "12th grade"
  ];

  const handleGradeChange = (event) => {
    const grade = event.target.value;
    setSelectedGrade(grade);
  };


  

  return (
    <div>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="grade-select-label">{t('grade_level')}</InputLabel>
        <Select
          labelId="grade-select-label"
          value={selectedGrade}
          onChange={handleGradeChange}
          defaultValue={selectedGrade}
          label="Select Grade"
        >
          {grades.map((grade) => (
            <MenuItem key={grade} value={grade}>
              {t(grade)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* <TextField
        label="Selected Grade"
        variant="outlined"
        fullWidth
        margin="normal"
        value={selectedGrade}
        InputProps={{
          readOnly: true,
        }}
      /> */}
    </div>
  );
};

export default GradeSelector;
