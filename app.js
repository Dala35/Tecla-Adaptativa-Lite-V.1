window.AppKizoba = (function(){
    let linguaAtiva='ckw';

    const expressoes = {
        ola:{pt:'Olá / Bom dia',ckw:'Moyo wenu',knd:'Dizanga',mbu:'Moyo u wa'},
        como_estas:{pt:'Como estás?',ckw:'Kanawa?',knd:'Uejinga uê?',mbu:'Oku li ndati?'},
        estou_bem:{pt:'Estou bem',ckw:'Ngulhi kanawa',knd:'Nga ri kilembu',mbu:'Ndi li pala'},
        obrigado:{pt:'Obrigado(a)',ckw:'Naçakwila',knd:'Kutulenda',mbu:'Pandula'},
        eu_te_amo:{pt:'Eu te amo',ckw:'Na ku zanga',knd:'Ngi ku zola',mbu:'Ndi ku sole'},
        quero_comer:{pt:'Quero comer',ckw:'Nguna zangue kulhia',knd:'Ngi zanda kulia',mbu:'Ndiongola liã'}
    };

    function mudarLingua(lang){
        linguaAtiva=lang;
        window.KizobaCore.setLanguage(lang);
        document.getElementById('resposta').innerHTML=`Idioma alterado para ${lang.toUpperCase()}`;
    }

    function handleText(){
        const texto=document.getElementById('text-input').value.trim();
        if(!texto) return alert('Escreva uma frase');
        // Exemplo simples: procura expressão já validada
        let match = Object.values(expressoes).find(e=>e.pt.toLowerCase()===texto.toLowerCase());
        if(!match) match = {pt:texto,ckw:texto,knd:texto,mbu:texto};
        document.getElementById('resposta').innerHTML=`${match.pt} → ${match[linguaAtiva]}`;
        window.KizobaCore.sendToEngine(match);
        document.getElementById('text-input').value='';
    }

    function handleInputTranslation(transcript){
        document.getElementById('text-input').value = transcript;
        handleText();
    }

    return { handleInputTranslation, mudarLingua, handleText };
})();
