-- A set of sample data for the data base

-- Create a set of author
insert into author values (default, 'Jiujiu Duan');

insert into author values (default, 'Kirk Zhen');

insert into author values (default, 'Hua Yu');

insert into author values(default, 'You Know Who');

insert into author values (default, 'J.K.Rowling');

insert into author values (default, 'Paul Allan');

insert into author values (default, 'Donald Trump');

insert into author values (default, 'Tony White');

insert into author values (default, 'Jit Bose');

-- Create a set of genre
insert into genre values (default, 'Fiction');

insert into genre values (default, 'Novel');

insert into genre values (default, 'Mystery');

insert into genre values (default, 'Poetry');

insert into genre values (default, 'Biography');

insert into genre values (default, 'Romance');

insert into genre values (default, 'Narrative');

-- Create a set of Publishers
insert into publisher
values (default, 'El-Roby Publisher', '8193244546', 'elroby@xxx.com', 'address A', 'SS1231423123451');

insert into publisher
values (default, 'ABC Publish', '8123454546', 'abc@xxx.com', 'address B', 'SS123s23445451');

insert into publisher
values (default, 'No.3 Publish', '5679454546', 'no3@xxx.com', 'address C','SS123s46745451');

insert into publisher
values (default, 'No.4 Publish', '1234567897', 'no4@xxx.com', '1876 Good Road','19293846145451');

insert into publisher
values (default, 'I am the five Publish', '2123455142', 'no5@xxx.com', '1342 Bad road ','SS12345123125451');


-- Create a set of customers
insert into customer
values (default, 'Tony Stark', '8193296591', 'tongystark@gmail.com', '1533, AGD Road');


insert into customer
values (default, 'Alan Shark', '8344296591', 'alanshark@gmail.com', '1533, alan Road');

insert into customer
values (default, 'Donald Trump', '8344234211', 'idiot@gmail.com', '1533, Shitty Road');


-- Create a set of books
insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (10000, 2, 2, 2, 'Little Women',
		0.3, '4/23/1998', 129.99, 'ISBN12341', 199, True);


insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (5000, 2, 2, 3, 'Harry Potter',
		0.2, '3/12/1994', 89.99, 'ISBN23123341', 523, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 3, 6, 'What a Book!',
		0.3, '4/12/1976', 39.99, 'Isxeksess41', 123, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 3, 2, 4, 'You and I',
		0.3, '6/12/199', 19.99, '123455642', 99, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 5, 4, 'Hey Poem',
		0.9, '6/12/1999', 19.99, '81723615243', 3, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 5, 1, 'Harry Potter 2',
		0.1, '6/12/2004', 89.99, '8123123123615243', 296, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 5, 1, 'Harry Potter 4',
		0.2, '6/12/2005', 89.99, '8121233123615243', 396, True);


insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 5, 1, 'Harry Potter and the Order of the Phoenix',
		0.2, '6/12/2007', 89.99, '1234563', 323, True);

insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 4, 9, 6, 'My Name is Jit Bose',
		0.2, '6/12/2012', 666.5, '181j248172', 899, True);


insert into book(inventory, pub_id, author_id,  genre_id, book_name,
				 royalty_rate,  pub_date, price, isbn, num_page, on_shelf)
values (1000, 5, 8, 6, 'Why why Tony White!',
		0.2, '5/10/2014', 33.89, '1123512172', 669, True);


-- Create a set of orders
insert into orders
values (default, '2', '4/2/2020', False, 'Not shipped', '1533, good Road', 'Bad Guy', '1928384828381727', '13283747261');

insert into orders
values (default, '2', '4/1/2020', False, 'Not shipped', '1533, good Road', 'Good Guy', '192387362516273', '8192736251');

insert into orders
values (default, '3', '3/12/2020', False, 'Not shipped', '1533, bad Road', 'Spiderman', '192837461525364', '9381726351');

insert into orders
values (default, '1', '3/22/2020', False, 'Not shipped', '9993, hehe Road','Batman', '384726172637485', '6326152635');

insert into orders
values (default, '2', '3/11/2020', True, 'Not shipped', '2123, giant Road','Mr.M', '3812341237485', '632342345');


-- Set the books and their corresponding amount in a specifice order
insert into order_book values (1, 1, 3);

insert into order_book values (1, 2, 1);

insert into order_book values (2, 1, 5);

insert into order_book values (3, 2, 1);

insert into order_book values (4, 1, 2);

insert into order_book values (4, 2, 1);

insert into order_book values (5, 6, 3);

insert into order_book values (5, 7, 3);

insert into order_book values (5, 8, 4);
