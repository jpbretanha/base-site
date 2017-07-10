$(document).ready(function() { 
    "use strict";

    $('form.form-contato').submit(function(e){
        var dados = jQuery( this ).serialize();

        var nome = $('#nome').val();
        var telefone = $('#telefone').val();
        var email = $('#email').val();

        $('.form-contato').find('input[type="submit"]').hide();

        var thisForm = $(this).closest('form.form-contato');

        //thisForm.find('.form-error').fadeIn(1000);

        jQuery.ajax({
                    type: "POST",
                    dataType: 'html',
                    url: "php/send.php",
                    //data: dados,
                    data:{
                        nome : nome,
                        email : email,
                        telefone : telefone,
                    },
                    success: function(data) {
                        //alert(data);
                        
                        //$('.form-contato').find('.form-success').fadeIn(1000);
                        
                        $('.form-contato').find('input[type="submit"]').show();
                        $('.form-contato').append('<div class="sucesso">' + thisForm.attr('data-success') + '</div>');
                        thisForm.find('.sucesso').fadeOut(4000);
                        //$('.form-contato').reset();

                        $(thisForm).find('#nome').val("");
                        $(thisForm).find('#email').val("");
                        $(thisForm).find('#telefone').val("");
                    }

                });
        return false;
    });
}); 