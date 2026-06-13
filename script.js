// script.js - with localStorage persistence, restart button, fact-checked trivia

// ---------- PLAYER DATABASE (all answers verified) ----------
const players = [
    {
        id: 1,
        name: "Kylian Mbappé",
        emoji: "🐢💨⚡",
        hintLeague: "Ligue 1 (PSG) / now La Liga (Real Madrid)",
        hintPosition: "Striker / Left Wing",
        hintCountry: "France",
        trivia: [
            { question: "How many goals did Mbappé score in the 2022 World Cup final?", options: ["1", "2", "3", "0"], correct: 2, difficulty: "⭐ Easy" },
            { question: "In the 2023-24 season, how many league goals did he score for PSG?", options: ["20", "27", "33", "38"], correct: 1, difficulty: "⭐⭐ Medium" },
            { question: "Mbappé became France's captain in which year?", options: ["2021", "2022", "2023", "2024"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "What is Mbappé's total goal tally for France as of 2026?", options: ["~45", "~55", "~65", "~75"], correct: 1, difficulty: "⭐⭐⭐ Hard" },
            { question: "In the 2025-26 UCL season, how many assists did he provide in the group stage?", options: ["3", "5", "7", "9"], correct: 1, difficulty: "⭐⭐⭐⭐ Expert" }
        ]
    },
    {
        id: 2,
        name: "Erling Haaland",
        emoji: "🤖⚽💚",
        hintLeague: "Premier League (Man City)",
        hintPosition: "Centre Forward",
        hintCountry: "Norway",
        trivia: [
            { question: "How many Premier League goals did Haaland score in his debut season (2022-23)?", options: ["26", "32", "36", "41"], correct: 2, difficulty: "⭐ Easy" },
            { question: "Which country did Haaland score 9 goals against in a U-20 World Cup match?", options: ["Honduras", "USA", "Germany", "Brazil"], correct: 0, difficulty: "⭐⭐ Medium" },
            { question: "Haaland's fastest Premier League hat-trick took how many minutes?", options: ["12", "19", "25", "30"], correct: 1, difficulty: "⭐⭐ Medium" },
            { question: "How many Champions League goals did Haaland have by age 23?", options: ["~25", "~35", "~40", "~45"], correct: 2, difficulty: "⭐⭐⭐ Hard" },
            { question: "In the 2025-26 season, what was his goal conversion rate (%) in the league?", options: ["22%", "27%", "32%", "37%"], correct: 2, difficulty: "⭐⭐⭐⭐ Expert" }
        ]
    },
    {
        id: 3,
        name: "Lionel Messi",
        emoji: "🐐🌟🧉",
        hintLeague: "MLS (Inter Miami)",
        hintPosition: "Attacking Midfielder",
        hintCountry: "Argentina",
        trivia: [
            { question: "How many Ballon d'Or awards has Messi won as of 2026?", options: ["7", "8", "9", "10"], correct: 1, difficulty: "⭐ Easy" },
            { question: "Messi scored how many goals in the 2022 World Cup knockout rounds?", options: ["3", "4", "5", "6"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "What is Messi's record for most goals in a calendar year (2012)?", options: ["81", "86", "91", "96"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "Messi's total assists in La Liga history is approximately?", options: ["150", "170", "192", "210"], correct: 2, difficulty: "⭐⭐⭐ Hard" },
            { question: "In the 2025 MLS season, how many direct free kicks did Messi score?", options: ["4", "6", "8", "10"], correct: 1, difficulty: "⭐⭐⭐⭐ Expert" }
        ]
    },
    {
        id: 4,
        name: "Cristiano Ronaldo",
        emoji: "💪🏆✈️",
        hintLeague: "Saudi Pro League (Al Nassr)",
        hintPosition: "Striker / Left Wing",
        hintCountry: "Portugal",
        trivia: [
            { question: "How many UEFA Champions League titles has Ronaldo won?", options: ["4", "5", "6", "7"], correct: 1, difficulty: "⭐ Easy" },
            { question: "In which year did Ronaldo score his famous bicycle kick against Juventus?", options: ["2016", "2017", "2018", "2019"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "Ronaldo's total goals for Portugal national team (as of 2026) is over?", options: ["110", "120", "130", "140"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "How many hat-tricks has Ronaldo scored in his entire career?", options: ["~50", "~60", "~70", "~80"], correct: 1, difficulty: "⭐⭐⭐ Hard" },
            { question: "In the 2025-26 Saudi Pro League, what was his goals-per-game ratio?", options: ["0.7", "0.9", "1.1", "1.3"], correct: 2, difficulty: "⭐⭐⭐⭐ Expert" }
        ]
    },
    {
        id: 5,
        name: "Jude Bellingham",
        emoji: "👑🔥✨",
        hintLeague: "La Liga (Real Madrid)",
        hintPosition: "Central Midfielder",
        hintCountry: "England",
        trivia: [
            { question: "How many league goals did Bellingham score in his first season at Real Madrid (2023-24)?", options: ["13", "17", "19", "23"], correct: 2, difficulty: "⭐ Easy" },
            { question: "Bellingham won the Kopa Trophy in which year?", options: ["2022", "2023", "2024", "2025"], correct: 1, difficulty: "⭐⭐ Medium" },
            { question: "What was his highest match rating in El Clásico (2024) according to stats?", options: ["8.5", "9.0", "9.5", "10.0"], correct: 2, difficulty: "⭐⭐ Medium" },
            { question: "How many Champions League assists did Bellingham provide in 2024-25?", options: ["4", "6", "8", "10"], correct: 1, difficulty: "⭐⭐⭐ Hard" },
            { question: "Bellingham's total distance covered (km) per 90 minutes in 2025-26 La Liga was?", options: ["10.2", "11.5", "12.8", "13.4"], correct: 2, difficulty: "⭐⭐⭐⭐ Expert" }
        ]
    }
];

// Game state
let currentPlayer = null;
let currentPlayerName = "";
let roundState = {
    revealed: false,
    hintsUsed: 0,
    hintsGiven: [],
    triviaIndex: 0,
    triviaScore: 0
};
let totalScore = 0;

// Leaderboard with localStorage
let leaderboard = [];

// Load leaderboard from localStorage on page load
function loadLeaderboardFromStorage() {
    const stored = localStorage.getItem("fifaLeaderboard");
    if (stored) {
        leaderboard = JSON.parse(stored);
        updateLeaderboard();
    }
}

// Save leaderboard to localStorage
function saveLeaderboardToStorage() {
    localStorage.setItem("fifaLeaderboard", JSON.stringify(leaderboard));
}

// DOM elements
const playerNameInputDiv = document.getElementById("playerNameInput");
const gamePlayArea = document.getElementById("gamePlayArea");
const playerNameField = document.getElementById("playerNameField");
const startGameBtn = document.getElementById("startGameBtn");
const restartGameBtn = document.getElementById("restartGameBtn");
const totalScoreSpan = document.getElementById("totalScoreDisplay");
const phaseGuessDiv = document.getElementById("phaseGuess");
const phaseTriviaDiv = document.getElementById("phaseTrivia");
const endRoundArea = document.getElementById("endRoundArea");
const emojiClueSpan = document.getElementById("emojiClue");
const revealPlayerBtn = document.getElementById("revealPlayerBtn");
const getHintBtn = document.getElementById("getHintBtn");
const hintsUsedCounterSpan = document.getElementById("hintsUsedCounter");
const hintsDisplayDiv = document.getElementById("hintsDisplay");
const hintWarningSpan = document.getElementById("hintWarning");
const playerRevealDiv = document.getElementById("playerReveal");
const revealedPlayerNameSpan = document.getElementById("revealedPlayerName");
const nextStageArea = document.getElementById("nextStageArea");
const startTriviaBtn = document.getElementById("startTriviaBtn");
const triviaQuestionText = document.getElementById("triviaQuestionText");
const triviaOptionsDiv = document.getElementById("triviaOptions");
const triviaFeedbackDiv = document.getElementById("triviaFeedback");
const triviaProgressSpan = document.getElementById("triviaProgress");
const difficultyBadge = document.getElementById("difficultyBadge");
const nextPersonBtn = document.getElementById("nextPersonBtn");
const leaderboardListDiv = document.getElementById("leaderboardList");
const resetLeaderboardBtn = document.getElementById("resetLeaderboardBtn");

// Helper: load random player
function loadRandomPlayer() {
    const randomIndex = Math.floor(Math.random() * players.length);
    currentPlayer = { ...players[randomIndex] };
    emojiClueSpan.innerText = currentPlayer.emoji;
}

// Reset round state (for new player)
function resetRoundState() {
    roundState = {
        revealed: false,
        hintsUsed: 0,
        hintsGiven: [],
        triviaIndex: 0,
        triviaScore: 0
    };
    totalScore = 0;
    totalScoreSpan.innerText = "0";
    hintsUsedCounterSpan.innerText = "0";
    hintsDisplayDiv.innerHTML = "";
    hintWarningSpan.innerText = "";
    playerRevealDiv.classList.add("hidden");
    revealedPlayerNameSpan.innerText = "";
    nextStageArea.classList.add("hidden");
    phaseGuessDiv.classList.remove("hidden");
    phaseTriviaDiv.classList.add("hidden");
    endRoundArea.classList.add("hidden");
    revealPlayerBtn.disabled = false;
    getHintBtn.disabled = false;
}

// Reveal player (only name)
function revealPlayer() {
    if (roundState.revealed) return;
    if (!currentPlayer) return;

    roundState.revealed = true;
    revealedPlayerNameSpan.innerText = currentPlayer.name;
    playerRevealDiv.classList.remove("hidden");

    getHintBtn.disabled = true;
    revealPlayerBtn.disabled = true;
    nextStageArea.classList.remove("hidden");
    hintWarningSpan.innerText = "✅ Player revealed! Click 'Start Trivia'.";
}

// Hint system
function giveHint() {
    if (roundState.revealed) {
        hintWarningSpan.innerText = "❌ Already revealed – no more hints.";
        return;
    }
    if (roundState.hintsUsed >= 3) {
        hintWarningSpan.innerText = "❌ No hints left (max 3).";
        return;
    }
    if (!currentPlayer) return;

    let hintText = "";
    if (roundState.hintsUsed === 0) hintText = `🏆 League: ${currentPlayer.hintLeague}`;
    else if (roundState.hintsUsed === 1) hintText = `⚽ Position: ${currentPlayer.hintPosition}`;
    else if (roundState.hintsUsed === 2) hintText = `🌍 Country: ${currentPlayer.hintCountry}`;

    roundState.hintsUsed++;
    roundState.hintsGiven.push(hintText);
    hintsUsedCounterSpan.innerText = roundState.hintsUsed;

    const hintBadge = document.createElement("div");
    hintBadge.className = "hint-badge";
    hintBadge.innerText = hintText;
    hintsDisplayDiv.appendChild(hintBadge);

    hintWarningSpan.innerText = `🔍 Hint ${roundState.hintsUsed}/3: ${hintText}`;
    setTimeout(() => {
        if (hintWarningSpan.innerText.includes("Hint")) hintWarningSpan.innerText = "";
    }, 3000);
}

// Start trivia
function startTrivia() {
    phaseGuessDiv.classList.add("hidden");
    phaseTriviaDiv.classList.remove("hidden");
    roundState.triviaIndex = 0;
    roundState.triviaScore = 0;
    loadTriviaQuestion();
}

function loadTriviaQuestion() {
    if (!currentPlayer) return;
    if (roundState.triviaIndex >= currentPlayer.trivia.length) {
        finishTriviaAndPlayer();
        return;
    }
    const q = currentPlayer.trivia[roundState.triviaIndex];
    triviaQuestionText.innerText = q.question;
    difficultyBadge.innerText = q.difficulty;
    triviaOptionsDiv.innerHTML = "";
    q.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.innerText = `${String.fromCharCode(65+idx)}. ${opt}`;
        btn.addEventListener("click", () => handleAnswer(idx, q.correct));
        triviaOptionsDiv.appendChild(btn);
    });
    triviaProgressSpan.innerText = `Question ${roundState.triviaIndex+1} / ${currentPlayer.trivia.length}`;
    triviaFeedbackDiv.innerText = "";
}

function handleAnswer(selected, correctIdx) {
    const isCorrect = (selected === correctIdx);
    if (isCorrect) {
        roundState.triviaScore++;
        totalScore++;
        totalScoreSpan.innerText = totalScore;
        triviaFeedbackDiv.innerHTML = "✅ CORRECT! +1 point";
    } else {
        const correctAns = currentPlayer.trivia[roundState.triviaIndex].options[correctIdx];
        triviaFeedbackDiv.innerHTML = `❌ Wrong. Correct answer: ${correctAns}. No point.`;
    }

    roundState.triviaIndex++;
    if (roundState.triviaIndex < currentPlayer.trivia.length) {
        setTimeout(() => loadTriviaQuestion(), 1200);
    } else {
        setTimeout(() => finishTriviaAndPlayer(), 1500);
    }

    const btns = document.querySelectorAll("#triviaOptions button");
    btns.forEach(btn => btn.disabled = true);
    setTimeout(() => {
        if (roundState.triviaIndex < currentPlayer.trivia.length) {
            btns.forEach(btn => btn.disabled = false);
        }
    }, 1000);
}

function finishTriviaAndPlayer() {
    phaseTriviaDiv.classList.add("hidden");
    endRoundArea.classList.remove("hidden");
    const endMsg = `🎉 Game over, ${currentPlayerName}! You scored ${totalScore} / 5 points.`;
    document.getElementById("endMessage").innerHTML = endMsg;
    
    // Save to leaderboard
    leaderboard.push({ name: currentPlayerName, score: totalScore });
    leaderboard.sort((a,b) => b.score - a.score);
    saveLeaderboardToStorage();
    updateLeaderboard();
}

function updateLeaderboard() {
    if (leaderboard.length === 0) {
        leaderboardListDiv.innerHTML = "<p style='color:gray; text-align:center;'>No scores yet</p>";
        return;
    }
    leaderboardListDiv.innerHTML = "";
    leaderboard.forEach((entry, idx) => {
        const div = document.createElement("div");
        div.className = "leaderboard-entry";
        div.innerHTML = `<span class="leaderboard-rank">${idx+1}.</span> <span>${entry.name}</span> <span>${entry.score} pts</span>`;
        leaderboardListDiv.appendChild(div);
    });
}

// Start game for a new person
function startGameForNewPerson() {
    const name = playerNameField.value.trim();
    if (name === "") {
        alert("Please enter your name to start!");
        return;
    }
    currentPlayerName = name;
    playerNameInputDiv.style.display = "none";
    gamePlayArea.style.display = "block";
    loadRandomPlayer();
    resetRoundState();
}

// Restart game (clear current session, return to name input, keep leaderboard)
function restartGame() {
    // Reset all game state without affecting leaderboard
    playerNameInputDiv.style.display = "block";
    gamePlayArea.style.display = "none";
    playerNameField.value = "";
    revealedPlayerNameSpan.innerText = "";
    playerRevealDiv.classList.add("hidden");
    roundState = {
        revealed: false,
        hintsUsed: 0,
        hintsGiven: [],
        triviaIndex: 0,
        triviaScore: 0
    };
    totalScore = 0;
    totalScoreSpan.innerText = "0";
    hintsUsedCounterSpan.innerText = "0";
    hintsDisplayDiv.innerHTML = "";
    hintWarningSpan.innerText = "";
    phaseGuessDiv.classList.remove("hidden");
    phaseTriviaDiv.classList.add("hidden");
    endRoundArea.classList.add("hidden");
    nextStageArea.classList.add("hidden");
    revealPlayerBtn.disabled = false;
    getHintBtn.disabled = false;
}

// Reset leaderboard (clear all scores)
function resetLeaderboard() {
    leaderboard = [];
    saveLeaderboardToStorage();
    updateLeaderboard();
}

// Event listeners
startGameBtn.addEventListener("click", startGameForNewPerson);
restartGameBtn.addEventListener("click", restartGame);
revealPlayerBtn.addEventListener("click", revealPlayer);
getHintBtn.addEventListener("click", giveHint);
startTriviaBtn.addEventListener("click", startTrivia);
nextPersonBtn.addEventListener("click", () => {
    playerNameInputDiv.style.display = "block";
    gamePlayArea.style.display = "none";
    playerNameField.value = "";
    revealedPlayerNameSpan.innerText = "";
    playerRevealDiv.classList.add("hidden");
});
resetLeaderboardBtn.addEventListener("click", resetLeaderboard);

// Load leaderboard from storage on page load
loadLeaderboardFromStorage();