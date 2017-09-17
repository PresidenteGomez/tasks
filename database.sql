--database name: tasks
--Create syntax for tasktable
CREATE TABLE tasktable (
id SERIAL PRIMARY KEY NOT NULL,
task VARCHAR(200) UNIQUE,
complete BOOLEAN
);
--thats all, folks.