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
     
        return g.max(0)
    },
    zwzeff() {
        let g = player.am.zwz.add(10).log10()
       
        return g
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
            effectDescription: "解锁第一胀维度",
            done() { return player.am.points.gte("2") }
        },
    },
 
    update(diff) {
        player.am.zwz = player.am.zwz.add(this.zwzgain().mul(diff))
    },
 clickables: {
        11: {
            canClick() { return true },
            display() { return `手机端qol<br>长按以重置` },
            onHold() {

     
                    doReset(this.layer)
               
            }
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
"购买": {
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
"clickables",
                "buyables",

            ],
            unlocked() { return true }
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