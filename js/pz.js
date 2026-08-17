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
if(player.p.points.lt("1e631"))g=n(0)
        return g.floor()
    },
   getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
  zdzgain() {
        let g = player.pz.points.add(2)
if(hasUpgrade("pz",21))g=g.pow(10)
if(hasUpgrade("pz",22))g=g.pow(10)
if(hasUpgrade("pz",23))g=g.pow(10)
if(hasUpgrade("pz",24))g=g.pow(10)
if(hasUpgrade("pz",25))g=g.pow(10)
if(!hasUpgrade("pz", 15))g=n(0)
        return g
    },
  zdzeff() {
        let g = player.pz.zdz.add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).log10().add(1).pow(66686).sub(1.5).max(0)
if(hasMilestone("pz",1))g=g.pow(2)
if(hasMilestone("pz",2))g=g.pow(2)
if(hasMilestone("pz",3))g=g.pow(2)
if(hasMilestone("pz",4))g=g.pow(2)
if(hasMilestone("pz",5))g=g.pow(2)
        return g
    },
    effectDescription() {
        return `
 <br>
你有${format(player.pz.zdz)}自动胀(+${format(layers.pz.zdzgain())}/s)(需胀升级15),每秒获取${format(this.zdzeff())}x的声望
        `},
    row: 2, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return hasUpgrade("p", 25)||player.pz.points.gte(1)||hasUpgrade("pz", 11) },
milestones: {
    1: {
        requirementDescription: "1e675声望",
        effectDescription: "自动胀效果^2",
        done() { return player.p.points.gte("1e675") }
    },
  2: {
        requirementDescription: "1e691声望",
        effectDescription: "自动胀效果^2",
        done() { return player.p.points.gte("1e691") }
    },
3: {
        requirementDescription: "1e727声望",
        effectDescription: "自动胀效果^2",
        done() { return player.p.points.gte("1e727") }
    },
4: {
        requirementDescription: "1e783声望",
        effectDescription: "自动胀效果^2",
        done() { return player.p.points.gte("1e783") }
    },
5: {
        requirementDescription: "1e812声望",
        effectDescription: "自动胀效果^2",
        done() { return player.p.points.gte("1e812") }
    },
6: {
        requirementDescription: "1e1000声望获取",
        effectDescription: "声望获取二重软上限，超过部分获取为lgx*1e997",
        done() { return player.p.points.gte("1e1000") }
    },
},
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
    },
  update(diff) {
player.pz.zdz =  player.pz.zdz.add(this.zdzgain().mul(diff))
        },
})