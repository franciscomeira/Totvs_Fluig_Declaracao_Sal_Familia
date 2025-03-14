function enableFields(form) {
  bloqueiaTodosCampos(form);
  var WKNumState = getValue("WKNumState");
  camposDependentes(form);
  if (WKNumState == 0 || WKNumState == 4 || WKNumState == 9) {
   
    
  } else if (WKNumState == 5) {
    form.setEnabled("dados_aprovacao", true);
    form.setEnabled("txt_justificativa", true);
  }
}

function bloqueiaTodosCampos(form) {
  var it = form.cardData.keySet().iterator();
  while (it.hasNext()) {
    var key = it.next();
    //log.info('>>>>' + key + ': ' + form.cardData.get(key));
    form.setEnabled(key, false);
  }
}

function camposDependentes(form) {
  form.setEnabled("origem_rm", true);
  form.setEnabled("num_dependente", true);
  form.setEnabled("nome_dependente", true);
  form.setEnabled("cpf_dependente", true);
  form.setEnabled("dt_nascimento_dependente", true);
 
  form.setEnabled("grau_parentesco_dependente", true);
  form.setEnabled("grau_instrucao_dependente", true);
 
  var indexes = form.getChildrenIndexes("tbDependentes");
  for (var i = 0; i < indexes.length; i++) {
    form.setEnabled("origem_rm___" + indexes[i], true);
    form.setEnabled("num_dependente___" + indexes[i], true);
    form.setEnabled("nome_dependente___" + indexes[i], true);
    form.setEnabled("cpf_dependente___" + indexes[i], true);
    form.setEnabled("dt_nascimento_dependente___" + indexes[i], true);
    
    form.setEnabled("grau_parentesco_dependente___" + indexes[i], true);
    form.setEnabled("grau_instrucao_dependente___" + indexes[i], true);
    
  }
}
