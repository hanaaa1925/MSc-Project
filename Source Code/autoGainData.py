# Objective To obtain the data of maimai
from selenium import webdriver
from time import sleep
from lxml import etree
from selenium.webdriver.chrome.options import Options
from selenium.webdriver import ChromeOptions
import pymysql
# Visual operation
# bro = webdriver.Chrome(executable_path='./chromedriver')

chrome_options = Options()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options)

# Risk avoidance detection
option = ChromeOptions()
option.add_experimental_option('excludeSwitches', ['enable-automation'])
bro = webdriver.Chrome(executable_path='./chromedriver', chrome_options=chrome_options, options=option)

# Obtaining the login page
bro.get('https://acc.maimai.cn/login')
print(bro.current_url)
print(bro.window_handles)
sleep(2)
bro.find_element_by_xpath('//*[@id="form"]/div[1]/div/input').send_keys('15979866525')
# sleep(1)
bro.find_element_by_xpath('//*[@id="login_pw"]').send_keys('Lll990125')
# sleep(1)
bro.find_element_by_xpath('//*[@id="form"]/input[3]').click()
# Complete login
sleep(2)

# Auto click
bro.find_element_by_xpath('//*[@id="react_app"]/div/div/div[2]/div/div[1]/div[1]/div[1]/div/ul/li[3]').click()
# Need two seconds of sleep to buffer
sleep(2)
page_text = bro.page_source
print(bro.current_url)
tree = etree.HTML(page_text)
# Lock the corresponding data
div_list = tree.xpath('//*[@id="react_app"]/div/div/div[2]/div/div[1]/div[3]/div')

# Crawler data collection
data_list = []
for div in div_list:
    data_dict = {}
    title = div.xpath('./div[1]/div[1]/div[1]/text()')
    # print(title)
    if len(title) != 0:
        data_dict['title'] = title[0]
        content_list = div.xpath('./div[1]/div[2]/div[1]/p/span/text()')
        str = ''
        for content in content_list:
            str = str + content
        data_dict['content'] = str
        data_list.append(data_dict)
print(data_list)

# Database connection and table creation command
# create table maimai_content(id INT UNSIGNED AUTO_INCREMENT, title VARCHAR(100), content text, PRIMARY KEY(id));

conn = pymysql.connect(host='localhost', port=3306, user='root', password='123456', db='MScProject', charset='utf8mb4')
cursor = conn.cursor()
print("success")

# sql
sql = "insert into maimai(title,content) values"
for data in data_list:
    sql = sql + "('" + data['title'] + "'," + "'" + data['content'] + "'),"
sql = sql[:len(sql)-1]+';'
# print(sql)
effect_row = cursor.execute(sql)
conn.commit()
conn.close()

sleep(4)
bro.quit()
