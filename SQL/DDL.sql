-- create a table for customer
create table if not exists customer (
  cus_id                    serial,
  cus_name                  varchar(30)         not null,
  cus_phone                 varchar(20)         not null,
  cus_email                 varchar(50)         not null,
  cus_address               varchar(50)         not null,
  primary key(cus_id)
);

-- create a table for genre
create table if not exists genre(
  genre_id                  serial,
  genre_name                varchar(50)        not null,
  primary key (genre_id)
);

-- create a table for author
create table if not exists author(
  author_id                 serial,
  author_name               varchar(50)         not null,
  primary key (author_id)
);

-- create a table for owners
create table if not exists owners(
  owner_id                  serial,
  owner_name                varchar(50)         not null,
  primary key (owner_id)
);

-- create a table for publisher
create table if not exists publisher(
  pub_id                    serial,
  pub_name                  varchar(50)         not null,
  pub_phone                 varchar(50)         not null,
  pub_email                 varchar(50)         not null,
  pub_address               varchar(50)         not null,
  bank_account              varchar(50)         not null,
  primary key (pub_id)
);

-- create a table for orders
create table if not exists orders(
  order_id                  serial,
  cus_id                    int         		    references customer on delete cascade,
  order_date                date            	  not null,
  paid                      Boolean             not null,
  status                    varchar(50)         not null,
  ship_address              varchar(50)         not null,
  recipient                 varchar(50)         not null,
  credit_card               varchar(50)         not null,
  order_phone               varchar(50)         not null,
  primary key (order_id)
);

-- create a table for book
create table if not exists book(
  book_id                   serial,
  inventory                 int                 not null,
  pub_id                    int                 references publisher on delete set null,
  author_id                 int                 references author on delete set null,
  genre_id                  int                 references genre on delete set null,
  book_name                 varchar(50)         not null,
  royalty_rate              float               not null,
  pub_date                  date                not null,
  price                     money               not null,
  isbn                      varchar(50)         not null,
  num_page                  int                 not null,
  on_shelf                  Boolean             not null,
  primary key (book_id)
);

-- create a table for order_book, which sepecify what books and how many books in an order
create table if not exists order_book(
  order_id                  int                 references orders on delete cascade,
  book_id                   int                 references book on delete cascade,
  amount                    int                 not null,
  primary key (order_id, book_id)
);
