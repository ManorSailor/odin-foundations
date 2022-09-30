/* ========= Imports ========= */
import { main } from "../utils/utils.js";

const section = document.createElement('section');
section.classList.add('player-board');
main.appendChild(section);

function view(name, score) {
    const nameView  = document.createElement('p');
    nameView.classList.add('name');
    nameView.textContent = name;

    const scoreView = document.createElement('span');
    scoreView.classList.add('score');
    scoreView.textContent = score;

    const updateScore = (val) => scoreView.textContent = val;
    const clearScore = () => scoreView.textContent = 0;

    nameView.appendChild(scoreView);
    section.appendChild(nameView);

    return { updateScore, clearScore };
}

function model() {
    // Private variables
    let score = 0;
    const myCells = [];

    // Accessors/Getters
    const getScore = () => score;
    const getCells = () => myCells;

    // Modifiers/Setters
    const clearScore = () => score = 0;
    const incrementScore = () => score++;
    const addCell = (cell) => myCells.push(cell);

    return { getScore, incrementScore, clearScore, getCells, addCell };
}

export function player(name, gameSign) {
    // Initialize model & view for each player
    const playerView = view(name, 0);
    const playerModel = model();

    const incrementScore = () => {
        playerModel.incrementScore();
        const score = playerModel.getScore();
        playerView.updateScore(score);
    }

    const clearScore = () => {
        playerView.clearScore();
        playerModel.clearScore();
    }

    return { name, gameSign, incrementScore, clearScore };
}