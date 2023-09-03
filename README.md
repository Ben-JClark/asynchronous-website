# asynchronous-website

UOW Web Development paper for third year students. The first assignment tasked with building an asynchronous website using HTML, CSS, JavaScript, DHTML, PHP, MySQL database, AJAX, Fetch, and external API's. The website must display information about local events obtained from MySQL DB and display the weather fetched from openweathermap.org/api.

# how to run this for yourself

## Setup

### This setup uses

- Xampp
- phpMyAdmin
- A free API key from OpenWeather

### Setting up Xampp

XAMPP is an easy to install Apache distribution containing MariaDB, PHP, and Perl.

Download and install Xampp on your system (https://www.apachefriends.org/download.html)[https://www.apachefriends.org/download.html]

### Clone the repository

You will want to clone this repository into the "htdocs" folder in the Xampp directory

```
cd ~/xampp/htdocs/
```

```
git clone https://github.com/Ben-JClark/asynchronous-website.git
```

### Setup the API key

This key will allow you to make 1000 requests per day free of charge

- Sign up to get the free API key from OpenWeather (https://openweathermap.org/api)[https://openweathermap.org/api]
- Open the file with the directory asynchronous-website/code/php/config.php from the repository you just cloned
- Replace the text in config.php "YOUR_API_KEY_HERE" with your key

### Setup MySQL database with phpMyAdmin

- Open Xampp and start "Apache" and "MySQL"
- Navigate to the url (http://localhost/phpmyadmin/)[http://localhost/phpmyadmin/]
- You will then want to create a database and import the sql file in this repository called "events.sql"

### Connecting phpMyAdmin to the website

In the file connect.php located in the repository code/php/connect.php enter your credentails
by default

- $user = "root";
- $passwd = "";
- $dsn = "mysql:host=localhost;dbname=YOUR_DB_NAME";
  just replace YOUR_DB_NAME with the name of the database you created in phpMyAdmin

## Running

Assuming you cloned the repository into your htdocs folder, you just need to go to the url
http://localhost/asynchronous-website/code/index.html
