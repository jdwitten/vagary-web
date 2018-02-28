var dev_secrets = {
  mysqldbhost: "localhost",
  mysqldbpassword: "P@11word",
  s3_access_key_id: "AKIAIRB6V7DBZIMUTF4A",
  s3_secret_key: "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",
  s3_bucket: "vagary-dev"
}

var prod_secrets = {
  mysqldbhost: "localhost",
  mysqldbpassword: "P@11word",
}

module.exports = process.env.NODE_ENV == "production" ? prod_secrets : dev_secrets
