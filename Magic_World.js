;window.onload = function(){
    function $(idName){
        return document.getElementById(idName)
    }
    var WizardDuel = $("WizardDuel")
    var PerfectKnockout = $("PerfectKnockout")
    var BraveTheDragon = $("BraveTheDragon")
    var DGame = $("DGame")
    var PGame = $("PGame")
    var WGame = $("WGame")

    var Dragon = $("Dragon")
    var Warrior = $("warrior")
    var FireBullets = $('FireBullets')
    var Blood1 = $('Blood1')
    var Blood2 = $('Blood2')
    var Blood3 = $('Blood3')
    var Blood4 = $('Blood4')
    var Blood5 = $('Blood5')
    var Blood6 = $('Blood6')
    var Blood7 = $('Blood7')
    var Blood8 = $('Blood8')
    var shot = true
    var bulletSet = []
    var fly = 0
    var status = true
    var WarriorBlood = 4;

    var RedFighter = $('RedFighter')
    var BlueFighter = $('BlueFighter')
    var BlueBullets = $('BlueBullets')
    var gameEnter = $('gameEnter')
    var bullets = $('BlueBullets')
    var BF = $('BF')
    var RF = $('RF')
    var shoot = true
    var hit = true
    var punch = true
    var Rstatus = true
    var Bstatus = true
    var RedLife = 60
    var BulletSet = []

    var wizarddefined = $('wizarddefined')
    var greenwizard = $('greenwizard')
    var WBullets = $('WBullets')
    var WD = $("WD")
    var GW = $("GW")
    var Shoot = true
    var Hit = true
    var Punch = true
    var Wstatus = true
    var Gstatus = true
    var GLife = 60
    var BuSet = []





    //Brave The Dragon

    BraveTheDragon.onclick = function(){
        gameStart.style.display = "none";
        DGame.style.display = "block";

        document.onkeyup = function(evt){
            var e = evt || window.event;
            var c = e.keyCode;
            if(c == 66){
                DmoveL()
            }
            else if(c == 77){
                DmoveR()
            }
            else if(c == 78){
                Dfly(status)
                if(fly >= 100){
                    status = false
                    Blood4.style.display = "none"
                }if(fly == 25){
                    Blood1.style.display = "none"
                }if(fly == 50){
                    Blood2.style.display = "none"
                }if(fly == 75){
                    Blood3.style.display = "none"
                }
                fly = fly + 1

            }
            else if(c == 81){
                WmoveL()
            }
            else if(c == 69){
                WmoveR()
            }
            else if(c == 72){
                if(shot){
                    CreateFireBullet()
                    shot = false
                }else{
                    shot = true
                }
            }
        }
    }
        function getStyle(ele, attr){
            var res = null
            if(ele.currentStyle){
                res = elecurrentstyle[attr];
            }else{
                res = window.getComputedStyle(ele,null)[attr];
            }
            return parseFloat(res)
        }

        function DmoveL(){
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')

            var speed = -5
            Dragon.style['left'] = DL + speed + 'px'
            judgement(WL, WT, DL, DT)
        }

        function DmoveR(){
            var speed = 5
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')

            var DL = getStyle(Dragon, 'left')
            if(DL >= 500){
                Dragon.style['left'] = 500;
            }else{
                Dragon.style['left'] = DL + speed + 'px'
            }
            judgement(WL, WT, DL, DT)
        }

        function Dfly(flag){
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')
            var flyheight = 30
            var flyend = getStyle(Dragon, "top") - flyheight
            var speed = -1
            if(Dragon.timer){
                clearInterval(Dragon.timer)
                delete Dragon.timer
            }
            Dragon.timer = setInterval(function(){
                var moveVal = getStyle(Dragon, 'top');
                if(moveVal <= 0){speed = 1.8}
                if(moveVal == flyend){
                    speed = 1.8;
                    Dragon.style['top'] = moveVal + speed + "px"

                }else if(flag){
                    Dragon.style['top'] = Math.min(400, moveVal + speed) + "px"
                    if (moveVal >= 400){
                        clearInterval(Dragon.timer);
                        delete Dragon.timer
                    }
                }
                else{
                    speed = 1.8
                    Dragon.style['top'] = moveVal + speed + "px"
                    if (moveVal >= 400){
                        clearInterval(Dragon.timer);
                        Dragon.style['top'] = 400 + "px"
                        delete Dragon.timer
                    }
                }
                judgement(WL, WT, DL, DT)
            },10);
        }

        function WmoveL(){
            var speed = -10
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')
            if(WL <= 0){
                Warrior.style['left'] = 0
            }else{
                Warrior.style['left'] = WL + speed + "px"
            }
            judgement(WL, WT, DL, DT)

        }

        function WmoveR(){
            var speed = 10
            var WL = getStyle(Warrior, 'left')
            var WT = getStyle(Warrior, 'top')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')

            if(WL >= 500){
                Warrior.style['left'] = 500
            }else{
                Warrior.style['left'] = WL + speed + "px"
            }
            judgement(WL, WT, DL, DT)


        }

        function CreateFireBullet(){
            var bullet = new Image(15,15);
            bullet.src = 'sources/bullets.gif'
            bullet.className = "b"
            var WL = getStyle(Warrior,'left')
            var DL = getStyle(Dragon, 'left')
            var DT = getStyle(Dragon, 'top')
            bullet.style.left = DL + "px";
            bullet.style.top = DT + 50 + "px"
            FireBullets.appendChild(bullet);
            bulletSet.push(bullet);
            move(bullet)
        }

        function move(ele){
            var speedL = -1
            ele.timer = setInterval(function(){
                var BL = getStyle(ele, 'left')
                var WL = getStyle(Warrior, 'left')
                var WT = getStyle(Warrior, 'top')
                var BT = getStyle(ele, 'top')
                var t1 = 0
                var t2 = 0.01
                if(BL < WL + 100 && BL > WL && BT > WT - 15 && BT < WT + 85){
                    if(WarriorBlood == 4){
                        Blood8.style.display = "none"
                        clears(ele)
                    }if(WarriorBlood == 3){
                        Blood7.style.display = "none"
                        clears(ele)
                    }if(WarriorBlood == 2){
                        Blood6.style.display = "none"
                        clears(ele)
                    }if(WarriorBlood == 1){
                        Blood5.style.display = "none"
                        alert("Bomb!!")
                        Clears(ele)
                    }
                    WarriorBlood = WarriorBlood - 1

                }
                else if(BT >= 500 || BL <= 0){
                    clearInterval(ele.timer)
                    ele.parentNode.removeChild(ele)
                    bulletSet.splice(0,1);
                }else{
                    ele.style['left'] = BL + speedL + "px"
                    ele.style['top'] = BT + parseFloat(100*(t1 + t2)) + "px"
                }
                t1 = t1 + 0.01
                t2 = t2 + 0.01
            },10);
        }

        function Clears(ele){
            shot = true
            Warrior.style['left'] = 100 + 'px'
            Dragon.style['left'] = 400 + 'px'
            Dragon.style['bottom'] = 0 + 'px'
            Warrior.style['bottom'] = 0 + 'px'
            clearInterval(ele.timer)
            ele.parentNode.removeChild(ele)
            bulletSet.splice(0,1)
            fly = 0
            WarriorBlood = 4;
            if(fly == 0){
                Blood1.style.display = "block"
                Blood2.style.display = "block"
                Blood3.style.display = "block"
                Blood4.style.display = "block"
            }
            if(WarriorBlood == 4){
                Blood5.style.display = "block"
                Blood6.style.display = "block"
                Blood7.style.display = "block"
                Blood8.style.display = "block"
            }
        }

        function judgement(wl, wt, dl, dt, ele){
            if(dl < wl + 100 && dl > wl + 50 && dt + 100 > wt){
                alert("King!")
                clean()
            }
        }

        function clean(){
            Warrior.style['left'] = 100 + 'px'
            Dragon.style['left'] = 400 + 'px'
            Dragon.style['bottom'] = 0 + 'px'
            Warrior.style['bottom'] = 0 + 'px'
            bulletSet = []
            fly = 0
            WarriorBlood = 4;
            if(fly == 0){
                Blood1.style.display = "block"
                Blood2.style.display = "block"
                Blood3.style.display = "block"
                Blood4.style.display = "block"
            }
            if(WarriorBlood == 4){
                Blood5.style.display = "block"
                Blood6.style.display = "block"
                Blood7.style.display = "block"
                Blood8.style.display = "block"
            }

        }
        function clears(ele){
            clearInterval(ele.timer)
            ele.parentNode.removeChild(ele)
            bulletSet.splice(0,1);
        }




    //Perfect Knockout

    PerfectKnockout.onclick = function(){
        gameStart.style.display = "none"
        PGame.style.display = "block"
        document.onkeyup = function(evt){
            var e = evt || window.event
            var keyVal = e.keyCode;
            if(keyVal == 32){
                if(shoot){
                    createBullet();
                    BF.src = "sources/BlueFighterShoot.gif"
                    Bstatus = false
                    shoot = false
                }else{
                    BF.src = "sources/BlueFighter.gif"
                    shoot = true
                    Bstatus = true
                }
            }
            else if(keyVal == 37){
                BmoveL()
            }
            else if(keyVal == 39){
                BmoveR()
            }
            else if(keyVal == 65){
                RmoveL()
            }
            else if(keyVal == 68){
                RmoveR()
            }
            else if(keyVal == 75){
                RmoveK()
            }
            else if(keyVal == 74){
                if(punch){
                    RF.src = "sources/RedFighterPunch.gif"
                    Rstatus = false
                    punch = false
                    Judgement(Bstatus)
                }else{
                    RF.src = "sources/RedFighter.gif"
                    Rstatus = true
                    punch = true
                }

            }

        }
    }
    function createBullet(){
        var bullet = new Image(20,15);
        bullet.src = "sources/bullet.png"
        bullet.className = "c";
        var BlueL = getStyle(BlueFighter, 'left')
        bullet.style.left = BlueL + 100 + "px";
        bullet.style.bottom = 50 + "px";
        bullets.appendChild(bullet);
        BulletSet.push(bullet);
        Move(bullet,'left')
    }

    function Move(ele,attr){
        var speed = 8;
        ele.timer = setInterval(function(){
            var moveval = getStyle(ele,attr);
            var RedVal = getStyle(RedFighter,'left')
            if(moveval >= RedVal){
                clearInterval(ele.timer);
                ele.parentNode.removeChild(ele);
                RedLife = RedLife - 1
                if(RedLife <= 0 || Rstatus == false){
                    conditionB = true
                    alert("Blue💙Fighter Win!🏆 \n The Red side and The Blue side Please Swith Positions!\n Made by wange in Easter 2020")
                    clear()
                }
            }else{
                ele.style[attr] = moveval + speed + "px";
            }
         },10);
    }
    function sleep(time){
        var date = new Date()
        var curdate = null
        do{curdate = new Date();}
        while (curdate-date < time);
    }
    function BmoveL(){
        var speed = -5;
        var BL = getStyle(BlueFighter,'left')
        if(BL <= 0){
            BlueFighter.style['left'] = 0
        }else{
            BlueFighter.style['left'] = BL + speed + "px";
        }
    }
    function BmoveR(){
        var speed = 5;
        var BL = getStyle(BlueFighter,'left')
        var RL = getStyle(RedFighter,'left')
        if(BL + 100 >= RL){
            BlueFighter.style['left'] = RL - 100 + 'px'
        }else{
            BlueFighter.style['left'] = BL + speed + 'px';
        }
    }
    function RmoveL(){
        var speed = -5
        var RL = getStyle(RedFighter,'left')
        var BL = getStyle(BlueFighter,'left')
        if(BL + 100 >= RL){
            RedFighter.style['left'] = BL + 100 + 'px'
        }else{
            RedFighter.style['left'] = RL + speed + 'px'
        }
    }
    function RmoveR(){
        var speed = 10
        var RL = getStyle(RedFighter,'left')
        if(RL >= 500){
            RedFighter.style['left'] = 500
        }else{
            RedFighter.style['left'] = RL + speed + 'px'
        }
    }
    function RmoveK(){
        var superK = -50
        var RL = getStyle(RedFighter,'left')
        var BL = getStyle(BlueFighter,'left')
        if(BL + 100 >= RL){
            RedFighter.style['left'] = BL + 100 + 'px'
        }else{
            RedFighter.style['left'] = RL + superK + 'px'
        }
    }
    function Judgement(B){
        var BL = getStyle(BlueFighter, 'left')
        var RL = getStyle(RedFighter, 'left')
        if (RL <= BL + 101 && B == false){
            clear()
            alert("Wow!The RedFighter Win🏆❤️ Very Good Job!\nIt is very Hard to win as a RedFighter🤯\nThe Person Who Control the RedFighter Must be Very Clever and Courageous🤩🏆👍!!!\nMade by Wange In Easter 2020 and wish all of you happy everyday and keep fight!\nWhat is the next stage?")
        }
    }
    function clear(){
        BulletSet = []
        gameStart.style.display = "block"
        PGame.style.display = "none"
        Bstatus = true
        Rstatus = true
        RedLife = 60
        hit = true
        shoot = true
        punch = true
        RedFighter.style['left'] = 400 + 'px'
        BlueFighter.style['left'] = 100 + 'px'
        BF.src = "sources/BlueFighter.gif"
        RF.src = "sources/RedFighter.gif"
    }




    //Wizard Duel

    WizardDuel.onclick = function(){
        gameStart.style.display = "none"
        WGame.style.display = "block"
        document.onkeyup = function(evt){
            var e = evt || window.event
            var keyVal = e.keyCode;
            if(keyVal == 88){
                if(Shoot){
                    CreateBullet();
                    WD.src = "sources/wizardattack.gif"
                    Wstatus = false
                    Shoot = false
                }else{
                    WD.src = "sources/wizarddefined.gif"
                    Shoot = true
                    Wstatus = true
                }
            }
            else if(keyVal == 90){
                wmoveL()
            }
            else if(keyVal == 67){
                wmoveR()
            }
            else if(keyVal == 85){
                GmoveL()
            }
            else if(keyVal == 79){
                GmoveR()
            }
            else if(keyVal == 73){
                GmoveK()
            }
            else if(keyVal == 80){
                if(Punch){
                    GW.src = "sources/greenwizardPunch.gif"
                    Gstatus = false
                    Punch = false
                    Jdgement(Gstatus)
                }else{
                    GW.src = "sources/greenwizard.gif"
                    Gstatus = true
                    Punch = true
                }

            }

        }
    }
    function CreateBullet(){
        var bullet = new Image(20,15);
        bullet.src = "sources/flame.png"
        bullet.className = "d";
        var WL = getStyle(wizarddefined, 'left')
        bullet.style.left = WL + 100 + "px";
        bullet.style.bottom = 50 + "px";
        WBullets.appendChild(bullet);
        BuSet.push(bullet);
        MOve(bullet,'left')
    }

    function MOve(ele,attr){
        var speed = 8;
        ele.timer = setInterval(function(){
            var Moveval = getStyle(ele,attr);
            var GVal = getStyle(greenwizard,'left')
            if(Moveval >= GVal){
                clearInterval(ele.timer);
                ele.parentNode.removeChild(ele);
                GLife = GLife - 1
                if(GLife <= 0 || Gstatus == false){
                    conditionC = true
                    alert("Wizard Win!")
                    CLEar()
                }
            }else{
                ele.style[attr] = Moveval + speed + "px";
            }
         },10);
    }
    function sleep(time){
        var date = new Date()
        var curdate = null
        do{curdate = new Date();}
        while (curdate-date < time);
    }
    function wmoveL(){
        var speed = -5;
        var wL = getStyle(wizarddefined,'left')
        if(wL <= 0){
            wizarddefined.style['left'] = 0
        }else{
            wizarddefined.style['left'] = wL + speed + "px";
        }
    }
    function wmoveR(){
        var speed = 5;
        var wL = getStyle(wizarddefined,'left')
        var GL = getStyle(greenwizard,'left')
        if(wL + 100 >= GL){
            wizarddefined.style['left'] = GL - 100 + 'px'
        }else{
            wizarddefined.style['left'] = wL + speed + 'px';
        }
    }
    function GmoveL(){
        var speed = -5
        var GL = getStyle(greenwizard,'left')
        var wL = getStyle(wizarddefined,'left')
        if(wL + 100 >= GL){
            greenwizard.style['left'] = wL + 100 + 'px'
        }else{
            greenwizard.style['left'] = GL + speed + 'px'
        }
    }
    function GmoveR(){
        var speed = 10
        var GL = getStyle(greenwizard,'left')
        if(GL >= 500){
            greenwizard.style['left'] = 500
        }else{
            greenwizard.style['left'] = GL + speed + 'px'
        }
    }
    function GmoveK(){
        var superK = -50
        var GL = getStyle(greenwizard,'left')
        var wL = getStyle(wizarddefined,'left')
        if(wL + 100 >= GL){
            greenwizard.style['left'] = wL + 100 + 'px'
        }else{
            greenwizard.style['left'] = GL + superK + 'px'
        }
    }
    function Jdgement(B){
        var wL = getStyle(wizarddefined, 'left')
        var GL = getStyle(greenwizard, 'left')
        if (GL <= wL + 101 && B == false){
            CLEar()
            alert("Greenwizard win!")
        }
    }
    function CLEar(){
        BuSet = []
        gameStart.style.display = "block"
        WGame.style.display = "none"
        Wstatus = true
        Gstatus = true
        GLife = 60
        Hit = true
        Shoot = true
        Punch = true
        greenwizard.style['left'] = 400 + 'px'
        wizarddefined.style['left'] = 100 + 'px'
        GW.src = "sources/greenwizard.gif"
        WD.src = "sources/wizarddefined.gif"
    }














}
