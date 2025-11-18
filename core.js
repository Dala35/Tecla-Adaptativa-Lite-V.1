window.KizobaCore = (function(){
    let language = 'ckw'; 

    const ttsLangMap = { 'ckw':'pt-PT','knd':'pt-PT','mbu':'pt-PT' };

    function setLanguage(lang){ language = lang; }

    function sendToEngine(textoObj){
        if(!textoObj) return;
        const texto = textoObj[language] || textoObj.pt;
        if('speechSynthesis' in window){
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(texto);
            utter.lang = ttsLangMap[language];
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        }
    }

    let recognition, isListening=false;
    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SR();
        recognition.continuous=false;
        recognition.interimResults=false;
        recognition.lang='pt-PT';
        recognition.onstart = ()=>{ isListening=true; };
        recognition.onend = ()=>{ isListening=false; };
        recognition.onresult = e=>{
            const transcript = e.results[0][0].transcript;
            window.AppKizoba.handleInputTranslation(transcript);
        };
    }

    function toggleMic(){ if(!recognition) return; isListening? recognition.stop():recognition.start(); }

    return { setLanguage, sendToEngine, toggleMic };
})();
