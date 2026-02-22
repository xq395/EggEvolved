// 游戏主逻辑
class Game {
    constructor() {
        this.board = new Board();
        this.rules = new Rules(this.board);
        this.ui = new UI('board');
        
        // 游戏状态
        this.currentPlayer = 0; // 0为白方，1为黑方
        this.specialCounts = [2, 2]; // 双方特殊合成剩余次数
        this.gameOver = false;
        this.synthesisMode = false;
        this.selectedPiece = null;
        
        // 初始化游戏
        this.init();
        
        // 绑定事件
        this.bindEvents();
    }

    // 初始化游戏
    init() {
        this.board.initInitialLayout();
        this.updateGameInfo();
        this.ui.drawBoard(this.board);
    }

    // 更新游戏信息
    updateGameInfo() {
        const humanCounts = this.board.countBothHumans();
        this.ui.updateGameInfo(this.currentPlayer, this.specialCounts, humanCounts);
    }

    // 绑定事件
    bindEvents() {
        // 棋盘点击事件
        this.ui.canvas.addEventListener('click', (e) => this.handleBoardClick(e));
        
        // 特殊合成按钮
        document.getElementById('special-synthesis').addEventListener('click', () => this.handleSpecialSynthesis());
        
        // 取消按钮
        document.getElementById('cancel').addEventListener('click', () => this.handleCancel());
    }

    // 处理棋盘点击
    handleBoardClick(e) {
        if (this.gameOver) return;
        
        const coords = this.ui.mouseToBoardCoords(e.clientX, e.clientY);
        if (!coords) return;
        
        const { row, col } = coords;
        const piece = this.board.getPiece(row, col);
        
        if (this.synthesisMode) {
            this.handleSynthesisClick(row, col, piece);
        } else {
            this.handleNormalClick(row, col, piece);
        }
    }

    // 处理普通点击
    handleNormalClick(row, col, piece) {
        if (this.selectedPiece) {
            // 已有选中的棋子，尝试移动到点击位置
            this.tryMove(this.selectedPiece.row, this.selectedPiece.col, row, col);
        } else if (piece) {
            // 没有选中的棋子，点击了棋子
            if (piece.player === this.currentPlayer) {
                // 点击了己方棋子，选中它
                this.selectPiece(row, col, piece);
            }
        }
    }

    // 处理合成模式点击
    handleSynthesisClick(row, col, piece) {
        if (!piece) return;
        
        // 检查是否是有效的合成目标
        if (this.isValidSynthesisTarget(row, col, piece)) {
            // 添加到合成目标
            this.ui.addSynthesisTarget(row, col);
            this.ui.drawBoard(this.board);
            
            // 检查是否完成合成
            this.checkSynthesisComplete();
        }
    }

    // 检查是否是有效的合成目标
    isValidSynthesisTarget(row, col, piece) {
        if (!this.selectedPiece) return false;
        
        const selectedPiece = this.selectedPiece.piece;
        
        // 蛋合成雏鸟
        if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 0) {
            // 检查是否是相邻的棋子
            const distanceRow = Math.abs(row - this.selectedPiece.row);
            const distanceCol = Math.abs(col - this.selectedPiece.col);
            
            if ((distanceRow === 1 && distanceCol === 0) || (distanceRow === 0 && distanceCol === 1)) {
                // 确保已经选择了不同方向的棋子
                const targets = this.ui.synthesisTargets;
                if (targets.length === 0) {
                    return true;
                } else if (targets.length === 1) {
                    const firstTarget = targets[0];
                    const firstDistanceRow = Math.abs(firstTarget.row - this.selectedPiece.row);
                    const firstDistanceCol = Math.abs(firstTarget.col - this.selectedPiece.col);
                    
                    return (firstDistanceRow === 1 && firstDistanceCol === 0 && distanceRow === 0 && distanceCol === 1) ||
                           (firstDistanceRow === 0 && firstDistanceCol === 1 && distanceRow === 1 && distanceCol === 0);
                }
            }
        }
        
        // 雏鸟合成猛禽
        if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 1) {
            // 方式A：相邻的雏鸟
            const distanceRow = Math.abs(row - this.selectedPiece.row);
            const distanceCol = Math.abs(col - this.selectedPiece.col);
            
            if (distanceRow <= 1 && distanceCol <= 1 && (distanceRow + distanceCol) === 1) {
                if (piece.h === 1 && piece.v === 1 && piece.d === 1) {
                    return this.ui.getSynthesisTargetCount() === 0;
                }
            }
            
            // 方式B：一个横向相邻和一个纵向相邻的蛋
            if ((distanceRow === 1 && distanceCol === 0) || (distanceRow === 0 && distanceCol === 1)) {
                if (piece.h === 1 && piece.v === 1 && piece.d === 0) {
                    const targets = this.ui.synthesisTargets;
                    if (targets.length === 0) {
                        return true;
                    } else if (targets.length === 1) {
                        // 检查第一个目标的位置，确保第二个目标是不同方向的蛋
                        const firstTarget = targets[0];
                        const firstPiece = this.board.getPiece(firstTarget.row, firstTarget.col);
                        
                        // 确保第一个目标是蛋
                        if (!firstPiece || firstPiece.h !== 1 || firstPiece.v !== 1 || firstPiece.d !== 0) {
                            return false;
                        }
                        
                        // 确保两个目标是不同方向的
                        const firstDistanceRow = Math.abs(firstTarget.row - this.selectedPiece.row);
                        const firstDistanceCol = Math.abs(firstTarget.col - this.selectedPiece.col);
                        
                        return (firstDistanceRow === 1 && firstDistanceCol === 0 && distanceRow === 0 && distanceCol === 1) ||
                               (firstDistanceRow === 0 && firstDistanceCol === 1 && distanceRow === 1 && distanceCol === 0);
                    }
                }
            }
        }
        
        return false;
    }

    // 检查合成是否完成
    checkSynthesisComplete() {
        if (!this.selectedPiece) return;
        
        const selectedPiece = this.selectedPiece.piece;
        const targetCount = this.ui.getSynthesisTargetCount();
        
        // 蛋合成雏鸟需要2个目标
        if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 0 && targetCount === 2) {
            this.executeSynthesis();
        }
        
        // 雏鸟合成猛禽
        if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 1) {
            if (targetCount === 1) {
                // 方式A：检查目标是否是雏鸟
                const target = this.ui.synthesisTargets[0];
                const targetPiece = this.board.getPiece(target.row, target.col);
                if (targetPiece && targetPiece.h === 1 && targetPiece.v === 1 && targetPiece.d === 1) {
                    this.executeSynthesis();
                }
            } else if (targetCount === 2) {
                // 方式B：检查两个目标是否都是蛋
                const target1 = this.ui.synthesisTargets[0];
                const target2 = this.ui.synthesisTargets[1];
                const targetPiece1 = this.board.getPiece(target1.row, target1.col);
                const targetPiece2 = this.board.getPiece(target2.row, target2.col);
                
                if (targetPiece1 && targetPiece1.h === 1 && targetPiece1.v === 1 && targetPiece1.d === 0 &&
                    targetPiece2 && targetPiece2.h === 1 && targetPiece2.v === 1 && targetPiece2.d === 0) {
                    this.executeSynthesis();
                }
            }
        }
    }

    // 执行合成
    executeSynthesis() {
        if (!this.selectedPiece) return;
        
        const selectedPiece = this.selectedPiece.piece;
        const targets = this.ui.synthesisTargets.map(t => [t.row, t.col]);
        let success = false;
        
        if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 0) {
            // 蛋合成雏鸟
            success = this.rules.executeEggToChickSynthesis(selectedPiece, targets);
        } else if (selectedPiece.h === 1 && selectedPiece.v === 1 && selectedPiece.d === 1) {
            // 雏鸟合成猛禽
            success = this.rules.executeChickToMengqinSynthesis(selectedPiece, targets);
        }
        
        if (success) {
            // 减少特殊合成次数
            this.specialCounts[this.currentPlayer]--;
            
            // 退出合成模式
            this.exitSynthesisMode();
            
            // 检查胜利条件
            this.checkVictory();
            
            // 切换回合
            this.switchTurn();
        }
    }

    // 选择棋子
    selectPiece(row, col, piece) {
        this.selectedPiece = { row, col, piece };
        this.ui.setSelectedPiece(row, col, piece);
        
        // 设置棋子的位置信息，供规则系统使用
        piece.row = row;
        piece.col = col;
        
        // 计算有效移动
        const validMoves = this.rules.getValidMoves(piece, row, col);
        this.ui.setValidMoves(validMoves);
        
        // 检查是否可以特殊合成
        const canSynthesis = this.rules.canSpecialSynthesis(piece, this.currentPlayer, this.specialCounts[this.currentPlayer]);
        this.ui.setSpecialSynthesisButtonEnabled(canSynthesis);
        this.ui.setCancelButtonEnabled(true);
        
        // 绘制棋盘
        this.ui.drawBoard(this.board);
    }

    // 尝试移动
    tryMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board.getPiece(fromRow, fromCol);
        if (!piece) return;
        
        if (this.rules.isValidMove(piece, fromRow, fromCol, toRow, toCol)) {
            // 执行移动
            this.rules.executeMove(fromRow, fromCol, toRow, toCol);
            
            // 清除选中状态
            this.clearSelection();
            
            // 检查胜利条件
            this.checkVictory();
            
            // 切换回合
            this.switchTurn();
        }
    }

    // 处理特殊合成
    handleSpecialSynthesis() {
        if (!this.selectedPiece) return;
        
        const piece = this.selectedPiece.piece;
        if (this.rules.canSpecialSynthesis(piece, this.currentPlayer, this.specialCounts[this.currentPlayer])) {
            this.enterSynthesisMode();
        }
    }

    // 进入合成模式
    enterSynthesisMode() {
        this.synthesisMode = true;
        this.ui.enterSynthesisMode();
        this.ui.setSpecialSynthesisButtonEnabled(false);
        this.ui.setCancelButtonEnabled(true);
        this.ui.showMessage('请选择合成所需的棋子');
        this.ui.drawBoard(this.board);
    }

    // 退出合成模式
    exitSynthesisMode() {
        this.synthesisMode = false;
        this.ui.exitSynthesisMode();
        this.clearSelection();
    }

    // 处理取消
    handleCancel() {
        if (this.synthesisMode) {
            this.exitSynthesisMode();
        } else {
            this.clearSelection();
        }
    }

    // 清除选中状态
    clearSelection() {
        this.selectedPiece = null;
        this.ui.setSelectedPiece(null);
        this.ui.clearValidMoves();
        this.ui.setSpecialSynthesisButtonEnabled(false);
        this.ui.setCancelButtonEnabled(false);
        this.ui.showMessage('');
        this.ui.drawBoard(this.board);
    }

    // 切换回合
    switchTurn() {
        this.currentPlayer = 1 - this.currentPlayer;
        this.updateGameInfo();
        this.clearSelection();
    }

    // 检查胜利条件
    checkVictory() {
        const result = this.rules.checkVictoryConditions(this.board, this.currentPlayer);
        if (result.hasWinner) {
            this.gameOver = true;
            this.ui.showGameOver(result.winner, result.reason);
            this.ui.setSpecialSynthesisButtonEnabled(false);
            this.ui.setCancelButtonEnabled(false);
        }
    }
}

// 初始化游戏
window.onload = function() {
    new Game();
};