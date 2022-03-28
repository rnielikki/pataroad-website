window.addEventListener("load", function(){
    const dateDisplay = document.querySelector(".dday");
    const dateCounter = document.querySelector(".dday-counter");
    const downloadButton = document.querySelector(".download");

    const releaseDate = new Date(2022,04,01);
    const foolDate = new Date(2022,03,01);
    const foolDateEnd = new Date(2022,03,02);
    const current = Date.now();

    if(releaseDate > current){
        if(current >= foolDate && current < foolDateEnd){
            downloadMode("./start.html"); //fake site lol
        }
        else ddayMode();
    }
    else{
        downloadMode();
    }

    function ddayMode(){
        downloadButton.classList.add("download-disabled");
        downloadButton.href = "#";
        dateDisplay.style.display = "block";

        const difference = (releaseDate - current) / 86400000;
        dateCounter.textContent = Math.round(difference);
    }
    function downloadMode(addr = "./download.html"){
        downloadButton.classList.remove("download-disabled");
        downloadButton.href = addr;
        dateDisplay.style.display = "none";
    }
});