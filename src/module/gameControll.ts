//遊戲控制 控制所有class
import Snake from "./snake";
import Food from "./food";
import ScorePanel from "./scorePanel";

class GameControll{
    //定義三個屬性
    snake : Snake;
    food :Food;
    scorePanel:ScorePanel;

    //蛇的方向
    direction:string = '';
    isLive :boolean = true ;

    constructor(){
        this.snake=new Snake();
        this.food=new Food();
        this.scorePanel=new ScorePanel();
        this.init();
    }

    // game Start
    init(){
        //綁定鍵盤事件
        document.addEventListener('keydown',this.keydownHandler.bind(this))//.bind(this) 把該方法的this指向物件而非document
        //調用run方法
        
        this.run();
        
    }

    //鍵盤按下的響應函數
    keydownHandler(event:KeyboardEvent){
        //在此修改方向
        //console.log(this);//=>指向的是document
        //檢查是否按了方向鍵

        this.direction = event.key;
        //this.run()
    }
    //檢查蛇是否吃到食物
    checkEat(X:number,Y:number):void{
        if( X === this.food.X && Y === this.food.Y){
            console.log("eat!!!");
            //食物位置要重製
            this.food.change();
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    }


    //控制蛇移動
    run(){
        //透過 direction讓蛇往特定方向動
        //獲取現在座標
        let X = this.snake.X;
        let Y = this.snake.Y;
        //修改local variable  
        switch(this.direction){
            case "ArrowUp":
                Y-=10;
                break;
            case "ArrowDown":
                Y+=10;
                break;
            case "ArrowLeft":
                X-=10;
                break;
            case "ArrowRight":
                X+=10;
                break;    
        }
        //是否吃到食物
        this.checkEat(X,Y)

        //修改x,y
        try{
            this.snake.X=X;
            this.snake.Y=Y;
        }catch(e){
            alert(e);
            this.isLive = false;
        }
       
        //XX毫秒後在呼叫此方法
        //速度綁定等級this.scorePanel.level*30
        if(this.isLive){
            setTimeout(this.run.bind(this),80-this.scorePanel.level*7);
        }
       
    }

}

export default GameControll

