resource aws_dynamodb_table petitions {
  name = "${terraform.workspace}-petitions"
  hash_key = "hk"
  range_key = "rk"
  billing_mode = "PROVISIONED"
  write_capacity = 1
  read_capacity = 1

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }
  
  global_secondary_index {
    hash_key = "rk"
    range_key = "no"
    name = "rkNo"
    projection_type = "ALL"
    write_capacity = 1
    read_capacity = 1
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
    name = "no"
    type = "N"
  }
}
