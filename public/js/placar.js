$('.botao-backup').click(sincronizaPlacar);

/* Botao placar */

$('#botao-placar').click(function(){
    $('.placar').stop().slideToggle(1000);
});

function mostraPlacar() {
    $('.placar').stop().slideDown(1000);
};

/* Inserir dados no placar */

function inserePlacar() {
    $('.info').remove();

    var tabela = $('.placar').find('tbody');
    var contadorPalavras = $('#contador-palavras').text();
    var usuario = $("#usuarios").val();

    var linha = novaLinha(usuario, contadorPalavras);
    linha.find('.botao-remover').click(removeLinha);
    tabela.prepend(linha);
    mostraPlacar();
    scrollPlacar();
};

function scrollPlacar(){
    var posicaoPlacar = $('.placar').offset().top;
    $('body').animate({
        scrollTop: posicaoPlacar + "px"
    },1000);
};

/* Cria a linha do placar como objeto, para ser manipulado via DOM */ 

function novaLinha(usuario,palavra) {
    var linha = $('<tr class="entrada">');
    
    var colunaNome = $('<td>').text(usuario); 
    var colunaPalavras = $('<td>').text(palavra); 
    var colunaRemover = $('<td>'); 

    var link = $('<a>').addClass('botao-remover').attr('href','#');
    var icone = $('<i>').addClass('small').addClass('material-icons').addClass('red-text').addClass('text-darken-4').text('delete');

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaNome);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
};

/* Remove a linha do placar */

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    },1000);
};

/* Backup Placar */

var botaoBackup = $("#botao-backup-placar");
    botaoBackup.hover(function(){
        $('.backup-placar').fadeToggle(1000);
    });

function sincronizaPlacar(){
    var placar = [];
    var linha = $('.entrada');

    linha.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = { 
            usuario: usuario, 
            pontos: palavras 
        };
        
        placar.push(score);
    });

    var info = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", info, function(){
        $('#placar-modal').fadeToggle(1500);
        setTimeout(function(){
            $('#placar-modal').fadeToggle(1500);
        });
    });
};

function atualizaPlacar(){
    $('.info').remove();
    $.get("http://localhost:3000/placar", function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find('.botao-remover').click(removeLinha);
            $('tbody').append(linha);
        });
        
    });
};