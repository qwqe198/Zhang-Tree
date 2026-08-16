var uNode = { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "P", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
        }
    },
    color: "green",
    resource: "声望点", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires() { return 1 },
    exponent: 1,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点数",//基础资源名称
    gainMult() { // 资源获取数量倍率
        mult = new ExpantaNum(1)

        return mult
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var exp = new ExpantaNum(1)
        return exp
    },
   getResetGain() {
        var m = player.points.add(9999999999).log10().log10()
if(hasUpgrade("u",21))m=m.pow(2)
if(hasUpgrade("u",22))m=m.pow(2)
if(hasUpgrade("u",23))m=m.pow(2)
if(hasUpgrade("u",24))m=m.pow(2)
if(hasUpgrade("u",25))m=m.pow(2)
        return m.floor()
    },
   getNextAt() {
        let gain = n(10).pow(n(10).pow(this.getResetGain()))

        return gain
    },
    effectDescription() {
        return `

        `},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return true },

    upgrades: {
        11: {
            description: `点数获取基于声望点增加.`,
            effect() {
                var eff = player.u.points.add(1)
if(hasUpgrade("u",12))eff=eff.pow(2)
if(hasUpgrade("u",13))eff=eff.pow(2)
if(hasUpgrade("u",14))eff=eff.pow(2)
if(hasUpgrade("u",15))eff=eff.pow(2)
                return eff
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1),
        },
   12: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 11) },
            cost: n(5),
        },
 13: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 12) },
            cost: n(25),
        },
14: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 13) },
            cost: n(500),
        },
15: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 14) },
            cost: n(2500),
        },
21: {
            description: `声望点获取平方.`,
           unlocked() { return hasUpgrade("u", 15) },
            cost: n(10000),
        },
22: {
            description: `声望点获取平方.`,
           unlocked() { return hasUpgrade("u", 21) },
            cost: n(1000000),
        },
23: {
            description: `声望点获取平方.`,
           unlocked() { return hasUpgrade("u", 22) },
            cost: n(1e+11),
        },
24: {
            description: `声望点获取平方.`,
           unlocked() { return hasUpgrade("u", 23) },
            cost: n(1e+22),
        },
25: {
            description: `声望点获取平方.`,
           unlocked() { return hasUpgrade("u", 24) },
            cost: n(1e+48),
        },
    },
}

addLayer("u", uNode)
