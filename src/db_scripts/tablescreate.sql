/* usage:
    Log into mysql shell
    mysql> source <full_path_to_this_script>
    e.g. source /Users/abcd/captionit/src/db_scripts/tablescreate.sql
 */

CREATE TABLE users (
    id VARCHAR(8) PRIMARY KEY,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    email VARCHAR(320),
    password VARCHAR(15),
    planId int(1),
    planusage int(5),
    subscribedOn DATE,
    FOREIGN KEY (planId) REFERENCES plans(id) ON DELETE CASCADE
);

CREATE TABLE plans (
    id int(1) PRIMARY KEY,
    name VARCHAR(10),
    price DOUBLE(5, 2),
    duration int(4),
    requestslimit int(5)
);