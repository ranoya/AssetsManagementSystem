
        /*
        AMS VERSÃO 0.1 - 04/06/2017
				
				Parâmetros de URL:
				* cat - categoria: "bibliografia", "bookmarks", "alemdosandbox", "posts", etc.
				filter - filtros separados por virgula ou espaço: "design, jogos"
				from - paginação: item inicial da página, ex. 25
				to - paginação: item final da página, ex 60
				debug - modo de debug: true ou false
				* render - tipo de população de dados: videogrid, lista, listapublica, thumbnail, listaduo
				elementos - ornamentação: full, nonav, puredata
				detalhes - inclui descrições e resumos: true ou false
				* load - que tipo de carregamento: total, byscroll, multiple
				manual - ativação manual das funções: true ou false
				
				
				Variáveis internas:
				querysearch[queue][critério] - json enviado para a base de dados
				rendertype[queue] - tipo de população de dados: videogrid, lista, listapublica
				loadtype[queue] - que tipo de carregamento: total, byscroll, multiple
				componente[queue] - em que div será populado
				autopop[queue] - população de dados automática após o carregamento
				detail[queue] - inclui resumos ou descrições
				manual - ativação manual das funções: true ou false (importante principalmente para publicação multipla)
				
				
				
				Implementação em sites
				Ex.
				AddQuery({cat: 'bibliografia', render: 'lista', filter: 'meusartigos,pesquisa,estetica', divtarget: '#minhaspublicacoes'});
				AddQuery({cat: 'bibliografia', render: 'listapublica', filter: 'pesquisa', divtarget: '#minhabibliografia'});
				AddQuery({cat: 'posts', render: 'lista', filter: 'pesquisa,estetica', divtarget: '#meusposts'});
				AddQuery({cat: 'artefatos', render: 'videogrid', filter: 'creative', divtarget: '#meusvideos', load: "byscroll"});
				ajaxexchange();
				
        */
        
        
				console.log("*** AMS Versao 0.1 Carregado");

				// MATRIZ DE CRITÉRIOS E ATRIBUTOS
				querysearch = new Array();
				querysearch[0] = new Object();

        // GRABER DE PARÂMETROS DE URL
        $.parametros = function(name){
	          var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results==null){
              return null;
            } else{
	            return results[1] || 0;
            }
        }

  
        
        // LINK PARA O SERVIÇO DO GOOGLE DOCS
        serviceurl = 'https://script.google.com/macros/s/AKfycbyGNpGNd_rEO79y2a_I62AvCp5jcFCLyb7h4fGCvzDr9BLf1rk/exec';

        
        // VARIÁVEIS INTERNAS
				var scrollavaliable = true;
				var queue = 0;
				var addqueuecount = 0;
        var autopop = new Array();
				var detail = new Array();
				autopop[0] = true;
				var componente = new Array();
				componente[0] = "#minharesposta";
        var actualposition = 0;
        var popula = "";
				var manual;
				var rendertype = new Array();
				var loadtype = new Array();
				var zerando = true;

				if ($.parametros('render')) { rendertype[queue] = $.parametros('render'); } else {  if (!rendertype[queue]) { rendertype[queue] = "listapublica"; } }
				if ($.parametros('load')) { loadtype[queue] = $.parametros('load'); } else {  if (!loadtype[queue]) { loadtype[queue] = "total"; } }
				if ($.parametros('detalhes')) { detail[queue] = $.parametros('detalhes'); } else { if (!detail[queue]) { detail[queue] = "false";} }
				if ($.parametros('manual')) { manual = true; } else { manual = false; }
        if ($.parametros('cat')) { querysearch[queue]['cat'] = $.parametros('cat'); }
        if ($.parametros('from')) { querysearch[queue]['from'] = eval($.parametros('from')); }
        if ($.parametros('to')) { querysearch[queue]['to'] = eval($.parametros('to')); }
        if ($.parametros('filter')) { querysearch[queue]['filter'] = $.parametros('filter'); }

      
        // RENDERS: FUNÇÃO QUE CRIA O HTML DO CONTEÚDO (INCLUIR FORMATOS DIFERENTES PARA CADA CATEGORIA E CADA OUTPUT DIFERENTE)    
        function populadados(json){
									
						console.log("Função populadados ativada");
										
						if (rendertype[queue] == 'videogrid') {
                var linha = 0;
                while (json['index'+linha]) {
                  
                  if ($.parametros('debug')) { popula = popula + "<div style='clear: both;'>" + json['index'+linha]; }
                  popula = popula + '<iframe frameborder=0 class=\'videogrid\' src=\'' + json['link'+linha] + '\'></iframe>';
                  if ($.parametros('debug')) { popula = popula + "</div>"; }
                  linha++;

                }        
               
						}
					
						if (rendertype[queue] == 'lista') {
								var linha = 0;
                while (json['index'+linha]) {
                  
                  popula = popula + "<div class='listalinha'>";
									if ($.parametros('debug')) { popula = popula + json['index'+linha]; }
                  popula = popula + '<a class=\'listatitulo\' href=\'' + json['link'+linha] + '\'>' + json['titulo'+linha];
									if (detail[queue] == "true") { popula = popula + "<br><span class=\'listadetalhe\'>" + json['resumo'+linha] + "</span>"; }
									popula = popula + "</a></div>"
                  linha++;

								}
							
						}

					
						if (rendertype[queue] == 'listaduo') {
								var linha = 0;
                while (json['index'+linha]) {
                  
                  popula = popula + "<div class='listalinha'>";
									if ($.parametros('debug')) { popula = popula + json['index'+linha]; }
                  popula = popula + '<a class=\'listatitulo\' href=\'http://www.ranoya.com/AssetsManager/duoreader/?text=' + json['link'+linha] + '/preview&note=' + json['notes'+linha] + '\'>' + json['titulo'+linha];
									if (detail[queue] == "true") { popula = popula + "<br><span class=\'listadetalhe\'>" + json['resumo'+linha] + "</span>"; }
									popula = popula + "</a></div>"
                  linha++;

								}
							
						}
					
					
						if (rendertype[queue] == 'listapublica') {
								var linha = 0;
                while (json['index'+linha]) {
                  
                  popula = popula + "<div class='listalinha'>";
									if ($.parametros('debug')) { popula = popula + json['index'+linha]; }
                  popula = popula + '<p class=\'listatitulopublico\'>' + json['titulo'+linha];
									if (detail[queue] == "true") { popula = popula + "<br><span class=\'listadetalhe\'>" + json['resumo'+linha] + "</span>"; }
									popula = popula + "</p></div>";
                  linha++;

								}
							
						}
					

					
						if (rendertype[queue] == 'thumbnail') {
								var linha = 0;
                while (json['index'+linha]) {
                  
                  popula = popula + "<div class='listalinha'>";
									if ($.parametros('debug')) { popula = popula + json['index'+linha]; }
                  popula = popula + '<a class=\'listatitulo\' href=\'' + json['link'+linha] + '\'><div style=\"background-image: url(\'' + json['thumb'+linha] + '\');\" class=\'listathumb\'>&nbsp;</div>' + json['titulo'+linha];
									if (detail[queue] == "true") { popula = popula + "<br><span class=\'listadetalhe\'>" + json['resumo'+linha] + "</span>"; }
									popula = popula + "</a></div>"
                  linha++;

								}
							
						}					
										
						$("#carregando").css("display", "none");
					
					  // CASO SEJA A PRIMEIRA VEZ QUE POPULA DADOS, JÁ APRESENTA OS CONTEÚDOS NO DIV
            if (autopop[queue]) {
                  
									console.log("Carregamento automatico ativado");
									$(componente[queue]).html("");
                  autopop[queue] = false;
                  exibedados();
									
  
            }
					
          
        }
      
        // FUNÇÃO QUE EXIBE OS DADOS NO DIV (INCLUIR UM IF QUE VERIFIQUE SE SÃO DADOS PAGINADOS OU NÃO PARA NÃO RECARREGAR O LOADING)
        function exibedados() {

								$("#carregando").css("display", "initial");
					
								onde = componente[queue];
								
								console.log("Funcao exibedados ativada... onde? " + onde);
          
                if (loadtype[queue] == 'byscroll') {
								var intervalo = Number(querysearch[queue]['to']) - Number(querysearch[queue]['from']);
                querysearch[queue]['from'] = Number(querysearch[queue]['to']) + 1;
                querysearch[queue]['to'] = Number(querysearch[queue]['from']) + intervalo;
								}
                
								$("#carregando").css("display", "none");
								$(onde).append(popula);
                popula = "";
                
                // ATIVA O LOADING AUTOMÁTICO DE NOVOS DADOS (ÚTIL PARA SCROLL INFINITO... VERIFICAR OUTROS CASOS)
                					
								if (loadtype[queue] == 'byscroll') {
									$(window).scroll(function() {
                		if($(window).scrollTop() + $(window).height() >= $(document).height()) { 
											//console.log('cabeçada...' + scrollavaliable);
                  		if (scrollavaliable) { console.log('exibedados ativado por scroll'); scrollavaliable = false; exibedados(); }
										
                		}
            			});	
									ajaxexchange(); 
								}
					
								if (loadtype[queue] == 'multiple') {
									if (componente[queue+1]) {
										queue++;
										ajaxexchange();
									}
								}
					
          
        }
      
      
        // FUNÇÃO QUE TROCA DADOS (LOADING) COM O GOOGLE DOCS
        function ajaxexchange() {
						
					console.log("Funcao ajaxexchange ativada");
					
        	$("#carregando").css("display", "initial");
        	console.log(querysearch[queue]);
        
    
            $.ajax({
              url: serviceurl,
              type: 'get',
              dataType: 'json',
              data: querysearch[queue],
              cache: false,
              success: function(json) {
             
                populadados(json);       
                console.log(json);
								scrollavaliable = true; // scroll disponível para mostrar dadaos
                
                },
              error: function(xhr, desc, err) {
                console.log(xhr + "\n" + err);
              	}
            	}); 
          }

				// FUNÇÃO PARA CARREGAMENTO MÚLTIPLO DE DADOS
				function AddQuery(arg) {

						manual = true;
						if (addqueuecount > 0) { querysearch[addqueuecount] = new Object(); }
						if (!arg.detalhes) { detail[addqueuecount] = "false"; } else { detail[addqueuecount] = arg.detalhes; }
						if (!arg.load) { loadtype[addqueuecount] = "multiple"; } else { loadtype[addqueuecount] = arg.load; }
						if (!arg.render) { rendertype[addqueuecount] = "listapublica"; } else { rendertype[addqueuecount] = arg.render }
						if (!arg.autopop) { autopop[addqueuecount] = true; } else { autopop[addqueuecount] = arg.autopop; }
						if (!arg.cat) { querysearch[addqueuecount]['cat'] = "bibliografia" } else { querysearch[addqueuecount]['cat'] = arg.cat; }
						if (arg.filter) { querysearch[addqueuecount]['filter'] = arg.filter; }
						if (!arg.divtarget) { componente[addqueuecount] = "#minharesposta" } else { componente[addqueuecount] = arg.divtarget; }
						if (arg.to) { querysearch[addqueuecount]['to'] = Number(arg.to); }
						if (arg.from) { querysearch[addqueuecount]['from'] = Number(arg.from); }
					  addqueuecount++;
							
				}
 


				// FUNÇÃO PARA ZERAR DADOS E CARREGAR NOVAMENTE
				function AMS_ReQuery(arg) {
					
						zerando = true;
						console.log("ReQuery ativada");					
						scrollavaliable = true;
						queue = 0;
						addqueuecount = 0;
        		autopop = new Array();
						detail = new Array();
						autopop[0] = true;
						componente = new Array();
						componente[0] = "#minharesposta";
            actualposition = 0;
            popula = "";
					  json = {};
						rendertype = new Array();
						loadtype = new Array();

						manual = true;
						if (addqueuecount > 0) { querysearch[addqueuecount] = new Object(); }
						if (!arg.detalhes) { detail[addqueuecount] = "false"; } else { detail[addqueuecount] = arg.detalhes; }
						if (!arg.load) { loadtype[addqueuecount] = "multiple"; } else { loadtype[addqueuecount] = arg.load; }
						if (!arg.render) { rendertype[addqueuecount] = "listapublica"; } else { rendertype[addqueuecount] = arg.render }
						if (!arg.autopop) { autopop[addqueuecount] = true; } else { autopop[addqueuecount] = arg.autopop; }
						if (!arg.cat) { querysearch[addqueuecount]['cat'] = "bibliografia" } else { querysearch[addqueuecount]['cat'] = arg.cat; }
						if (arg.filter) { querysearch[addqueuecount]['filter'] = arg.filter; }
						if (!arg.divtarget) { componente[addqueuecount] = "#minharesposta" } else { componente[addqueuecount] = arg.divtarget; }
						if (arg.to) { querysearch[addqueuecount]['to'] = Number(arg.to); }
						if (arg.from) { querysearch[addqueuecount]['from'] = Number(arg.from); }
					  
						if (zerando) { zerando = false; $(componente[addqueuecount]).text(""); }
					
						addqueuecount++;
					
					
							
				}


      
        // FUNÇÕES PARA SEREM CARREGADAS ASSIM QUE O DOCUMENTO CARREGAR

        $( document ).ready(function() {
            
            // APAGA O GIF DE LOADING
            //$("#carregando").css("display", "none");
          
            // CARREGA AUTOMATICAMENTE OS DADOS ASSIM QUE A PÁGINA ESTIVER PRONTA
            if (!manual) { ajaxexchange(); }
          
            // CRIA EVENTO DE SCROLL PARA CARREGAR MAIS DADAOS (ÚTIL PARA SCROLL INFINITO, VERIFICAR OUTROS CASOS...)
            /*
						if (loadtype[queue] == 'byscroll' && !manual) {					
						$(window).scroll(function() {
                if($(window).scrollTop() + $(window).height() >= $(document).height()) { 
                  exibedados();
                }
            });
						}*/
          
        });