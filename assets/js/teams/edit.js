/**
 * Created by TT on 2/20/2015.
 */
$(document).ready(function(){

    $.ajax({
        type:"GET",
        dataType:"json",
        data:"api_key="+publicKey+"&"+$("#form").serialize(),
        url:"/api/teams/get",
        beforeSend:function() {
          $("#name,#status,#btn").attr("disabled","disabled");
        },
        success:function(resp) {
            $("#name").val(resp.name);
            $("#status").val(resp.status);
        },
        error:function(resp) {
            if ( resp ) {
                var responseJSON = resp.responseJSON;
                $("#info-msg").text(responseJSON.message).removeClass().removeClass().addClass("alert alert-"+responseJSON.type);
            }
        },
        complete:function() {
            $("#name,#status,#btn").removeAttr("disabled");
        }


    });


    $("#btn").on("click",function(){
        $.ajax({
            type:"PUT",
            dataType:"json",
            data:$("#form").serialize()+"&api_key="+publicKey,
            url:"/api/teams/edit",
            success:function(resp) {
                if ( resp.redirect !== undefined ) {
                    window.location.href = resp.redirect;
                }
                if ( resp.message !== undefined ) {
                    $("#info-msg").text(resp.message).removeClass().addClass("alert alert-"+resp.type);
                }
            },
            error:function(resp) {
                if ( resp ) {
                    var responseJSON = resp.responseJSON;
                    $("#info-msg").text(responseJSON.message).removeClass().addClass("alert alert-"+responseJSON.type);
                }
            }
        });
    });
});