SET NAMES UTF8;
DROP DATABASE IF EXISTS bi;
CREATE DATABASE bi CHARSET=UTF8;
USE bi;

CREATE TABLE bi_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(128)
);
INSERT INTO bi_user VALUES
(1, 'yazhou', '123456','qd@jd.com'),
(2, 'zhouwei', '456789','nc@jd.com');

CREATE TABLE bi_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  pname VARCHAR(64),
  price FLOAT(10,2),
  pic VARCHAR(128)
);
INSERT INTO bi_product VALUES
(1,'羊毛混纺格子衬衫',199.00,'image/01.jpg'),
(2,'年轻商务黑色套西',899.00,'image/02.jpg'),
(3,'男高领绞花纯羊毛',299.00,'image/03.jpg'),
(4,'羊毛休闲男士长裤',289.00,'image/04.jpg'),
(5,'男士牛仔经典直筒',229.00,'image/05.jpg'),
(6,'圆领男士卫衣',249.00,'image/06.jpg'),
(7,'羊毛定位织衬衫',299.00,'image/07.jpg'),
(8,'男圆领精纺羊绒衫',599.00,'image/08.jpg'),
(9,'女高领纯羊绒衫',749.00,'image/09.jpg'),
(10,'V领双面呢大衣',599.00,'image/10.jpg'),
(11,'双排扣收腰大衣',669.00,'image/11.jpg'),
(12,'女士宽松牛仔衬衣',249.00,'image/12.jpg'),
(13,'女士牛仔修身直筒',229.00,'image/13.jpg'),
(14,'修身拼皮长裤',239.00,'image/14.jpg'),
(15,'高领长袖无缝毛衫',439.00,'image/15.jpg'),
(16,'女马鞍纯羊绒套衫',669.00,'image/16.jpg'),
(17,'粉晶光面百搭文胸',99.00,'image/17.jpg'),
(18,'精致棉内裤礼盒装',99.00,'image/18.jpg'),
(19,'无痕长袖秋衣套装',209.00,'image/19.jpg'),
(20,'天竺棉家居服长袖',175.00,'image/20.jpg'),
(21,'男士轻奢平底内裤',159.00,'image/21.jpg'),
(22,'防臭商务袜5双装',69.00,'image/22.jpg'),
(23,'黑色花边打底内衣',179.00,'image/23.jpg'),
(24,'时尚橙红文胸套装',169.00,'image/24.jpg');

CREATE TABLE bi_cart(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  userId INT
);
INSERT INTO bi_cart VALUES(100, 1);

CREATE TABLE bi_cart_detail(
  did INT PRIMARY KEY AUTO_INCREMENT,
  cartId INT,
  productId INT,
  count INT
);
INSERT INTO bi_cart_detail VALUES
(1, 100, 10, 3),
(2, 100, 15, 1),
(3, 100, 18, 2);