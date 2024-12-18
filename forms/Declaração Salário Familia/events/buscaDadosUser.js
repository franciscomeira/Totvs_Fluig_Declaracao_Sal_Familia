function buscaDadosUser(colleagueId){
    try {
        //Campos que irá trazer
        var fields = new Array("colleaguePK.colleagueId", "colleagueName", "mail", "login");

        //Monta as constraints para consulta
        var constraints = new Array();
        constraints.push(DatasetFactory.createConstraint("colleaguePK.colleagueId", colleagueId, colleagueId, ConstraintType.MUST));

        //Define os campos para ordenação
        var sortingFields = new Array("colleagueName");

//Busca o dataset
        var dataset = DatasetFactory.getDataset("colleague", fields, constraints, sortingFields);
        var count = dataset.rowsCount;

        if (count == 0) {
            return dataset;
        } else {
            return dataset;
        }
    } catch (e) {
        throw("ERRO: " + e);
    }
}