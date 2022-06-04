import React from "react";
import { fontSizes, langs, themes } from "./constants";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
function EditorSetting({
  open,
  setOpen,
  theme,
  setTheme,
  fontSize,
  setFontSize,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent style={{ padding: "30px" }}>
          <FormControl>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Theme
            </InputLabel>
            <Select
              style={{ width: "150px", marginRight: "10px" }}
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={theme}
              onChange={handleThemeChange}
              displayEmpty
            >
              {themes.map((theme, key) => {
                return (
                  <MenuItem value={theme} key={key}>
                    {theme.replace("_", " ")}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
              Font Size
            </InputLabel>
            <Select
              style={{ width: "100px", marginRight: "10px" }}
              className="header_dropdown"
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={fontSize}
              onChange={handleFontSizeChange}
              displayEmpty
            >
              {fontSizes.map((size, key) => {
                return (
                  <MenuItem value={size} key={key}>
                    {size}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditorSetting;
