DROP DATABASE IF EXISTS doctorsappointments;

CREATE DATABASE doctorsappointments;

\c doctorsappointments;

CREATE TABLE public.doctors (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100)
);

CREATE TABLE public.patients (
  id SERIAL PRIMARY KEY NOT NULL,
  doctorid INT NOT NULL,
  name VARCHAR(100),
  FOREIGN KEY (doctorid) REFERENCES doctors(id)
);


CREATE TABLE public.appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  doctorid INT,
  patientid INT,
  patientname VARCHAR(100),
  dateandtime timestamp,
  kind VARCHAR(100)
);

INSERT INTO doctors (name) VALUES ('Julius Hibbert'), ('Nick Riviera'), ('Algernop Krieger');
INSERT INTO patients (doctorid, name) VALUES (1, 'Jeff Smith'), (1, 'Stacy Smithers'), (2, 'Josh Alexander'), (2, 'Kevin Foster'), (3, 'Brad Pitt'), (3, 'Johnny Depp');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (1, 1, 'Jeff Smith', '2022-07-01 12:15:00-00', 'New Patient');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (1, 2, 'Stacy Smithers', '2022-07-02 12:30:00-00', 'Follow-up');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (2, 3, 'Josh Alexander', '2022-07-01 14:45:00-00', 'New Patient');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (2, 4, 'Kevin Foster', '2022-07-03 15:00:00-00', 'New Patient');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (3, 5, 'Brad Pitt', '2022-07-05 12:15:00-00', 'Follow-up');
INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES (3, 6, 'Johnny Depp', '2022-07-05 13:15:00-00', 'New Patient');

