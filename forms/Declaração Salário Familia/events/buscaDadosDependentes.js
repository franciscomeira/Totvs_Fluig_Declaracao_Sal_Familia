function buscaDadosDependentes(form, cpf){
	log.info("######## CPF:"+ cpf)
	try {
        var fields = null;
        var constraints = [];
        var sortingFields = null;

        constraints.push(DatasetFactory.createConstraint("CPF", cpf, cpf, ConstraintType.MUST));
        constraints.push(DatasetFactory.createConstraint("CODGRAUPARENTESCO", "99", "99", ConstraintType.MUST));

        var dataset = DatasetFactory.getDataset("DsInfoFuncionariosDepRM", fields, constraints, sortingFields);

        for(var i = 0; i < dataset.rowsCount; i++) {
        	
         	var dt_nascimento = dataset.getValue(i,'DTNASCIMENTO');
        	dt_nascimento = dt_nascimento.split(" ")[0].split("-").reverse().join("/");
        	var cpf_depend = dataset.getValue(i,'CPF');
        	
        	
        	form.setValue("origem_rm___" +(i+1), true);
            form.setValue("num_dependente___" +(i+1), dataset.getValue(i,'NRODEPEND'));
        	form.setValue("nome_dependente___"+(i+1), dataset.getValue(i,'NOME'));
        	form.setValue("cpf_dependente___"+(i+1), cpf_depend);
        	form.setValue("dt_nascimento_dependente___"+(i+1), dt_nascimento);
        	
        	form.setValue("grau_parentesco_dependente___"+(i+1), dataset.getValue(i,'CODGRAUPARENTESCO'));
            
        }
        
       
    } catch(erro) {
        throw "ERRO";
    }
}

function formatarCPF(cpf) {
        var parte1 = cpf.substring(0, 3);
        var parte2 = cpf.substring(3, 6);
        var parte3 = cpf.substring(6, 9);
        var parte4 = cpf.substring(9, 11);
        
        return parte1 + '.' + parte2 + '.' + parte3 + '-' + parte4;
}

