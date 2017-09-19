--database name: tasks
--Create syntax for tasktable
CREATE TABLE tasktable (
id SERIAL PRIMARY KEY NOT NULL,
task VARCHAR(200) UNIQUE,
complete BOOLEAN DEFAULT 'f'
);

--creating dummy rows in the DT
INSERT INTO taskytable (task, complete)
VALUES ('clean house', false);

INSERT INTO taskytable (task, complete)
VALUES ('read', false);
--thats all, folks.