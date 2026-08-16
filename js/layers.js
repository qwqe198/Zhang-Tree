var uNode = { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "P", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
dz: new ExpantaNum(0),
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
        g = new ExpantaNum(1)

        return g
    },
    gainExp() { // 资源获取指数加成(与exponent相乘)
        var g = new ExpantaNum(1)
        return g
    },
   getResetGain() {
        var g = player.points.add(9999999999).log10().log10()
if(hasUpgrade("u",21))g=g.pow(2)
if(hasUpgrade("u",22))g=g.pow(2)
if(hasUpgrade("u",23))g=g.pow(2)
if(hasUpgrade("u",24))g=g.pow(2)
if(hasUpgrade("u",25))g=g.pow(2)
if(g.gte(1e100))g=expRoot(g,2).mul(1e90)
if(g.gte(1e125))g=expRoot(g,2).mul(1e114)
        return g.floor()
    },
   getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
   dzgain() {
        let g = player.u.points.log10().div(10.2).log10()
if(hasUpgrade("u",31))g=g.pow(10)
if(hasUpgrade("u",32))g=g.pow(10)
if(hasUpgrade("u",33))g=g.pow(10)
if(hasUpgrade("u",35))g=g.pow(10)
if(player.u.points.lt(1e102))g=n(0)
        return g
    },
  dzeff() {
        let g = player.u.dz.add(1).pow(player.u.dz.add(1))
        return g
    },
    effectDescription() {
        return `
   <br>
你有${format(player.u.dz)}点胀(+${format(layers.u.dzgain())}/s)(需1e102声望点),点数获取^${format(this.dzeff())}
        `},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return true },

    upgrades: {
        11: {
            description: `点数获取基于声望点增加.`,
            effect() {
                var g = player.u.points.add(1)
if(hasUpgrade("u",12))g=g.pow(2)
if(hasUpgrade("u",13))g=g.pow(2)
if(hasUpgrade("u",14))g=g.pow(2)
if(hasUpgrade("u",15))g=g.pow(2)
if(hasUpgrade("u",34))g=expPow(g,100)
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1),
        },
   12: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 11) },
            cost: n(15),
        },
 13: {
            description: `升级11效果平方.`,
           unlocked() { return hasUpgrade("u", 12) },
            cost: n(75),
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
31: {
            description: `点胀获取10次方.`,
           unlocked() { return hasUpgrade("u", 25) },
            cost: n(1.5e102),
        },
32: {
            description: `点胀获取10次方.`,
           unlocked() { return hasUpgrade("u", 31) },
            cost: n(2e102),
        },
33: {
            description: `点胀获取10次方.`,
           unlocked() { return hasUpgrade("u", 32) },
            cost: n(2.5e102),
        },
34: {
            description: `升级11效果指数100次方.`,
           unlocked() { return hasUpgrade("u", 33) },
            cost: n(1e127),
        },
35: {
            description: `点胀获取10次方.`,
           unlocked() { return hasUpgrade("u", 34) },
            cost: n(1e130),
        },
    },
  update(diff) {
                player.u.dz =  player.u.dz.add(this.dzgain().mul(diff))

        },
}

addLayer("u", uNode)
