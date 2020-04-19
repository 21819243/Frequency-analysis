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
    for (i = 0; i < englishAlphabet.length; i++) {
        document.getElementById("frequencyItems").innerHTML +=
            output[0][i] + ":" + output[1][i] + " <br>";
    }

    console.log(output[0] + ":" + output[1]);
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