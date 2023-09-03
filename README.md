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

Download and install Xampp on your system https://www.apachefriends.org/download.html

For Linux you will have to run the commands to:
Change the permissions to the installer

```
chmod 755 xampp-linux-*-installer.run
```

Then run the installer

```
sudo ./xampp-linux-*-installer.run
```

Then in the setup wizard select both components to install

### Clone the repository

You will want to clone this repository into the "htdocs" folder in the Xampp directory

```
cd /opt/lampp/htdocs/
```

```
sudo git clone https://github.com/Ben-JClark/asynchronous-website.git
```

### Setup the API key

This key will allow you to make 1000 requests per day free of charge

- Create an account at OpenWeather https://openweathermap.org/api
- Select the "API keys" tab in OpenWeather, you will then see your new key displayed
- open the config.php file, you could do it using nano

```
sudo nano /opt/lampp/htdocs/asynchronous-website/code/php/config.php
```

- Replace the text in config.php "YOUR_API_KEY_HERE" with your key

### Setup MySQL database with phpMyAdmin

- Open Xampp, you can run the command

```
sudo /opt/lampp/lampp start
```

- Navigate to the url http://localhost/phpmyadmin/
- You will then want to create a database
- - Click "New"
- - Set the name to "322"
- - Click create

- Now we want to import the tables, select the "import" tab then Browse and select "events.sql"
  events.sql will be located in /opt/lampp/htdocs/asynchronous-website/events.sql
- press the import button

### Connecting phpMyAdmin to the website

In the file connect.php located in the repository code/php/connect.php enter your credentails,
if you don't know what they are just leave the default entries

- $dsn = "mysql:host=localhost;dbname=322";
- $user = "root";
- $passwd = "";

## Running

In linux to start Xampp, you can run the command

```
sudo /opt/lampp/lampp start
```

Now the website is up, you can view it in your url
http://localhost/asynchronous-website/code/index.html
