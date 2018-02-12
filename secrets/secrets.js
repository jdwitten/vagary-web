var dev_secrets = {
  mysqldbhost: "localhost",
  mysqldbpassword: "P@11word",
}

var prod_secrets = {
  mysqldbhost: "ec2-18-219-0-191.us-east-2.compute.amazonaws.com",
  mysqldbpassword: "P@11word",
}

module.exports = process.env.NODE_ENV == "production" ? prod_secrets : dev_secrets
