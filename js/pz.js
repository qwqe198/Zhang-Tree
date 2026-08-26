addLayer("pz", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "胀", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            zdz: new ExpantaNum(0),

        }
    },
    color: "blue",
    resource: "膨胀点", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires() { return "1e631" },
    exponent: 1,
    baseAmount() { return player.p.points },//基础资源数量
    baseResource: "声望",//基础资源名称
    gainMult() { // 资源获取数量倍率
        g = new ExpantaNum(1)
  
        return g
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var g = new ExpantaNum(1)
        return g
    },
    getResetGain() {
        var g = player.p.points.log10().div(63.1).log10()
if (hasMilestone("pz", 7)&&!hasMilestone("am",1)) g = g.mul(player.points.add(1).log10().add(1).log10().add(1).log10().root(2).div(100).max(1))
if (hasMilestone("am",1)) g = g.mul(player.points.add(10).slog().pow(player.points.add(10).slog()))
if (hasUpgrade("pz", 41)) g = g.mul(upgradeEffect("pz",41))
g=g.mul(layers.am.zwzeff())
g=g.mul(buyableEffect("pz",11))
g=g.mul(buyableEffect("pz",12))
g=g.mul(buyableEffect("pz",13))
        if(hasUpgrade("am",12))g=g.mul(upgradeEffect("am",12))
        if (hasMilestone("pz", 12))g=g.mul(buyableEffect("p",11))
if (hasMilestone("pz", 18))g=g.mul(10)
        if (player.p.points.lt("1e631")) g = n(0)
        return g.floor()
    },
    getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
    zdzgain() {
        let g = player.pz.points.add(2)
if (hasMilestone("am",5))g = g.mul(layers.am.zwzeff())
        if (hasUpgrade("pz", 21)) g = g.pow(10)
        if (hasUpgrade("pz", 22)) g = g.pow(10)
        if (hasUpgrade("pz", 23)) g = g.pow(10)
        if (hasUpgrade("pz", 24)) g = g.pow(10)
        if (hasUpgrade("pz", 25)) g = g.pow(10)
if(hasUpgrade("pz",51))g=g.pow(upgradeEffect("pz",51))
        if (!hasUpgrade("pz", 15)) g = n(0)
        return g
    },
    zdzeff() {
        let g = player.pz.zdz.add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).pow(66686).sub(0.5).max(1)
        if (hasMilestone("pz", 1)) g = g.pow(2)
        if (hasMilestone("pz", 2)) g = g.pow(2)
        if (hasMilestone("pz", 3)) g = g.pow(2)
        if (hasMilestone("pz", 4)) g = g.pow(2)
        if (hasMilestone("pz", 5)) g = g.pow(2)
                    if(hasUpgrade("am",13))g=g.pow(upgradeEffect("am",13))
        if (hasUpgrade("am", 24)) g = expPow(g, 2)
        return g
    },
    effectDescription() {
        return `
 <br>
膨胀点需要1e631声望
 <br>
你有${format(player.pz.zdz)}自动胀(+${format(layers.pz.zdzgain())}/s)(需胀升级15以生效),每秒获取${format(this.zdzeff())}x的声望
        `},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return hasUpgrade("p", 55) || player.pz.points.gte(1) || hasUpgrade("pz", 11) },
 buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x).floor()

                return g
            },
            display() { return `膨胀点获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}膨胀点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.pz.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "胀购买胀1"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(2).pow(x).floor()

                return g
            },
            unlocked() { return hasUpgrade("pz", 43) },
        },
12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x).floor()

                return g
            },
            display() { return `膨胀点获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}膨胀点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.pz.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "胀购买胀2"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(3).pow(x).floor()

                return g
            },
            unlocked() { return hasMilestone("pz", 15) },
        },
13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x).floor()

                return g
            },
            display() { return `膨胀点获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}膨胀点<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.pz.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "胀购买胀3"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(1.5).pow(x).floor()

                return g
            },
            unlocked() { return hasMilestone("pz", 16) },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1. 1e675声望",
            effectDescription: "自动胀效果^2",
            done() { return player.p.points.gte("1e675") }
        },
        2: {
            requirementDescription: "2. 1e691声望",
            effectDescription: "自动胀效果^2",
            done() { return player.p.points.gte("1e691") }
        },
        3: {
            requirementDescription: "3. 1e727声望",
            effectDescription: "自动胀效果^2",
            done() { return player.p.points.gte("1e727") }
        },
        4: {
            requirementDescription: "4. 1e783声望",
            effectDescription: "自动胀效果^2",
            done() { return player.p.points.gte("1e783") }
        },
        5: {
            requirementDescription: "5. 1e812声望",
            effectDescription: "自动胀效果^2",
            done() { return player.p.points.gte("1e812") }
        },
        6: {
            requirementDescription: "6. 1e1000声望获取",
            effectDescription: "声望获取二重软上限，超过部分获取为lgx*1e997",
            done() { return player.p.points.gte("1e1000") }
        },
7: {
            requirementDescription: "7. 1e1016声望",
            effectDescription: "p升级11效果指数^1.5",
            done() { return player.p.points.gte("1e1016") }
        },
8: {
            requirementDescription: "8. eee40000点",
           effectDescription () {  return hasMilestone("am",1)?`点加成膨胀点获取(公式:slgx^slgx)`:`点加成膨胀点获取(公式:(lg^3)x^0.5/100)`},
            done() { return player.points.gte("eee40000") }
        },
9: {
            requirementDescription: "9. 6.5挑战胀1分数",
            effectDescription: "p购买胀1效果^2,且降低它的需求",
            done() { return challengeEffect("pz", 11).gte("6.5") }
        },
10: {
            requirementDescription: "10. 1e150子资源胀",
            effectDescription: "p购买胀1效果^2",
            done() { return player.p.zzyz.gte("1e150") }
        },
11: {
            requirementDescription: "11. 3.33e333子资源胀",
            effectDescription: "自动购买p购买胀1",
            done() { return player.p.zzyz.gte("3.33e333") }
        },
12: {
            requirementDescription: "12. 9.15挑战胀1分数",
            effectDescription: "p购买胀1效果加成膨胀点获取",
            done() { return challengeEffect("pz", 11).gte("9.15") }
        },
13: {
            requirementDescription: "13. 3333333膨胀点",
            effectDescription: "点胀效果指数^5",
            done() { return player.pz.points.gte("3333333") }
        },
14: {
            requirementDescription: "14. 10.9挑战胀1分数",
            effectDescription: "升级41效果^2",
            done() { return challengeEffect("pz", 11).gte("10.9") }
        },
15: {
            requirementDescription: "15. e7000000自动胀",
            effectDescription: "解锁胀购买胀2",
            done() { return player.pz.zdz.gte("1e7000000") }
        },
16: {
            requirementDescription: "16. 1e55膨胀点",
            effectDescription: "解锁胀购买胀3",
            done() { return player.pz.points.gte("1e55") }
        },
17: {
            requirementDescription: "17. 1e265膨胀点",
            effectDescription: "点胀效果指数^14",
            done() { return player.pz.points.gte("1e265") }
        },
18: {
            requirementDescription: "18. 1e285膨胀点",
            effectDescription: "膨胀点获取x10",
            done() { return player.pz.points.gte("1e285") }
        },
19: {
            requirementDescription: "19. 1e308膨胀点",
            effectDescription: "解锁新层级",
            done() { return player.pz.points.gte("1e308") }
        },
    },
    upgrades: {
        11: {
            description: `点,声望,p的3个胀获取基于膨胀点增加(效果很强).`,
            effect() {
                var g = player.pz.points.add(11).log10()

if(hasUpgrade("pz",45))g=g.pow(2)
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },

            cost: n(1),
        },
        12: {
            description: `p升级11效果基于膨胀点增加.`,
            effect() {
                var g = player.pz.points.add(2)
if(hasUpgrade("pz",44))g=g.pow(upgradeEffect("pz",33))

                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 11) },
            cost: n(1),
        },
        13: {
            description: `自动购买p升级.`,
            unlocked() { return hasUpgrade("pz", 12) },
            cost: n(1),
        },
        14: {
            description: `点获取基于膨胀点增加.`,
            effect() {
                var g = player.pz.points.add(2)
if(hasUpgrade("pz",44))g=g.pow(upgradeEffect("pz",33))

                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 13) },
            cost: n(1),
        },
        15: {
            description: `解锁自动胀,获取随膨胀点增加.`,
            unlocked() { return hasUpgrade("pz", 14) },
            cost: n(1),
        },
        21: {
            description: `自动胀获取^10.`,
            unlocked() { return hasUpgrade("pz", 15) },
            cost: n(1),
        },
        22: {
            description: `自动胀获取^10.`,
            unlocked() { return hasUpgrade("pz", 21) },
            cost: n(1),
        },
        23: {
            description: `自动胀获取^10.`,
            unlocked() { return hasUpgrade("pz", 22) },
            cost: n(1),
        },
        24: {
            description: `自动胀获取^10.`,
            unlocked() { return hasUpgrade("pz", 23) },
            cost: n(1),
        },
        25: {
            description: `自动胀获取^10,在p解锁购买胀.`,
            unlocked() { return hasUpgrade("pz", 24) },
            cost: n(1),
        },
        31: {
            description: `p的3个胀获取最终x10.`,

            unlocked() { return hasUpgrade("pz", 25) },
            cost: n(5),
        },
        32: {
            description: `p的3个胀获取最终x10.`,

            unlocked() { return hasUpgrade("pz", 31) },
            cost: n(20),
        },
33: {
            description: `p升级11,点胀效果指数基于膨胀点增加.`,
            effect() {
                var g = player.pz.points.add(11).log10()


                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 32) },
            cost: n(50),
        },
34: {
            description: `p购买胀1效果^2`,
            unlocked() { return hasUpgrade("pz", 33) },
            cost: n(75),
        },
35: {
            description: `p购买胀1效果^2,解锁挑战胀`,
            unlocked() { return hasUpgrade("pz", 34) },
            cost: n(100),
        },
41: {
            description: `挑战胀1分数加成膨胀点获取.`,
            effect() {
                var g = challengeEffect("pz", 11).add(1).pow(0.5)
  if (hasMilestone("pz", 14)) g = g.pow(2)

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 35) },
            cost: n(125),
        },
42: {
            description: `p购买胀1效果^2`,
            unlocked() { return hasUpgrade("pz", 41) },
            cost: n(400),
        },
43: {
            description: `解锁这里的可购买胀`,
            unlocked() { return hasUpgrade("pz", 42) },
            cost: n(750),
        },
44: {
            description: `升级33加成升级12，14，但只是次方`,
            unlocked() { return hasUpgrade("pz", 43) },
            cost: n(1000000),
        },
45: {
            description: `升级11效果^2，解锁挑战胀2`,
            unlocked() { return hasUpgrade("pz", 44) },
            cost: n(100000000),
        },
51: {
            description: `挑战胀2分数加成自动胀获取.`,
            effect() {
                var g = challengeEffect("pz", 12).add(1)
 

                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 45) },
            cost: n(1e8),
        },
52: {
            description: `解锁挑战胀3`,
            unlocked() { return hasUpgrade("pz", 51) },
            cost: n(1e25),
        },
53: {
            description: `挑战胀3分数加成点胀效果指数.`,
            effect() {
                var g = challengeEffect("pz", 21).add(1)
  

                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 52) },
            cost: n(1e26),
        },
54: {
            description: `解锁挑战胀4`,
            unlocked() { return hasUpgrade("pz", 53) },
            cost: n(1e27),
        },
55: {
            description: `挑战胀2分数加成挑战胀1分数.`,
            effect() {
                var g = challengeEffect("pz", 12).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 54) },
            cost: n(1e28),
        },
16: {
            description: `挑战胀3分数加成挑战胀2分数.`,
            effect() {
                var g = challengeEffect("pz", 21).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 55) },
            cost: n(1e31),
        },
26: {
            description: `挑战胀4分数加成挑战胀3分数.`,
            effect() {
                var g = challengeEffect("pz", 22).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 16) },
            cost: n(1e35),
        },
36: {
            description: `挑战胀3分数加成挑战胀1分数.`,
            effect() {
                var g = challengeEffect("pz", 21).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 26) },
            cost: n(1e39),
        },
46: {
            description: `挑战胀4分数加成挑战胀2分数.`,
            effect() {
                var g = challengeEffect("pz", 22).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 36) },
            cost: n(1e47),
        },
56: {
            description: `挑战胀4分数加成挑战胀1分数.`,
            effect() {
                var g = challengeEffect("pz", 22).add(1)
  

                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            unlocked() { return hasUpgrade("pz", 46) },
            cost: n(1e50),
        },
    },
    update(diff) {
if (hasMilestone("am", 7)) setBuyableAmount(this.layer, 11, player.pz.points.add(1).log10().floor().add(1))
if (hasMilestone("am", 8)) setBuyableAmount(this.layer, 12, player.pz.points.add(1).log10().floor().add(1))
if (hasMilestone("am", 9)) setBuyableAmount(this.layer, 13, player.pz.points.add(1).log10().floor().add(1))
        player.pz.zdz = player.pz.zdz.add(this.zdzgain().mul(diff))
    },
 autoUpgrade() { return hasMilestone("am", 6) },
clickables: {
        11: {
            canClick() { return true },
            display() { return `手机端qol<br>长按以重置` },
            onClick() {
                doReset(this.layer)
            },
            onHold() {
                doReset(this.layer)
            }
        },
    },
  challenges: {
        11: {
            name() { return '挑战胀1'},
            challengeDescription() { return '点获取lg,基于挑战内最高声望点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("pz",11))  g=g.max(player.p.points.add(1).log10().pow(0.5))
if(hasUpgrade("pz",55))g=g.mul(challengeEffect("pz", 12))
if(hasUpgrade("pz",36))g=g.mul(challengeEffect("pz", 21))
if(hasUpgrade("pz",56))g=g.mul(challengeEffect("pz", 22))
 if(!inChallenge("pz",11))g=g.max(player.pz.challenges[11])
return g.max(challengeEffect("pz", 11))
            },
            goal: 0,
 goalDescription() {
                return "更多声望"
            },
            onExit() {
                player.pz.challenges[11] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("pz", 11)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return  hasUpgrade("pz", 35) }
        },
12: {
            name() { return '挑战胀2'},
            challengeDescription() { return '声望获取指数^0.75,基于挑战内最高声望点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("pz",12))  g=g.max(player.p.points.add(1).log10().pow(0.5))
if(hasUpgrade("pz",16))g=g.mul(challengeEffect("pz", 21))
if(hasUpgrade("pz",46))g=g.mul(challengeEffect("pz", 22))
 if(!inChallenge("pz",12))g=g.max(player.pz.challenges[12])
return g.max(challengeEffect("pz", 12))
            },
            goal: 0,
 goalDescription() {
                return "更多声望"
            },
            onExit() {
                player.pz.challenges[12] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("pz", 12)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return  hasUpgrade("pz", 45) }
        },
21: {
            name() { return '挑战胀3'},
            challengeDescription() { return 'p的3个胀获取,效果指数^0.5,声望获取^0.5,p升级11失效,基于挑战内最高声望点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("pz",21))  g=g.max(player.p.points.add(1).log10().pow(0.5))
if(hasUpgrade("pz",26))g=g.mul(challengeEffect("pz", 22))
 if(!inChallenge("pz",21))g=g.max(player.pz.challenges[21])
return g.max(challengeEffect("pz", 21))
            },
            goal: 0,
 goalDescription() {
                return "更多声望"
            },
            onExit() {
                player.pz.challenges[21] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("pz", 21)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return  hasUpgrade("pz", 52) }
        },
22: {
            name() { return '挑战胀4'},
            challengeDescription() { return '同时进行前面3个挑战胀,基于挑战内最高声望点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("pz",22))  g=g.max(player.p.points.add(1).log10().pow(0.5))
if(hasUpgrade("am",14))g=g.mul(upgradeEffect("am", 14))
 if(!inChallenge("pz",22))g=g.max(player.pz.challenges[22])
return g.max(challengeEffect("pz", 22))
            },
            goal: 0,
 goalDescription() {
                return "更多声望"
            },
            onExit() {
                player.pz.challenges[22] = player.p.points.add(1).log10().pow(0.5).max(challengeEffect("pz", 22)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.p.points },
            unlocked() { return  hasUpgrade("pz", 54) }
        },
    },
 passiveGeneration() {
        if (hasMilestone("am", 18)) return 1
        return 0
    },
    tabFormat: {

        "升级": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",

                "upgrades",
            ],
            unlocked() { return true }
        },
        "里程碑": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",
                "milestones",

            ],
            unlocked() { return true }
        },
"购买": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",
                "buyables",

            ],
            unlocked() { return hasUpgrade("pz", 43) }
        },
     "挑战": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",
                "challenges",

            ],
            unlocked() { return hasUpgrade("pz", 35) }
        },
    },
hotkeys: [
        { key: "z", description: "z: 进行膨胀点重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
 doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]

             if (hasMilestone("am", 1)) {
                kept.push("challenges")
            }
            layerDataReset(this.layer, kept)
        }
    },
})