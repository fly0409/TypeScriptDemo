//定義 food class
class Food {
    //表示食物所對應到到DOM元素
    element:HTMLElement;

    constructor(){
        //獲取頁面中的element
        this.element = document.getElementById('food')!;
    }

    //取得食物座標
    get X(){
        return this.element.offsetLeft;
    }
    get Y(){
        return this.element.offsetTop;
    }

    //修改食物位置
    //left,top 0~290 ,一格是10 (300-食物size)
    //座標可以被10整除
    change(){
        let left = Math.round(Math.random()*29)*10//0~29之間
        let top = Math.round(Math.random()*29)*10
        this.element.style.left=left+"px";
        this.element.style.top=top+"px";
    }
}
//測試
// const food = new Food();
// console.log(food.X,food.Y);
// setInterval(()=>{
//     food.change();
// },200)


export default Food;