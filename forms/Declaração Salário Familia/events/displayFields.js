function displayFields(form,customHTML){
	
	form.setShowDisabledFields(true);
	form.setHidePrintLink(true);
	form.setHideDeleteButton(true);
	var WKNumState = getValue("WKNumState");
	var WKUser= getValue("WKUser");
	customHTML.append("<script>") 
	customHTML.append("var WKNumState = "+ WKNumState)
	customHTML.append("</script>")
	if (WKNumState == 0 || WKNumState == 4) {
		
		var dadosUser = buscaDadosUser(WKUser);
		buscaDadosFuncionario(form,dadosUser.getValue(0, "login"));
		
	}
	
}