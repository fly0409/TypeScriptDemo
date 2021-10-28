//一個 nodeJS的模塊 
const path = require('path')

const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
//webpack裡面所有的設定都要寫在這裡
module.exports={
    //入口文件
    entry:"./src/index.ts",

    //指定打包的目錄
    output:{
        path:path.resolve(__dirname,'dist'),  //用引入的path串接路徑, 也可以用"./dist"
        filename:"bundle.js",
        //不使用箭頭函數,為了IE版本問題
        environment:{
            arrowFunction:false,
            const:false,//ie 10 不認識const
        }
    },
    //打包時要使用的module
    module:{
        rules:[
            {
                //test指定規則生效的檔案,用正則表達是指定結尾為.ts的檔案
                test:/\.ts$/,
                //要使用的loader
                use:[
                    //配置babel loader
                    {
                        loader:"babel-loader",
                        //設定相容性
                        options:{
                            presets:[
                                [
                                    "@babel/preset-env",//指定環境差件
                                    {
                                        targets:{
                                            "chrome":"88",//要相容的瀏覽器
                                        },
                                        "corejs":"3",//coreJS的版本
                                        "useBuiltIns":"usage"//使用coreJS的方式,"usage"表示按需加載
                                    }
                                ]
                            ],
                        }
                    },
                    'ts-loader',//後面的先執行
                ],
                exclude:/node-modules/,
            },
            //在rules裡面處理less
            {//less結尾的
                test:/\.less$/,
                use:[
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader:"postcss-loader",
                        options:{
                            postcssOptions:{
                                plugins:[
                                    [
                                    "postcss-preset-env",
                                    {
                                        browsers:"last 2 versions"
                                    }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //引入插件
    plugins:[
        new HTMLWebpackPlugin({
            title:"snake",
            //可以設定網頁模板
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(),
    ],

    //設置哪些東西可以被視為module使用(讓ts可以export,import)
    resolve:{
        extensions:['.ts','.js']
    }
}