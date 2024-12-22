var modalDependente = null;

$(function () {

  $("#add_dependente").hide();

  if (WKNumState == 0 || WKNumState == 4 || WKNumState == 9) {
    $("#add_dependente").show();
    $(".divAprovacao").hide();
   


    

    // Carrega o componente Calendário do próprio Fluig no campom Data da Aposentadoria
    

    // Trata o botão de adicionar um Pai x Filho, dos Dependendentes
    $("#add_dependente").on("click", function () {
      //var row = wdkAddChild("tbDependentes");
      //$("#num_dependente___" + row).val(row);

      openModalDependente();
    });


    $(document).on("click", "[data-save-dependente]", function(){
      var rowModal = $("#row_modal").val();
	  var origem_rm_modal = $("#origem_rm_modal").val();
	  var num_dependente_modal = $("#num_dependente_modal").val();
      var nome_dependente_modal = $("#nome_dependente_modal").val();
      var cpf_dependente_modal = $("#cpf_dependente_modal").val();
      var dt_nascimento_dependente_modal = $("#dt_nascimento_dependente_modal").val();
      
      var grau_parentesco_dependente_modal = $("#grau_parentesco_dependente_modal").val();
      var grau_instrucao_dependente_modal = $("#grau_instrucao_dependente_modal").val();
      
      
      

      if (nome_dependente_modal.trim() == '') {
        FLUIGC.toast({
          title: 'Validação: ',
          message: 'Nome do Dependente é obrigatório!',
          type: 'danger'
        });
        return;
      } else if (cpf_dependente_modal.trim() == '') {
        FLUIGC.toast({
          title: 'Validação: ',
          message: 'CPF do Dependente é obrigatório!',
          type: 'danger'
        });
        return;
      } else if (dt_nascimento_dependente_modal.trim() == '') {
        FLUIGC.toast({
          title: 'Validação: ',
          message: 'Data de Nascimento do Dependente é obrigatório!',
          type: 'danger'
        });
        return;
      } 
      
      /* else if (grau_instrucao_dependente_modal.trim() == '') {
        FLUIGC.toast({
          title: 'Validação: ',
          message: 'Grau de Instrução do Dependente é obrigatório!',
          type: 'danger'
        });
        return;
      }
      */
      var row = "";
      var new_num_dependente = num_dependente_modal; //Ajudar new_num_dependente no projeto de Recadastramento
      if (rowModal == "") {
       
        var qtdeDependente = $("input[name^='num_dependente___']").length;
        if (qtdeDependente > 0) {
          new_num_dependente = $(
            "#num_dependente___" + (qtdeDependente)
          ).val();
          new_num_dependente++;
        } else {
          new_num_dependente = 1
        }
        row = wdkAddChild("tbDependentes");

        
        
      } else {
        row = rowModal;
      }
      
      $("#origem_rm___" + row).val(origem_rm_modal);
      $("#num_dependente___" + row).val(new_num_dependente);
      $("#nome_dependente___" + row).val(nome_dependente_modal);
      $("#cpf_dependente___" + row).val(cpf_dependente_modal);
      $("#dt_nascimento_dependente___" + row).val(dt_nascimento_dependente_modal);
      
      $("#grau_parentesco_dependente___" + row).val(grau_parentesco_dependente_modal);
      $("#grau_instrucao_dependente___" + row).val(grau_instrucao_dependente_modal);
      
      carregaTemplate();
      modalDependente.remove();
    });

    $(document).on("click", ".btn-edit-dependente", function(e){
      e.preventDefault();
      let row = $(this).data("row");

      let origem_rm = $("#origem_rm___" + row).val();
      let num_dependente = $("#num_dependente___" + row).val();
      let nome_dependente = $("#nome_dependente___" + row).val();
      let cpf_dependente = $("#cpf_dependente___" + row).val();
      let dt_nascimento_dependente = $("#dt_nascimento_dependente___" + row).val();
      
      let grau_parentesco_dependente = $("#grau_parentesco_dependente___" + row).val();
      let grau_instrucao_dependente = $("#grau_instrucao_dependente___" + row).val();
      
	  let dadosDependente = {
		row: row,
		origem_rm: origem_rm,
		num_dependente: num_dependente,
		nome_dependente: nome_dependente,
		cpf_dependente: cpf_dependente,
		dt_nascimento_dependente: dt_nascimento_dependente,
		
		grau_parentesco_dependente: grau_parentesco_dependente,
		grau_instrucao_dependente: grau_instrucao_dependente,
		
	  };

	  openModalDependente(dadosDependente);
    });

    $(document).on("click", ".btn-remove-dependente", function(e){
      e.preventDefault();
      let row = $(this).data("row");
      $(`#num_dependente___${row}`).closest("tr").remove();
      carregaTemplate();
    });
  }

  carregaTemplate();
});


function carregaTemplate() {
  var editavel = false;
  if (WKNumState == 0 || WKNumState == 4 || WKNumState == 9) {
    editavel = true;
  }

  var itens = [];
  $("input[name^='num_dependente___']").each(function (i, v) {
    var row = $(this).attr("id").split("___")[1];
   
    
    const texto_Grau_Parentesco = $("#grau_parentesco_dependente___" + row + " > option:selected").text();
    const texto_Grau_Instrucao = $("#grau_instrucao_dependente___" + row + " > option:selected").text();

    itens.push({
      editavel: editavel,
      row: row,
      origem_rm: ($("#origem_rm___" + row).val() == 'true'),
      num_dependente: $("#num_dependente___" + row).val(),
      nome_dependente: $("#nome_dependente___" + row).val(),
      cpf_dependente: $("#cpf_dependente___" + row).val(),
      dt_nascimento_dependente: $("#dt_nascimento_dependente___" + row).val(),
      
      grau_parentesco_dependente: texto_Grau_Parentesco,
      grau_instrucao_dependente: texto_Grau_Instrucao,
      
    });
  });

  fetch('Template_dependentes.html')
  .then((response) => response.text())
  .then((template) => {
    const rendered = Mustache.render(template, { itens: itens });
    document.getElementById('template_dependente').innerHTML = rendered;
  });
}

function openModalDependente(dadosDependente = null) {
  fetch('templateAddDependente.html')
  .then((response) => response.text())
  .then((template) => {
      const rendered = Mustache.render(template, (dadosDependente == null ? {} : dadosDependente));

      modalDependente = FLUIGC.modal({
          title: 'Dependente',
          content: rendered,
          id: 'modal-dependente',
          size: 'full',
          actions: [{
              'label': 'Adicionar',
              'bind': 'data-save-dependente',
          },{
              'label': 'Fechar',
              'autoClose': true
          }]
      }, function(err, data) {
          if(err) {
              // do error handling
          } else {
              // do something with data

              $('#cpf_dependente_modal').mask('000.000.000-00', {reverse: true});
              var dt_nascimento_dependente_modal = FLUIGC.calendar("#dt_nascimento_dependente_modal");

              $("#grau_parentesco_dependente_modal").html($("#grau_parentesco_dependente").html());
              $("#grau_instrucao_dependente_modal").html($("#grau_instrucao_dependente").html());

			  if (dadosDependente != null) {

				$("#grau_parentesco_dependente_modal").val(dadosDependente.grau_parentesco_dependente);
        $("#grau_instrucao_dependente_modal").val(dadosDependente.grau_instrucao_dependente);
			  } else {
				$("#origem_rm_modal").val(false);
			  }
          }
      });
  });
}

