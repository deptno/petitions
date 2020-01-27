resource aws_dynamodb_table petitions {
  name = "${terraform.workspace}-petitions"
  hash_key = "hk"
  range_key = "rk"
  billing_mode = "PAY_PER_REQUEST"

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  attribute {
    name = "hk"
    type = "N"
  }
  attribute {
    name = "rk"
    type = "S"
  }
  attribute {
    name = "people"
    type = "N"
  }
}
