import React from "react";

import { Dropdown, Checkbox } from "neetoui";

const ColumnDropdown = ({ columnList, setColumnList }) => {
  const { Menu, MenuItem } = Dropdown;
  const columns = Object.keys(columnList);

  const handleChange = item => {
    setColumnList(prev => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

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
