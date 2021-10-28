//計分表
class ScorePanel{
    score:number=0;
    level:number=1;
    maxlevel:number;

    scoreEle:HTMLElement;
    levelEle:HTMLElement;
    //傳入參數的默認值
    constructor(maxlevel:number=10){
        this.scoreEle = document.getElementById("score")!;
        this.levelEle = document.getElementById("level")!;
        this.maxlevel=maxlevel;
    }

    addScore(){
        this.score++;
        this.scoreEle.innerHTML = this.score+'';
        if(this.score %5 ==0){
            this.leverUp();
        }
    }

    leverUp(){
        if(this.level <this.maxlevel){
            this.level++;
            this.levelEle.innerHTML = this.level+'';
        }
       
    }
}

// const sp = new ScorePanel();
// for(let i = 0;i<1000 ; i++){
//     sp.addScore();
// }

export default ScorePanel;