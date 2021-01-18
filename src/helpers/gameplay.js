// Game Settings
export const saveGameSettings = (settings) => {
    localStorage.setItem("gameSettings", JSON.stringify(settings));
}

export const loadGameSettings = () => {
    return JSON.parse(localStorage.getItem("gameSettings"));
}

export const resetGameSettings = () => {
    localStorage.removeItem("gameSettings");
}

// Progress
export const saveGameProgress = (progress) => {
    localStorage.setItem("gameProgress", JSON.stringify(progress));
}

export const loadPreviousProgress = () => {
    return JSON.parse(localStorage.getItem("gameProgress"));
}

export const resetGameProgress = () => {
    localStorage.removeItem("gameProgress");
}

// Game State

// Scoring
export const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export const updateScore = (state, playerMarks, winner) => {
    let newScore = state.currentScore;
    if (playerMarks.user === winner) {
        newScore.user++
    } else {
        newScore.computer++
    }
    const newState = { ...state, currentScore: newScore }
    saveGameProgress(newState)
    return newState.currentScore
}

export const saveHighScore = (userScore) => {
    let currentScore = JSON.parse(localStorage.getItem("highScore"));

    if (currentScore === undefined) {
        console.log("Saving (new)");
        localStorage.setItem("highScore", JSON.stringify(userScore));
    } else {
        if (currentScore < userScore) {
            localStorage.setItem("highScore", JSON.stringify(userScore));
        }
    }
}

export const getHighScore = () => {
    return JSON.parse(localStorage.getItem("highScore"));
}

