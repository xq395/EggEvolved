// 棋子类
class Piece {
    constructor(player, h, v, d) {
        this.player = player; // 0为白方，1为黑方
        this.h = h;           // 横向等级
        this.v = v;           // 纵向等级
        this.d = d;           // 斜向等级
        this.isHuman = (h === 3 && v === 3 && d === 2);
    }

    // 判断是否为飞行生物
    isFlying() {
        return (this.h === 1 && this.v === 1 && this.d >= 1 && !this.isHuman);
    }

    // 获取棋子名称
    getName() {
        if (this.isHuman) {
            return "人类";
        }
        
        const key = `(${this.h},${this.v},${this.d})`;
        const nameMap = {
            "(1,1,0)": "蛋",
            "(2,1,0)": "鱼苗",
            "(3,1,0)": "大鱼",
            "(1,2,0)": "幼兽",
            "(1,3,0)": "猛兽",
            "(2,2,0)": "蛟",
            "(3,2,0)": "虬",
            "(2,3,0)": "螭",
            "(3,3,0)": "应龙",
            "(1,1,1)": "雏鸟",
            "(1,1,2)": "猛禽"
        };
        
        return nameMap[key] || "未知";
    }

    // 升级横向等级
    upgradeH() {
        if (!this.isFlying() && !this.isHuman && this.h < 3) {
            this.h += 1;
            this.updateHumanStatus();
        }
    }

    // 升级纵向等级
    upgradeV() {
        if (!this.isFlying() && !this.isHuman && this.v < 3) {
            this.v += 1;
            this.updateHumanStatus();
        }
    }

    // 升级斜向等级
    upgradeD() {
        if (this.d < 2) {
            this.d += 1;
            this.updateHumanStatus();
        }
    }

    // 更新人类状态
    updateHumanStatus() {
        this.isHuman = (this.h === 3 && this.v === 3 && this.d === 2);
    }

    // 转换为人类
    becomeHuman() {
        this.h = 3;
        this.v = 3;
        this.d = 2;
        this.isHuman = true;
    }

    // 克隆棋子
    clone() {
        return new Piece(this.player, this.h, this.v, this.d);
    }
}