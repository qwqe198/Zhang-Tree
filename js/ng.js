addLayer("ng", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `NG`, // 这是节点上显示的字母
    position: 1, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),

        }
    },
    requires() { return new ExpantaNum("2.5e8") },
    color: "#ff5900",
    resource: "平衡胀", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {

        return 0
    },
    exponent: 1,
    baseAmount() { return player.am.points },//基础资源数量
    baseResource: "胀物质基础",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("am", 60) || player.ng.points.gte(1) || hasMilestone("ng", 1)  },
    row: 7, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

    effectDescription() { return ` ` },
    effect() {
        var g = n(1)
        return g.max(0)

    },
 getNextAt() {
        let g = n(2.5e8)

        return g
    },
    getResetGain() {
       var g=n(1)

     if(player.am.points.lt("2.5e8"))g=n(0)
        return g.floor()
    },
    update(diff) {

    },
 milestones: {
        1: {
            requirementDescription: "1. 1平衡胀",
            effectDescription: "重置时保留1挑战胀分数,声望获得公式变得更好,上层资源获取x(下层资源+1)（例如膨胀点加成声望,点数是(声望+1)），但是降低声望胀效果",
            done() { return player.ng.points.gte("1") }
        },

    },
   effectDescription() {
        return `
 <br>
下一个平衡胀需要2.5e8胀物质基础

        `},
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
  
hotkeys: [
        { key: "n", description: "n: 进行平衡胀重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
})