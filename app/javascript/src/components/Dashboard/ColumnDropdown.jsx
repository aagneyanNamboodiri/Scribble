import React from "react";

import { Dropdown, Checkbox } from "neetoui";

const ColumnDropdown = () => {
  const { Menu, MenuItem } = Dropdown;
  const columnList = ["Title", "Date", "Author", "Status", "Category"];

  return (
    <Dropdown
      buttonStyle="secondary"
      label="Columns"
      {...columnList}
      closeOnSelect={false}
    >
      <Menu className="space-y-2">
        {columnList.map((item, idx) => (
          <MenuItem.Button key={item}>
            <Checkbox
              checked={false}
              id="Column Dropdown"
              key={idx}
              label={item}
              onChange={function noRefCheck() {}}
            />
          </MenuItem.Button>
        ))}
      </Menu>
    </Dropdown>
  );
};

export default ColumnDropdown;
