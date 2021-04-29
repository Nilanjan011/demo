$(function(){
    $('.form').on('submit', function(event){
        event.preventDefault();
        var $form1=$(this);
        var data;
        var $form = $("#id").val();
        // var $form = $(this);
        console.log($form);
        $.ajax({
			url: "update.php",
			type: "GET",
			cache: false,
			data:{
				id: $form
			},
			success: function(dataResult){
				data=JSON.parse(dataResult);
                // console.log(data);
                sendAjaxRequest( data,$form1 );
			}
		});
    });
});


function sendAjaxRequest( data,$form1 ){
    var imageData = getImageData( data );

    if( imageData ){
        $.ajax({
            url: $form1.attr('action'),
            method: $form1.attr('method'),
            data: {data: imageData },
            success: function( response ){
                response = JSON.parse( response );

                if( response.status == 'success' ){
                    $('#auc-qrcode').html('<img src="'+response.url+'">');   
                    $('#auc-qrcode').removeClass('d-none'); 
                    $('.status').addClass('d-none');
                    $('.status').html('');
                }
                else{
                    // error handling goes here..
                }
            },
            error: function( response ){

            }
        });
    }

}

function getImageData( data ){
    var urlText = '';
    var len=(data.result.length);
    for (let i = 0; i < len; i++) {
        urlText= urlText+(data.result[i].name);
        urlText= urlText+","+(data.result[i].email);
        urlText= urlText+","+(data.result[i].id);
    }

    if( urlText && urlText.length ){
    
        $('#auc-qrcode').addClass('d-none');

        new QRCode( $('#auc-qrcode')[0], urlText );

        $('.status').removeClass('d-none');
        $('.status').html('Processing Request...!')

        var canvas = $('#auc-qrcode canvas');

        var img = canvas.get(0).toDataURL("image/png");
        return img;
    }

    return null;
} 
