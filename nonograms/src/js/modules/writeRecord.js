import { returnRecord } from "./returnRecord.js"

export const writeRecord = () => {
  let recordList = localStorage.getItem('totooggNonogramsArrRecordList');
  let recordObj;
  if (recordList) {
    recordObj = JSON.parse(
      localStorage.getItem('totooggNonogramsArrRecordList'),
    );
  } else {
    recordObj = {
      easy: [],
      middle: [],
      hard: [],
    };
  }
  let record = returnRecord(recordObj);
  localStorage.setItem('totooggNonogramsArrRecordList', JSON.stringify(record));
};