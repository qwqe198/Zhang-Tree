addLayer("am", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "AM", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
            zwz: new ExpantaNum(0),

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

        if (player.pz.points.lt("1e308")) g = n(0)
        return g.floor()
    },
    getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
    zwzgain() {
        let g = player.am.points
     g=g.mul(buyableEffect("am",11))
g=g.mul(buyableEffect("am",12))
g=g.mul(buyableEffect("am",13))
g=g.mul(buyableEffect("am",14))
        return g.max(0)
    },
    zwzeff() {
        let g = player.am.zwz.add(10).log10()
       
        return g
    },
zwzbuyx() {
        let g = n(2)
     
        return g.max(0)
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
            effectDescription: "你可以基于胀物质基础获得胀物质,它加成点,声望,膨胀点获取,保留胀的挑战胀分数里程碑和4个挑战胀各1分数,修改胀里程碑8公式",
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
    },
 
    update(diff) {
        player.am.zwz = player.am.zwz.add(this.zwzgain().mul(diff))
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

                return g
            },
            unlocked() { return hasMilestone("am", 5) },
        },
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
     "挑战": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",
                "challenges",

            ],
            unlocked() { return true }
        },
    },
hotkeys: [
        { key: "a", description: "a: 进行胀物质基础重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
})