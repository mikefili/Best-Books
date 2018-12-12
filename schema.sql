
CREATE TABLE IF NOT EXISTS books(
id SERIAL PRIMARY KEY,
author VARCHAR(255),
title VARCHAR(255),
isbn BIGINT,
image_url VARCHAR(255),
description TEXT,
bookshelf VARCHAR(255)
);
DELETE FROM books;
INSERT INTO books (author,title,isbn,image_url,description,bookshelf) VALUES ('Frank Herbert','Dune',9780441013593,'http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api','Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny.','level1');

INSERT INTO books (author,title,isbn,image_url,description,bookshelf) VALUES ('Alexandre Dumas','The Count of Monte Cristo',9789577473523,'http://books.google.com/books/content?id=rOQu3bomHMQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api','With the post-Napoleonic era as the back-drop, the novel covers the life of a young sailor, Edmond Dantes. The narration follows him from near-triumph to complete disaster and then his swashbuckling adventures to get freedom and revenge. The blustering journey of the protagonist keeps the reader on the edge.','level2');
