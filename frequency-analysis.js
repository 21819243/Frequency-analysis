//Github page: https://github.com/21819243/Frequency-analysis

function frequencyList() {
    var englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var encryptedText = document
        .getElementById("encrypted_text")
        .value.toUpperCase();

    charNotOrdered = Array();
    countsNotOrdered = Array();

    for (p = 0; p < englishAlphabet.length; p++) {
        countsNotOrdered[countsNotOrdered.length] = letterCount(
            englishAlphabet.substr(p, 1),
            encryptedText
        );
        charNotOrdered[charNotOrdered.length] = englishAlphabet.substr(p, 1);
    }

    output = order(charNotOrdered, countsNotOrdered);

    orderedLetters = output[0];
    countsOrdered = output[1];

    frequencyTable = "<p style=\"margin-top:20px;\">Frequencies (Cipher Text):</p><table id=\"freqTable\"><tr>";

    for (i = 0; i < orderedLetters.length; i++) {
        frequencyTable += "<td style=\"text-align:center\">";
        frequencyTable += "<input type=\"text\" id=\"origLetter_" + i + "\" style=\"width:20px;border:none;background-color:transparent;text-align:center\" value=\"" + orderedLetters[i] + "\" readonly>";
        frequencyTable += "</td>";
    }

    frequencyTable += "</tr><tr>";
    for (i = 0; i < orderedLetters.length; i++) {
        frequencyTable += "<td style=\"text-align:center\">";
        frequencyTable += countsOrdered[i];
        frequencyTable += "</td>";
    }

    frequencyTable += "</tr><tr>";

    frequencyTable += "</tr><tr>";
    for (i = 0; i < orderedLetters.length; i++) {
        frequencyTable += "<td style=\"text-align:center\">";
        frequencyTable += "<input type=\"text\" id=\"subsLetter_" + i + "\" maxlength=\"1\" style=\"width:20px\">";
        frequencyTable += "</td>";
    }
    frequencyTable += "</tr></table><br>";
    document.getElementById("frequencyItems").innerHTML = frequencyTable;
    document.getElementById("makeSubsButton").style.display = "block";
    document.getElementById("alphabetFrequency").style.display = "block";

}

function makeSubstitutions() {
    var englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var decryptedTextResult = document
        .getElementById("encrypted_text")
        .value.toUpperCase();
    document.getElementById("result_div").style.display = "block";
    document.getElementById("decrypted_text").focus();
    document.getElementById("decrypted_text").value = decryptedTextResult.toLowerCase();

    for (i = 0; i < englishAlphabet.length; i++) {
        if (document.getElementById("subsLetter_" + i).value != "") {
            decryptedTextResult = decryptedTextResult.replace(RegExp(document.getElementById("origLetter_" + i).value, 'g'), document.getElementById("subsLetter_" + i).value.toLowerCase());
        }
    }
    document.getElementById("decrypted_text").value = decryptedTextResult;
}

function letterCount(letter, toCheck) {
    c = 0;
    sl = letter.length;
    for (ds = 0; ds < toCheck.length; ds++) {
        if (toCheck.substr(ds, sl) == letter) {
            c = c + 1;
        }
    }
    return c;
}

function order(characters, counts) {
    lnt = characters;
    cnt = counts;
    orderChars = Array();
    orderCounts = Array();
    while (lnt.length > 0) {
        if (lnt.length > 1) {
            maxvalue = Math.max(cnt[0], cnt[1]);
            for (wr = 2; wr < lnt.length; wr++) {
                maxvalue = Math.max(maxvalue, cnt[wr]);
            }
        } else {
            maxvalue = cnt[0];
        }
        fd = 0;
        while (fd < lnt.length) {
            if (cnt[fd] == maxvalue) {
                orderChars[orderChars.length] = lnt[fd];
                orderCounts[orderCounts.length] = cnt[fd];
                lnt.splice(fd, 1);
                cnt.splice(fd, 1);
            } else {
                fd = fd + 1;
            }
        }
    }

    return [orderChars, orderCounts];
}