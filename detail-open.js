window.addEventListener("load", function () {
    //hash open-------------
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    function openFromHash() {
        const hash = window.location.hash;
        if (hash) {
            let elem = document.getElementById(hash.substring(1));
            if (elem && elem.tagName.toLowerCase() == "details") elem.open = true;
        }
    }
    
    //clipboard-------------
    const clipboardMessage = document.createElement("div");
    clipboardMessage.classList.add("clipboard-message");

    for(let detail of [...document.querySelectorAll("details")]){
        const elem = detail.querySelector(".detail-block");
        const imgContainer = document.createElement("p");
        imgContainer.classList.add("detail-copy");
        const img = document.createElement("img");
        img.src = "./link.svg";
        img.alt = "copy link";
        img.title="copy link to clipboard";
        img.addEventListener("click", ()=>copyToClipboard(detail.id, imgContainer));
        imgContainer.appendChild(img);
        elem.appendChild(imgContainer);
    }

    function copyToClipboard(id, sender){
        const url = window.location.origin + window.location.pathname+"#"+id;
        navigator.clipboard.writeText(url).then(function(){
            showMessage("Copied!");
        },
        function(){
            showMessage("Failed to copy");
        });
        function showMessage(text){
            clipboardMessage.textContent = text;
            sender.appendChild(clipboardMessage);
        }
    }
});