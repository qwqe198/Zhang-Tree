addLayer("m", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: `M`, // 这是节点上显示的字母
    position: 2, // 节点顺序
    startData() {
        return {
            unlocked: true, //是否开始就解锁
            points: new ExpantaNum(0),
 t: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("10^^5.116") },
    color: "#b03192",
    resource: "元胀质", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {

        return 0
    },
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
    layerShown() { return hasMilestone("am", 43)  },
    row: 3, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排

    effectDescription() { return `基于时间,点获取指数塔+${format(this.effect())},需要F5.116点数 ` },
    effect() {
        var g = layers.m.effect1().mul(layers.m.effect2()).log10().div(10000)
if(player.m.points.lt(1))g=n(0)
        return g.max(0)

    },
 effect1() {
        var g = player.m.t.add(1)
g=g.pow(buyableEffect("m",11))
        return g.max(1)

    },
 effect2() {
        var g = player.m.points.add(1)

        return g.max(1)

    },
tgain() {
        var g = n(1)
g=g.mul(buyableEffect("m",12))
        return g.max(1)

    },
    getResetGain() {
       var g=player.points.add(10).slog().sub(4.116)
g=g.mul(buyableEffect("m",13))
if (hasUpgrade("am", 51)) g = g.mul(upgradeEffect("am", 51))
if (hasMilestone("am",49))g=g.mul(getBuyableAmount("am", 34).add(1))
if (hasMilestone("am",51))g=g.mul(challengeEffect("am", 12).add(1))
g=g.pow(buyableEffect("m",14))
     if(player.points.lt("10^^5.116"))g=n(0)
        return g.floor()
    },
    update(diff) {
 if(player.m.points.gte(1))player.m.t = player.m.t.add(this.tgain().mul(diff))

    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = four.pow((expRoot(x.add(10), 0.5)).sub(10)).mul(100)
                return g
            },
            display() { return `指数增福时间在公式中的效果.<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元胀质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "元空间升级"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g = x.add(1).root(3)
      
                return g
            },
            unlocked() { return true },
        },
   12: {
            cost(x = getBuyableAmount('m', this.id)) {
                return two.pow(x.pow(1.25)).mul(317.49)
            },
            effect(x = getBuyableAmount('m', this.id)) {
                return player.m.t.add(1).log10().add(1).pow(x.add(1).root(1.6).sub(1).mul(2.22))
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title() {
                return "时间浓缩"
            },
           
            display() {
                return `时间增幅时间.<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元胀质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            buy() {
                
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        
            unlocked() { return true },
           
        },
        13: {
            cost(x = getBuyableAmount('m', this.id)) {
                return two.pow(x.add(1).pow(1.33).sub(1)).mul(10)
            },
            effect(x = getBuyableAmount('m', this.id)) {
        
                x = player.m.points.add(10).log10().pow(x.add(1).root(1.75).sub(1))
              
                return x
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title() {
                return "元胀质浓缩"
            },

            display() {
                return `元胀质增幅元胀质.<br />x${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元胀质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            buy() {
    
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return true },
          

        },
        14: {
            cost(x = getBuyableAmount('m', this.id)) {
                return two.pow((expRoot(x.add(10), 0.5)).sub(10)).mul(1000)
            },
            effect(x = getBuyableAmount('m', this.id)) {
               
                var eff = x.mul(1.5).add(1).root(5)
              
                return eff
            },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            title() {
                return "元胀质增幅器"
            },
          
            display() {
                return `增幅元胀质获取.<br />^${format(buyableEffect(this.layer, this.id), 2)}.(下一级: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})<br />费用:${format(this.cost(getBuyableAmount(this.layer, this.id)))}元胀质<br>等级:${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return true },
           
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
   doReset(layer) {
        player.m.t = n(0)
    },
hotkeys: [
        { key: "m", description: "m: 进行元胀质重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
})