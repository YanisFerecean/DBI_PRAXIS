CREATE TABLE Highscores (
    user_name VARCHAR(255) NOT NULL,
    score INT NOT NULL
);

CREATE INDEX idx_highscore_score ON Highscores (score);
