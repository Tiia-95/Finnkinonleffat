
const leffalat = [];
let elokuvat;
let yksittäinen;

//Tässä funktiossa ladataan leffateattereiden tiedot sivustoa ladattaessa
function leffateattereiden_lataus() {
    $(document).ready(function(){
        $.get("https://www.finnkino.fi/xml/Schedule/", function(elokuvat, status){
            //alert("Data: " + elokuvat + "\nStatus: " + status);
            yksittäinen = elokuvat.getElementsByTagName("Show");
            yht = yksittäinen.length;

            for(i = 0; i <= yht; i++){
                if(true != leffalat.includes(yksittäinen[i].getElementsByTagName("TheatreID")[0].childNodes[0].nodeValue)){
                    leffalat.push(yksittäinen[i].getElementsByTagName("TheatreID")[0].childNodes[0].nodeValue);
                    uusiElementti(yksittäinen[i].getElementsByTagName("TheatreID")[0].childNodes[0].nodeValue, yksittäinen[i].getElementsByTagName("Theatre")[0].childNodes[0].nodeValue);
                
                    }
                }

          });
      });

    }


//Yhden leffateatterin nimi kerrallaan listataan alasvetovalikkoon ja luodaan niihin napit, josta voi valita kyseisen leffateatterin
function uusiElementti(id, nimi) {
    var a = $("<a></a>").text(nimi);
    $(a).attr("id", id);
    $("#lista").append(a);
    $(a).click(function() {valinta(id, nimi)});
}

//Tässä muodostetaan leffalistaus sivulle valitusta leffateatterista
function valinta(id, nimi) {
    document.getElementById("leffalaatikko").innerHTML = "";
    document.getElementById("nimi").innerHTML = nimi;
    const listatutLeffat = [];
    for(i = 0; i < yht; i++) {
        if(yksittäinen[i].getElementsByTagName("TheatreID")[0].childNodes[0].nodeValue == id){
            
            var div = document.createElement("div");
            div.style.border = "1px solid gold";
            div.style.padding = "20px";
            
            var otsikko = yksittäinen[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
            var genre = yksittäinen[i].getElementsByTagName("Genres")[0].childNodes[0].nodeValue;
            var sali = yksittäinen[i].getElementsByTagName("TheatreAuditorium")[0].childNodes[0].nodeValue;
            var aloitus = yksittäinen[i].getElementsByTagName("dttmShowStart")[0].childNodes[0].nodeValue;
            var vuosi = aloitus.slice(0, 4);
            var kuukausi = aloitus.slice(5, 7);
            var päivä = aloitus.slice(8, 10);
            var aaika = aloitus.slice(11, 16);
            var lopetus = yksittäinen[i].getElementsByTagName("dttmShowEnd")[0].childNodes[0].nodeValue;
            var laika = lopetus.slice(11, 16);
            
            var teksti = "Leffan genret: " + genre + ", se menee salissa: " + sali;
            var aloitustiedot = "Leffa menee: " + päivä + "." + kuukausi + "." + vuosi + " kello: " + aaika + " - " + laika;

            var o = document.createTextNode(otsikko);
            var span = document.createElement("span");
            span.style.fontSize = "30px";
            span.appendChild(o);
            div.appendChild(span);

            var br = document.createElement("br");
            div.appendChild(br);
            
            var br = document.createElement("br");
            div.appendChild(br);

            var a = document.createTextNode(aloitustiedot)
            div.appendChild(a);

            var br = document.createElement("br");
            div.appendChild(br);

            var t = document.createTextNode(teksti);
            div.appendChild(t);
            
            document.getElementById("leffalaatikko").appendChild(div);
        }
    }
}

document.addEventListener('DOMContentLoaded', leffateattereiden_lataus);