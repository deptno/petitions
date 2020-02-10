resource aws_s3_bucket petitions-archive {
  bucket = "${terraform.workspace}-petitions-archive"
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Allow Public Access to All Objects",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::${terraform.workspace}-petitions-archive/*"
    }
  ]
}
POLICY

  versioning {
    enabled = true
  }
}

