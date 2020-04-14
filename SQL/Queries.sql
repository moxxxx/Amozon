-- The Insert queries are included in the Sample_data.sql.
-- So, in this file, there would be no Insert queries.


-- Search for some key words, in this exaple key word = 'Harry'
-- This query returns information of books that contians "Harry" in its book_name, author_name, for genre type
-- The more complecatied Search algorithm is implemented
-- by the falsk library in python with calling this query multiple times.
select book_id, inventory, book_name, author_name,genre_name, royalty_rate,price,isbn,num_page, on_shelf
from book natural join author natural join genre
where book_name ~ 'Harry' or author_name ~ 'Harry' or genre_name ~ 'Harry'


-- total sales and total expendicture for last month
select Sum(price*amount) as total_sales, sum(price*amount*royalty_rate) as total_expenditure
from(select * from book natural join order_book natural join orders natural join genre
where order_date between (date_trunc('month', now())- interval '1 month')::date
and date_trunc('month', now())::date-1) as foo;


-- total sales and total expendicture for all time
select Sum(price*amount) as total_sales, sum(price*amount*royalty_rate) as total_expenditure
from(select * from book natural join order_book natural join orders natural join genre) as foo;


-- total price of an specifice order, order with order_id = 3 in this example
select Sum(price*amount) as Result
from(select * from book natural join order_book natural join orders
where order_id = 3) as foo;


-- number of books sales and sales volumn for a give genre in last month, "Novel" in this example
select sum(amount) as genre_amount, Sum(price*amount) as genre_sales
from(select * from book natural join order_book natural join orders natural join genre
where order_date between (date_trunc('month', now())- interval '1 month')::date
and date_trunc('month', now())::date-1 and genre_name = 'Novel') as foo;


-- number of books sales and sales volumn for a give genre in all time, "Novel" in this example
select sum(amount) as genre_amount, Sum(price*amount) as genre_sales
from(select * from book natural join order_book natural join orders natural join genre
where genre_name = 'Novel') as foo;


-- number of books sales and sales volumn for a give author in last month, "Kirk Zhen" in this example
select sum(amount) as genre_amount, Sum(price*amount) as genre_sales
from(select * from book natural join order_book natural join orders natural join author
where order_date between (date_trunc('month', now())- interval '1 month')::date
and date_trunc('month', now())::date-1 and author_name = 'Kirk Zhen') as foo;


-- number of books sales and sales volumn for a give author in all time, "J.K.Rowling" in this example
select sum(amount) as genre_amount, Sum(price*amount) as genre_sales
from(select * from book natural join order_book natural join orders natural join author
where author_name = 'J.K.Rowling') as foo;


-- number of book sold for a specifice book last month, "Harry Potter" in this exaple
select Sum(amount) as Result from(
select * from book natural join order_book natural join orders
where order_date between (date_trunc('month', now())- interval '1 month')::date
and date_trunc('month', now())::date-1 and book_name = 'Harry Potter' ) as foo;

-- update the book inverntory when book was sold.
-- In this example, 3 book with book_id=1 was sold
update book
set inventory = inventory-3
where book_id = 1;
