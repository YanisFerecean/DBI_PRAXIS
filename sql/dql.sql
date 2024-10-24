SELECT * FROM Highscores
ORDER BY score DESC
FETCH NEXT 10 ROWS ONLY;

SELECT * FROM Highscores
ORDER BY score DESC
OFFSET 90 ROWS
FETCH NEXT 10 ROWS ONLY;

SELECT *
  FROM Highscores
  WHERE score < 300
  ORDER BY score DESC
  FETCH FIRST 3 ROWS ONLY;

SELECT * FROM (
    SELECT Highscores.*, ROW_NUMBER() over (ORDER BY score) rn FROM HIGHSCORES
              ) tmp
WHERE rn between 11 and 20
order by score;
