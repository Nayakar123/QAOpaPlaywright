const ExcelJs = require("exceljs");
const { test, expect } = require("@playwright/test");

async function writeExcel(searchText, replaceText, change, filePath) {
  const workBook = new ExcelJs.Workbook();
  await workBook.xlsx.readFile(filePath);
  const workSheet = workBook.getWorksheet("Sheet1");
  if (!workSheet) {
    throw new Error('The workbook does not contain a "Sheet1" worksheet.');
  }
  const output = await readExcel(workSheet, searchText);
  const cellValue = workSheet.getCell(
    output.row + change.rowChange,
    output.column + change.columnChange,
  );
  cellValue.value = replaceText;
  await workBook.xlsx.writeFile(filePath);
}

async function readExcel(workSheet, searchText) {
  let output = { row: 1, column: 1 };
  workSheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  if (output.row === 1 && output.column === 1) {
    throw new Error(`Could not find "${searchText}" in the worksheet.`);
  }
  return output;
}

// writeExcel(
//   "Mango",
//   400,
//   { rowChange: 0, columnChange: 2 },
//   "C:\\Users\\girish\\Downloads\\download.xlsx",
// );

test("@Web Upload and Download Excel validation", async ({
  page,
}, testInfo) => {
  const searchText = "Mango";
  const updatedValue = "400";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadWait = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  const download = await downloadWait;
  const filePath = testInfo.outputPath(download.suggestedFilename());
  await download.saveAs(filePath);
  await writeExcel(
    searchText,
    updatedValue,
    { rowChange: 0, columnChange: 2 },
    filePath,
  );
  await page.locator("#fileinput").setInputFiles(filePath);
  const updatedRow = page.getByRole("row").filter({ hasText: searchText });
  await expect(updatedRow).toContainText(updatedValue);
});
