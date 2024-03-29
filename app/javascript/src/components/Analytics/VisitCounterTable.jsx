import React, { useState, useEffect } from "react";

import { Table } from "neetoui";
import { assoc } from "ramda";

import analyticsApi from "apis/Api/analytics";

import { VISITS_SUBTABLE_COLUMN_DATA } from "./constants";
import { buildRowData } from "./utils";

const VisitCounterTable = ({ record }) => {
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState({});

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      if (!visits[record.id]) {
        const {
          data: { visit_count },
        } = await analyticsApi.show(record.id);
        setVisits(assoc(record.id, visit_count, visits));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Table
      columnData={VISITS_SUBTABLE_COLUMN_DATA}
      rowData={buildRowData(record, visits)}
    />
  );
};

export default VisitCounterTable;
