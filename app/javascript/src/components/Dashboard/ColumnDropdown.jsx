import React from "react";

import { Dropdown, Checkbox } from "neetoui";
import { assoc } from "ramda";

const ColumnDropdown = ({ columnList, setColumnList }) => {
  const { Menu, MenuItem } = Dropdown;
  const columns = Object.keys(columnList);

  const handleChange = item =>
    setColumnList(prev => assoc(item, !prev[item], prev));

  return (
    <Dropdown
      buttonStyle="secondary"
      label="Columns"
      {...columnList}
      closeOnSelect={false}
    >
      <Menu className="space-y-2">
        {columns.map((item, idx) => {
          if (idx === columns.length - 1) {
            return null;
          }

          return (
            <MenuItem.Button key={item}>
              <Checkbox
                checked={columnList[item]}
                id="Column Dropdown"
                key={idx}
                label={item}
                onChange={() => handleChange(item)}
              />
            </MenuItem.Button>
          );
        })}
      </Menu>
    </Dropdown>
  );
};

export default ColumnDropdown;
