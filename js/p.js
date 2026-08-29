addLayer("p", { //这是代码中的节点代码 例如player.p可以调用该层级的数据 尽量使用顺手的字母什么的 不建议数字开头
    symbol: "P", // 这是节点上显示的字母
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
    color: "green",
    resource: "声望", // 重置获得的资源名称
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    requires() { return 1 },
    exponent: 1,
    baseAmount() { return player.points },//基础资源数量
    baseResource: "点",//基础资源名称
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
        g = g.mul(layers.am.zwzeff())
        if (hasUpgrade("pz", 11)) g = g.mul(upgradeEffect("pz", 11))
        if (hasUpgrade("p", 21)) g = g.pow(2)
        if (hasUpgrade("p", 22)) g = g.pow(2)
        if (hasUpgrade("p", 23)) g = g.pow(2)
        if (hasUpgrade("p", 24)) g = g.pow(2)
        if (hasUpgrade("p", 25)) g = g.pow(2)
        g = g.pow(layers.p.swzeff())
 if (hasUpgrade("am", 35)) g = expPow(g, upgradeEffect("am", 35))
if (hasMilestone("am", 35)) g = g.pow(layers.am.bzexp())
//软上限
        if (g.gte(1e100) && !hasMilestone("am", 14)) g = expRoot(g, 2).mul(1e90)
        if (g.gte(1e125) && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(1e114)
        if (g.gte(1e185) && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(3e171)
        if (g.gte(1e225) && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(1e210)
        if (g.gte(1e256) && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(1e240)
        if (g.gte(1e289) && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(1e272)
        if (g.gte("1e324") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul(1e306)
        if (g.gte("1e361") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e342")
        if (g.gte("1e400") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e380")
        if (g.gte("1e441") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e420")
        if (g.gte("1e484") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e462")
        if (g.gte("1e529") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e506")
        if (g.gte("1e625") && !hasMilestone("am", 26)) g = expRoot(g, 2).mul("1e600")
        if (g.gte("1e1000")&&!hasUpgrade("am", 34)) g = g.log10().mul("1e997")
if (g.gte("1e1000")&&hasUpgrade("am", 34)) g = g.log10().pow(1000/3)
        if (g.gte("1e40000")&&!hasMilestone("am", 31)) g = g.log10().mul("2.5e39995")
 if (g.gte("1e40000")&&hasMilestone("am", 31)) g = g.log10().add("60000").pow(8000)
//挑战
        if (inChallenge("pz", 12)) g = expPow(g, 0.75)
        if (inChallenge("pz", 21)) g = g.pow(0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.75)
        if (inChallenge("pz", 22)) g = g.pow(0.5)
        if (inChallenge("am", 11)) g = expPow(g, 0.66686)
        if (inChallenge("am", 11)) g = g.pow(0.66686)
if(inChallenge("am",21))g=g.pow(player.points.add(10).log10().div(631).min(1))
//最低获取
 if (hasUpgrade("am", 23)) g = g.max(1e100)
        if (hasUpgrade("am", 31)) g = g.max(1e102)
        if (hasUpgrade("am", 32) && !(inChallenge("am", 11) || inChallenge("am", 12) || inChallenge("am", 21) || inChallenge("am", 22))) g = g.max("e632")
        if (inChallenge("am", 11) || inChallenge("am", 12) || inChallenge("am", 21) || inChallenge("am", 22)) g = g.max(1e102)
        //每秒获取
        if (hasUpgrade("pz", 15)) g = g.mul(layers.pz.zdzeff())
       
        return g.floor()
    },
    getNextAt() {
        let g = n(10).pow(n(10).pow(this.getResetGain()))

        return g
    },
    dzgain() {
        let g = player.p.points.log10().div(10.1).mul(layers.p.zzyzeff())
        if (hasUpgrade("am", 22)) g = expPow(g, upgradeEffect("am", 22))
        g = g.add(10).log10()//这也是公式计算
        if (hasUpgrade("pz", 11)) g = g.mul(upgradeEffect("pz", 11))
        if (hasMilestone("am", 2)) g = g.mul(layers.am.zwzeff())
        if (hasUpgrade("p", 31)) g = g.pow(10)
        if (hasUpgrade("p", 32)) g = g.pow(10)
        if (hasUpgrade("p", 33)) g = g.pow(10)
        if (hasUpgrade("p", 35)) g = g.pow(10)
        if (hasUpgrade("pz", 31)) g = g.mul(10)
        if (hasUpgrade("pz", 32)) g = g.mul(10)
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
        if (player.p.points.lt(1e101)) g = n(0)
        return g
    },
    swzgain() {
        let g = player.p.points.log10().div(13).mul(layers.p.zzyzeff())
        if (hasUpgrade("am", 22)) g = expPow(g, upgradeEffect("am", 22))
        g = g.add(10).log10()//这也是公式计算
        if (hasUpgrade("pz", 11)) g = g.mul(upgradeEffect("pz", 11))
        if (hasMilestone("am", 3)) g = g.mul(layers.am.zwzeff())
        if (hasUpgrade("p", 42)) g = g.pow(10)
        if (hasUpgrade("p", 43)) g = g.pow(10)
        if (hasUpgrade("p", 44)) g = g.pow(10)
        if (hasUpgrade("p", 45)) g = g.pow(10)
        if (hasUpgrade("pz", 31)) g = g.mul(10)
        if (hasUpgrade("pz", 32)) g = g.mul(10)
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
        if (player.p.points.lt(1e130)) g = n(0)
        return g
    },
    zzyzgain() {
        let g = player.p.points.log10().div(48.5).log10()
        if (hasUpgrade("pz", 11)) g = g.mul(upgradeEffect("pz", 11))
        if (hasMilestone("am", 4)) g = g.mul(layers.am.zwzeff())
        g = g.mul(buyableEffect("p", 11))
        if (hasUpgrade("p", 51)) g = g.pow(2)
        if (hasUpgrade("p", 52)) g = g.pow(2)
        if (hasUpgrade("p", 53)) g = g.pow(10)
        if (hasUpgrade("p", 54)) g = g.pow(2)
        if (hasUpgrade("p", 55)) g = g.pow(2)
        if (hasUpgrade("pz", 31)) g = g.mul(10)
        if (hasUpgrade("pz", 32)) g = g.mul(10)
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
        if (player.p.points.lt("1e485")) g = n(0)
        return g
    },
    dzeff() {
        let g = player.p.dz.add(1).pow(player.p.dz.add(1))
        if (hasUpgrade("pz", 33)) g = expPow(g, upgradeEffect("pz", 33))
        if (hasUpgrade("pz", 53)) g = expPow(g, upgradeEffect("pz", 53))
        if (hasMilestone("pz", 13)) g = expPow(g, 5)
        if (hasMilestone("pz", 17)) g = expPow(g, 14)
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
        return g
    },
    swzeff() {
        let g = player.p.swz.add(1)
if (hasMilestone("am", 29)) g =g.pow(layers.am.bzexp())
if (hasMilestone("am", 30)) g =g.pow(player.points.add(10).slog())
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
 if (inChallenge("am", 12)) g = n(1)
if (inChallenge("am", 21)) g = n(1)
        return g
    },
    zzyzeff() {
        let g = player.p.zzyz.add(1)
        if (hasUpgrade("am", 13)) g = g.pow(upgradeEffect("am", 13))
        if (inChallenge("pz", 21)) g = expPow(g, 0.5)
        if (inChallenge("pz", 22)) g = expPow(g, 0.5)
if (inChallenge("am", 21)) g = n(1)
        return g
    },
    effectDescription() {
        return `
   <br>
你有${format(player.p.dz)}点胀(+${format(layers.p.dzgain())}/s)(需1e101声望),点获取^${format(this.dzeff())}
  <br>
你有${format(player.p.swz)}声望胀(+${format(layers.p.swzgain())}/s)(需1e130声望),声望获取^${format(this.swzeff())}
  <br>
你有${format(player.p.zzyz)}子资源胀(+${format(layers.p.zzyzgain())}/s)(需1e485声望),计算前2个资源获取公式的声望^${format(this.zzyzeff())}
        `},
    row: 1, // Row the layer is in on the tree (0 is the first row)  QwQ:1也可以当第一排
    layerShown() { return true },
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
                var g = n(10).pow(x.pow(2).add(645)).floor()
                if (hasMilestone("pz", 9)) g = n(10).pow(x.pow(2)).floor()
                return g
            },
            display() { return `子资源胀获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}声望<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                if (!hasMilestone("am", 2))setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
if (hasMilestone("am", 2))setBuyableAmount(this.layer, this.id,  player.p.points.add(1).log10().root(2).floor().add(1))
            },
            title() {
                return "p购买胀1"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(x.add(1).pow(1 / 32))
                if (hasUpgrade("pz", 34)) g = g.pow(2)
                if (hasUpgrade("pz", 35)) g = g.pow(2)
                if (hasUpgrade("pz", 42)) g = g.pow(2)
                if (hasMilestone("pz", 9)) g = g.pow(2)
                if (hasMilestone("pz", 10)) g = g.pow(2)
                if (hasMilestone("am", 21)) g = g.pow(2)
 if(hasMilestone("am", 38))g = g.pow( challengeEffect("am", 12).add(1))
                return g
            },
            unlocked() { return hasUpgrade("pz", 25) },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(10).pow(x.pow(4).add(19000)).floor()
if (hasMilestone("am",40)) g = n(10).pow(x.pow(4)).floor()
                return g
            },
            display() { return `膨胀点获取<br />x${format(buyableEffect(this.layer, this.id), 2)}. (下一个: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))}).花费: ${format(this.cost(getBuyableAmount(this.layer, this.id)))}声望<br>等级: ${format(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.p.points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title() {
                return "p购买胀2"
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var g = n(2).pow(x)
                if (hasUpgrade("am", 33)) g = g.pow(upgradeEffect("am", 33))
                return g
            },
            unlocked() { return hasMilestone("am", 20) },
        },
    },
    upgrades: {
        11: {
            description: `点获取基于声望增加.`,
            effect() {
                var g = player.p.points.add(1)
                if (hasUpgrade("pz", 12)) g = g.pow(upgradeEffect("pz", 12))
                if (hasUpgrade("p", 12)) g = g.pow(2)
                if (hasUpgrade("p", 13)) g = g.pow(2)
                if (hasUpgrade("p", 14)) g = g.pow(2)
                if (hasUpgrade("p", 15)) g = g.pow(2)
                if (hasUpgrade("p", 34)) g = expPow(g, 100)
                if (hasUpgrade("p", 41)) g = expPow(g, 3)
                if (hasUpgrade("p", 45)) g = expPow(g, 2)
                if (hasUpgrade("p", 51)) g = expPow(g, 2)
                if (hasUpgrade("p", 52)) g = expPow(g, 2)
                if (hasMilestone("pz", 7)) g = expPow(g, 1.5)
                if (hasUpgrade("pz", 33)) g = expPow(g, upgradeEffect("pz", 33))
                if (hasUpgrade("am", 23)) g = layers.p.dzeff()
                if (inChallenge("pz", 21)) g = n(1)
                if (inChallenge("pz", 22)) g = n(1)
                return g
            },
            effectDisplay() { return `^${format(this.effect())}` },
            cost: n(1),
        },
        12: {
            description: `升级11效果^2.`,
            unlocked() { return hasUpgrade("p", 11) },
            cost: n(10),
        },
        13: {
            description: `升级11效果^2.`,
            unlocked() { return hasUpgrade("p", 12) },
            cost: n(30),
        },
        14: {
            description: `升级11效果^2.`,
            unlocked() { return hasUpgrade("p", 13) },
            cost: n(150),
        },
        15: {
            description: `升级11效果^2.`,
            unlocked() { return hasUpgrade("p", 14) },
            cost: n(800),
        },
        21: {
            description: `声望获取^2.`,
            unlocked() { return hasUpgrade("p", 15) },
            cost: n(3600),
        },
        22: {
            description: `声望获取^2.`,
            unlocked() { return hasUpgrade("p", 21) },
            cost: n(1000000),
        },
        23: {
            description: `声望获取^2.`,
            unlocked() { return hasUpgrade("p", 22) },
            cost: n(1e+11),
        },
        24: {
            description: `声望获取^2.`,
            unlocked() { return hasUpgrade("p", 23) },
            cost: n(1e+22),
        },
        25: {
            description: `声望获取^2.`,
            unlocked() { return hasUpgrade("p", 24) },
            cost: n(1e+48),
        },
        31: {
            description: `点胀获取^10(提示:声望超过1e100有很弱的软上限).`,
            unlocked() { return hasUpgrade("p", 25) },
            cost: n(3e101),
        },
        32: {
            description: `点胀获取^10.`,
            unlocked() { return hasUpgrade("p", 31) },
            cost: n(6e101),
        },
        33: {
            description: `点胀获取^10.`,
            unlocked() { return hasUpgrade("p", 32) },
            cost: n(9e101),
        },
        34: {
            description: `升级11效果指数^100.`,
            unlocked() { return hasUpgrade("p", 33) },
            cost: n(1e127),
        },
        35: {
            description: `点胀获取^10.`,
            unlocked() { return hasUpgrade("p", 34) },
            cost: n(1e130),
        },
        41: {
            description: `升级11效果指数^3.`,
            unlocked() { return hasUpgrade("p", 35) },
            cost: n(1e160),
        },
        42: {
            description: `声望胀获取^10.`,
            unlocked() { return hasUpgrade("p", 41) },
            cost: n(1e173),
        },
        43: {
            description: `声望胀获取^10.`,
            unlocked() { return hasUpgrade("p", 42) },
            cost: n(1e185),
        },
        44: {
            description: `声望胀获取^10.`,
            unlocked() { return hasUpgrade("p", 43) },
            cost: n(1e228),
        },
        45: {
            description: `声望胀获取^10,升级11效果指数^2.`,
            unlocked() { return hasUpgrade("p", 44) },
            cost: n("1e331"),
        },
        51: {
            description: `子资源胀获取^2,升级11效果指数^2.`,
            unlocked() { return hasUpgrade("p", 45) },
            cost: n("1e545"),
        },
        52: {
            description: `子资源胀获取^2,升级11效果指数^2.`,
            unlocked() { return hasUpgrade("p", 51) },
            cost: n("1e548"),
        },
        53: {
            description: `子资源胀获取^10.`,
            unlocked() { return hasUpgrade("p", 52) },
            cost: n("1e550"),
        },
        54: {
            description: `子资源胀获取^2.`,
            unlocked() { return hasUpgrade("p", 53) },
            cost: n("1e565"),
        },
        55: {
            description: `子资源胀获取^2,解锁新层级.`,
            unlocked() { return hasUpgrade("p", 54) },
            cost: n("1e625"),
        },
    },
    autoUpgrade() { return hasUpgrade("pz", 13) },
    passiveGeneration() {
        if (hasUpgrade("pz", 15)) return 1
        return 0
    },
    update(diff) {
        if (hasMilestone("pz", 11)) setBuyableAmount(this.layer, 11, player.p.points.add(1).log10().root(2).floor().add(1))
if (hasMilestone("am", 44)) setBuyableAmount(this.layer, 12, player.p.points.add(1).log10().root(4).floor().add(1))
        player.p.dz = player.p.dz.add(this.dzgain().mul(diff))
        player.p.swz = player.p.swz.add(this.swzgain().mul(diff))
        player.p.zzyz = player.p.zzyz.add(this.zzyzgain().mul(diff))
    },
    hotkeys: [
        { key: "p", description: "p: 进行声望重置", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]

            if (hasMilestone("am", 18)) {
                kept.push("upgrades")
            }
            layerDataReset(this.layer, kept)
        }
    },
})
