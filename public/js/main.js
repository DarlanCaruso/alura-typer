/* Execução quando a página for carregada */

$(function(){
    atualizaTamanhoFrase();
    contadorFrase();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
    atualizaPlacar();
    $('#usuarios').selectize({
        create: true,
        sortField: 'text'
    });
});

/* Variaveis globais */

var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

/* Contador da frase a ser digitada */

function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $('#tamanho-palavra');
    tamanhoFrase.text(numPalavras);
};

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $('#tempo-digitacao').text(tempo);
};

/* Contador da frase digitada pelo usuário */

function contadorFrase() {
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);

        var qtdCaracters = conteudo.length;
        $('#contador-caracters').text(qtdCaracters);
    });
};

function inicializaMarcadores (){
    campo.on("input",function(){
        var frase =  $('.frase').text();
        var digitado = campo.val();
        var comparavel = frase.substr(0,digitado.length);

        if(digitado == comparavel) {
            campo.addClass('campo-true');
            campo.removeClass("campo-false");
        } else {
            campo.addClass('campo-false');
            campo.removeClass("campo-true");
        }
    });
};

/* Contador de tempo e Game Over */

function inicializaCronometro(){
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        var intervalo = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);

            if(tempoRestante < 1) {
                clearInterval(intervalo); 
                finalizaJogo();
            }
        }, 1000);
    });
};

/* Reiniciar o jogo */

function reiniciaJogo (){
    campo.attr("disabled", false);
    campo.val("");
    campo.removeClass("campo-desativado");
    campo.removeClass("campo-true");
    campo.removeClass("campo-false");
    $("#tempo-digitacao").text(tempoInicial);
    $('#contador-palavras').text('0');
    $('#contador-caracters').text('0');
    $('#botao-reiniciar').addClass('disabled');
    inicializaCronometro();
};

/* Finalizar o jogo */

function finalizaJogo (){
    campo.attr("disabled", true).addClass("campo-desativado");
    $('#botao-reiniciar').removeClass('disabled');
    inserePlacar();
};