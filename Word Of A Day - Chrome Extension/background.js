

let newWord = ()  => {
    getData()
    .then( info => checkIfExists(info))
    .then( info => {
        // create chrome notification

        let options = {
            type: "basic",
            title: "Word of the Day",
            message: info.word,
            iconUrl: "icon.png"
        };

        chrome.notifications.create(info.word, options);
        return info;
    })
    .then( info => saveWord(info.word))
    .catch(err => { console.log(err); checkWord(); });

    function getData() {
        return new Promise((resolve, reject) => {
            $.get('https://www.merriam-webster.com/word-of-the-day', function(data) {
                //console.log(data);
                let type = $(data).find('span.main-attr').text();
                let pronunciation = $(data).find('span.word-syllables').text();
                let word = $(data).find('div.word-and-pronunciation').find('h1').text();
                let definitions = $(data).find('div.wod-definition-container').eq(0).find('p');
                let length = definitions.length;
                let test = word.charAt(0).toUpperCase() + word.slice(1);
                var i;
                var defs = "";
                for (i = 0; i < length; i++) { 
                    if (definitions[i].innerText.includes(test)) {
                        break;
                    } else {
                        if (i == 0) {
                            defs = defs.concat(definitions[i].innerText);
                        } else {
                            defs = defs.concat('\n').concat(definitions[i].innerText);
                        }
                    }

                }
                resolve({word, defs, type, pronunciation});
            });
        });
    }

    function checkIfExists(info) {
        return info;
    }

    function checkIfExists(info){ 
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('words', function(data) {
                var words = data.words || [];
                if (words.indexOf(info.word) === -1) {
                    // its fine to show notification
                    resolve(info);
                } else {
                    reject("Word already seen");
                }
            });
        });
    }

    function saveWord(word) {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get('words', function(data) {
                var words = data.words || [];
                words.push(word);
                chrome.storage.local.set({words}, () => {
                resolve('Done');
                });
            })
        });
    }
};

let checkWord = () => {
    setTimeout(newWord, 600000);
};

checkWord();



//This is for dictionary.com
/*
let box = $(data).find('div.wotd-item__definition').eq(0);
            let link_bar = box.find('a.wotd-item__link');
            let link = link_bar.attr('href');
            let def = box.find('div.wotd-item__definition__text').text().trim();
            let word = box.find('h1').text();
            let pron_box = box.find('div.wotd-item__definition__pronunciation');
            let type_and_pron = pron_box.text().trim();
            let index = type_and_pron.indexOf(" ");
            let type = type_and_pron.substring(0, index);
            let pronunciation = type_and_pron.substring(index, type_and_pron.length).trim();
            
            resolve({word, def, type, pronunciation, link});
*/

/*$.get(link, function(data2) {
                //console.log(data2);
                let bar = $(data2).find('section.css-1f2po4u').eq(0);
                //word = bar.find('h1.css-1jzk4d9').text();
                pronunciation = bar.find('span.pron-spell-content').text();
                type = bar.find('span.luna-pos').text();
                //let def_bar = bar.find('div.css-1o58fj8').eq(0);
                //let def = def_bar.find('span.one-click-content').text();
                return {pronunciation, type};
            });*/