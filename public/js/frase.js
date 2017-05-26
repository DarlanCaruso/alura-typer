$('#botao-frase').click(fraseAleatoria);
$('#botao-troca-frase').click(buscarFrase);

function fraseAleatoria() {
    $('#loading-modal').fadeToggle();
    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro-modal").fadeToggle();
        setTimeout(function(){
            $("#erro-modal").fadeToggle();
        }, 2000);
    })
    .always(function(){
        $('#loading-modal').fadeToggle();
    });
};

function trocaFraseAleatoria(data){
    var frase = $('.frase');
    var numAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numAleatorio].tempo);
};

function buscarFrase() {
    $('#loading-modal').fadeToggle();
    var fraseId = $("#frase-id").val();
    var dados = {id : fraseId};
    $.get("http://localhost:3000/frases", dados, trocaFrase)
    .fail(function(){
        $("#erro-modal").fadeToggle();
        setTimeout(function(){
            $("#erro-modal").fadeToggle();
        }, 2000);
    })
    .always(function(){
        $('#loading-modal').fadeToggle();
    });
};

function trocaFrase(data){
    var frase = $('.frase');
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
};