function iniFunc() {
    if (filePlaying == 0) {
    //    loadSound1(0);
    //    loadSound1(1);
    //} if (filePlaying == trialNum[0]) {
        loadSound2(0);
        loadSound2(1);
    }

}

// Play/Pause when "Play/Pause" button
function AudioButtonFunc1(n_audio) {
    if (audioPlaying[n_audio] == false) {
        audioArray1[n_audio].loop = true;
        audioArray1[n_audio].play();
        audioArray1[n_audio].volume = 1.0;
        audioPlaying[n_audio] = true;
    } else {
        audioArray1[n_audio].pause();
        audioPlaying[n_audio] = false;
    }
    debugShowLog(audioPlaying);
    // END if audioPlaying
}   // END AudioButtonFunc
function AudioButtonFunc2(n_audio) {
    if (audioPlaying[n_audio] == false) {
        for (var n = 0; n < ptnNum; ++n) {
            audioArray2[n_audio][n].loop = true;
            audioArray2[n_audio][n].play();
        }
        for (var n = 0; n < ptnNum; ++n) {
            audioArray2[n_audio][n].volume = 0;
        }
        audioArray2[n_audio][playNum[n_audio]].volume = 1.0;
        audioPlaying[n_audio] = true;
    } else {
        for (var n = 0; n < ptnNum; ++n) {
            audioArray2[n_audio][n].pause();
        }
        audioPlaying[n_audio] = false;
    }   // END if audioPlaying0
}   // END AudioButtonFunc

// Change sound file when slider moves
function ChangeVolume(n_audio) {
    for (var n = 0; n < ptnNum; ++n) {
        if (n == playNum[n_audio]) {
            audioArray2[n_audio][n].volume = 1.0;
            debugShowLog(n);
        } else {
            audioArray2[n_audio][n].volume = 0.0;
        }
    }
}

// Load sound files
function loadSound1(n_audio) {
    readFile = audioFile1[n_audio][filePlaying];
    var audioname = readFile + ".wav";
    audioArray1[n_audio] = new Audio(audioname);
    audioArray1[n_audio].load();
}
function loadSound2(n_audio) {
    n_file = filePlaying;
    readFile = audioFile2[n_audio][n_file];
    for (var n = 0; n < ptnNum; ++n) {
        console.log(n_file);
        var audioname = readFile + point[n_audio][n_file][n] + ".wav";
        audioArray2[n_audio][n] = new Audio(audioname);
        audioArray2[n_audio][n].load();
    }
}

// Save answers in array
function saveAns2Array1() {
    var fileAns = filePlaying + 1;
    if (fileAns < 10) {
        var nameOpt = "selectNtr00" + fileAns;
    } else if (fileAns < 100) {
        var nameOpt = "selectNtr0" + fileAns;
    } else {
        var nameOpt = "selectNtr" + fileAns;
    }
    debugShowLog(nameOpt);
    var idOpt = document.getElementById(nameOpt);
    selectAns[filePlaying][0] = idOpt.options[idOpt.selectedIndex].value;
    debugShowLog(selectAns[filePlaying]);
}   // END saveAnsFunc
function saveAns2Array2() {
    var fileNum = filePlaying + 1;
    var fileAns = filePlaying + trialNum[0] + 1;
    // Save efficiency value
    if (fileAns < 10) {
        var nameOpt = "selectEf00" + fileAns;
    } else if (fileAns < 100) {
        var nameOpt = "selectEf0" + fileAns;
    } else {
        var nameOpt = "selectEf" + fileAns;
    }
    debugShowLog(nameOpt);
    var idOpt = document.getElementById(nameOpt);
    selectAns[filePlaying][0] = idOpt.options[idOpt.selectedIndex].value;
    debugShowLog(selectAns[filePlaying]);
}   // END saveAnsFunc

// 各ファイルが終わったら回答漏れがないか確認，なければ次の音データを読み込み
function saveArrayVal1(n_type, n_playing) {
    n_playing = n_playing - 1;
    for (n_audio = 0; n_audio <= 1; ++n_audio) {
        if (audioPlaying[n_audio] == true) {
            audioArray1[n_audio].pause();
            audioPlaying[n_audio] = false;
        }
    }
    debugShowLog(audioPlaying);
    var AnsFill = 0;
    for (var n = 0; n < quesNum[n_type]; ++n) {
        if (selectAns[n_playing- trialNum[0]][n] != null) {
            AnsFill = AnsFill + 1;
        }
    }
    if (AnsFill == quesNum[n_type]) {
        filePlaying = n_playing + 1;
        if (filePlaying < trialNum[n_type]) {
            loadSound1(0);
            loadSound1(1);
        } if (filePlaying == trialNum[n_type]) {
            iniFunc();
        }
        debugShowLog("Answers filled!");
    } else {
        alert("Select answer!");
    }
}   // END saveAnsFunc
function saveArrayVal2(n_type, n_playing) {
    n_playing = n_playing - 1 + trialNum[0];
    for (n_audio = 0; n_audio <= 1; ++n_audio) {
        for (var n = 0; n < ptnNum; ++n) {
            if (audioPlaying[n_audio][n] == true) {
                audioArray2[n_audio][n].pause();
            }
        }
        audioPlaying[n_audio] = false;
    }
    debugShowLog(audioPlaying);

    var AnsFill = 0;
    for (var n = 0; n < quesNum[n_type]; ++n) {
        if (selectAns[n_playing - trialNum[0]][n] != null) {
            AnsFill = AnsFill + 1;
        }
    }
    debugShowLog(AnsFill);
    if (AnsFill == quesNum[n_type]) {
        filePlaying = n_playing + 1 - trialNum[0];
        if (filePlaying < arraySum(trialNum)) {
            loadSound2(0);
            loadSound2(1);
        }
        debugShowLog("Answers filled!");
    } else {
        alert("Select answer!");
    }
}   // END saveAnsFunc

// 回答をファイルにして保存
function saveFunc() {
    var data = selectAns;
    if (data.length) {
        var obj = document.getElementById("anchor");
        obj.href = "data:application/octet-stream," +
                   encodeURIComponent(data);
        obj.innerHTML = "右クリックでリンク先を保存して下さい";
    }
}   // END saveFunc

// Show/save slider position
function showValue(n_audio) {
    var fileAns = filePlaying + trialNum[0] + 1;
    if (fileAns < 10) {
        var nameSld = "slider00" + fileAns;
    } else if (fileAns < 100) {
        var nameSld = "slider0" + fileAns;
    } else {
        var nameSld = "slider" + fileAns;
    }
    nameSld = nameSld + "_" + n_audio;
    var idSld = document.getElementById(nameSld);
    playNum[n_audio] = idSld.value;
    ChangeVolume(n_audio);

    selectAns[filePlaying][n_audio + 1] = point[n_audio][filePlaying][playNum[n_audio]];
    debugShowLog(selectAns[filePlaying]);
}