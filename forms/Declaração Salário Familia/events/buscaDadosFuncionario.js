function buscaDadosFuncionario(form, cpf){
	log.info("######## CPF:"+ cpf)
	try {
        var fields = null;
        var constraints = [];
        var sortingFields = null;

        constraints.push(DatasetFactory.createConstraint("CPF", cpf, cpf, ConstraintType.MUST));

        var dataset = DatasetFactory.getDataset("dsInfoFuncionariosRM", fields, constraints, sortingFields);

        if (dataset.rowsCount == 0) {
            throw "Colaborador não encontrado!";
        } else {
        	var dt_admissao = dataset.getValue(0,'DATAADMISSAO');
        	dt_admissao = dt_admissao.split(" ")[0].split("-").reverse().join("/");
        	var dt_nascimento = dataset.getValue(0,'DTNASCIMENTO');
        	dt_nascimento = dt_nascimento.split(" ")[0].split("-").reverse().join("/");
        	var cpf_func = dataset.getValue(0,'CPF');
        	var dt_aposentadoria = dataset.getValue(0,'DTAPOSENTADORIA')
        	dt_aposentadoria = (dt_aposentadoria =="null"?"":dt_aposentadoria.split(" ")[0].split("-").reverse().join("/"));
        	var aposentado = dataset.getValue(0,'APOSENTADO');

        	//Seção Dados Pessoais
            form.setValue("txt_nome", dataset.getValue(0,'NOME'));
            form.setValue("txt_coligada", dataset.getValue(0,'CODCOLIGADA'));
            form.setValue("txt_matricula", dataset.getValue(0,'CHAPA'));
            form.setValue("dt_admissao", dt_admissao);
            form.setValue("cpf_func", formatarCPF(cpf_func));
            form.setValue("dt_nascimento", dt_nascimento);
            form.setValue("txt_sexo", dataset.getValue(0,'SEXO'));
            form.setValue("txt_nome_social", dataset.getValue(0,'NOMESOCIAL'));
            form.setValue("racacor", dataset.getValue(0,'COD_RACACOR'));
            form.setValue("txt_email_corporativo", dataset.getValue(0,'EMAIL'));
            
            form.setValue("txt_nacionalidade", dataset.getValue(0,'NACIONALIDADE'));
            form.setValue("cod_nacionalidade", dataset.getValue(0,'COD_NACIONALIDADE'));
            form.setValue("uf_nascimento", dataset.getValue(0,'ESTADONATAL'));
            form.setValue("cidade_nascimento", dataset.getValue(0,'NATURALIDADE'));
            form.setValue("txt_estado_civil", dataset.getValue(0,'CODIGO_ESTADOCIVIL'));
            form.setValue("txt_grau_instrucao", dataset.getValue(0,'CODIGO_GRAUINSTRUCAO'));
            form.setValue("txt_departamento", dataset.getValue(0,'SECAO'));
            form.setValue("txt_nome_empresa", dataset.getValue(0,'FILIAL'));
        	
            
            buscaDadosDependentes(form,cpf);
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

