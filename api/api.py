from flask import Flask, request
from flask_restful import Resource, Api
from sqlalchemy import create_engine
from flask_cors import CORS
from flask import jsonify
import psycopg2


def connectSQL():
    try:
        connection = psycopg2.connect(user="postgres",
                                      password="83818489789qwe",
                                      host="127.0.0.1",
                                      port="5432",
                                      database="Bookshop")
        cursor = connection.cursor()
    except (Exception, psycopg2.Error) as error:
        print("Error while connecting to PostgreSQL", error)
        return
    return cursor


app = Flask(__name__)
CORS(app)
api = Api(app)


# get 10 本推荐 /getRecommended
# creat book: inventory, book_name, author_name, genre_name, book_name, royalty_rate, price, isbn, num_page, on_shelf


# get 10 本推荐 /getRecommended
class Recommended(Resource):
    def get(self):
        cursor = connectSQL()  # connect to database
        cursor.execute("select book_id, inventory, book_name, author_name,genre_name, royalty_rate,price,isbn,num_page, on_shelf from book natural join author natural join genre limit 10")
        r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        print(r)
        cursor.connection.close()
        return r


class Customers(Resource):
    def get(self):
        cursor = connectSQL()  # connect to database
        cursor.execute("select * from book")
        # print(cursor.fetchall())
        r = [dict((cursor.description[i][0], value)  for i, value in enumerate(row) if i not in [7]) for row in cursor.fetchall()]
        print(r)
        cursor.connection.close()
        return r


class Create_book(Resource):
    def post(self):
        cursor = connectSQL()  # connect to database
        print(request.json)
        inventory = request.json['inventory']
        book_name = request.json['book_name']
        author_name = request.json['author_name']
        genre_name = request.json['genre_name']
        royalty_rate = request.json['royalty_rate']
        pub_id = request.json['pub_id']
        pub_date = request.json['pub_date']
        price = request.json['price']
        isbn = request.json['isbn']
        num_page = request.json['num_page']
        on_shelf = request.json['on_shelf']

        cursor.execute("insert into author(author_name) select \'{}\' where not exists (select author_name from author where author_name = \'{}\' )".format(author_name, author_name))
        cursor.execute("select author_id from author where author_name = \'{}\'".format(author_name))
        author_id = cursor.fetchone()[0]

        cursor.execute("insert into genre(genre_name) select \'{}\' where not exists (select genre_name from genre where genre_name = \'{}\' )".format(genre_name, genre_name))
        cursor.execute("select genre_id from genre where genre_name = \'{}\'".format(genre_name))
        genre_id = cursor.fetchone()[0]

        query = "insert into book(inventory, pub_id, author_id,  genre_id, book_name,royalty_rate,  pub_date, price, isbn, num_page, on_shelf) " \
                "values ({}, {}, {}, {}, '{}', {}, '{}', {}, '{}', {}, {});".format(inventory,pub_id,author_id,genre_id, book_name, royalty_rate, pub_date, price, isbn, num_page, on_shelf)
        cursor.execute(query)
        cursor.connection.commit()

        cursor.execute(
            "select book_id, inventory, book_name, author_name,genre_name, royalty_rate,price,isbn,num_page, on_shelf "
            "from book natural join author natural join genre where book_name = '{}'".format(book_name))
        r = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
        cursor.connection.close()
        return r


class Books(Resource):
    def get(self):
        cursor = connectSQL()  # connect to database
        cursor.execute("select * from book")
        # print(cursor.fetchall())
        r = [dict((cursor.description[i][0], value)  for i, value in enumerate(row) if i not in [7]) for row in cursor.fetchall()]
        print(r)
        cursor.connection.close()
        return r



# get the sales amount of a book last month
# TODO
class Search_by_keyword(Resource):
    def get(self, keyword):
        cursor = connectSQL()  # connect to database
        word_list = keyword.split("_")
        # out = []
        # for i in range(len(word_list)):
        query = "select book_id, inventory, book_name, author_name,genre_name, royalty_rate,price,isbn,num_page, on_shelf from book natural join author natural join genre " \
                "where book_name ~ '{}' or author_name ~ '{}' or genre_name ~ '{}'".format(word_list[0], word_list[0], word_list[0])
        cursor.execute(query)
        r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
            # out += r
        # print(out)
        cursor.connection.close()
        return r



class Register(Resource):
    def post(self):
        cursor = connectSQL()  # connect to database
        print(request.json)
        cus_name = request.json['name']
        cus_email = request.json['email']

        query = "insert into customer(cus_name, cus_email, cus_phone, cus_address) select '{}','{}'," \
                "'8183928888','Temp address' where not exists (select cus_email from customer where cus_email = '{}' )".format(cus_name,cus_email,cus_email)
        cursor.execute(query)
        cursor.connection.commit()
        cursor.connection.close()


class Delete_Book(Resource):
    def delete(self, id):
        cursor = connectSQL()  # connect to database
        # print(request.json)
        # book_id = request.json['book_id']

        query = "delete from book where book_id = {}".format(id)
        cursor.execute(query)
        cursor.connection.commit()
        cursor.connection.close()


class Creat_Order(Resource):
    def post(self):
        print(request.json)
        cursor = connectSQL()  # connect to database
        cus_email = request.json['cus_email']
        ship_address = request.json["ship_address"]
        recipient = request.json["recipients"]
        credit_card = request.json["credit_card"]
        order_phone = request.json["phone"]

        cursor.execute("select cus_id from customer where cus_email = '{}'".format(cus_email))
        cus_id = cursor.fetchone()[0]

        query = "insert into orders values (default, {}, date_trunc('day', now())::date, True, 'Not shipped', '{}', '{}', '{}','{}') returning order_id".format(
            cus_id, ship_address, recipient, credit_card, order_phone)
        cursor.execute(query)
        order_id = cursor.fetchone()[0]
        for key in request.json.keys():
            if not key in ["cus_email", "ship_address", "credit_card","recipients", "phone"]:
                book_id = int(key)
                amount = int(request.json[key])
                # cursor.execute("select book_id from book where book_name = '{}'".format(book_name))
                # book_id = cursor.fetchone()[0]
                query = "insert into order_book values({}, {}, {})".format(order_id, book_id, amount)
                cursor.execute(query)
                cursor.connection.commit()
                cursor.execute("update book set inventory = inventory-{} where book_id = {}".format(amount, book_id))
                cursor.connection.commit()
                cursor.exectue("select inventory from book where book_id={}".format(book_id))
                r = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
                # a flag to determine whether or not to send the email to the publisher
                send_email_flag = r["inventory"] < 10
        cursor.connection.close()
        return order_id



# get the sales amount of a book last month
class Get_book_last_month(Resource):
    def get(self, book_name):
        cursor = connectSQL()  # connect to database
        temp = book_name.replace("_", " ")
        query = "select Sum(amount) as Result from( " \
                "select * from book natural join order_book natural join orders " \
                "where order_date between (date_trunc(\'month\', now())- interval \'1 month\')::date " \
                "and date_trunc(\'month\', now())::date-1 and book_name = \'{}\' ) as foo".format(temp)
        cursor.execute(query)
        r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        print(r)
        cursor.connection.close()
        return r


class Check_order(Resource):
    def get(self, order_id):
        cursor = connectSQL()  # connect to database
        query = "select Sum(price*amount) as Result  from(select * from book natural join order_book natural join orders where order_id = {}) as foo".format(
            order_id)
        cursor.execute(query)
        total_value = cursor.fetchone()[0]
        query = "select paid from orders where order_id = {}".format(order_id)
        cursor.execute(query)
        isPaid = cursor.fetchone()[0]
        query = "select status from orders where order_id = {}".format(order_id)
        cursor.execute(query)
        status = cursor.fetchone()[0]
        query = "select credit_card from orders where order_id = {}".format(order_id)
        cursor.execute(query)
        credit_num = cursor.fetchone()[0]
        cursor.connection.close()
        return {"order_number": order_id,
                "total_value": total_value,
                "isPaid": isPaid,
                "status": status,
                "credit_num": credit_num
                }


class Render_report(Resource):
    def get(self):
        cursor = connectSQL()  # connect to database
        query = "select Sum(price*amount) as total_sale, sum(price*amount*royalty_rate) as total_expenditure " \
                "from(select * from book natural join order_book natural join orders natural join genre) as foo"
        cursor.execute(query)
        dic_1 = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
        query = "select Sum(price*amount) as sales_last_month, sum(price*amount*royalty_rate) as expenditure_last_month " \
                "from(select * from book natural join order_book natural join orders natural join genre " \
                "where order_date between (date_trunc('month', now())- interval '1 month')::date " \
                "and date_trunc('month', now())::date-1) as foo"
        cursor.execute(query)
        dic_2 = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
        dic_1.update(dic_2)
        cursor.connection.close()
        return dic_1




class Report_by_genre(Resource):
    def get(self, genre_name):
        cursor = connectSQL()  # connect to database
        query = "select sum(amount) as genre_amount, Sum(price*amount) as genre_sales " \
                "from(select * from book natural join order_book natural join orders natural join genre " \
                "where genre_name = '{}') as foo".format(genre_name)
        cursor.execute(query)
        # r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        dic_1 = dict((cursor.description[i][0], value if value is not None else 0) for i, value in enumerate(cursor.fetchall()[0]))
        query = "select sum(amount) as genre_last_amount, Sum(price*amount) as genre_last_sales " \
                "from(select * from book natural join order_book natural join orders natural join genre " \
                "where order_date between (date_trunc('month', now())- interval '1 month')::date  " \
                "and date_trunc('month', now())::date-1 and genre_name = '{}') as foo".format(genre_name)
        cursor.execute(query)
        # r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        dic_2 = dict((cursor.description[i][0], value if value is not None else 0) for i, value in enumerate(cursor.fetchall()[0]))
        dic_1.update(dic_2)
        cursor.connection.close()
        return dic_1



class Report_by_author(Resource):
    def get(self, author_name):
        author_name = author_name.replace("_", " ")
        cursor = connectSQL()  # connect to database
        query = "select sum(amount) as author_amount, Sum(price*amount) as author_sales " \
                "from(select * from book natural join order_book natural join orders natural join author " \
                "where author_name = '{}') as foo".format(author_name)
        cursor.execute(query)
        # r = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]
        dic_1 = dict((cursor.description[i][0], value if value is not None else 0) for i, value in enumerate(cursor.fetchall()[0]))
        query = "select sum(amount) as author_last_amount, Sum(price*amount) as author_last_sales " \
                "from(select * from book natural join order_book natural join orders natural join author " \
                "where order_date between (date_trunc('month', now())- interval '1 month')::date  " \
                "and date_trunc('month', now())::date-1 and author_name = '{}') as foo".format(author_name)
        cursor.execute(query)
        dic_2 = dict((cursor.description[i][0], value if value is not None else 0) for i, value in enumerate(cursor.fetchall()[0]))
        dic_1.update(dic_2)
        cursor.connection.close()
        return dic_1



class Test(Resource):
    def get(self):
        cursor = connectSQL()  # connect to database
        query = "select Sum(price*amount) as total_sale, sum(price*amount*royalty_rate) as total_expenditure " \
                "from(select * from book natural join order_book natural join orders natural join genre) as foo"
        cursor.execute(query)
        dic_1 = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
        print(dic_1)
        query = "select Sum(price*amount) as sales_last_month, sum(price*amount*royalty_rate) as expenditure_last_month " \
                "from(select * from book natural join order_book natural join orders natural join genre " \
                "where order_date between (date_trunc('month', now())- interval '1 month')::date " \
                "and date_trunc('month', now())::date-1) as foo"
        cursor.execute(query)
        dic_2 = dict((cursor.description[i][0], value) for i, value in enumerate(cursor.fetchall()[0]))
        dic_1.update(dic_2)
        cursor.connection.close()
        return dic_1





api.add_resource(Recommended, '/getRecommended')
api.add_resource(Create_book, '/create_book')
api.add_resource(Books, '/books')  # Route_1
api.add_resource(Customers, '/customers')  # Route_1
api.add_resource(Get_book_last_month, '/sale_last_month/<book_name>')
api.add_resource(Search_by_keyword, '/search/<keyword>')
api.add_resource(Register, '/register')
api.add_resource(Delete_Book, '/delete_book/<id>')
api.add_resource(Creat_Order, '/create_order')
api.add_resource(Check_order, '/check_order/<order_id>')
api.add_resource(Render_report, '/renderReport')
api.add_resource(Report_by_genre, '/getGenre/<genre_name>')
api.add_resource(Report_by_author, '/getAuthor/<author_name>')


api.add_resource(Test, '/test')

if __name__ == '__main__':
    app.run(port='3002')
