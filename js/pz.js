addLayer("pz", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "胀", // 这是节点上显示的字母
    position: 0, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
dz: new ExpantaNum(0),
swz: new ExpantaNum(0),
zzyz: new ExpantaNum(0),
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
if(player.p.points.lt("1e631"))g=n(0)
        return g.floor()
    },
   getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
 
    effectDescription() {
        return `

        `},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return hasUpgrade("p", 25)||player.pz.points.gte(1)||hasUpgrade("pz", 11) },

    upgrades: {
        11: {
            description: `点,声望,p的3个胀获取基于膨胀点增加(效果很强).`,
            effect() {
                var g = player.pz.points.add(11).log10()


                return g
            },
            effectDisplay() { return `x${format(this.effect())}` },

            cost: n(1),
        },
12: {
            description: `p升级11效果基于膨胀点增加.`,
            effect() {
                var g = player.pz.points.add(2)


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


                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
  unlocked() { return hasUpgrade("pz", 13) },
            cost: n(1),
        },
15: {
            description: `解锁自动胀(制作中).`,
            unlocked() { return hasUpgrade("pz", 14) },
            cost: n(1),
        },
    },
  update(diff) {

        },
})