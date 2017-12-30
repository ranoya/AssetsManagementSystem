function doGet(e) {

  
  var sheetURL = e.parameter['sheeturl']; // get the google spreadsheet by its URL
  var nomedaplanilha = e.parameter['sheetname']; // get the specific spreadsheet page by its name
  var DataColNames = e.parameter['colnamesstart']; // first cell where column names start
  var DataTypesCell = e.parameter['datatypesstart']; // fist cell where data types start
  var DataStartCell = e.parameter['datastart']; // fist cell where data really starts
  
  var ss = SpreadsheetApp.openByUrl(sheetURL); // find the spreadsheet in docs
  var sheet = ss.getSheetByName(nomedaplanilha); // set the spreadsheet page
  var cell = sheet.getRange(DataStartCell); // set the data point
  var headers = sheet.getRange(DataColNames); // set the column names point
  var types = sheet.getRange(DataTypesCell); // set the data type point
  var PointZeroCell = sheet.getRange('a1'); // set the first cell
  var conteudo = {}; // json object for communication

  // set column names json
  conteudo['headers'] = sheet.getSheetValues(headers.getRow(), headers.getColumn(), headers.getRow(), sheet.getLastColumn()-headers.getLastColumn()+1);
  
  // set data types json
  conteudo['types'] = sheet.getSheetValues(types.getRow(), types.getColumn(), types.getRow(), sheet.getLastColumn()-types.getLastColumn()+1);

  // start fetching data into json
  conteudo['data'] = {};

  conteudo['ncolunas'] = sheet.getLastColumn()-cell.getColumn();
  
  conteudo['data'] = sheet.getSheetValues(cell.getRow(), cell.getColumn(), sheet.getLastRow()-cell.getRow()+1,sheet.getLastColumn()-cell.getColumn()+1);

  // return ajax call with the json object   
  return ContentService.createTextOutput(JSON.stringify(conteudo)).setMimeType(ContentService.MimeType.JSON); 
  
}
