// 棋盘类
class Board {
    constructor() {
        this.size = 9;
        this.grid = this.initializeGrid();
    }

    // 初始化棋盘
    initializeGrid() {
        const grid = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            grid[i] = new Array(this.size).fill(null);
        }
        return grid;
    }

    // 初始化初始布局
    initInitialLayout() {
        // 白方棋子位置（0-based索引，[col, row] 顺序，对应用户的 (x,y)）
        const whitePositions = [
            [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], // (1,1)到(9,1)
            [0, 1], [1, 1], [4, 1], [7, 1], [8, 1]                                  // (1,2)、(2,2)、(5,2)、(8,2)、(9,2)
        ];
        
        // 黑方棋子位置（白方的轴对称，注意坐标顺序）
        const blackPositions = whitePositions.map(([col, row]) => [8 - col, 8 - row]);
        
        // 放置白方棋子
        for (const [col, row] of whitePositions) {
            this.grid[row][col] = new Piece(0, 1, 1, 0);
        }
        
        // 放置黑方棋子
        for (const [col, row] of blackPositions) {
            this.grid[row][col] = new Piece(1, 1, 1, 0);
        }
    }

    // 获取指定位置的棋子
    getPiece(row, col) {
        if (this.isValidPosition(row, col)) {
            return this.grid[row][col];
        }
        return null;
    }

    // 设置指定位置的棋子
    setPiece(row, col, piece) {
        if (this.isValidPosition(row, col)) {
            this.grid[row][col] = piece;
        }
    }

    // 移除指定位置的棋子
    removePiece(row, col) {
        if (this.isValidPosition(row, col)) {
            this.grid[row][col] = null;
        }
    }

    // 移动棋子
    movePiece(fromRow, fromCol, toRow, toCol) {
        if (!this.isValidPosition(fromRow, fromCol) || !this.isValidPosition(toRow, toCol)) {
            return false;
        }
        
        const piece = this.getPiece(fromRow, fromCol);
        if (!piece) {
            return false;
        }
        
        this.setPiece(toRow, toCol, piece);
        this.removePiece(fromRow, fromCol);
        return true;
    }

    // 检查位置是否有效
    isValidPosition(row, col) {
        return row >= 0 && row < this.size && col >= 0 && col < this.size;
    }

    // 检查位置是否为空
    isEmpty(row, col) {
        return this.getPiece(row, col) === null;
    }

    // 统计指定玩家的人类数量
    countHumans(player) {
        let count = 0;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const piece = this.getPiece(row, col);
                if (piece && piece.player === player && piece.isHuman) {
                    count++;
                }
            }
        }
        return count;
    }

    // 统计双方人类数量
    countBothHumans() {
        return {
            white: this.countHumans(0),
            black: this.countHumans(1)
        };
    }

    // 复制棋盘
    clone() {
        const newBoard = new Board();
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const piece = this.getPiece(row, col);
                if (piece) {
                    newBoard.setPiece(row, col, new Piece(piece.player, piece.h, piece.v, piece.d));
                }
            }
        }
        return newBoard;
    }

    // 获取相邻位置
    getAdjacentPositions(row, col) {
        const positions = [];
        const directions = [
            [-1, 0], // 上
            [1, 0],  // 下
            [0, -1], // 左
            [0, 1]   // 右
        ];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (this.isValidPosition(newRow, newCol)) {
                positions.push([newRow, newCol]);
            }
        }
        
        return positions;
    }

    // 获取对角线相邻位置
    getDiagonalPositions(row, col) {
        const positions = [];
        const directions = [
            [-1, -1], // 左上
            [-1, 1],  // 右上
            [1, -1],  // 左下
            [1, 1]    // 右下
        ];
        
        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            if (this.isValidPosition(newRow, newCol)) {
                positions.push([newRow, newCol]);
            }
        }
        
        return positions;
    }

    // 获取横向相邻位置
    getHorizontalPositions(row, col) {
        return [
            [row, col - 1], // 左
            [row, col + 1]  // 右
        ].filter(([r, c]) => this.isValidPosition(r, c));
    }

    // 获取纵向相邻位置
    getVerticalPositions(row, col) {
        return [
            [row - 1, col], // 上
            [row + 1, col]  // 下
        ].filter(([r, c]) => this.isValidPosition(r, c));
    }

    // 统计指定玩家的棋子数量
    countPieces(player) {
        let count = 0;
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const piece = this.getPiece(row, col);
                if (piece && piece.player === player) {
                    count++;
                }
            }
        }
        return count;
    }

    // 统计双方棋子数量
    countBothPieces() {
        return {
            white: this.countPieces(0),
            black: this.countPieces(1)
        };
    }
}