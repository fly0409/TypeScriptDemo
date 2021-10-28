class Snake{
    //獲取一個蛇頭
    head:HTMLElement;
    //蛇的身體(包括頭)
    bodies:HTMLCollection;
    //獲取蛇的container
    element:HTMLElement;

    constructor(){
        this.head = document.querySelector('#snake>div')! as HTMLElement;

        //document.querySelectorAll('#snake>div')//返回的是一個node list ,每一次添加element都要重新獲取
        this.bodies=document.getElementById('snake')!.getElementsByTagName('div')//返回的是一個collection

        this.element=document.getElementById('snake')!;
    }

    //取的蛇的座標
    get X(){
        return this.head.offsetLeft;
    }

    get Y(){
        return this.head.offsetTop;
    }
    //設定蛇的座標
    set X(value:number){
        if (this.X===value) return;
        //撞牆
        if ( value < 0 || value > 290){
            //蛇死掉的訊息要傳給父class
            throw new Error("GG");
        }
        //修改X是修改方向，蛇在向左移動時不能向右
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft ==value){
            //console.log("不可以回頭~");
            //不讓你掉頭 =>向反方向移動
            if(value> this.X){
                //向右走的時候掉頭
                value = this.X-10;
            }else{
                value = this.X+10;
            }
        }

        //移動身體
        this.moveBody();

        this.head.style.left = value +'px';
        this.checkHeadBody();
    }
    set Y(value:number){
        if (this.Y===value) return;
        if ( value < 0 || value > 290){
            //蛇死掉的訊息要傳給父class
            throw new Error("GG");
        }

        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop ==value){
            //console.log("不可以回頭~");
            //不讓你掉頭 =>向反方向移動

            //往上走的時候回頭
            if(value > this.Y){
                value = this.Y-10;
            }else{
                value = this.Y+10;
            }
        }


        //移動身體
        this.moveBody();

        this.head.style.top = value +'px';
        this.checkHeadBody();
    }
    //增加身體
    addBody(){
        //添加HTML 的位置:beforebegin 在結束標籤前
        this.element.insertAdjacentHTML("beforeend","<div></div>")
    }
    //檢查是否有相撞
    checkHeadBody(){
        for(let i = 1; i < this.bodies.length;i++){
            let bd = this.bodies[i] as HTMLElement;
            if(this.X ===bd.offsetLeft && this.Y === bd.offsetTop){
                //撞到了
                throw new Error('撞到自己拉')
            }
        }
    }

    //後面身體的位置改成前面身體的位置
    moveBody(){
        console.log(this.bodies.length);
        
        // for(let i = 0 ; i <this.bodies.length; i++){
        //     console.log(this.bodies[i]);
        // }

        for(let i = this.bodies.length - 1 ; i > 0 ; i --){
            let beforeX = (this.bodies[i-1] as HTMLElement).offsetLeft;
            let beforeY = (this.bodies[i-1] as HTMLElement).offsetTop;
            
            (this.bodies[i] as HTMLElement).style.left = beforeX+'px';
            (this.bodies[i] as HTMLElement).style.top = beforeY+'px';
        }
    }

}


export default Snake;