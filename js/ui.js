// UI系统
class UI {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 80;
        this.selectedPiece = null;
        this.validMoves = [];
        this.synthesisMode = false;
        this.synthesisTargets = [];
    }

    // 绘制棋盘
    drawBoard(board) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制棋盘格子
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                this.drawCell(row, col);
            }
        }
        
        // 绘制棋子
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board.getPiece(row, col);
                if (piece) {
                    this.drawPiece(row, col, piece);
                }
            }
        }
        
        // 绘制选中效果
        if (this.selectedPiece) {
            this.drawSelectedPiece(this.selectedPiece.row, this.selectedPiece.col);
        }
        
        // 绘制可移动位置
        this.drawValidMoves();
        
        // 绘制合成模式选中的目标
        this.drawSynthesisTargets();
    }

    // 绘制单个格子
    drawCell(row, col) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        
        // 交替颜色
        if ((row + col) % 2 === 0) {
            this.ctx.fillStyle = '#f0f0f0';
        } else {
            this.ctx.fillStyle = '#d0d0d0';
        }
        
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        this.ctx.strokeStyle = '#999';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    // 绘制棋子
    drawPiece(row, col, piece) {
        const x = col * this.cellSize + this.cellSize / 2;
        const y = row * this.cellSize + this.cellSize / 2;
        const radius = this.cellSize / 2 - 5;
        
        // 绘制棋子背景
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = piece.player === 0 ? '#fff' : '#333';
        this.ctx.fill();
        this.ctx.strokeStyle = piece.player === 0 ? '#333' : '#fff';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        
        // 绘制棋子名称
        this.ctx.fillStyle = piece.player === 0 ? '#333' : '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(piece.getName(), x, y - 10);
        
        // 绘制棋子等级
        this.ctx.font = '12px Arial';
        this.ctx.fillText(`H:${piece.h} V:${piece.v} D:${piece.d}`, x, y + 10);
    }

    // 绘制选中的棋子
    drawSelectedPiece(row, col) {
        const x = col * this.cellSize;
        const y = row * this.cellSize;
        
        this.ctx.strokeStyle = '#0066cc';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    // 绘制可移动位置
    drawValidMoves() {
        for (const move of this.validMoves) {
            const x = move.col * this.cellSize + this.cellSize / 2;
            const y = move.row * this.cellSize + this.cellSize / 2;
            const radius = this.cellSize / 2 - 10;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, Math.PI * 2);
            
            if (move.isCapture) {
                if (move.isFriendly) {
                    this.ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
                } else {
                    this.ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
                }
            } else {
                this.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            }
            
            this.ctx.fill();
        }
    }

    // 绘制合成模式选中的目标
    drawSynthesisTargets() {
        for (const target of this.synthesisTargets) {
            const x = target.col * this.cellSize;
            const y = target.row * this.cellSize;
            
            this.ctx.strokeStyle = '#ff8c00';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
        }
    }

    // 设置选中的棋子
    setSelectedPiece(row, col, piece) {
        this.selectedPiece = piece ? { row, col, piece } : null;
    }

    // 设置可移动位置
    setValidMoves(moves) {
        this.validMoves = moves;
    }

    // 清除可移动位置
    clearValidMoves() {
        this.validMoves = [];
    }

    // 进入合成模式
    enterSynthesisMode() {
        this.synthesisMode = true;
        this.synthesisTargets = [];
    }

    // 退出合成模式
    exitSynthesisMode() {
        this.synthesisMode = false;
        this.synthesisTargets = [];
    }

    // 添加合成目标
    addSynthesisTarget(row, col) {
        this.synthesisTargets.push({ row, col });
    }

    // 清除合成目标
    clearSynthesisTargets() {
        this.synthesisTargets = [];
    }

    // 获取合成目标数量
    getSynthesisTargetCount() {
        return this.synthesisTargets.length;
    }

    // 转换鼠标坐标为棋盘坐标
    mouseToBoardCoords(mouseX, mouseY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        
        const col = Math.floor(x / this.cellSize);
        const row = Math.floor(y / this.cellSize);
        
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            return { row, col };
        }
        
        return null;
    }

    // 更新游戏信息显示
    updateGameInfo(currentPlayer, specialCounts, humanCounts) {
        // 更新当前回合
        const turnIndicator = document.querySelector('.turn-indicator');
        turnIndicator.textContent = currentPlayer === 0 ? '白方' : '黑方';
        
        // 更新白方信息
        const whitePlayer = document.querySelector('.player.white');
        whitePlayer.querySelector('.special-count').textContent = `特殊合成: ${specialCounts[0]}`;
        whitePlayer.querySelector('.human-count').textContent = `人类: ${humanCounts.white}`;
        
        // 更新黑方信息
        const blackPlayer = document.querySelector('.player.black');
        blackPlayer.querySelector('.special-count').textContent = `特殊合成: ${specialCounts[1]}`;
        blackPlayer.querySelector('.human-count').textContent = `人类: ${humanCounts.black}`;
    }

    // 显示消息
    showMessage(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
    }

    // 显示游戏结束信息
    showGameOver(winner, reason) {
        const winnerName = winner === 0 ? '白方' : '黑方';
        this.showMessage(`${winnerName} 获胜！原因：${reason}`);
        
        // 创建游戏结束弹窗
        const gameOverDiv = document.createElement('div');
        gameOverDiv.className = 'game-over';
        gameOverDiv.innerHTML = `
            <h2>游戏结束</h2>
            <p>${winnerName} 获胜！</p>
            <p>原因：${reason}</p>
            <button onclick="this.parentElement.remove()">确定</button>
        `;
        document.body.appendChild(gameOverDiv);
    }

    // 启用/禁用特殊合成按钮
    setSpecialSynthesisButtonEnabled(enabled) {
        const button = document.getElementById('special-synthesis');
        button.disabled = !enabled;
    }

    // 启用/禁用取消按钮
    setCancelButtonEnabled(enabled) {
        const button = document.getElementById('cancel');
        button.disabled = !enabled;
    }
}