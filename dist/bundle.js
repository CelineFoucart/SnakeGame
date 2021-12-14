(()=>{"use strict";class t{static gameOver(t,e,s){t.save(),t.font="bold 70px sans-serif",t.fillStyle="#000",t.textAlign="center",t.textBaseline="middle",t.strokeStyle="white",t.lineWidth=5,t.strokeText("Game Over",e,s-180),t.fillText("Game Over",e,s-180),t.font="bold 30px sans-serif",t.strokeText("Appuyer sur la touche Espace pour rejouer",e,s-120),t.fillText("Appuyer sur la touche Espace pour rejouer",e,s-120),t.restore()}static drawScore(t,e,s,i){t.save(),t.font="bold 200px sans-serif",t.fillStyle="gray",t.textAlign="center",t.textBaseline="middle",t.fillText(i.toString(),e,s),t.restore()}static drawSnake(t,e,s){t.save(),t.fillStyle="#ff0000";for(let i of e.body)this.drawBlock(t,i,s);t.restore()}static drawApple(t,e,s){const i=s/2,a=e.position[0]*s+i,h=e.position[1]*s+i;t.save(),t.fillStyle="#33cc33",t.beginPath(),t.arc(a,h,i,0,2*Math.PI,!0),t.fill(),t.restore()}static drawBlock(t,e,s){const[i,a]=e;t.fillRect(i*s,a*s,s,s)}}class e{constructor(t,...e){this.body=e,this.direction=t,this.ateApple=!1}advance(){const t=this.body[0].slice();switch(this.direction){case"left":t[0]-=1;break;case"right":t[0]+=1;break;case"down":t[1]+=1;break;case"up":t[1]-=1;break;default:throw"invalid direction"}this.body.unshift(t),this.ateApple?this.ateApple=!1:this.body.pop()}setDirection(t){let e;switch(this.direction){case"left":case"right":e=["up","down"];break;case"down":case"up":e=["left","right"];break;default:throw"invalid direction"}e.includes(t)&&(this.direction=t)}checkCollision(t,e){let s=!1,i=!1;const[a,...h]=this.body,[n,o]=a;(n<0||n>t-1||o<0||o>e-1)&&(s=!0);for(let t of h)n===t[0]&&o===t[1]&&(i=!0);return s||i}isEatingApple(t){const e=this.body[0];return e[0]===t.position[0]&&e[1]===t.position[1]}}class s{constructor(t=[10,10]){this.position=t}setNewPosition(t,e){const s=Math.round(Math.random()*(t-1)),i=Math.round(Math.random()*(e-1));this.position=[s,i]}isOnSnake(t){let e=!1;for(let s of t.body)this.position[0]===s[0]&&this.position[1]===s[1]&&(e=!0);return e}}class i{constructor(t=900,e=600){this.canvasWidth=t,this.canvasHeight=e,this.blockSize=30,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.widthInBlocks=this.canvasWidth/this.blockSize,this.heightInBlocks=this.canvasHeight/this.blockSize,this.centreX=this.canvasWidth/2,this.centreY=this.canvasHeight/2,this.delay,this.snakee,this.applee,this.score,this.timeOut}init(){this.canvas.width=this.canvasWidth,this.canvas.height=this.canvasHeight,this.canvas.style.border="30px solid gray",this.canvas.style.margin="50px auto",this.canvas.style.display="block",this.canvas.style.backgroundColor="#ddd",document.body.appendChild(this.canvas),this.launch()}launch(){this.snakee=new e("right",[6,4],[5,4],[4,4],[3,4],[2,4]),this.applee=new s,this.score=0,clearTimeout(this.timeOut),this.delay=100,this.refreshCanvas()}refreshCanvas(){if(this.snakee.advance(),this.snakee.checkCollision(this.widthInBlocks,this.heightInBlocks))t.gameOver(this.ctx,this.centreX,this.centreY);else{if(this.snakee.isEatingApple(this.applee)){this.score++,this.snakee.ateApple=!0;do{this.applee.setNewPosition(this.widthInBlocks,this.heightInBlocks)}while(this.applee.isOnSnake(this.snakee));this.score%5==0&&this.speedUp()}this.ctx.clearRect(0,0,this.canvasWidth,this.canvasHeight),t.drawScore(this.ctx,this.centreX,this.centreY,this.score),t.drawSnake(this.ctx,this.snakee,this.blockSize),t.drawApple(this.ctx,this.applee,this.blockSize),this.timeOut=setTimeout(this.refreshCanvas.bind(this),this.delay)}}speedUp(){this.delay/=2}}window.onload=()=>{let t=new i;t.init(),document.onkeydown=e=>{let s;switch(e.keyCode){case 37:s="left";break;case 38:s="up";break;case 39:s="right";break;case 40:s="down";break;case 32:return void t.launch();default:return}t.snakee.setDirection(s)}}})();