var formulaire = {

  afficherFomulaire : function () {
    $( "#nbrChanson2" ).slider({
      range: "min",
      value: 15,
      min: 2,
      max: 50,
      slide: function (event, ui) {
        $("#amount2").val(ui.value);
      }
    });
    $("#amount2").val($( "#nbrChanson2" ).slider( "value" ));
    $("#choisirNbrJoueur").load("template/choisirNbrJoueur.html", function(){
      formulaire.choisirNbrJoueur();
    });

  },


  choisirNbrJoueur : function () {

    $("#choisirNbrJoueur img").hover(function(){
      var obj = $(this);
      var alt = obj.attr('alt');
      var src = obj.attr('src');

      var tab = src.split("/"),
        url = "";

      for(var i=0; i<tab.length-1; i++){
        url += tab[i]+"/";
      }

      src = tab[tab.length-1];

      var theImg = $("#choisirNbrJoueur img");
      for(var i=0; i<=alt; i++){
        theImg[i].src = url+"icon_player_hover.png";
      }

      for(var w=i; w<theImg.length; w++){
        theImg[w].src = url+"icon_player.png";
      }

    });

    $('#choisirNbrJoueur').mouseleave(function () {
      var obj = $(this);
      var src = obj.find("img").attr('src');

      var tab = src.split("/"),
        url = "";

      for(var i=0; i<tab.length-1; i++){
        url += tab[i]+"/";
      }

      var theImg = $("#choisirNbrJoueur img");
      for(var i=1; i<theImg.length; i++){
        theImg[i].src = url+"icon_player.png";
      } 
    });

    $("#choisirNbrJoueur img").click(function () {
      var obj = $(this);
      var alt = parseInt(obj.attr('alt'))+1;
      $("#choisirNbrJoueur").data("nbrjoueur", alt);
      

      $("#choisirNbrJoueur img").unbind('mouseenter').unbind('mouseleave');
      $("#choisirNbrJoueur").unbind("mouseleave");
      $("#choisirNbrJoueur img").unbind("click");
    });

  },

}