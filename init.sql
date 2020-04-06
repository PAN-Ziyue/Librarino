CREATE SCHEMA IF NOT EXISTS library
    DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE library;

CREATE TABLE IF NOT EXISTS admin
(
    admin_id  CHAR(7),
    password  CHAR(32),
    name      VARCHAR(10),
    telephone CHAR(7),
    PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS book
(
    bno      char(8),
    category char(10),
    title    varchar(40),
    press    varchar(30),
    year     int,
    author   varchar(20),
    price    decimal(7, 2),
    total    int,
    stock    int,
    PRIMARY KEY (bno)
);

CREATE TABLE IF NOT EXISTS card
(
    cno        CHAR(7),
    name       VARCHAR(10),
    department VARCHAR(40),
    type       CHAR(1) CHECK ( type IN ('T', 'G', 'U', 'O')),
    PRIMARY KEY (cno)
);
CREATE TABLE IF NOT EXISTS borrow
(
    cno         CHAR(7),
    bno         CHAR(8),
    borrow_date DATETIME,
    return_date DATETIME,
    admin_id    CHAR(7),
    FOREIGN KEY (bno) REFERENCES book (bno) ON DELETE CASCADE,
    FOREIGN KEY (cno) REFERENCES card (cno) ON UPDATE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admin (admin_id)
);

INSERT INTO admin VALUES('admin', 'admin', 'admin', '19957134033')
