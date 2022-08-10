var SpeechRecognition = window.webkitSpeechRecognition;
var Content;
var recognition = new SpeechRecognition();
var imgeId = "selfie1"

function start()
{
    recognition.start();
} 

function fale(speakData) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}

camera = document.getElementById("camera");
Webcam.set({
    width:500,
    height:400,
    image_format : 'jpeg',
    jpeg_quality:90
});


recognition.onresult = function run(event){
    console.log(event);
    Content = event.results[0][0].transcript;
    console.log(Content);
    //document.getElementById("textbox").innerHTML = Content;
    if(Content == "selfie"){
        console.log("tirado selfie")
        speak();
    } else {
        fale("Eu entendi "+Content+". Diga selfie.")
    }    
}


function speak(){ 

    fale("Tirando sua "+imgeId+" em 5 segundos");
    Webcam.attach(camera);
    setTimeout(function(){
        takeSelfie()
    },5000)

}

function takeSelfie(){
    console.log(imgeId);

    Webcam.snap(function(data_uri){
    if(imgeId == "selfie1"){
        document.getElementById("result1").innerHTML = '<img id="selfie1" src="'+data_uri+'"/>';
        fale(imgeId + "capturada")
        imgeId = "selfie2"
        speak()
    } else if(imgeId == "selfie2"){
        document.getElementById("result2").innerHTML = '<img id="selfie2" src="'+data_uri+'"/>';
        fale(imgeId + "capturada")
        imgeId = "selfie3"
        speak()
    } else if(imgeId == "selfie3"){
        document.getElementById("result3").innerHTML = '<img id="selfie3" src="'+data_uri+'"/>';
        fale(imgeId + "capturada")
        imgeId = "selfie1"
    }
    })
}




