window.addEventListener("load", function(){
    let canvas = document.querySelector("#main-image");
    let ctx = canvas.getContext("2d");

    let canvas2 = document.querySelector("#main-image2");
    let ctx2 = canvas2.getContext("2d");

    //image
    let bgImage = new Image();
    bgImage.src = "bg-corner.png";
    let bgGround = new Image();
    bgGround.src = "bg-ground.png";
    
    let bgLoaded = false;
    Promise.all(
      [new Promise(res=>bgImage.addEventListener("load",()=>res())),
      new Promise(res=>bgGround.addEventListener("load",()=>res()))]
    ).then(()=>{
        bgLoaded = true;
        drawImages();
    });

    //--particle
    let particleImage = new Image();
    particleImage.src = "star.png";
    //init ctx
    function clear(){
        ctx.globalAlpha = 1;
        var gradient = ctx.createLinearGradient(canvas.width/2, 0, canvas.width/2, canvas.height);
        gradient.addColorStop(0, "#000000");
        gradient.addColorStop(1, "#303099");
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    function drawImages(){
        if(!bgLoaded) return;
        ctx2.clearRect(0,0,canvas2.width, canvas2.height);
        let pattern = ctx2.createPattern(bgGround, "repeat");
        ctx2.fillStyle = pattern;
        ctx2.setTransform(1,0,0,1,0,canvas.height - bgGround.height);
        ctx2.fillRect(0, 0, canvas.width, bgGround.height);
        ctx2.setTransform(1,0,0,1,0,0);

        ctx2.drawImage(bgImage, canvas.width-bgImage.width, canvas.height-bgImage.height);
    }
    
    //-- particle setting
    const particleCount = 20;
    const particleSize = 30;
    
    //--particles
    const particles = new Array(particleCount);
    for(let i=0;i<particleCount;i++)
    {
        particles[i] = new particleUnit(i);
    }
    drawImages();
    setInterval(function(){
        clear();
        for(var particle of particles){
            particle.draw();
        }
    }, 100);
    //--- resizing
    resize();
    window.addEventListener("resize", resize);
    function resize(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.8;
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight * 0.8;
        drawImages();
    }
    //--one particle
    function particleUnit(delay)
    {
        let alpha;
        let x, y;
        let fadingIn = false;
        let ended = true;
        let currentDelay = 0;
        let thisDelay = delay;
        let rotation = 0;
        function setPos()
        {
            currentDelay = 0;
            rotation = 0;
            alpha = 0;
            ended = false;
            fadingIn = true;
            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;
        }
        this.draw = function()
        {
            if(ended){
                currentDelay++;
                if(thisDelay == currentDelay) setPos();
            }
            if(fadingIn){
                alpha += 0.05;
                if(alpha >= 1)
                {
                    alpha = 1;
                    fadingIn = false;
                }
            }
            else
            {
                alpha -= 0.05;
                if(alpha <= 0){
                    alpha = 0;
                    ended = true;
                }
            }
            ctx.globalAlpha = alpha;
            rotation+=0.1;
            ctx.setTransform(alpha,0,0,alpha,x,y);
            ctx.rotate(rotation);
            ctx.drawImage(particleImage, -alpha*particleSize*0.5, -alpha*particleSize*0.5, particleSize, particleSize);
            ctx.setTransform(1,0,0,1,0,0);
        }
    }
});