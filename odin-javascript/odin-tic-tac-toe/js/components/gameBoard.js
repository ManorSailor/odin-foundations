/* ========= Imports ========= */
import { main, GRID_SIZE } from "../utils/utils.js";

const view = (() => {
    // Initialize DOM Nodes
    const section = document.createElement('section');
    section.classList.add('game-board');

    for (let i = 0; i < GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-cell-id', i);
        section.appendChild(cell);
    }
    
    main.appendChild(section);

    // Modifiers/Setters
    const insert = (gameSign, cell) => {
        cell.textContent = gameSign;
        cell.classList.add('full');
    }

    const clear = () => {
        let child = section.firstChild;
        while (child) {
            child.textContent = '';
            child.classList = "";
            child = child.nextSibling;
        }
    }

    return { insert, clear };
})();

const model = (() => {
    // Set is more performant & helped us out a bit in implementation
    // https://www.reddit.com/r/learnjavascript/comments/n1j7ub/comment/gwdpz0h/?utm_source=share&utm_medium=web2x&context=3
    const occupiedBoard = new Set();

    const isBoardFull = () => (occupiedBoard.size === 9);

    const isCellTaken = (cell) => occupiedBoard.has(cell);

    const insert = (cell) => {
        if (!isCellTaken(cell)) {
            occupiedBoard.add(cell);
            return cell;
        }
        return false;
    }
    
    const clear = () => occupiedBoard.clear();

    return { isBoardFull, insert, clear };
})();

export const gameBoard = (() => {
    const insert = (gameSign, cell) => {
        const inserted = model.insert(cell);
        if (inserted) {
            view.insert(gameSign, cell);
        }
        return inserted;
    }

    const isFull = () => model.isBoardFull();

    const clear = () => {
        view.clear();
        model.clear();
    }

    return { insert, isFull, clear };
})();