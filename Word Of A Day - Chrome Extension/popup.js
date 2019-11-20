$(document).ready(function() {
    $.get('https://www.merriam-webster.com/word-of-the-day', function(data) {
        //console.log(data);
        let type = $(data).find('span.main-attr').text();
        let pronunciation = $(data).find('span.word-syllables').text();
        let word = $(data).find('div.word-and-pronunciation').find('h1').text();
        let defs = $(data).find('div.wod-definition-container').text();
        defs = defs.trim();
        let index = defs.indexOf("Did You Know");
        let index2 = index + 13;
        let temp = defs.substring(index2, defs.length).trim();
        let newDefs = defs.substring(12, index).trim();
        let a = $(data).find('div.wod-definition-container').find('p');
        var i = 0;
        let arr = [];
        while (i < a.length) {
            if (a[i].textContent.includes(temp.substring(0, 7))) {
                break;
            } else {
                arr = arr.concat(a[i].textContent);
            }
            i++;
        }
        $('#new_word').text(word);
        $('#word_type').text(type);
        $('#pronun').text(pronunciation);
        var mainList = document.getElementById("definition");
        for (var j = 0; j < arr.length; j++) {
            var text = arr[j];
            var ind = text.indexOf(':') + 1;
            text = text.substring(0, ind).bold().concat(text.slice(ind));
            var elem = document.createElement("p");
            elem.innerHTML = text;
            mainList.appendChild(elem);
        }
    });
});