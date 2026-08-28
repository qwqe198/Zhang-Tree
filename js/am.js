addLayer("am", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "AM", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            zwz: new ExpantaNum(0),
bz: new ExpantaNum(1),
bzexpmax: new ExpantaNum(1),
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
        var g = n(1)
g=g.mul(layers.am.wdtseff())
if (hasUpgrade("am", 43)) g = g.mul(upgradeEffect("am", 43))
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
if (hasMilestone("am",28)) g = g.mul(challengeEffect("am", 11).add(1))
g=g.mul(buyableEffect("am",33))
        return g.pow(n(1).sub(n(1).div(layers.am.bzexp()))).max(0)
    },
bzexp() {
    if (hasMilestone("am",35)) {
        return player.am.bzexpmax || n(1)
    }
    return this.bzexpRaw().max(1)
},
bzexpRaw() {
    var g = player.pz.points.add(10).log10().div(308).max(1)
    if (hasMilestone("am",32)) g = g.mul(g.add(10).log10())
    if (hasUpgrade("am",42)) g = g.mul(upgradeEffect("am",42))
    if (g.gte(2)) g = g.root(2).mul(n(2).root(2))
    else if (g.gte(1.5) && !hasUpgrade("am",42)) g = g.root(2).mul(n(1.5).root(2))
    return g
},
    zwzgain() {
        let g = player.am.points
g=g.mul(layers.am.zwzwdgain())
g=g.mul(layers.am.zwzfwdgain())
        return g.max(0)
    },
zwzwdgain() {
        let g = n(1)
     g=g.mul(buyableEffect("am",11))
g=g.mul(buyableEffect("am",12))
g=g.mul(buyableEffect("am",13))
g=g.mul(buyableEffect("am",14))
 g=g.mul(buyableEffect("am",21))
g=g.mul(buyableEffect("am",22))
g=g.mul(buyableEffect("am",23))
g=g.mul(buyableEffect("am",24))
        return g.max(0)
    },
zwzfwdgain() {
        let g = n(1)
       if(hasMilestone("am", 11))g=g.mul(layers.am.zwzeff())
 if(hasUpgrade("am",11))g=g.mul(upgradeEffect("am",11))
if(hasUpgrade("am",41))g=g.mul(upgradeEffect("am",41))
if (hasMilestone("am",28)) g = g.mul(challengeEffect("am", 11).add(1))
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
     g=g.add(buyableEffect("am",34))
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
            effectDescription: "解锁第一胀维度,胀物质加成点胀获取,你可以最大购买p购买胀1,初始就生效胀里程碑9",
            done() { return player.am.points.gte("2") }
        },
 3: {
            requirementDescription: "3. 3胀物质基础",
            effectDescription: "解锁第二胀维度,胀物质加成声望胀获取,你可以最大购买胀购买胀1",
            done() { return player.am.points.gte("3") }
        },
4: {
            requirementDescription: "4. 4胀物质基础",
            effectDescription: "解锁第三胀维度,胀物质加成子资源胀获取,你可以最大购买胀购买胀2",
            done() { return player.am.points.gte("4") }
        },
5: {
            requirementDescription: "5. 5胀物质基础",
            effectDescription: "解锁第四胀维度,胀物质加成自动胀获取,你可以最大购买胀购买胀3",
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
            requirementDescription: "14. ee11自动胀",
            effectDescription: "弱化声望获取的软上限(这相当于声望获取1e1000之后的部分平方)",
            done() { return player.pz.zdz.gte("ee11") }
        },
15: {
            requirementDescription: "15. e1044声望",
            effectDescription: "lg(声望+10)加成暴胀获取",
            done() { return player.p.points.gte("e1044") }
        },
16: {
            requirementDescription: "16. e360膨胀点",
            effectDescription: "lg(膨胀点+10)加成暴胀获取",
            done() { return player.pz.points.gte("e360") }
        },
17: {
            requirementDescription: "17. e12胀物质",
            effectDescription: "解锁维度提升",
            done() { return player.am.zwz.gte("e12") }
        },
18: {
            requirementDescription: "18. 1维度提升",
            effectDescription: "解锁第五胀物质维度,每秒获得100%的膨胀点,在AM重置中保留P升级",
            done() { return  getBuyableAmount(this.layer, 32).gte(1) }
        },
19: {
            requirementDescription: "19. 25胀物质基础",
            effectDescription: "(胀物质基础+1)加成膨胀点获取",
            done() { return  player.am.points.gte("25") }
        },
20: {
            requirementDescription: "20. 9e15胀物质",
            effectDescription: "解锁第2个p购买胀",
            done() { return player.am.zwz.gte("9e15") }
        },
21: {
            requirementDescription: "21. e690膨胀点",
            effectDescription: "p购买胀1效果^2",
            done() { return player.pz.points.gte("e690") }
        },
22: {
            requirementDescription: "22. 2维度提升",
            effectDescription: "解锁第六胀物质维度,在AM重置中保留胀里程碑",
            done() { return  getBuyableAmount(this.layer, 32).gte(2) }
        },
23: {
            requirementDescription: "23. 250胀物质基础",
            effectDescription: "升级12效果^2",
            done() { return   player.am.points.gte("250") }
        },
24: {
            requirementDescription: "24. 3维度提升",
            effectDescription: "解锁第七胀物质维度",
            done() { return  getBuyableAmount(this.layer, 32).gte(3) }
        },
25: {
            requirementDescription: "25. 1e25胀物质",
            effectDescription: "解锁AM挑战胀,但是你进去只能拿到1分数",
            done() { return player.am.zwz.gte("1e25") }
        },
26: {
            requirementDescription: "26. e860膨胀点",
            effectDescription: "移除声望获取的软上限",
            done() { return player.pz.points.gte("e860") }
        },
27: {
            requirementDescription: "27. 1e40000声望获取",
            effectDescription: "声望获取三重软上限，超过部分获取为lgx*2.5e39995",
            done() { return player.p.points.gte("1e40000") }
        },
28: {
            requirementDescription: "28. 3.14挑战胀1分数",
            effectDescription: "(AM挑战胀1分数+1)加成膨胀点,胀物质,暴胀获取",
            done() { return challengeEffect("am", 11).gte("3.14") }
        },
29: {
            requirementDescription: "29. e925膨胀点",
            effectDescription: "暴胀指数加成声望胀效果",
            done() { return player.pz.points.gte("e925") }
        },
30: {
            requirementDescription: "30. F5.1点",
            effectDescription: "点的指数塔(=slg点数=F后面的数字)加成声望胀效果",
            done() { return fpg(5.1) }
        },
31: {
            requirementDescription: "31. F5.018点&&进入AM挑战胀1",
            effectDescription: "弱化声望获取三重软上限((lgx+60000)^8000)",
            done() { return fpg(5.018)&&inChallenge("am",11) }
        },
32: {
            requirementDescription: "32. e1024膨胀点",
            effectDescription: "暴胀指数加成自身获取,但效果降低",
            done() { return player.pz.points.gte("e1024") }
        },
33: {
            requirementDescription: "33. 4维度提升",
            effectDescription: "解锁第八胀物质维度,在AM重置中保留胀升级",
            done() { return  getBuyableAmount(this.layer, 32).gte(4) }
        },
34: {
            requirementDescription: "34. 3500胀物质基础",
            effectDescription: "解锁AM挑战胀2",
            done() { return   player.am.points.gte("3500") }
        },
35: {
            requirementDescription: "35. 12000胀物质基础",
            effectDescription: "声望获取^暴胀指数,你的暴胀指数不会低于最大值",
            done() { return   player.am.points.gte("12000") }
        },
36: {
            requirementDescription: "36. 6维度提升",
            effectDescription: "解锁维度献祭",
            done() { return  getBuyableAmount(this.layer, 32).gte(6) }
        },
37: {
            requirementDescription: "37. 2221胀挑战4分数",
            effectDescription: "优化膨胀点的获取公式",
            done() { return  challengeEffect("pz", 22).gte(2221) }
        },
38: {
            requirementDescription: "38. 2.228AM挑战胀2分数",
            effectDescription: "(AM挑战胀2分数+1)加成p购买胀1,胀升级11效果指数",
            done() { return challengeEffect("am", 12).gte("2.228") }
        },
39: {
            requirementDescription: "39. e1500膨胀点",
            effectDescription: "计时频率也对膨胀点获取生效",
            done() { return player.pz.points.gte("e1500") }
        },
40: {
            requirementDescription: "40. 1e105胀物质",
            effectDescription: "降低p购买胀2的价格",
            done() { return player.am.zwz.gte("1e105") }
        },
41: {
            requirementDescription: "41. e1600膨胀点",
            effectDescription: "再次优化膨胀点的获取公式",
            done() { return  player.pz.points.gte("e1600")}
        },
42: {
            requirementDescription: "42. 3.65挑战胀1分数",
            effectDescription: "(AM挑战胀1分数+1)加成胀挑战胀4分数获取",
            done() { return challengeEffect("am", 11).gte("3.65") }
        },
43: {
            requirementDescription: "43. 1919810膨胀点&&进入AM挑战胀2",
            effectDescription: "解锁元胀质",
            done() { return player.pz.points.gte("1919810")&&inChallenge("am",12) }
        },
44: {
            requirementDescription: "44. 10元胀质",
            effectDescription: "咕咕咕",
            done() { return player.m.points.gte("10") }
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
if(getBuyableAmount(this.layer, 32).gte(1))g=g.mul(layers.am.zwzjseff())
if(getBuyableAmount(this.layer, 32).gte(1))g=g.mul(layers.am.wdtseff())
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
if(getBuyableAmount(this.layer, 32).gte(2))g=g.mul(layers.am.zwzjseff())
if(getBuyableAmount(this.layer, 32).gte(2))g=g.mul(layers.am.wdtseff())
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
if(getBuyableAmount(this.layer, 32).gte(3))g=g.mul(layers.am.zwzjseff())
if(getBuyableAmount(this.layer, 32).gte(3))g=g.mul(layers.am.wdtseff())
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
if(getBuyableAmount(this.layer, 32).gte(4))g=g.mul(layers.am.zwzjseff())
if(getBuyableAmount(this.layer, 32).gte(4))g=g.mul(layers.am.wdtseff())
g=g.mul(buyableEffect("am",33))
                return g
            },
            unlocked() { return getBuyableAmount(this.layer, 32).gte(4) },
        },
31: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.add(3)).floor()

                return g
            },
            display() { return `所有已解锁胀维度效果<br />x${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}胀物质<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
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
if(getBuyableAmount(this.layer, 32).gte(4))g=x.mul(2).sub(6)
                return g
            },
            display() { return `所有已解锁胀维度效果和胀物质基础获取<br />x${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}最后解锁的胀维度<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
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
setBuyableAmount(this.layer, 33, n(0))
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
33: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(getBuyableAmount(this.layer, this.id).add(1))

                return g
            },
            display() { return `第八胀维度效果和暴胀获取<br />x${format(buyableEffect(this.layer, this.id))}.需要: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}最高胀物质` },
            canAfford() { return player.am.zwz.gte(this.cost()) },
            buy() {
setBuyableAmount(this.layer, 11, n(0))
setBuyableAmount(this.layer, 12, n(0))
setBuyableAmount(this.layer, 13, n(0))
setBuyableAmount(this.layer, 14, n(0))
setBuyableAmount(this.layer, 21, n(0))
setBuyableAmount(this.layer, 22, n(0))
setBuyableAmount(this.layer, 23, n(0))
setBuyableAmount(this.layer, 24, n(0))
                setBuyableAmount(this.layer, this.id, player.am.zwz.max(getBuyableAmount(this.layer, this.id)))
player.am.zwz=n(0)
            },
            title() {
                return "维度献祭"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  x.add(10).log10()

                return g
            },
            unlocked() { return hasMilestone("am", 36) },
        },
34: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(x.mul(6)).add(8)
                return g
            },
            display() { return `计时频率基础和点获取指数塔<br />+${format(buyableEffect(this.layer, this.id))}.花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}维度提升<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return getBuyableAmount(this.layer, 32).gte(this.cost()) },
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
setBuyableAmount(this.layer, 32, n(0))
setBuyableAmount(this.layer, 33, n(0))
player.am.zwz=n(0)
player.am.points=n(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "胀物质星系"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g =  x.mul(0.02)

                return g
            },
            unlocked() { return hasMilestone("am", 99) },
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
if(hasMilestone("am", 23))g=g.pow(2)
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
if(g.gte(1.21))g=g.root(2).mul(1.1)
if(g.gte(1.44))g=g.root(2).mul(1.2)
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
            description: `p升级11效果等于点胀，所有这个升级的加成失效,声望获取不低于1e100`,

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
            description: `暴胀以指数增加由非胀物质维度提供的胀物质获取.`,
            effect() {
                var g = player.am.bz.add(10).log10().add(10).log10().add(10).log10().pow(3.14)
if(hasUpgrade("am",45))g=g.pow(upgradeEffect("am",45))
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(3e9),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
31: {
            description: `升级23效果2更改为1e102.`,
        
            cost: n(1e11),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
32: {
            description: `升级23效果2更改为1e632.`,
        
            cost: n(1e14),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 33: {
            description: `am挑战胀1分数加成p购买胀2效果.`,
            effect() {
                var g = challengeEffect("am", 11).add(10).log10()
if(hasUpgrade("am",44))g=g.pow(upgradeEffect("am",44))
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e17),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
34: {
            description: `削弱声望获取二重软上限(详见胀的第6个里程碑),变成lgx^(1000/3),现在可以试试拿到更多的挑战分数了.`,
        
            cost: n(1e18),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
35: {
            description: `声望胀效果以log10的倍率对指数生效.`,
            effect() {
                var g = layers.p.swzeff().add(10).log10()
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e20),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 41: {
            description: `am挑战胀1分数加成胀物质获取.`,
            effect() {
                var g = challengeEffect("am", 11).add(1)
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(1e21),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 42: {
            description: `am挑战胀2分数加成暴胀指数获取,优化暴胀指数公式.`,
            effect() {
                var g = challengeEffect("am", 12).add(10).log10()
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(1e22),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 43: {
            description: `暴胀指数加成胀物质基础获取.`,
            effect() {
                var g = layers.am.bzexp()
                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },
            cost: n(1e32),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
 44: {
            description: `am挑战胀2分数加成升级33效果.`,
            effect() {
                var g = challengeEffect("am", 12).add(1)
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e49),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
45: {
            description: `am挑战胀2分数加成升级25效果.`,
            effect() {
                var g = challengeEffect("am", 12).add(1)
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1e54),
currencyDisplayName: "暴胀",
        currencyInternalName: "bz",
        currencyLayer: "am"
        },
    },
challenges: {
        11: {
            name() { return '挑战胀1'},
            challengeDescription() { return '声望和膨胀点先指数^a再^a,基于挑战内最高膨胀点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("am",11))  g=g.max(player.pz.points.add(1).log10().pow(0.5))

 if(!inChallenge("am",11))g=g.max(player.am.challenges[11])
return g.max(challengeEffect("am", 11))
            },
            goal: 0,
 goalDescription() {
                return "更多膨胀点"
            },
            onExit() {
                player.am.challenges[11] = player.pz.points.add(1).log10().pow(0.5).max(challengeEffect("am", 11)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.pz.points },
            unlocked() { return  true }
        },
12: {
            name() { return '挑战胀2'},
            challengeDescription() { return '点获取指数塔*a,膨胀点获取^0.1a,声望胀失效,基于挑战内最高膨胀点获得分数.'},
            rewardDescription() { 
                return `分数:${format(this.rewardEffect())}`
            },
            rewardEffect() {
let g=n(0)
              if(inChallenge("am",12))  g=g.max(player.pz.points.add(1).log10().pow(0.5))

 if(!inChallenge("am",12))g=g.max(player.am.challenges[12])
return g.max(challengeEffect("am", 12))
            },
            goal: 0,
 goalDescription() {
                return "更多膨胀点"
            },
            onExit() {
                player.am.challenges[12] = player.pz.points.add(1).log10().pow(0.5).max(challengeEffect("am", 12)).max(0)
            },
            completionLimit: "1F9999",
            canComplete() { return true },
            resource() { return player.pz.points },
            unlocked() { return  hasMilestone("am",34) }
        },
    },
    tabFormat: {

   
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

"clickables",
                "buyables",
["display-text", () =>
                    `每次购买乘数:${format(layers.am.zwzbuyx())}`,
                    { "font-size": "20px" }
                ],
["display-text", () =>
                    `维度提升乘数:${format(layers.am.wdtsbase())}`,
                    { "font-size": "20px" }
                ],
["display-text", () =>
                    `计时频率基础:${format(layers.am.zwzjsbase())}`,
                    { "font-size": "20px" }
                ],
["display-text", () =>
                    `由维度提供的胀物质乘数:${format(layers.am.zwzwdgain())}`,
                    { "font-size": "20px" }
                ],
["display-text", () =>
                    `其他方面的胀物质乘数:${format(layers.am.zwzfwdgain())}`,
                    { "font-size": "20px" }
                ],
            ],
            unlocked() { return hasMilestone("am", 2) }
        },
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
"挑战": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
["display-text", () =>
                    `进入这里的挑战会使升级32失效,自动胀效果为1(a=0.66686)`,
                    { "font-size": "20px" }
                ],

"clickables",
                "challenges",

            ],
            unlocked() { return hasMilestone("am", 25) }
        },
    },
update(diff) {
        player.am.zwz = player.am.zwz.add(this.zwzgain().mul(diff))
if(hasMilestone("am", 10))player.am.bz = player.am.bz.add(this.bzgain().mul(diff)).max(1)
if (hasMilestone("am",35)) {
        var g = this.bzexpRaw() 
        if (!player.am.bzexpmax) player.am.bzexpmax = n(1)
        if (g.gt(player.am.bzexpmax)) {
            player.am.bzexpmax = g
        }
    }
    },
hotkeys: [
        { key: "a", description: "a: 进行胀物质基础重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
doReset(layer) {
        player.m.t = n(0)
    },
})