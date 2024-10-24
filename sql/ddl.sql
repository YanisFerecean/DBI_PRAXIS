CREATE TABLE Highscores (
    id SERIAL PRIMARY KEY,         -- Unique identifier for each highscore
    user_name VARCHAR(255) NOT NULL,  -- Name of the user associated with the score
    score INT NOT NULL             -- The actual high score
);

-- Create an index on the score column for faster queries on highscores
CREATE INDEX idx_highscore_score ON Highscores (score);
