/*

para set nas variáveis
incluir ['set'] = true; no Ajax

para get nas variávies
não incluir ['set'] ou deletar ['set'] no Ajax


*/


function doGet(e) { 
  
  
  var filter = { };
  var totalfilter = 0;
  if (e.parameter['from']) { var paginacao = e.parameter['from'];} else { var paginacao = 0; }
  var ss = SpreadsheetApp.openById(ScriptProperties.getProperty('active'));
  

  
  
  
  
  
  // SELEÇÃO DE PLANILHA E PALAVRAS-CHAVES PARA FILTROS
  
  var sheet = ss.getSheetByName(e.parameter['cat']);
  
  if (e.parameter['filter']) {
      
      var varrecoluna = 0;
      var iniciavarredura = sheet.getRange('a2');
      
      while (varrecoluna < sheet.getLastColumn()) {
        
        if (iniciavarredura.offset(0,varrecoluna).getValue() != "") {
        
        if (e.parameter['filter'].indexOf(iniciavarredura.offset(0,varrecoluna).getValue()) > -1) { filter[totalfilter] = varrecoluna; totalfilter++; }
        
        
      }
        
        varrecoluna++;
        
      }
    
  }
  
  


  
 




  
  
    // ********************************************* RETORNOS
    
    var result = { }; 

    
 
  
  
  
  
  
    // 1. BIBLIOGRAFIA
  
    if (e.parameter['cat'] == "bibliografia") {
      
      
      var indiceresposta = 0;
      var cell = sheet.getRange('a4');
    
      for (var linha = 0; linha < sheet.getLastRow(); linha++) {
        
        
        var flag = true;
        
        for (var fi=0; fi<totalfilter; fi++) {
          
          if (e.parameter['filter'] && cell.offset(linha,filter[fi]).getValue() != "X") { flag = false; }
          
          
        }
                
        if (flag == true) {

          if ( !(e.parameter['from']) || (!e.parameter['to'] && e.parameter['from'] && indiceresposta >= e.parameter['from']) || (e.parameter['from'] && e.parameter['to'] && indiceresposta >= e.parameter['from'] && indiceresposta <= e.parameter['to']) ) {
          result['index'+(indiceresposta-paginacao)] = cell.offset(linha,0).getValue();
          result['titulo'+(indiceresposta-paginacao)] = cell.offset(linha,1).getValue() + ". " + cell.offset(linha,2).getValue();
          result['link'+(indiceresposta-paginacao)] = cell.offset(linha,7).getValue();
          result['notes'+(indiceresposta-paginacao)] = cell.offset(linha,3).getValue();
          }
          indiceresposta++;
      
        }
        
      }
      
    }

  
  
  
  
  
  
  
  
    
    // 2. ARTEFATOS
  
    if (e.parameter['cat'] == "artefatos") {
    
       var indiceresposta = 0;
      var cell = sheet.getRange('a4');
    
      for (var linha = 0; linha < sheet.getLastRow(); linha++) {
        
        
        var flag = true;
        
        for (var fi=0; fi<totalfilter; fi++) {
          
          if (e.parameter['filter'] && cell.offset(linha,filter[fi]).getValue() != "X") { flag = false; }
          
          
        }
                
        if (flag == true) {

          if ( !(e.parameter['from']) || (!e.parameter['to'] && e.parameter['from'] && indiceresposta >= e.parameter['from']) || (e.parameter['from'] && e.parameter['to'] && indiceresposta >= e.parameter['from'] && indiceresposta <= e.parameter['to']) ) {
            result['index'+ (indiceresposta-paginacao)] = cell.offset(linha,0).getValue();
            result['link'+ (indiceresposta-paginacao)] = cell.offset(linha,1).getValue();
          }
        indiceresposta++;      
      
        }
      
      }
  
    } 





    // 3. POSTS
  
    if (e.parameter['cat'] == "posts") {
    
      var indiceresposta = 0;
      var cell = sheet.getRange('a4');
    
      for (var linha = 0; linha < sheet.getLastRow(); linha++) {
        
        
        var flag = true;
        
        for (var fi=0; fi<totalfilter; fi++) {
          
          if (e.parameter['filter'] && cell.offset(linha,filter[fi]).getValue() != "X") { flag = false; }
          
          
        }
                
        if (flag == true) {

          if ( !(e.parameter['from']) || (!e.parameter['to'] && e.parameter['from'] && indiceresposta >= e.parameter['from']) || (e.parameter['from'] && e.parameter['to'] && indiceresposta >= e.parameter['from'] && indiceresposta <= e.parameter['to']) ) {
            result['index'+ (indiceresposta-paginacao)] = cell.offset(linha,0).getValue();
            result['titulo'+ (indiceresposta-paginacao)] = cell.offset(linha,2).getValue();
            result['link'+ (indiceresposta-paginacao)] = cell.offset(linha,5).getValue();
            result['resumo'+ (indiceresposta-paginacao)] = cell.offset(linha,3).getValue();
            
          }
        indiceresposta++;      
      
        }
      
      }
  
    }   


  
  

    // 4. BOOKMARKS
  
    if (e.parameter['cat'] == "bookmarks") {
    
      var indiceresposta = 0;
      var cell = sheet.getRange('a4');
    
      for (var linha = 0; linha < sheet.getLastRow(); linha++) {
        
        
        var flag = true;
        
        for (var fi=0; fi<totalfilter; fi++) {
          
          if (e.parameter['filter'] && cell.offset(linha,filter[fi]).getValue() != "X") { flag = false; }
          
          
        }
                
        if (flag == true) {

          if ( !(e.parameter['from']) || (!e.parameter['to'] && e.parameter['from'] && indiceresposta >= e.parameter['from']) || (e.parameter['from'] && e.parameter['to'] && indiceresposta >= e.parameter['from'] && indiceresposta <= e.parameter['to']) ) {
            result['index'+ (indiceresposta-paginacao)] = cell.offset(linha,0).getValue();
            result['titulo'+ (indiceresposta-paginacao)] = cell.offset(linha,3).getValue();
            result['link'+ (indiceresposta-paginacao)] = cell.offset(linha,1).getValue();
            result['resumo'+ (indiceresposta-paginacao)] = cell.offset(linha,4).getValue();
            result['thumb'+ (indiceresposta-paginacao)] = "http://www.ranoya.com/AssetsManager/screenshots/" + cell.offset(linha,2).getValue();
            
          }
        indiceresposta++;      
      
        }
      
      }
  
    } 






    // 5. STARTMENU
  
    if (e.parameter['cat'] == "startmenu") {
    
      var indiceresposta = 0;
      var cell = sheet.getRange('a4');
    
      for (var linha = 0; linha < sheet.getLastRow(); linha++) {
        
        
        var flag = true;
        
        for (var fi=0; fi<totalfilter; fi++) {
          
          if (e.parameter['filter'] && cell.offset(linha,filter[fi]).getValue() != "X") { flag = false; }
          
          
        }
                
        if (flag == true) {

          if ( !(e.parameter['from']) || (!e.parameter['to'] && e.parameter['from'] && indiceresposta >= e.parameter['from']) || (e.parameter['from'] && e.parameter['to'] && indiceresposta >= e.parameter['from'] && indiceresposta <= e.parameter['to']) ) {
            result['index'+ (indiceresposta-paginacao)] = cell.offset(linha,0).getValue();
            result['titulo'+ (indiceresposta-paginacao)] = cell.offset(linha,1).getValue();
            result['link'+ (indiceresposta-paginacao)] = cell.offset(linha,2).getValue();
            
          }
        indiceresposta++;      
      
        }
      
      }
  
    }  



    
  
  // ********************************************* OUTPUT
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); 
  }
  
//http://www.google.sc/support/forum/p/apps-script/thread?tid=345591f349a25cb4&hl=en
function setUp() {
  ScriptProperties.setProperty('active', SpreadsheetApp.getActiveSpreadsheet().getId());
}
