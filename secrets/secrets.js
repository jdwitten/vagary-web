var dev_secrets = {
  mysqldbhost: "localhost",
  mysqldbpassword: "P@11word",
}

var prod_secrets = {
  mysqldbhost: "localhost",
  mysqldbpassword: "P@11word",
}

module.exports = process.env.NODE_ENV == "production" ? prod_secrets : dev_secrets
