// 游戏规则系统
class Rules {
    constructor(board) {
        this.board = board;
        this.evolutionTable = this.initEvolutionTable();
    }

    // 初始化进化表
    initEvolutionTable() {
        // 进化表：键为 (攻击者类型, 被攻击者类型)，值为进化后的棋子类型
        // 棋子类型使用 (H,V,D) 格式表示
        const table = {};
        
        // ====== 基础规则：只有蛋吃子才能提升属性 ======
        
        // 蛋的进化路径
        // 蛋吃蛋（根据方向）
        // 蛋吃蛋变鱼苗（横着）或幼兽（竖着）- 由外部处理
        
        // 蛋吃其他单位 - 变成被攻击者类型
        table["(1,1,0)-(2,1,0)"] = "(2,1,0)"; // 蛋吃鱼苗变鱼苗
        table["(1,1,0)-(1,2,0)"] = "(1,2,0)"; // 蛋吃幼兽变幼兽
        table["(1,1,0)-(3,1,0)"] = "(3,1,0)"; // 蛋吃大鱼变大鱼
        table["(1,1,0)-(1,3,0)"] = "(1,3,0)"; // 蛋吃猛兽变猛兽
        table["(1,1,0)-(2,2,0)"] = "(2,2,0)"; // 蛋吃蛟变蛟
        table["(1,1,0)-(3,2,0)"] = "(3,2,0)"; // 蛋吃虬变虬
        table["(1,1,0)-(2,3,0)"] = "(2,3,0)"; // 蛋吃螭变螭
        table["(1,1,0)-(3,3,0)"] = "(3,3,0)"; // 蛋吃应龙变应龙
        table["(1,1,0)-(1,1,1)"] = "(1,1,1)"; // 蛋吃雏鸟变雏鸟
        table["(1,1,0)-(1,1,2)"] = "(1,1,2)"; // 蛋吃猛禽变猛禽
        table["(1,1,0)-(3,3,2)"] = "(3,3,2)"; // 蛋吃人类变人类
        
        // ====== 大子吃蛋无效化 ======
        
        // 鱼苗吃蛋不变
        table["(2,1,0)-(1,1,0)"] = "(2,1,0)"; 
        // 幼兽吃蛋不变
        table["(1,2,0)-(1,1,0)"] = "(1,2,0)"; 
        // 大鱼吃蛋不变
        table["(3,1,0)-(1,1,0)"] = "(3,1,0)"; 
        // 猛兽吃蛋不变
        table["(1,3,0)-(1,1,0)"] = "(1,3,0)"; 
        // 蛟吃蛋不变
        table["(2,2,0)-(1,1,0)"] = "(2,2,0)"; 
        // 虬吃蛋不变
        table["(3,2,0)-(1,1,0)"] = "(3,2,0)"; 
        // 螭吃蛋不变
        table["(2,3,0)-(1,1,0)"] = "(2,3,0)"; 
        // 应龙吃蛋不变
        table["(3,3,0)-(1,1,0)"] = "(3,3,0)"; 
        // 雏鸟吃蛋不变
        table["(1,1,1)-(1,1,0)"] = "(1,1,1)"; 
        // 猛禽吃蛋不变
        table["(1,1,2)-(1,1,0)"] = "(1,1,2)"; 
        // 人类吃蛋不变
        table["(3,3,2)-(1,1,0)"] = "(3,3,2)"; 
        
        // ====== 大子吃大子属性融合 ======
        
        // 鱼苗的进化路径
        table["(2,1,0)-(2,1,0)"] = "(3,1,0)"; // 鱼苗吃鱼苗变大鱼
        table["(2,1,0)-(1,2,0)"] = "(2,2,0)"; // 鱼苗吃幼兽变蛟（融合属性）
        table["(2,1,0)-(3,1,0)"] = "(3,1,0)"; // 鱼苗吃大鱼不变
        table["(2,1,0)-(1,3,0)"] = "(2,3,0)"; // 鱼苗吃猛兽变螭（融合属性）
        table["(2,1,0)-(2,2,0)"] = "(2,2,0)"; // 鱼苗吃蛟不变
        table["(2,1,0)-(3,2,0)"] = "(3,2,0)"; // 鱼苗吃虬不变
        table["(2,1,0)-(2,3,0)"] = "(2,3,0)"; // 鱼苗吃螭不变
        table["(2,1,0)-(3,3,0)"] = "(3,3,0)"; // 鱼苗吃应龙不变
        table["(2,1,0)-(1,1,1)"] = "(2,1,0)"; // 鱼苗吃雏鸟不变
        table["(2,1,0)-(1,1,2)"] = "(2,1,0)"; // 鱼苗吃猛禽不变
        table["(2,1,0)-(3,3,2)"] = "(3,3,2)"; // 鱼苗吃人类变人类
        
        // 幼兽的进化路径
        table["(1,2,0)-(2,1,0)"] = "(2,2,0)"; // 幼兽吃鱼苗变蛟（融合属性）
        table["(1,2,0)-(1,2,0)"] = "(1,3,0)"; // 幼兽吃幼兽变猛兽
        table["(1,2,0)-(3,1,0)"] = "(3,2,0)"; // 幼兽吃大鱼变虬（融合属性）
        table["(1,2,0)-(1,3,0)"] = "(1,3,0)"; // 幼兽吃猛兽不变
        table["(1,2,0)-(2,2,0)"] = "(2,2,0)"; // 幼兽吃蛟不变
        table["(1,2,0)-(3,2,0)"] = "(3,2,0)"; // 幼兽吃虬不变
        table["(1,2,0)-(2,3,0)"] = "(2,3,0)"; // 幼兽吃螭不变
        table["(1,2,0)-(3,3,0)"] = "(3,3,0)"; // 幼兽吃应龙不变
        table["(1,2,0)-(1,1,1)"] = "(1,2,0)"; // 幼兽吃雏鸟不变
        table["(1,2,0)-(1,1,2)"] = "(1,2,0)"; // 幼兽吃猛禽不变
        table["(1,2,0)-(3,3,2)"] = "(3,3,2)"; // 幼兽吃人类变人类
        
        // 大鱼的进化路径
        table["(3,1,0)-(2,1,0)"] = "(3,1,0)"; // 大鱼吃鱼苗不变
        table["(3,1,0)-(1,2,0)"] = "(3,2,0)"; // 大鱼吃幼兽变虬（融合属性）
        table["(3,1,0)-(3,1,0)"] = "(3,1,0)"; // 大鱼吃大鱼不变
        table["(3,1,0)-(1,3,0)"] = "(3,3,0)"; // 大鱼吃猛兽变应龙（融合属性）
        table["(3,1,0)-(2,2,0)"] = "(3,2,0)"; // 大鱼吃蛟变虬（融合属性）
        table["(3,1,0)-(3,2,0)"] = "(3,2,0)"; // 大鱼吃虬不变
        table["(3,1,0)-(2,3,0)"] = "(3,3,0)"; // 大鱼吃螭变应龙（融合属性）
        table["(3,1,0)-(3,3,0)"] = "(3,3,0)"; // 大鱼吃应龙不变
        table["(3,1,0)-(1,1,1)"] = "(3,1,0)"; // 大鱼吃雏鸟不变
        table["(3,1,0)-(1,1,2)"] = "(3,1,0)"; // 大鱼吃猛禽不变
        table["(3,1,0)-(3,3,2)"] = "(3,3,2)"; // 大鱼吃人类变人类
        
        // 猛兽的进化路径
        table["(1,3,0)-(2,1,0)"] = "(2,3,0)"; // 猛兽吃鱼苗变螭（融合属性）
        table["(1,3,0)-(1,2,0)"] = "(1,3,0)"; // 猛兽吃幼兽不变
        table["(1,3,0)-(3,1,0)"] = "(3,3,0)"; // 猛兽吃大鱼变应龙（融合属性）
        table["(1,3,0)-(1,3,0)"] = "(1,3,0)"; // 猛兽吃猛兽不变
        table["(1,3,0)-(2,2,0)"] = "(2,3,0)"; // 猛兽吃蛟变螭（融合属性）
        table["(1,3,0)-(3,2,0)"] = "(3,3,0)"; // 猛兽吃虬变应龙（融合属性）
        table["(1,3,0)-(2,3,0)"] = "(2,3,0)"; // 猛兽吃螭不变
        table["(1,3,0)-(3,3,0)"] = "(3,3,0)"; // 猛兽吃应龙不变
        table["(1,3,0)-(1,1,1)"] = "(1,3,0)"; // 猛兽吃雏鸟不变
        table["(1,3,0)-(1,1,2)"] = "(1,3,0)"; // 猛兽吃猛禽不变
        table["(1,3,0)-(3,3,2)"] = "(3,3,2)"; // 猛兽吃人类变人类
        
        // 蛟的进化路径
        table["(2,2,0)-(2,1,0)"] = "(2,2,0)"; // 蛟吃鱼苗不变
        table["(2,2,0)-(1,2,0)"] = "(2,2,0)"; // 蛟吃幼兽不变
        table["(2,2,0)-(3,1,0)"] = "(3,2,0)"; // 蛟吃大鱼变虬（融合属性）
        table["(2,2,0)-(1,3,0)"] = "(2,3,0)"; // 蛟吃猛兽变螭（融合属性）
        table["(2,2,0)-(2,2,0)"] = "(3,3,0)"; // 蛟吃蛟变应龙（融合属性）
        table["(2,2,0)-(3,2,0)"] = "(3,2,0)"; // 蛟吃虬不变
        table["(2,2,0)-(2,3,0)"] = "(2,3,0)"; // 蛟吃螭不变
        table["(2,2,0)-(3,3,0)"] = "(3,3,0)"; // 蛟吃应龙不变
        table["(2,2,0)-(1,1,1)"] = "(2,2,0)"; // 蛟吃雏鸟不变
        table["(2,2,0)-(1,1,2)"] = "(2,2,0)"; // 蛟吃猛禽不变
        table["(2,2,0)-(3,3,2)"] = "(3,3,2)"; // 蛟吃人类变人类
        
        // 虬的进化路径
        table["(3,2,0)-(2,1,0)"] = "(3,2,0)"; // 虬吃鱼苗不变
        table["(3,2,0)-(1,2,0)"] = "(3,2,0)"; // 虬吃幼兽不变
        table["(3,2,0)-(3,1,0)"] = "(3,2,0)"; // 虬吃大鱼不变
        table["(3,2,0)-(1,3,0)"] = "(3,3,0)"; // 虬吃猛兽变应龙（融合属性）
        table["(3,2,0)-(2,2,0)"] = "(3,2,0)"; // 虬吃蛟不变
        table["(3,2,0)-(3,2,0)"] = "(3,2,0)"; // 虬吃虬不变
        table["(3,2,0)-(2,3,0)"] = "(3,3,0)"; // 虬吃螭变应龙（融合属性）
        table["(3,2,0)-(3,3,0)"] = "(3,3,0)"; // 虬吃应龙不变
        table["(3,2,0)-(1,1,1)"] = "(3,2,0)"; // 虬吃雏鸟不变
        table["(3,2,0)-(1,1,2)"] = "(3,2,0)"; // 虬吃猛禽不变
        table["(3,2,0)-(3,3,2)"] = "(3,3,2)"; // 虬吃人类变人类
        
        // 螭的进化路径
        table["(2,3,0)-(2,1,0)"] = "(2,3,0)"; // 螭吃鱼苗不变
        table["(2,3,0)-(1,2,0)"] = "(2,3,0)"; // 螭吃幼兽不变
        table["(2,3,0)-(3,1,0)"] = "(3,3,0)"; // 螭吃大鱼变应龙（融合属性）
        table["(2,3,0)-(1,3,0)"] = "(2,3,0)"; // 螭吃猛兽不变
        table["(2,3,0)-(2,2,0)"] = "(2,3,0)"; // 螭吃蛟不变
        table["(2,3,0)-(3,2,0)"] = "(3,3,0)"; // 螭吃虬变应龙（融合属性）
        table["(2,3,0)-(2,3,0)"] = "(2,3,0)"; // 螭吃螭不变
        table["(2,3,0)-(3,3,0)"] = "(3,3,0)"; // 螭吃应龙不变
        table["(2,3,0)-(1,1,1)"] = "(2,3,0)"; // 螭吃雏鸟不变
        table["(2,3,0)-(1,1,2)"] = "(2,3,0)"; // 螭吃猛禽不变
        table["(2,3,0)-(3,3,2)"] = "(3,3,2)"; // 螭吃人类变人类
        
        // 应龙的进化路径
        table["(3,3,0)-(2,1,0)"] = "(3,3,0)"; // 应龙吃鱼苗不变
        table["(3,3,0)-(1,2,0)"] = "(3,3,0)"; // 应龙吃幼兽不变
        table["(3,3,0)-(3,1,0)"] = "(3,3,0)"; // 应龙吃大鱼不变
        table["(3,3,0)-(1,3,0)"] = "(3,3,0)"; // 应龙吃猛兽不变
        table["(3,3,0)-(2,2,0)"] = "(3,3,0)"; // 应龙吃蛟不变
        table["(3,3,0)-(3,2,0)"] = "(3,3,0)"; // 应龙吃虬不变
        table["(3,3,0)-(2,3,0)"] = "(3,3,0)"; // 应龙吃螭不变
        table["(3,3,0)-(3,3,0)"] = "(3,3,0)"; // 应龙吃应龙不变
        table["(3,3,0)-(1,1,1)"] = "(3,3,0)"; // 应龙吃雏鸟不变
        table["(3,3,0)-(1,1,2)"] = "(3,3,2)"; // 应龙吃猛禽变人类
        table["(3,3,0)-(3,3,2)"] = "(3,3,2)"; // 应龙吃人类变人类
        
        // ====== 飞行单位进化路径 ======
        
        // 雏鸟的进化路径
        table["(1,1,1)-(2,1,0)"] = "(1,1,1)"; // 雏鸟吃鱼苗不变
        table["(1,1,1)-(1,2,0)"] = "(1,1,1)"; // 雏鸟吃幼兽不变
        table["(1,1,1)-(3,1,0)"] = "(1,1,1)"; // 雏鸟吃大鱼不变
        table["(1,1,1)-(1,3,0)"] = "(1,1,1)"; // 雏鸟吃猛兽不变
        table["(1,1,1)-(2,2,0)"] = "(1,1,1)"; // 雏鸟吃蛟不变
        table["(1,1,1)-(3,2,0)"] = "(1,1,1)"; // 雏鸟吃虬不变
        table["(1,1,1)-(2,3,0)"] = "(1,1,1)"; // 雏鸟吃螭不变
        table["(1,1,1)-(3,3,0)"] = "(1,1,1)"; // 雏鸟吃应龙不变
        table["(1,1,1)-(1,1,1)"] = "(1,1,2)"; // 雏鸟吃雏鸟变猛禽
        table["(1,1,1)-(1,1,2)"] = "(1,1,2)"; // 雏鸟吃猛禽变猛禽
        table["(1,1,1)-(3,3,2)"] = "(3,3,2)"; // 雏鸟吃人类变人类
        
        // 猛禽的进化路径
        table["(1,1,2)-(2,1,0)"] = "(1,1,2)"; // 猛禽吃鱼苗不变
        table["(1,1,2)-(1,2,0)"] = "(1,1,2)"; // 猛禽吃幼兽不变
        table["(1,1,2)-(3,1,0)"] = "(1,1,2)"; // 猛禽吃大鱼不变
        table["(1,1,2)-(1,3,0)"] = "(1,1,2)"; // 猛禽吃猛兽不变
        table["(1,1,2)-(2,2,0)"] = "(1,1,2)"; // 猛禽吃蛟不变
        table["(1,1,2)-(3,2,0)"] = "(1,1,2)"; // 猛禽吃虬不变
        table["(1,1,2)-(2,3,0)"] = "(1,1,2)"; // 猛禽吃螭不变
        table["(1,1,2)-(3,3,0)"] = "(3,3,2)"; // 猛禽吃应龙变人类
        table["(1,1,2)-(1,1,1)"] = "(1,1,2)"; // 猛禽吃雏鸟不变
        table["(1,1,2)-(1,1,2)"] = "(1,1,2)"; // 猛禽吃猛禽不变
        table["(1,1,2)-(3,3,2)"] = "(3,3,2)"; // 猛禽吃人类变人类
        
        // ====== 人类（最高级，不能再进化） ======
        table["(3,3,2)-(2,1,0)"] = "(3,3,2)"; // 人类吃鱼苗不变
        table["(3,3,2)-(1,2,0)"] = "(3,3,2)"; // 人类吃幼兽不变
        table["(3,3,2)-(3,1,0)"] = "(3,3,2)"; // 人类吃大鱼不变
        table["(3,3,2)-(1,3,0)"] = "(3,3,2)"; // 人类吃猛兽不变
        table["(3,3,2)-(2,2,0)"] = "(3,3,2)"; // 人类吃蛟不变
        table["(3,3,2)-(3,2,0)"] = "(3,3,2)"; // 人类吃虬不变
        table["(3,3,2)-(2,3,0)"] = "(3,3,2)"; // 人类吃螭不变
        table["(3,3,2)-(3,3,0)"] = "(3,3,2)"; // 人类吃应龙不变
        table["(3,3,2)-(1,1,1)"] = "(3,3,2)"; // 人类吃雏鸟不变
        table["(3,3,2)-(1,1,2)"] = "(3,3,2)"; // 人类吃猛禽不变
        table["(3,3,2)-(3,3,2)"] = "(3,3,2)"; // 人类吃人类不变
        
        return table;
    }

    // 获取棋子类型标识
    getPieceType(piece) {
        return `(${piece.h},${piece.v},${piece.d})`;
    }

    // 根据进化表计算进化结果
    getEvolutionResult(attacker, defender, direction = null) {
        // 人类不能再进化
        if (attacker.isHuman) {
            return null;
        }
        
        // 检查蛋吃蛋的特殊规则（根据方向）
        if (this.getPieceType(attacker) === "(1,1,0)" && this.getPieceType(defender) === "(1,1,0)") {
            if (direction === "horizontal") {
                return "(2,1,0)"; // 横着吃进化为鱼苗
            } else if (direction === "vertical") {
                return "(1,2,0)"; // 竖着吃进化为幼兽
            }
        }
        
        // 检查进化表
        const key = `${this.getPieceType(attacker)}-${this.getPieceType(defender)}`;
        if (this.evolutionTable[key]) {
            return this.evolutionTable[key];
        }
        
        // 如果没有找到匹配的进化规则，默认不变
        return this.getPieceType(attacker);
    }

    // 应用进化结果
    applyEvolution(piece, evolutionResult) {
        if (!evolutionResult) {
            return;
        }
        
        // 解析进化结果
        const match = evolutionResult.match(/\((\d),(\d),(\d)\)/);
        if (match) {
            piece.h = parseInt(match[1]);
            piece.v = parseInt(match[2]);
            piece.d = parseInt(match[3]);
            piece.isHuman = (piece.h === 3 && piece.v === 3 && piece.d === 2);
        }
    }

    // 计算棋子的可达位置
    getValidMoves(piece, row, col) {
        const moves = [];
        
        // 横向移动
        moves.push(...this.calculateDirectionMoves(piece, row, col, 0, 1));  // 右
        moves.push(...this.calculateDirectionMoves(piece, row, col, 0, -1)); // 左
        
        // 纵向移动
        moves.push(...this.calculateDirectionMoves(piece, row, col, 1, 0));  // 下
        moves.push(...this.calculateDirectionMoves(piece, row, col, -1, 0)); // 上
        
        // 斜向移动（如果有）
        if (piece.d >= 1) {
            moves.push(...this.calculateDirectionMoves(piece, row, col, 1, 1));   // 右下
            moves.push(...this.calculateDirectionMoves(piece, row, col, 1, -1));  // 左下
            moves.push(...this.calculateDirectionMoves(piece, row, col, -1, 1));  // 右上
            moves.push(...this.calculateDirectionMoves(piece, row, col, -1, -1)); // 左上
        }
        
        return moves;
    }

    // 计算单个方向的可达位置
    calculateDirectionMoves(piece, row, col, dr, dc) {
        const moves = [];
        const isDiagonal = (Math.abs(dr) === 1 && Math.abs(dc) === 1);
        const level = isDiagonal ? piece.d : (Math.abs(dc) === 1 ? piece.h : piece.v);
        
        let maxSteps;
        if (level === 1) {
            maxSteps = 1;
        } else if (level === 2) {
            maxSteps = 3;
        } else {
            maxSteps = Infinity;
        }
        
        // 特殊处理斜向移动：雏鸟(D=1)是1-3格，猛禽(D=2)是无限格
        if (isDiagonal) {
            if (level === 1) {
                maxSteps = 3;
            } else if (level === 2) {
                maxSteps = Infinity;
            }
        }
        
        let steps = 0;
        let currentRow = row + dr;
        let currentCol = col + dc;
        
        while (this.board.isValidPosition(currentRow, currentCol) && steps < maxSteps) {
            const targetPiece = this.board.getPiece(currentRow, currentCol);
            
            if (targetPiece) {
                // 遇到棋子，作为可吃子目标
                moves.push({
                    row: currentRow,
                    col: currentCol,
                    isCapture: true,
                    isFriendly: (targetPiece.player === piece.player)
                });
                break; // 遇到棋子后停止该方向
            } else {
                // 遇到空位，作为可移动目标
                moves.push({
                    row: currentRow,
                    col: currentCol,
                    isCapture: false,
                    isFriendly: false
                });
            }
            
            steps++;
            currentRow += dr;
            currentCol += dc;
        }
        
        return moves;
    }

    // 检查移动是否有效
    isValidMove(piece, fromRow, fromCol, toRow, toCol) {
        const validMoves = this.getValidMoves(piece, fromRow, fromCol);
        return validMoves.some(move => move.row === toRow && move.col === toCol);
    }

    // 执行移动
    executeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board.getPiece(fromRow, fromCol);
        if (!piece) return null;
        
        const targetPiece = this.board.getPiece(toRow, toCol);
        const isCapture = (targetPiece !== null);
        const isDiagonal = (Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1);
        const isHorizontal = (toRow === fromRow);
        const isVertical = (toCol === fromCol);
        
        // 移动棋子
        this.board.movePiece(fromRow, fromCol, toRow, toCol);
        
        // 吃子后升级
        if (isCapture) {
            // 确定吃子方向
            let direction = null;
            if (isHorizontal) {
                direction = "horizontal";
            } else if (isVertical) {
                direction = "vertical";
            }
            
            // 使用新的进化表系统
            const evolutionResult = this.getEvolutionResult(piece, targetPiece, direction);
            this.applyEvolution(piece, evolutionResult);
        }
        
        // 检查升变
        this.checkPromotion(piece, toRow);
        
        return targetPiece;
    }

    // 检查升变
    checkPromotion(piece, row) {
        // 蛋移动至对方底线时升变为人类
        if (piece.h === 1 && piece.v === 1 && piece.d === 0) {
            if ((piece.player === 0 && row === 8) || (piece.player === 1 && row === 0)) {
                piece.becomeHuman();
            }
        }
    }

    // 检查人类合成（已集成到进化表中，保留此方法以确保兼容性）
    checkHumanSynthesis(attacker, defender) {
        // 此方法已被进化表系统取代
        // 保留以确保兼容性
    }

    // 检查特殊合成条件
    canSpecialSynthesis(piece, player, specialCount) {
        if (specialCount <= 0) return false;
        if (piece.player !== player) return false;
        
        // 蛋可以合成雏鸟
        if (piece.h === 1 && piece.v === 1 && piece.d === 0) {
            return this.hasValidEggSynthesisTargets(piece);
        }
        
        // 雏鸟可以合成猛禽
        if (piece.h === 1 && piece.v === 1 && piece.d === 1) {
            return this.hasValidChickSynthesisTargets(piece);
        }
        
        return false;
    }

    // 检查蛋合成雏鸟的有效目标
    hasValidEggSynthesisTargets(egg) {
        // 需要一个横向相邻和一个纵向相邻的蛋
        const row = egg.row;
        const col = egg.col;
        
        // 检查横向相邻位置是否有蛋
        const horizontalPositions = this.board.getHorizontalPositions(row, col);
        const hasHorizontalEgg = horizontalPositions.some(([r, c]) => {
            const piece = this.board.getPiece(r, c);
            return piece && piece.h === 1 && piece.v === 1 && piece.d === 0;
        });
        
        // 检查纵向相邻位置是否有蛋
        const verticalPositions = this.board.getVerticalPositions(row, col);
        const hasVerticalEgg = verticalPositions.some(([r, c]) => {
            const piece = this.board.getPiece(r, c);
            return piece && piece.h === 1 && piece.v === 1 && piece.d === 0;
        });
        
        return hasHorizontalEgg && hasVerticalEgg;
    }

    // 检查雏鸟合成猛禽的有效目标
    hasValidChickSynthesisTargets(chick) {
        const row = chick.row;
        const col = chick.col;
        
        // 方式A：相邻的雏鸟
        const adjacentPieces = this.board.getAdjacentPositions(row, col);
        const hasAdjacentChick = adjacentPieces.some(([r, c]) => {
            const piece = this.board.getPiece(r, c);
            return piece && piece.h === 1 && piece.v === 1 && piece.d === 1;
        });
        
        if (hasAdjacentChick) return true;
        
        // 方式B：一个横向相邻和一个纵向相邻的蛋
        const horizontalTargets = this.board.getHorizontalPositions(row, col);
        const verticalTargets = this.board.getVerticalPositions(row, col);
        
        const hasHorizontalEgg = horizontalTargets.some(([r, c]) => {
            const piece = this.board.getPiece(r, c);
            return piece && piece.h === 1 && piece.v === 1 && piece.d === 0;
        });
        
        const hasVerticalEgg = verticalTargets.some(([r, c]) => {
            const piece = this.board.getPiece(r, c);
            return piece && piece.h === 1 && piece.v === 1 && piece.d === 0;
        });
        
        return hasHorizontalEgg && hasVerticalEgg;
    }

    // 执行蛋到雏鸟的合成
    executeEggToChickSynthesis(egg, targets) {
        if (targets.length !== 2) return false;
        
        // 移除消耗的棋子
        for (const [row, col] of targets) {
            this.board.removePiece(row, col);
        }
        
        // 升级为雏鸟
        egg.d = 1;
        egg.updateHumanStatus();
        return true;
    }

    // 执行雏鸟到猛禽的合成
    executeChickToMengqinSynthesis(chick, targets) {
        if (targets.length === 1) {
            // 方式A：消耗一个相邻的雏鸟
            this.board.removePiece(targets[0][0], targets[0][1]);
        } else if (targets.length === 2) {
            // 方式B：消耗两个相邻的蛋
            for (const [row, col] of targets) {
                this.board.removePiece(row, col);
            }
        } else {
            return false;
        }
        
        // 升级为猛禽
        chick.d = 2;
        chick.updateHumanStatus();
        return true;
    }

    // 检查胜利条件
    checkVictoryConditions(board, currentPlayer) {
        const humanCounts = board.countBothHumans();
        const pieceCounts = board.countBothPieces();
        
        // 检查当前玩家是否拥有两个人类
        if ((currentPlayer === 0 && humanCounts.white >= 2) || 
            (currentPlayer === 1 && humanCounts.black >= 2)) {
            return {
                hasWinner: true,
                winner: currentPlayer,
                reason: "拥有两个人类"
            };
        }
        
        // 检查对方是否没有棋子
        if ((currentPlayer === 0 && pieceCounts.black === 0) || 
            (currentPlayer === 1 && pieceCounts.white === 0)) {
            return {
                hasWinner: true,
                winner: currentPlayer,
                reason: "全歼对方所有棋子"
            };
        }
        
        return {
            hasWinner: false,
            winner: -1,
            reason: ""
        };
    }
}