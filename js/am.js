addLayer("am", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "AM", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            zwz: new ExpantaNum(0),
bz: new ExpantaNum(1),
        }
    },
    color: "yellow",
    resource: "胀物质基础", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires() { return "1e308" },
    exponent: 1,
    baseAmount() { return player.pz.points },//基础资源数量
    baseResource: "膨胀点",//基础资源名称
    gainMult() { // 资源获取数量倍率
        g = new ExpantaNum(1)
  
        return g
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var g = new ExpantaNum(1)
        return g
    },
    getResetGain() {
        var g = player.pz.points.log10().add(9999999692).log10().log10()
g=g.mul(layers.am.wdtseff())
        if (player.pz.points.lt("1e308")) g = n(0)
        return g.floor()
    },
    getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
 bzgain() {
        let g = player.am.bz.max(0)
if(hasMilestone("am", 12))g=g.mul(layers.am.zwzeff())
if(hasMilestone("am", 13))g=g.mul(player.am.points.add(1))
if(hasMilestone("am", 15))g=g.mul(player.p.points.log10().add(10))
if(hasMilestone("am", 16))g=g.mul(player.pz.points.log10().add(10))
        return g.pow(n(1).sub(n(1).div(layers.am.bzexp()))).max(0)
    },
bzexp() {
      var g = player.pz.points.log10().div(308)
if(g.gte(1.44))g=g.root(2).mul(1.2)
        if (player.pz.points.lt("1e308")) g = n(1)
        return g.max(1)
    },
    zwzgain() {
        let g = player.am.points
        if(hasMilestone("am", 11))g=g.mul(layers.am.zwzeff())
 if(hasUpgrade("am",11))g=g.mul(upgradeEffect("am",11))
     g=g.mul(buyableEffect("am",11))
g=g.mul(buyableEffect("am",12))
g=g.mul(buyableEffect("am",13))
g=g.mul(buyableEffect("am",14))
if(hasUpgrade("am",25))g=g.pow(upgradeEffect("am",25))
        return g.max(0)
    },
    zwzeff() {
        let g = player.am.zwz.add(10).log10()
           if(hasUpgrade("am",13))g=g.pow(upgradeEffect("am",13))
        return g
    },
zwzbuyx() {
        let g = n(2)
     
        return g.max(1)
    },
wdtsbase() {
        let g = n(2)
     
        return g.max(1)
    },
wdtseff() {
        let g = layers.am.wdtsbase().pow(getBuyableAmount(this.layer, 32))
     
        return g.max(1)
    },
zwzjsbase() {
        let g = n(1.08)
     
        return g.max(1)
    },
zwzjseff() {
        let g = layers.am.zwzjsbase().pow(getBuyableAmount(this.layer, 31))
     
        return g.max(1)
    },
    effectDescription() {
        return `
 <br>
胀物质基础需要1e308膨胀点
 <br>
你有${format(player.am.zwz)}胀物质(+${format(layers.am.zwzgain())}/s),加成先前资源x${format(this.zwzeff())}
        `},
    row: 3, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return hasMilestone("pz", 19) || player.am.points.gte(1) || hasMilestone("am", 1) },

    milestones: {
        1: {
            requirementDescription: "1. 1胀物质基础",
            effectDescription: "你可以基于胀物质基础获得胀物质,它加成点,声望,膨胀点获取,保留4个挑战胀分数,修改胀里程碑8公式",
            done() { return player.am.points.gte("1") }
        },
 2: {
            requirementDescription: "2. 2胀物质基础",
            effectDescription: "解锁第一胀维度,胀物质加成点胀获取",
            done() { return player.am.points.gte("2") }
        },
 3: {
            requirementDescription: "3. 3胀物质基础",
            effectDescription: "解锁第二胀维度,胀物质加成声望胀获取",
            done() { return player.am.points.gte("3") }
        },
4: {
            requirementDescription: "4. 4胀物质基础",
            effectDescription: "解锁第三胀维度,胀物质加成子资源胀获取",
            done() { return player.am.points.gte("4") }
        },
5: {
            requirementDescription: "5. 5胀物质基础",
            effectDescription: "解锁第四胀维度,胀物质加成自动胀获取",
            done() { return player.am.points.gte("5") }
        },
6: {
            requirementDescription: "6. 6胀物质基础",
            effectDescription: "解锁计时频率,自动购买膨胀点升级",
            done() { return player.am.points.gte("6") }
        },
7: {
            requirementDescription: "7. 7胀物质基础",
            effectDescription: "自动获得胀购买胀1",
            done() { return player.am.points.gte("7") }
        },
8: {
            requirementDescription: "8. 8胀物质基础",
            effectDescription: "自动获得胀购买胀2",
            done() { return player.am.points.gte("8") }
        },
9: {
            requirementDescription: "9. 9胀物质基础",
            effectDescription: "自动获得胀购买胀3",
            done() { return player.am.points.gte("9") }
        },
10: {
            requirementDescription: "10. 10胀物质基础",
            effectDescription: "解锁暴胀,暴胀指数基于1e308后的膨胀点增加",
            done() { return player.am.points.gte("10") }
        },
11: {
            requirementDescription: "11. 1e340膨胀点",
            effectDescription: "胀物质加成它本身获取",
            done() { return player.pz.points.gte("1e340") }
        },
12: {
            requirementDescription: "12. 2.5e8胀物质",
            effectDescription: "胀物质效果加成暴胀获取(提示:所有加成暴胀获取在暴胀指数之前生效)",
            done() { return player.am.zwz.gte("2.5e8") }
        },
13: {
            requirementDescription: "13. 1e9胀物质",
            effectDescription: "(胀物质基础+1)加成暴胀获取",
            done() { return player.am.zwz.gte("1e9") }
        },
14: {
            requirementDescription: "14.ee11自动胀",
            effectDescription: "弱化声望获取的软上限(这相当于声望获取1e1000之后的部分平方)",
            done() { return player.pz.zdz.gte("ee11") }
        },
15: {
            requirementDescription: "15.e1044声望",
            effectDescription: "lg(声望+10)加成暴胀获取",
            done() { return player.p.points.gte("e1044") }
        },
16: {
            requirementDescription: "16.e360膨胀点",
            effectDescription: "lg(膨胀点+10)加成暴胀获取",
            done() { return player.pz.points.gte("e360") }
        },
17: {
            requirementDescription: "17.e12胀物质",
            effectDescription: "解锁维度提升",
            done() { return player.am.zwz.gte("e12") }
        },
18: {
            requirementDescription: "18.1维度提升",
            effectDescription: "解锁第五胀物质维度,每秒获得100%的膨胀点",
            done() { return  getBuyableAmount(this.layer, 32).gte(1) }
        },
    },
 
    
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
 buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(3).add(1)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第一胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return hasMilestone("am", 2) },
        },
 12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(4).add(2)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第二胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return hasMilestone("am", 3) },
        },
13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(5).add(4)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第三胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return hasMilestone("am", 4) },
        },
14: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(6).add(6)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第四胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return hasMilestone("am", 5) },
        },
21: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(8).add(9)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第五胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return getBuyableAmount(this.layer, 32).gte(1) },
        },
22: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(10).add(13)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第六胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return getBuyableAmount(this.layer, 32).gte(2) },
        },
23: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(12).add(18)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第七胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return getBuyableAmount(this.layer, 32).gte(3) },
        },
24: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.mul(15).add(24)).floor()

                return g
            },
            display() { return `胀物质获取<br />x${format(buyableEffect(this.layer, this.id), 2)}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "第八胀维度"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzbuyx()).pow(x).floor()
g=g.mul(layers.am.zwzjseff())
g=g.mul(layers.am.wdtseff())
                return g
            },
            unlocked() { return getBuyableAmount(this.layer, 32).gte(4) },
        },
31: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.add(3)).floor()

                return g
            },
            display() { return `所有胀维度效果<br />x${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "计时频率"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.zwzjsbase()).pow(x)

                return g
            },
            unlocked() { return hasMilestone("am", 6) },
        },
32: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(2)
if(getBuyableAmount(this.layer, 32).gte(4))g=x.mul(2).sub(4)
                return g
            },
            display() { return `所有胀维度效果和胀物质基础获取<br />x${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}最后解锁的胀维度<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return getBuyableAmount(this.layer, 32).gte(4)?getBuyableAmount(this.layer, 24).gte(this.cost()):getBuyableAmount(this.layer, 32).gte(3)?getBuyableAmount(this.layer, 23).gte(this.cost()):getBuyableAmount(this.layer, 32).gte(2)?getBuyableAmount(this.layer, 22).gte(this.cost()):getBuyableAmount(this.layer, 32).gte(1)?getBuyableAmount(this.layer, 21).gte(this.cost()):getBuyableAmount(this.layer, 14).gte(this.cost()) },
            buy() {
setBuyableAmount(this.layer, 11, n(0))
setBuyableAmount(this.layer, 12, n(0))
setBuyableAmount(this.layer, 13, n(0))
setBuyableAmount(this.layer, 14, n(0))
setBuyableAmount(this.layer, 21, n(0))
setBuyableAmount(this.layer, 22, n(0))
setBuyableAmount(this.layer, 23, n(0))
setBuyableAmount(this.layer, 24, n(0))
setBuyableAmount(this.layer, 31, n(0))
player.am.zwz=n(0)
player.am.points=n(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "维度提升"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  n(layers.am.wdtsbase()).pow(x)

                return g
            },
            unlocked() { return hasMilestone("am", 17) },
        },
    },
upgrades: {
        11: {
            description: `暴胀增加胀物质获取.`,
            effect() {
                var g = player.am.bz.add(10).log10()
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(100),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
12: {
            description: `暴胀增加膨胀点获取.`,
            effect() {
                var g = player.am.bz.add(10).log10()
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(1e3),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
        13: {
            description: `暴胀增加子资源胀,自动胀,胀物质效果.`,
            effect() {
                var g = player.am.bz.add(10).log10().add(10).log10()
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(3e3),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
14: {
            description: `暴胀增加胀挑战胀4分数获取.`,
            effect() {
                var g = player.am.bz.add(10).log10()
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(1e4),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
15: {
            description: `p升级11效果以log10的倍率对指数生效.`,
            effect() {
                var g = upgradeEffect("p",11).add(10).log10()
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e5),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
21: {
            description: `点胀效果以log10的倍率对指数生效.`,
            effect() {
                var g = layers.p.dzeff().add(10).log10()
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e6),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
22: {
            description: `子资源胀效果以log10的倍率对指数生效(对的，声望点膨胀了).`,
            effect() {
                var g = layers.p.zzyzeff().add(10).log10()
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(3e6),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
23: {
            description: `p升级11效果等于点胀，所有这个升级的加成失效.`,

            cost: n(1e7),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
24: {
            description: `自动胀效果指数^2.`,
        
            cost: n(1e8),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 25: {
            description: `暴胀增加胀物质获取.`,
            effect() {
                var g = player.am.bz.add(10).log10().add(10).log10().pow(0.5)
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(3e9),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
    },
    tabFormat: {

        "暴胀": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
["display-text", () =>
                    `你有${format(player.am.bz)}暴胀(+${format(layers.am.bzgain())}/s)`,

                    { "font-size": "20px" }
                ],
["display-text", () =>
`暴胀指数${format(layers.am.bzexp())},增加暴胀获取`,
                    { "font-size": "20px" }
                ],
"clickables",

                "upgrades",
            ],
            unlocked() { return hasMilestone("am", 10) }
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
"胀维度": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
["display-text", () =>
                    `每次购买乘数:${format(layers.am.zwzbuyx())}`,
                    { "font-size": "20px" }
                ],

"clickables",
                "buyables",

            ],
            unlocked() { return hasMilestone("am", 2) }
        },

    },
update(diff) {
        player.am.zwz = player.am.zwz.add(this.zwzgain().mul(diff))
if(hasMilestone("am", 10))player.am.bz = player.am.bz.add(this.bzgain().mul(diff)).max(1)
    },
hotkeys: [
        { key: "a", description: "a: 进行胀物质基础重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
})